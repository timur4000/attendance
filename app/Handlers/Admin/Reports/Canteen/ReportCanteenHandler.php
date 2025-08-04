<?php

namespace App\Handlers\Admin\Reports\Canteen;

use App\ApiModels\Reports\Canteen\ReportCanteenOneDayApiModel;
use App\ApiModels\Reports\Canteen\ReportCanteenMonthApiModel;
use App\ApiModels\StandardResponse\StandardResponseApiModel;
use App\ApiRequests\Data\Reports\Canteen\ReportCanteenOneDayApiRequest;
use App\ApiRequests\Data\Reports\Canteen\ReportCanteenOneMonthApiRequest;
use App\ApiRequests\Data\Reports\Canteen\ReportCanteenTwoDaysApiRequest;
use App\ApiRequests\Data\Reports\Canteen\ReportCanteenTwoMonthsSumApiRequest;
use App\ApiRequestSettings\Data\Reports\Canteen\Days\ReportCanteenOneDayApiRequestSettings;
use App\ApiRequestSettings\Data\Reports\Canteen\Days\ReportCanteenTwoDaysApiRequestSettings;
use App\ApiRequestSettings\Data\Reports\Canteen\Months\ReportCanteenOneMonthApiRequestSettings;
use App\ApiRequestSettings\Data\Reports\Canteen\Months\ReportCanteenTwoMonthsSumApiRequestSettings;
use App\Standards\ApiModels\Abstracts\ApiModel;
use App\Standards\Handlers\Abstracts\Handler;
use Illuminate\Support\Collection;

/**
 * Implements help work with the report canteen one day information.
 */
class ReportCanteenHandler extends Handler
{
    /**
     * Returns report for each day of the specified month.
     *
     * @param ReportCanteenOneMonthApiRequestSettings|null $settings
     *
     * @return StandardResponseApiModel
     */
    public static function one_month(? ReportCanteenOneMonthApiRequestSettings $settings = null): StandardResponseApiModel
    {
        $settings ??= new ReportCanteenOneMonthApiRequestSettings();

        $request = new ReportCanteenOneMonthApiRequest($settings);

        $request->execute();

        return $request->get_response();
    }

    /**
     * Returns summary report of the specified and last months.
     *
     * @param ReportCanteenTwoMonthsSumApiRequestSettings|null $settings
     *
     * @return StandardResponseApiModel
     */
    public static function two_months_sum(? ReportCanteenTwoMonthsSumApiRequestSettings $settings = null): StandardResponseApiModel
    {
        $settings ??= new ReportCanteenTwoMonthsSumApiRequestSettings();

        $request = new ReportCanteenTwoMonthsSumApiRequest($settings);

        $request->execute();

        return $request->get_response();
    }

    /**
     * Returns summary report of the specified day.
     *
     * @param ReportCanteenOneDayApiRequestSettings|null $settings
     *
     * @return StandardResponseApiModel
     */
    public static function one_day(? ReportCanteenOneDayApiRequestSettings $settings = null): StandardResponseApiModel
    {
        $settings ??= new ReportCanteenOneDayApiRequestSettings();

        $request = new ReportCanteenOneDayApiRequest($settings);

        $request->execute();

        return $request->get_response();
    }

    /**
     * Returns summary report of the specified and last day.
     *
     * @param ReportCanteenTwoDaysApiRequestSettings|null $settings
     *
     * @return StandardResponseApiModel
     */
    public static function two_days(? ReportCanteenTwoDaysApiRequestSettings $settings = null): StandardResponseApiModel
    {
        $settings ??= new ReportCanteenTwoDaysApiRequestSettings();

        $request = new ReportCanteenTwoDaysApiRequest($settings);

        $request->execute();

        return $request->get_response();
    }

    /**
     * Creates a day model instances by specified records.
     *
     * @param array $records
     * @param bool $is_collection
     *
     * @return Collection|ReportCanteenOneDayApiModel
     */
    public static function create_model_days(array $records, bool $is_collection = true): Collection | ReportCanteenOneDayApiModel
    {
        $method = $is_collection ? 'create' : 'create_one';

        return ApiModel::{ $method }($records, ReportCanteenOneDayApiModel::class);
    }

    /**
     * Creates a month model instances by specified records.
     *
     * @param array $records
     * @param bool $is_collection
     *
     * @return Collection|ReportCanteenMonthApiModel
     */
    public static function create_model_months(array $records, bool $is_collection = true): Collection | ReportCanteenMonthApiModel
    {
        $method = $is_collection ? 'create' : 'create_one';

        return ApiModel::{ $method }($records, ReportCanteenMonthApiModel::class);
    }
}
