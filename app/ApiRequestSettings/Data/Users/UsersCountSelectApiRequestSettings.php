<?php

namespace App\ApiRequestSettings\Data\Users;

use App\Standards\ApiRequests\Classifiers\ApiRequestDataTypesClassifier;

/**
 * Contains all possible settings of the users count select api request.
 *
 * @deprecated
 */
class UsersCountSelectApiRequestSettings extends UsersApiRequestSettings
{
    public function __construct()
    {
        $this->type_request = ApiRequestDataTypesClassifier::USER_COUNT_SELECT;
    }
}
