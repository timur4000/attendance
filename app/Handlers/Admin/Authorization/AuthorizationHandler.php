<?php

namespace App\Handlers\Admin\Authorization;

use App\ApiModels\Administrator\AdministratorApiModel;
use App\ApiModels\StandardResponse\StandardResponseApiModel;
use App\ApiRequests\Authorization\AccessGetApiRequest;
use App\ApiRequests\Authorization\AccessRefreshApiRequest;
use App\Standards\Handlers\Abstracts\Handler;

/**
 * Implements help work with the authorization actions.
 */
class AuthorizationHandler extends Handler
{
    public static StandardResponseApiModel $response;

    /**
     * Returns the access response.
     *
     * @param string $username
     *
     * @param string $password
     *
     * @return StandardResponseApiModel
     */
    public static function access(string $username, string $password): StandardResponseApiModel
    {
        $request = new AccessGetApiRequest($username, $password);

        $request->execute();

        return self::$response = $request->get_response();
    }

    /**
     * Returns refresh response.
     *
     * @param string $refresh_token
     *
     * @return StandardResponseApiModel
     */
    public static function refresh(string $refresh_token): StandardResponseApiModel
    {
        $request = new AccessRefreshApiRequest($refresh_token);

        $request->execute();

        return $request->get_response();
    }

    /**
     * Returns the instance of the administrator model.
     *
     * @return AdministratorApiModel|null
     */
    public static function administrator(): AdministratorApiModel | null
    {
        if (empty(self::$response))
        {
            return null;
        }

        return new AdministratorApiModel(self::$response->first_package());
    }
}
