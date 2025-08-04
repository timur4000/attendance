<?php

namespace App\Handlers\Admin\Dashboard;

use App\ApiRequestSettings\Data\Presence\Absent\ScaAbsentApiRequestSettings;
use App\ApiRequestSettings\Data\Presence\ArrivedOnTime\ScaArrivedOnTimeApiRequestSettings;
use App\ApiRequestSettings\Data\Presence\Latecomers\ScaLatecomersApiRequestSettings;
use App\Handlers\Admin\Presence\Absent\AbsentHandler;
use App\Handlers\Admin\Presence\ArrivedOnTime\ArrivedOnTimeHandler;
use App\Handlers\Admin\Presence\Latecomers\LatecomersHandler;
use App\Standards\Handlers\Abstracts\Handler;
use Illuminate\Http\Request;

/**
 * Implements help work with dashboard information.
 */
class DashboardHandler extends Handler
{
    /**
     * Returns array of sca latecomers/arrived/absent users total.
     *
     * @param Request $request
     *
     * @return array
     */
    public static function sca_presence_total(Request $request): array
    {
        return [ self::sca_latecomers_total($request), self::sca_arrived_on_time_total($request), self::sca_absent_total($request) ];
    }

    /**
     * Returns total of the latecomers.
     *
     * @param Request $request
     *
     * @return int
     */
    private static function sca_latecomers_total(Request $request): int
    {
        $settings = new ScaLatecomersApiRequestSettings();

        $settings->update($request->json()->all());

        return LatecomersHandler::total($settings);
    }

    /**
     * Returns total of the arrived on time.
     *
     * @param Request $request
     *
     * @return int
     */
    private static function sca_arrived_on_time_total(Request $request): int
    {
        $settings = new ScaArrivedOnTimeApiRequestSettings();

        $settings->update($request->json()->all());

        return ArrivedOnTimeHandler::total($settings);
    }

    /**
     * Returns total of the absent.
     *
     * @param Request $request
     *
     * @return int
     */
    private static function sca_absent_total(Request $request): int
    {
        $settings = new ScaAbsentApiRequestSettings();

        $settings->update($request->json()->all());

        return AbsentHandler::total($settings);
    }
}
