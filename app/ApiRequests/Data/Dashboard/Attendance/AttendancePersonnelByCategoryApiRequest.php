<?php

namespace App\ApiRequests\Data\Dashboard\Attendance;

use App\ApiRequests\Data\DataApiRequest;
use App\ApiRequestSettings\Data\Dashboard\Attendance\AttendancePersonnelByCategoryApiRequestSettings;

/**
 * Implements request for the data of the users attendance by category.
 */
class AttendancePersonnelByCategoryApiRequest extends DataApiRequest
{
    public function __construct(AttendancePersonnelByCategoryApiRequestSettings $settings)
    {
        parent::__construct($settings);
    }
}
