<?php

namespace App\ApiRequestSettings\Data\Reports\Canteen;

use App\Standards\ApiRequests\Classifiers\ApiRequestDataTypesClassifier;
use App\Standards\ApiRequestSettings\Abstracts\ApiRequestSettings;
use App\Standards\Attributes\Requests\RequestKeyAttribute;

/**
 * Contains all possible base settings of the report canteen one day requests.
 */
class ReportCanteenOneDayApiRequestSettings extends ApiRequestSettings
{
    #[RequestKeyAttribute('Date')]
    public string $date = '';

    #[RequestKeyAttribute('IdUser')]
    public int $id_user = 0;

    #[RequestKeyAttribute('IdCategory')]
    public int $id_category = 0;

    public function __construct()
    {
        $this->type_request = ApiRequestDataTypesClassifier::REPORT_CANTEEN_ONE_DAY;
    }
}
