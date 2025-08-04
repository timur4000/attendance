<?php

namespace App\ApiRequestSettings\Data\Presence\Latecomers;

use App\ApiRequestSettings\Data\Presence\PresenceApiRequestSettings;
use App\Standards\ApiRequests\Classifiers\ApiRequestDataTypesClassifier;

/**
 * Contains all possible base settings of the latecomers requests.
 */
class ScaLatecomersApiRequestSettings extends PresenceApiRequestSettings
{
    public function __construct()
    {
        $this->type_request = ApiRequestDataTypesClassifier::SCA_LATECOMERS;

        $this->date = date('Y-m-d');
    }
}
