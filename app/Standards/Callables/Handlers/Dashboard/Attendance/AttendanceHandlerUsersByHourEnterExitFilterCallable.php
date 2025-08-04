<?php

namespace App\Standards\Callables\Handlers\Dashboard\Attendance;

use App\ApiModels\Dashboard\Attendance\AttendanceDataOneHour\AttendanceDataOneHourApiModel;
use App\Handlers\Admin\Dashboard\Attendance\AttendanceHandler;

/**
 * Implements callable for the filter method by the count enter/exit keys of the users by hour method.
 *
 * @see AttendanceHandler::attendance_users_by_hour
 */
class AttendanceHandlerUsersByHourEnterExitFilterCallable
{
    public function __invoke(AttendanceDataOneHourApiModel $record, int $index): bool
    {
        return !$record->is_enter_exit_empty();
    }
}
