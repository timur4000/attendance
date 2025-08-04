<?php

namespace App\ApiRequestSettings\Data\Dashboard\Attendance;

use App\ApiModels\Dashboard\Attendance\AttendanceDataOneHour\AttendanceDataOneHourApiModel;
use App\ApiModels\Dashboard\Attendance\AttendanceDataOneHour\AttendanceSummaryDataOneHourApiModel;
use App\Standards\ApiRequestSettings\Abstracts\ApiRequestSettings;
use App\Standards\Attributes\Requests\RequestKeyAttribute;
use App\Standards\Classifiers\Date\DateFormatsClassifier;

/**
 * Contains all possible settings of the attendance data api request.
 */
class AttendanceDataApiRequestSettings extends ApiRequestSettings
{
    #[RequestKeyAttribute('Date')]
    public string $date = '';

    #[RequestKeyAttribute('IdUser')]
    public int $id_user = 0;

    #[RequestKeyAttribute('IdUnit')]
    public int $id_unit = 0;

    #[RequestKeyAttribute('IdPosition')]
    public int $id_position = 0;

    #[RequestKeyAttribute('IdCategory')]
    public int $id_category = 0;

    #[RequestKeyAttribute('SummaryData')]
    public int $summary_data = 0;

    public function __construct()
    {
        $this->date = date(DateFormatsClassifier::Y_m_d->value);
    }

    /**
     * Checks if the property summary_data is true.
     *
     * @return bool
     */
    function is_summary(): bool
    {
        return $this->summary_data;
    }

    /**
     * Returns namespace of required model by the summary_data property.
     *
     * @return string
     */
    function get_model(): string
    {
        return $this->is_summary() ? AttendanceSummaryDataOneHourApiModel::class : AttendanceDataOneHourApiModel::class;
    }
}
