<?php

namespace App\ApiRequestSettings\Data\Rfid\RegistrationRecords;

use App\Standards\ApiRequests\Classifiers\ApiRequestDataTypesClassifier;
use App\Standards\ApiRequestSettings\Abstracts\ApiRequestSettings;
use App\Standards\Attributes\Requests\RequestKeyAttribute;

/**
 * Contains all possible settings of the registration records api requests.
 */
class RegistrationRecordsApiRequestSettings extends ApiRequestSettings
{
    #[RequestKeyAttribute('IdUser')]
    public int $id_user = 0;

    #[RequestKeyAttribute('IdRow')]
    public int $id_row = 0;

    #[RequestKeyAttribute('NumberOfRecords')]
    public int $number_of_records = 0;

    #[RequestKeyAttribute('RfidTag')]
    public string $rfid_tag = '';

    #[RequestKeyAttribute('DateStart')]
    public string $date_start = '';

    #[RequestKeyAttribute('DateEnd')]
    public string $date_end = '';

    public function __construct()
    {
        $this->type_request = ApiRequestDataTypesClassifier::REGISTRATION_RECORDS;
    }
}
