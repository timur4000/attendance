<?php

namespace App\ApiRequestSettings\Data\Presence\Absent;

use App\ApiRequestSettings\Data\Presence\PresenceApiRequestSettings;
use App\Standards\ApiRequests\Classifiers\ApiRequestDataTypesClassifier;

/**
 * Contains all possible base settings of the absent requests.
 */
class ScaAbsentApiRequestSettings extends PresenceApiRequestSettings
{
    public function __construct()
    {
        $this->type_request = ApiRequestDataTypesClassifier::SCA_ABSENT;

        $this->date = date('Y-m-d');
    }
}
