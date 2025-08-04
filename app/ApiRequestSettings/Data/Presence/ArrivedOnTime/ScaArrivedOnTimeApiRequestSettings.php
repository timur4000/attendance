<?php

namespace App\ApiRequestSettings\Data\Presence\ArrivedOnTime;

use App\ApiRequestSettings\Data\Presence\PresenceApiRequestSettings;
use App\Standards\ApiRequests\Classifiers\ApiRequestDataTypesClassifier;

/**
 * Contains all possible base settings of the arrived on time requests.
 */
class ScaArrivedOnTimeApiRequestSettings extends PresenceApiRequestSettings
{
    public function __construct()
    {
        $this->type_request = ApiRequestDataTypesClassifier::SCA_ARRIVED_ON_TIME;

        $this->date = date('Y-m-d');
    }
}
