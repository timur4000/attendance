<?php

namespace App\Standards\Callables\Handlers\Dashboard\Attendance;

use App\ApiModels\Dashboard\Attendance\AttendancePersonnelByCategoryApiModel;
use App\Handlers\Admin\Dashboard\Attendance\AttendanceHandler;

/**
 * TODO: Need creating settings for the special array keys.
 *
 * Implements callable for the filter of the users by category method.
 *
 * @see AttendanceHandler::users_by_categories
 */
class AttendanceHandlerUsersByCategoryFilterCallable
{
    public function __invoke(AttendancePersonnelByCategoryApiModel $record, int $index): bool
    {
        $array = [ 'c_spec', 'c_teacher', 'c_student', 'c_total' ];

        return in_array($record->code_category, $array);
    }
}
