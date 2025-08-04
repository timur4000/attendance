<?php

namespace App\ApiRequestSettings\Data\Users;

use App\Standards\ApiRequests\Classifiers\ApiRequestDataTypesClassifier;
use App\Standards\Attributes\Requests\RequestKeyAttribute;

/**
 * Contains all possible settings of the users select api request.
 */
class UsersSelectApiRequestSettings extends UsersApiRequestSettings
{
    #[RequestKeyAttribute('HasLogin')]
    public int $has_login = 0;

    #[RequestKeyAttribute('CountOnly')]
    public int $count_only = 0;

    #[RequestKeyAttribute('Limit')]
    public int $limit = 0;

    #[RequestKeyAttribute('Offset')]
    public int $offset = 0;

    public function __construct()
    {
        $this->type_request = ApiRequestDataTypesClassifier::USER_SELECT;
    }
}
