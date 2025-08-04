<?php

namespace App\ApiRequests\Data\Presences\ArrivedOnTime;

use App\ApiRequests\Data\DataApiRequest;
use App\ApiRequestSettings\Data\Presence\ArrivedOnTime\ScaArrivedOnTimeApiRequestSettings;

/**
 * Implements request for the data of the arrived on time.
 */
class ScaArrivedOnTimeApiRequest extends DataApiRequest
{
    public function __construct(ScaArrivedOnTimeApiRequestSettings $settings)
    {
        parent::__construct($settings);
    }
}
