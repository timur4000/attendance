<?php

namespace App\Standards\Abstracts\RouteGroup;

use App\Standards\Abstracts\RoutesRequests\RouteRequest;
use App\Standards\Classifiers\Chars\CharsClassifiers;
use App\Standards\Classifiers\Middlewares\MiddlewareClassifiers;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Route;

/**
 * Implements abstract logic for route groups.
 */
abstract class RouteGroup
{
    /**
     * Contains unique identifier for prefix and name of the route group.
     *
     * @var string
     */
    private string $identifier;

    /**
     * Contains middlewares of the route group.
     *
     * @var Collection
     */
    private Collection $middlewares;

    /**
     * Contains ignored middlewares of the route group.
     *
     * @var Collection
     */
    private Collection $ignored_middlewares;

    /**
     * Contains sequence names of groups and requests.
     *
     * @var Collection
     */
    static public Collection $sequences;

    public function __construct()
    {
        $this->middlewares = new Collection();

        $this->ignored_middlewares = new Collection();

        if (!isset(self::$sequences))
        {
            self::$sequences = new Collection();
        }
    }

    /**
     * Adds middleware to a route group.
     *
     * @param MiddlewareClassifiers $value
     *
     * @return Collection
     */
    protected function add_middleware(MiddlewareClassifiers $value): Collection
    {
        return $this
            ->middlewares
            ->push($value->name);
    }

    /**
     * Adds an ignored middleware to a route group.
     *
     * @param MiddlewareClassifiers $value
     *
     * @return Collection
     */
    protected function add_ignored_middleware(MiddlewareClassifiers $value): Collection
    {
        return $this
            ->ignored_middlewares
            ->push($value->name);
    }

    /**
     * Contains callable for group method.
     *
     * @return void
     */
    abstract public function callable(): void;

    /**
     * Returns callable for a route group.
     *
     * @return array
     */
    private function get_callable(): callable
    {
        return $this->callable(...);
    }

    /**
     * Declares route group.
     *
     * @return void
     */
    public function declare(): void
    {
        if (!self::has_sequence($this::class))
        {
            self::put_sequence($this::class, $this->get_name());
        }

        Route
            ::prefix($this->get_prefix())
            ->middleware($this->middlewares->toArray())
            ->withoutMiddleware($this->ignored_middlewares->toArray())
            ->name($this->get_name())
            ->group($this->get_callable());
    }

    /**
     * Calls the given route group.
     *
     * @param RouteGroup|string $route_group
     *
     * @return void
     */
    protected function call(RouteGroup | string $route_group): void
    {
        $instance = new $route_group();

        self::put_sequence($instance::class, self::get_group_sequence($this::class) . $instance->get_name());

        $instance->declare();
    }

    /**
     * Calls the given route request.
     *
     * @param RouteRequest|string $route_request
     *
     * @return void
     */
    protected function call_request(RouteRequest | string $route_request): void
    {
        $instance = new $route_request();

        $instance->declare();

        self::put_sequence($instance::class, self::get_group_sequence($this::class) . $instance->get_identifier());
    }

    /**
     * Saves the given value to sequences.
     *
     * @param string $key
     *
     * @param string $value
     *
     * @return void
     */
    static protected function put_sequence(string $key, string $value): void
    {
        self::$sequences->put($key, $value);
    }

    /**
     * Checks if the given key contained in sequences.
     *
     * @param string $key
     *
     * @return bool
     */
    static public function has_sequence(string $key): bool
    {
        return self::$sequences->has($key);
    }

    /**
     * Returns sequence of the group by the given class name.
     *
     * @param RouteGroup|string $group
     *
     * @return string
     */
    static public function get_group_sequence(RouteGroup | string $group): string
    {
        return self::$sequences->get($group);
    }

    /**
     * Returns sequence of the request by the given class name.
     *
     * @param RouteRequest|string $request
     *
     * @return string
     */
    static public function get_request_sequence(RouteRequest | string $request): string
    {
        return self::$sequences->get($request);
    }

    /**
     * Returns sequence by the given class name.
     *
     * @param RouteRequest|RouteGroup|string $class
     *
     * @return string
     */
    static public function get_sequence(RouteRequest | RouteGroup | string $class): string
    {
        return self::$sequences->get($class);
    }

    /**
     * Checks if the current sequence matches one of the routes.
     *
     * @param RouteRequest|RouteGroup|string $class
     *
     * @param bool $is_base - If equal true - removes last sequence.
     *
     * @return bool
     */
    static public function is_route(RouteRequest | RouteGroup | string $class, bool $is_base = false): bool
    {
        $pattern = self::get_sequence($class);

        if (self::is_group($class))
        {
            $pattern = postfix($pattern, CharsClassifiers::ALL_DESIGNATE);

            return is_route($pattern);
        }

        if ($is_base)
        {
            $pattern = preg_replace('/\.[^.]*$/', '', $pattern);
        }

        return is_route($pattern) || is_route(postfix($pattern, CharsClassifiers::ALL_DESIGNATE));
    }

    /**
     * Checks if the given class is subclass of the current class.
     *
     * @param string $class
     *
     * @return string
     */
    static public function is_group(string $class): string
    {
        return is_subclass_of($class, self::class);
    }

    /**
     * Returns the route url to route by the given class name.
     *
     * @param RouteRequest|RouteGroup|string $class
     *
     * @param array $parameters
     *
     * @return string
     */
    static public function get_route(RouteRequest | RouteGroup | string $class, array $parameters = []): string
    {
        return route(self::get_sequence($class), $parameters);
    }

    /**
     * Sets the given value to the identifier.
     *
     * @param string $value
     *
     * @return void
     */
    protected function set_identifier(string $value): void
    {
        $this->identifier = $value;
    }

    /**
     * Returns prefix.
     *
     * @return string
     */
    protected function get_prefix(): string
    {
        return $this->identifier;
    }

    /**
     * Returns name with special delimiter.
     *
     * @return string
     */
    protected function get_name(): string
    {
        return $this->identifier . CharsClassifiers::LARAVEL_DELIMITER;
    }
}
