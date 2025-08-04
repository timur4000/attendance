<?php

namespace App\ApiRequests\Data\ScaReportAttendanceOneUser;

use App\ApiRequests\Data\DataApiRequest;
use App\ApiRequestSettings\Data\ScaReportAttendanceOneUser\ScaReportAttendanceOneUserApiRequestSettings;

/**
 * Implements request for the data of the sca report attendance one user.
 */
class ScaReportAttendanceOneUserApiRequest extends DataApiRequest
{
    public function __construct(ScaReportAttendanceOneUserApiRequestSettings $settings)
    {
        parent::__construct($settings);
    }
}
