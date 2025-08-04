<?php

namespace App\ApiRequests\Data\Parameters;

use App\ApiRequests\Data\DataApiRequest;
use App\ApiRequestSettings\Data\Parameters\ParameterSelectApiRequestSettings;

/**
 * Implements request for data of the parameter api.
 */
class ParameterSelectApiRequest extends DataApiRequest
{
    public function __construct(ParameterSelectApiRequestSettings $settings)
    {
        parent::__construct($settings);
    }
}
