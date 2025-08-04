<?php

namespace App\ApiRequestSettings\Data\Dashboard\Users;

use App\Standards\ApiRequests\Classifiers\ApiRequestDataTypesClassifier;
use App\Standards\ApiRequestSettings\Abstracts\ApiRequestSettings;
use App\Standards\Attributes\Requests\RequestKeyAttribute;

/**
 * Contains all possible settings of the attendance personnel by category api request.
 */
class AttendancePersonnelByCategoryApiRequestSettings extends ApiRequestSettings
{
    #[RequestKeyAttribute('date')]
    public string $date = '';

    public function __construct()
    {
        $this->type_request = ApiRequestDataTypesClassifier::ATTENDANCE_PERSONNEL_BY_CATEGORY;

        $this->date = date('Y-m-d H:i:s');
    }
}
