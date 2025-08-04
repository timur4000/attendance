<?php

namespace App\ApiRequestSettings\Data\Dashboard\Attendance;

use App\Standards\ApiRequests\Classifiers\ApiRequestDataTypesClassifier;
use App\Standards\ApiRequestSettings\Abstracts\ApiRequestSettings;
use App\Standards\Attributes\Requests\RequestKeyAttribute;
use App\Standards\Classifiers\Date\DateFormatsClassifier;

/**
 * Contains all possible settings of the attendance personnel by category api request.
 */
class AttendancePersonnelByCategoryApiRequestSettings extends ApiRequestSettings
{
    #[RequestKeyAttribute('Date')]
    public string $date = '';

    public function __construct()
    {
        $this->type_request = ApiRequestDataTypesClassifier::ATTENDANCE_PERSONNEL_BY_CATEGORY;

        $this->date = date(DateFormatsClassifier::Y_m_d->value);
    }
}
