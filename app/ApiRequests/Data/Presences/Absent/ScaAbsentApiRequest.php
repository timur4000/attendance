<?php

namespace App\ApiRequests\Data\Presences\Absent;

use App\ApiRequests\Data\DataApiRequest;
use App\ApiRequestSettings\Data\Presence\Absent\ScaAbsentApiRequestSettings;

/**
 * Implements request for the data of the absent.
 */
class ScaAbsentApiRequest extends DataApiRequest
{
    public function __construct(ScaAbsentApiRequestSettings $settings)
    {
        parent::__construct($settings);
    }
}
