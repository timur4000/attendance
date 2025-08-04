<?php

namespace App\Handlers\Admin\ScaReportAttendanceOneUser;

use App\ApiModels\ScaReportAttendanceOneUser\ScaReportAttendanceOneUserApiModel;
use App\ApiModels\ScaUsers\ScaUserApiModel;
use App\ApiRequests\Data\ScaReportAttendanceOneUser\ScaReportAttendanceOneUserApiRequest;
use App\ApiRequestSettings\Data\ScaReportAttendanceOneUser\ScaReportAttendanceOneUserApiRequestSettings;
use App\Standards\ApiModels\Abstracts\ApiModel;
use App\Standards\Handlers\Abstracts\Handler;
use Illuminate\Support\Collection;

/**
 * Implements help work with the sca report attendace une user information.
 */
class ScaReportAttendanceOneUserHandler extends Handler
{
    /**
     * Returns records.
     *
     * @param ScaReportAttendanceOneUserApiRequestSettings|null $settings
     *
     * @return Collection<ScaUserApiModel>
     */
    public static function records(? ScaReportAttendanceOneUserApiRequestSettings $settings = null): Collection
    {
        $settings ??= new ScaReportAttendanceOneUserApiRequestSettings();

        $request = new ScaReportAttendanceOneUserApiRequest($settings);

        $request->execute();

        return ApiModel::create($request->get_response()->package, ScaReportAttendanceOneUserApiModel::class);
    }

    /**
     * Returns records.
     *
     * @param int $id
     * 
     * @param ScaReportAttendanceOneUserApiRequestSettings|null $settings
     *
     * @return ScaReportAttendanceOneUserApiModel
     */
    public static function record(int $id, ? ScaReportAttendanceOneUserApiRequestSettings $settings = null): ScaReportAttendanceOneUserApiModel
    {
        $settings ??= new ScaReportAttendanceOneUserApiRequestSettings();

        $settings->id_user = $id;

        $request = new ScaReportAttendanceOneUserApiRequest($settings);

        $request->execute();

        return ApiModel::create_one($request->get_response()->first_package(), ScaReportAttendanceOneUserApiModel::class);
    }
}
