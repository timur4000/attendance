<?php

namespace App\ApiRequests\Data\Reports\Canteen;

use App\ApiRequests\Data\DataApiRequest;
use App\ApiRequestSettings\Data\Reports\Canteen\Months\ReportCanteenOneMonthApiRequestSettings;

/**
 * Implements request for the data of the report canteen one month.
 */
class ReportCanteenOneMonthApiRequest extends DataApiRequest
{
    public function __construct(ReportCanteenOneMonthApiRequestSettings $settings)
    {
        parent::__construct($settings);
    }
}
