<?php

namespace App\ApiRequests\Data\Presences\Latecomers;

use App\ApiRequests\Data\DataApiRequest;
use App\ApiRequestSettings\Data\Presence\Latecomers\ScaLatecomersApiRequestSettings;

/**
 * Implements request for the data of the latecomers.
 */
class ScaLatecomersApiRequest extends DataApiRequest
{
    public function __construct(ScaLatecomersApiRequestSettings $settings)
    {
        parent::__construct($settings);
    }
}
