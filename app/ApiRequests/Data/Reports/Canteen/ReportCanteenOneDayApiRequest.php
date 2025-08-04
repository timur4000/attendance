<?php

namespace App\ApiRequests\Data\Reports\Canteen;

use App\ApiRequests\Data\DataApiRequest;
use App\ApiRequestSettings\Data\Reports\Canteen\Days\ReportCanteenOneDayApiRequestSettings;

/**
 * Implements request for the data of the report canteen one day.
 */
class ReportCanteenOneDayApiRequest extends DataApiRequest
{
    public function __construct(ReportCanteenOneDayApiRequestSettings $settings)
    {
        parent::__construct($settings);
    }
}
