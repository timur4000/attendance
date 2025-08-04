<?php

namespace App\ApiRequestSettings\Data\Reports\Canteen\Days;

use App\Standards\ApiRequests\Classifiers\ApiRequestDataTypesClassifier;

/**
 * Contains all possible base settings of the report canteen two days requests.
 */
class ReportCanteenTwoDaysApiRequestSettings extends ReportCanteenDaysApiRequestSettings
{
    public function __construct()
    {
        $this->type_request = ApiRequestDataTypesClassifier::SCA_REPORT_CANTEEN_TWO_DAYS;
    }
}
