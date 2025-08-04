<?php

namespace App\ApiRequests\Data\Reports\Canteen;

use App\ApiRequests\Data\DataApiRequest;
use App\ApiRequestSettings\Data\Reports\Canteen\Months\ReportCanteenTwoMonthsSumApiRequestSettings;

/**
 * Implements request for the data of the report canteen two months sum.
 */
class ReportCanteenTwoMonthsSumApiRequest extends DataApiRequest
{
    public function __construct(ReportCanteenTwoMonthsSumApiRequestSettings $settings)
    {
        parent::__construct($settings);
    }
}
