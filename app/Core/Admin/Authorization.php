<?php

namespace App\Core\Admin;

use App\Core\Core;
use App\ApiModels\Administrator\AdministratorApiModel;
use App\Handlers\Admin\AdminRoles\AdminRolesHandler;
use App\Standards\Classifiers\Cookies\CookiesNamesClassifier;
use App\Standards\Classifiers\Http\HttpMethodsClassifiers;
use App\Standards\Classifiers\Sessions\SessionNamesClassifier;
use App\Standards\RouteGroups\Abstracts\RouteGroup;
use App\Standards\RouteRequests\Abstracts\RouteRequest;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Session;

/**
 * Implements core logic of admin authorization by Singleton pattern.
 */
class Authorization extends Core
{
    /**
     * Contains instance of current class.
     *
     * @var Authorization
     */
    static private Authorization $instance;

    /**
     * Contains instance of user api model class.
     *
     * @var AdministratorApiModel|null
     */
    static private AdministratorApiModel | null $user_api_model;

    private function __construct()
    {
        self::$instance = $this;
    }

    /**
     * Returns an instance if then exist, or creates new and returns.
     *
     * @return Authorization
     */
    static public function get_instance(): Authorization
    {
        if (isset(self::$instance))
        {
            return self::$instance;
        }

        return new Authorization();
    }

    /**
     * Implements log in for given user.
     *
     * @param AdministratorApiModel $user
     *
     * @return bool
     */
    public function login(AdministratorApiModel $user): bool
    {
        if ($this->is_authorized())
        {
            return false;
        }

        $this->save($user);

        return true;
    }

    /**
     * Implements log out for current user.
     *
     * @return bool
     */
    public function logout(): bool
    {
        if (!$this->is_authorized())
        {
            return false;
        }

        $this->remove();
        
        return true;
    }

    /**
     * Returns object of current user.
     *
     * @return AdministratorApiModel|null
     */
    public function user(): AdministratorApiModel | null
    {
        if (isset(self::$user_api_model))
        {
            return self::$user_api_model;
        }

        if (!$this->is_authorized())
        {
            return null;
        }

        $values = json_decode($this->get(), true);

        self::$user_api_model = new AdministratorApiModel($values);

        return self::$user_api_model;
    }

    /**
     * Returns id of current user.
     *
     * @return int
     */
    public function id(): int
    {
        return $this->user()->id_user;
    }

    /**
     * Checks if the current user is an authorized.
     *
     * @return bool
     */
    public function is_authorized(): bool
    {
        return Session::has(SessionNamesClassifier::authorization->name);
    }

    /**
     * Returns the refresh key property.
     *
     * @return string
     */
    public function get_refresh_key(): string
    {
        return $this->user()->refresh_key;
    }

    /**
     * Updates the user information by the given values.
     *
     * @param array $values
     *
     * @return bool
     */
    public function update(array $values): bool
    {
        if (!$this->is_authorized())
        {
            return false;
        }

        $user = $this->user();

        $user->fill($values);

        $this->save($user);

        return true;
    }

    /**
     * Saves the given user information in to session.
     *
     * @param AdministratorApiModel $user
     *
     * @return void
     */
    private function save(AdministratorApiModel $user): void
    {
        Session::put(SessionNamesClassifier::authorization->name, json_encode($user));

        Session::save();

        self::$user_api_model = $user;
    }

    /**
     * Saves the given user information in to session.
     *
     * @return string
     */
    public function get(): string
    {
        if (!$this->is_authorized())
        {
            return '';
        }

        return Session::get(SessionNamesClassifier::authorization->name);
    }

    /**
     * Removes current user information from session.
     *
     * @return void
     */
    private function remove(): void
    {
        self::$user_api_model = null;

        Session::forget(SessionNamesClassifier::authorization->name);

        Cookie::queue(Cookie::forget(CookiesNamesClassifier::is_remember->name));
    }

    /**
     * Returns roles of the current user.
     *
     * @return Collection
     */
    public function get_roles(): Collection
    {
        return AdminRolesHandler::records_by_ids($this->user()->list_of_id_roles);
    }

    /**
     * Sets a value for a session.
     *
     * @param bool $force
     *
     * @return void
     */
    public function set_is_remember(bool $force): void
    {
        Session::put(SessionNamesClassifier::is_remember->name, $force);

        Session::save();
    }

    /**
     * Checks if the system should remember current session.
     *
     * @return bool
     */
    public function is_remember(): bool
    {
        return Session::get(SessionNamesClassifier::is_remember->name, false);
    }

    /**
     * Checks whether the user has viewing rights.
     *
     * @return bool
     */
    public function has_role(): bool
    {
        $records = $this->get_roles();

        foreach ($records as $record)
        {
            $permissions = $record->admin_permission_group->admin_permissions;

            foreach ($permissions as $permission)
            {
                $methods = $permission->http_methods->pluck('code');

                if ((
                    !empty($permission->custom_pattern)
                    && (Route::is($permission->custom_pattern)
                    || Route::is('*authorization*'))
                    || in_array(request()->route()->getName(), $permission->routes)
                    && $methods->isNotEmpty() && (in_array('ANY', $methods->toArray())
                    || $methods->intersect(request()->route()->methods())->isNotEmpty())
                ))
                {
                    return true;
                }
            }
        }

        return false;
    }

    /**
     * Checks whether the user has viewing rights to the given route.
     *
     * @param RouteRequest|string $route_request
     *
     * @param HttpMethodsClassifiers $http_method
     *
     * TODO: Needs check by methods.
     *
     * @return bool
     */
    public function has_permission_route(RouteRequest | string $route_request, HttpMethodsClassifiers $http_method = HttpMethodsClassifiers::GET): bool
    {
        foreach ($this->get_roles() as $role)
        {
            $permissions = $role->admin_permission_group->admin_permissions;

            foreach ($permissions as $permission)
            {
                if ((
                    !empty($permission->custom_pattern) && RouteGroup::has_sequence($route_request, $permission->custom_pattern)
                    || in_array(RouteGroup::get_sequence($route_request), $permission->routes)
                ))
                {
                    return true;
                }
            }
        }

        return false;
    }
}
