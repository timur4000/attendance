<?php

namespace App\ApiRequests\Data\Reports\Canteen;

use App\ApiRequests\Data\DataApiRequest;
use App\ApiRequestSettings\Data\Reports\Canteen\Days\ReportCanteenTwoDaysApiRequestSettings;

/**
 * Implements request for the data of the report canteen two days.
 */
class ReportCanteenTwoDaysApiRequest extends DataApiRequest
{
    public function __construct(ReportCanteenTwoDaysApiRequestSettings $settings)
    {
        parent::__construct($settings);
    }
}
