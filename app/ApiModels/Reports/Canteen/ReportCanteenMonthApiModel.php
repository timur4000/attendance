<?php

namespace App\ApiModels\Reports\Canteen;

use App\ApiModels\Traits\Reports\Canteen\ReportCanteenMonthProperties;
use App\ApiModels\Traits\Reports\Canteen\ReportCanteenProperties;
use App\Standards\ApiModels\Abstracts\ApiModel;

/**
 * Implements model instance for report canteen month response.
 */
class ReportCanteenMonthApiModel extends ApiModel
{
    use ReportCanteenMonthProperties, ReportCanteenProperties;
}
