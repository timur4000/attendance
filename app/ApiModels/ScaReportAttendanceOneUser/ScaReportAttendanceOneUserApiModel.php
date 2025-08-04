<?php

namespace App\ApiModels\ScaReportAttendanceOneUser;

use App\Standards\ApiModels\Abstracts\ApiModel;
use App\Standards\ApiModels\Attributes\ApiModelResponseKeyAttribute;

/**
 * Implements model instance for sca report attendance user one response.
 */
class ScaReportAttendanceOneUserApiModel extends ApiModel
{
    #[ApiModelResponseKeyAttribute('Date')]
    public string $date;

    #[ApiModelResponseKeyAttribute('UserFullName')]
    public string $user_full_name;

    #[ApiModelResponseKeyAttribute('IsOnTime')]
    public bool $is_on_time;

    #[ApiModelResponseKeyAttribute('IsLate')]
    public bool $is_late;

    #[ApiModelResponseKeyAttribute('IsAbsent')]
    public bool $is_absent;

    #[ApiModelResponseKeyAttribute('IsAtWork')]
    public bool $is_at_work;

    #[ApiModelResponseKeyAttribute('IsPermittedAbsent')]
    public bool $is_permitted_absent;

    #[ApiModelResponseKeyAttribute('IsOnTimeAsInteger')]
    public int $is_on_time_as_integer;

    #[ApiModelResponseKeyAttribute('IsLateAsInteger')]
    public int $is_late_as_integer;

    #[ApiModelResponseKeyAttribute('IsAbsentAsInteger')]
    public int $is_absent_as_integer;

    #[ApiModelResponseKeyAttribute('IsAtWorkAsInteger')]
    public int $is_at_work_as_integer;

    #[ApiModelResponseKeyAttribute('FirstEnter')]
    public string $first_enter;

    #[ApiModelResponseKeyAttribute('LastEnter')]
    public string $last_enter;

    #[ApiModelResponseKeyAttribute('LastExit')]
    public string $last_exit;

    #[ApiModelResponseKeyAttribute('TimeAtWork')]
    public string $time_at_work;

    #[ApiModelResponseKeyAttribute('CountEnter')]
    public int $count_enter;

    #[ApiModelResponseKeyAttribute('CountExit')]
    public int $count_exit;
}
