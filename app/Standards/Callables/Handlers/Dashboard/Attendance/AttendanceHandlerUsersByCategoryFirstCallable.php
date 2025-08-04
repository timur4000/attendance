<?php

namespace App\Standards\Callables\Handlers\Dashboard\Attendance;

use App\ApiModels\Dashboard\Attendance\AttendancePersonnelByCategoryApiModel;
use App\Handlers\Admin\Dashboard\Attendance\AttendanceHandler;

/**
 * TODO: Need creating settings for the special array keys.
 *
 * Implements callable for the first of the users by category method.
 *
 * @see AttendanceHandler::users_by_categories
 */
class AttendanceHandlerUsersByCategoryFirstCallable
{
    /**
     * @var string
     */
    private string $code_category;

    public function __construct(string $code_category)
    {
        $this->code_category = $code_category;
    }

    /**
     * @param AttendancePersonnelByCategoryApiModel $record
     *
     * @param int $index
     *
     * @return bool
     */
    public function __invoke(AttendancePersonnelByCategoryApiModel $record, int $index): bool
    {
        return $record->code_category === $this->code_category;
    }
}
