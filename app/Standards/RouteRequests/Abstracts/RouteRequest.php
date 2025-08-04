<?php

namespace App\Standards\RouteRequests\Abstracts;

use App\Standards\Classifiers\Chars\CharsClassifiers;
use App\Standards\Classifiers\Middlewares\MiddlewareClassifiers;
use App\Standards\Classifiers\Routes\RouteMethodsClassifiers;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Route;

/**
 * Implements abstract logic for the route request class.
 */
abstract class RouteRequest
{
    /**
     * Contains the unique identifier for name and url of the route.
     *
     * @var string
     */
    private string $identifier;

    /**
     * Contains url variables for request.
     *
     * @var Collection
     */
    private Collection $variables;

    /**
     * Contains ignored middlewares of the route request.
     *
     * @var Collection
     */
    private Collection $ignored_middlewares;

    /**
     * Contains the method name of the route.
     *
     * @var RouteMethodsClassifiers
     */
    private RouteMethodsClassifiers $method = RouteMethodsClassifiers::get;

    /**
     * Contains the action of the route.
     *
     * @var array
     */
    protected array $action;

    public function __construct()
    {
        $this->variables = new Collection();

        $this->ignored_middlewares = new Collection();
    }

    /**
     * Declares route request by all methods.
     *
     * @return void
     */
    public function declare(): void
    {
        Route::withoutMiddleware($this->ignored_middlewares->toArray())
            ->{ $this->method->name }($this->get_url(), $this->get_action())
            ->name($this->get_identifier());
    }

    /**
     * Returns processed url.
     *
     * @return string
     */
    private function get_url(): string
    {
        $identifier = preg_replace('/\\' . CharsClassifiers::LARAVEL_DELIMITER . '/', CharsClassifiers::URL_DELIMITER, $this->identifier);

        return CharsClassifiers::URL_DELIMITER . $identifier . $this->variables_to_string();
    }

    /**
     * Returns action property or callable method if exists.
     *
     * @return array|callable
     */
    public function get_action(): array | callable
    {
        return $this->action ?? $this->callable();
    }

    /**
     * Sets given value to the identifier.
     *
     * @param string $value
     *
     * @return string
     */
    public function set_identifier(string $value): string
    {
        return $this->identifier = $value;
    }

    /**
     * Returns identifier.
     *
     * @return string
     */
    public function get_identifier(): string
    {
        return $this->identifier;
    }

    /**
     * Returns callable for route request handle.
     *
     * @return callable
     */
    protected function callable(): callable
    {
        return fn () => false;
    }

    /**
     * Adds the given value to variables.
     *
     * @param string $value
     *
     * @return Collection
     */
    protected function add_variable(string $value): Collection
    {
        return $this
            ->variables
            ->push($value);
    }

    /**
     * Transforms variables to string
     *
     * @return string
     */
    protected function variables_to_string(): string
    {
        $implode = implode(CharsClassifiers::URL_DELIMITER, $this->variables->toArray());

        return CharsClassifiers::URL_DELIMITER . preg_replace('/[a-z_?]++/', '{$0}', $implode);
    }

    /**
     * Adds an ignored middleware to the route request.
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
     * Sets the given value to method.
     *
     * @param RouteMethodsClassifiers $method
     *
     * @return void
     */
    protected function set_method(RouteMethodsClassifiers $method): void
    {
        $this->method = $method;
    }
}
