<?php

namespace App\ApiModels\Dashboard\Attendance\AttendanceDataOneHour;

use App\ApiModels\Traits\Dashboard\AttendanceBaseProperties;
use App\Standards\ApiModels\Abstracts\ApiModel;

/**
 * Implements model instance for the attendance summary data one hour response.
 */
class AttendanceSummaryDataOneHourApiModel extends ApiModel
{
    use AttendanceBaseProperties;

    /**
     * Returns empty record with the given date and hour.
     *
     * @param string $date
     *
     * @param int $hour
     *
     * @return self
     */
    public static function get_empty_record(string $date, int $hour): self
    {
        $record = new self([]);

        $record->date = date($date);

        $record->hour = $hour;

        $record->id_position = 0;

        $record->id_category = 0;

        $record->count_enter = 0;

        $record->count_exit = 0;

        $record->count_seconds = 0;

        return $record;
    }
}
