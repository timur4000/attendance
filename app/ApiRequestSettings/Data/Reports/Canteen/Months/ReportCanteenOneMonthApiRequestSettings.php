<?php

namespace App\ApiRequestSettings\Data\Reports\Canteen\Months;

use App\Standards\ApiRequests\Classifiers\ApiRequestDataTypesClassifier;

/**
 * Contains all possible base settings of the report canteen one month requests.
 */
class ReportCanteenOneMonthApiRequestSettings extends ReportCanteenMonthsApiRequestSettings
{
    public function __construct()
    {
        parent::__construct();

        $this->type_request = ApiRequestDataTypesClassifier::SCA_REPORT_CANTEEN_ONE_MONTH;
    }
}
