<?php

namespace App\ApiRequestSettings\Data\Reports\Canteen\Days;

use App\Standards\ApiRequests\Classifiers\ApiRequestDataTypesClassifier;

/**
 * Contains all possible base settings of the report canteen one day requests.
 */
class ReportCanteenOneDayApiRequestSettings extends ReportCanteenDaysApiRequestSettings
{
    public function __construct()
    {
        $this->type_request = ApiRequestDataTypesClassifier::SCA_REPORT_CANTEEN_ONE_DAY;
    }
}
