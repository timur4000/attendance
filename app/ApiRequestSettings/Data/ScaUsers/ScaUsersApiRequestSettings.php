<?php

namespace App\ApiRequestSettings\Data\ScaUsers;

use App\ApiModels\ScaUsers\ScaUserApiModel;
use App\ApiRequestSettings\Data\Users\UsersApiRequestSettings;
use App\Standards\ApiRequests\Classifiers\ApiRequestDataTypesClassifier;
use App\Standards\Attributes\Processes\ValueProcessAttribute;
use App\Standards\Attributes\Requests\RequestKeyAttribute;
use App\Standards\Callables\ApiRequestSettings\OrderByArrayToString;

/**
 * Contains all possible base settings of the sca users requests.
 */
class ScaUsersApiRequestSettings extends UsersApiRequestSettings
{
    #[RequestKeyAttribute('SurName')]
    public string $sur_name = '';

    #[RequestKeyAttribute('FirstName')]
    public string $first_name = '';

    #[RequestKeyAttribute('UserRfid')]
    public string $user_rfid = '';

    #[RequestKeyAttribute('UserBarcode')]
    public string $user_barcode = '';

    #[RequestKeyAttribute('CountOnly')]
    public int $count_only = 0;

    #[RequestKeyAttribute('Limit')]
    public int $limit = 0;

    #[RequestKeyAttribute('Offset')]
    public int $offset = 0;

    #[RequestKeyAttribute('OrderBy')]
    #[ValueProcessAttribute(new OrderByArrayToString(ScaUserApiModel::class))]
    public array $order_by = [];

    public function __construct()
    {
        $this->type_request = ApiRequestDataTypesClassifier::SCA_USER_SELECT;
    }
}
