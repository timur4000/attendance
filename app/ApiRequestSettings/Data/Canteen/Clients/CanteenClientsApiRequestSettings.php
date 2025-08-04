<?php

namespace App\ApiRequestSettings\Data\Canteen\Clients;

use App\Managers\Date\DateManager;
use App\Standards\ApiRequests\Classifiers\ApiRequestDataTypesClassifier;
use App\Standards\ApiRequestSettings\Abstracts\ApiRequestSettings;
use App\Standards\Attributes\Requests\RequestKeyAttribute;
use App\Standards\Classifiers\Date\DateFormatsClassifier;

/**
 * Contains all possible base settings of the canteen clients requests.
 */
class CanteenClientsApiRequestSettings extends ApiRequestSettings
{
    #[RequestKeyAttribute('DateStart')]
    public string $date_start = '';

    #[RequestKeyAttribute('DateEnd')]
    public string $date_end = '';

    #[RequestKeyAttribute('IdUser')]
    public int $id_user = 0;

    #[RequestKeyAttribute('UserBarcode')]
    public string $user_barcode = '';

    #[RequestKeyAttribute('SurName')]
    public string $sur_name = '';

    #[RequestKeyAttribute('FirstName')]
    public string $first_name = '';

    #[RequestKeyAttribute('CountOnly')]
    public int $count_only = 0;

    #[RequestKeyAttribute('Limit')]
    public int $limit = 0;

    #[RequestKeyAttribute('Offset')]
    public int $offset = 0;

    public function __construct()
    {
        $this->type_request = ApiRequestDataTypesClassifier::LIST_OF_CANTEEN_CLIENTS;

        $this->date_end = DateManager::datetime(DateFormatsClassifier::Y_m_d);
    }
}
