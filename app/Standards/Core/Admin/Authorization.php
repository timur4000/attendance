<?php

namespace App\Standards\Core\Admin;

use App\ApiModels\AdministratorApiModel;
use App\Standards\Classifiers\Sessions\SessionNamesClassifier;
use App\Standards\Core\Core;
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
     * Checks if the current user is an authorized.
     *
     * @return bool
     */
    public function is_authorized(): bool
    {
        return Session::has(SessionNamesClassifier::authorization->name);
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
    }

    /**
     * Saves the given user information in to session.
     *
     * @return string
     */
    private function get(): string
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
    }
}
