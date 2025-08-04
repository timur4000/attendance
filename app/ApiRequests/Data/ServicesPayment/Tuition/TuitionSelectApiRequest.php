<?php

namespace App\ApiRequests\Data\ServicesPayment\Tuition;

use App\ApiRequests\Data\DataApiRequest;
use App\ApiRequestSettings\Data\ServicesPayment\Tuition\TuitionApiRequestSettings;

/**
 * Implements request for data of the tuition api.
 */
class TuitionSelectApiRequest extends DataApiRequest
{
    public function __construct(TuitionApiRequestSettings $settings)
    {
        parent::__construct($settings);
    }
}
