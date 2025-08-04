<?php

namespace App\ApiModels\Reports\Canteen;

use App\ApiModels\Traits\Reports\Canteen\ReportCanteenProperties;
use App\ApiModels\Traits\Reports\Canteen\ReportCanteenUserProperties;
use App\Standards\ApiModels\Abstracts\ApiModel;

/**
 * Implements model instance for report canteen one day response.
 */
class ReportCanteenOneDayApiModel extends ApiModel
{
    use ReportCanteenUserProperties, ReportCanteenProperties;
}
