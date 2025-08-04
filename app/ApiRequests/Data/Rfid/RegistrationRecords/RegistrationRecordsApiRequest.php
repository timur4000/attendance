<?php

namespace App\ApiRequests\Data\Rfid\RegistrationRecords;

use App\ApiRequests\Data\DataApiRequest;
use App\ApiRequestSettings\Data\Rfid\RegistrationRecords\RegistrationRecordsApiRequestSettings;

/**
 * Implements request for the data of the registration records.
 */
class RegistrationRecordsApiRequest extends DataApiRequest
{
    public function __construct(RegistrationRecordsApiRequestSettings $settings)
    {
        parent::__construct($settings);
    }
}
