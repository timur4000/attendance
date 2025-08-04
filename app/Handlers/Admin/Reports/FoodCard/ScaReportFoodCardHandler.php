<?php

namespace App\Handlers\Admin\Reports\FoodCard;

use App\ApiModels\Reports\FoodCard\ScaReportFoodCardApiModel;
use App\ApiModels\Reports\FoodCard\ScaReportFoodCardTotalsApiModel;
use App\ApiModels\ScaUsers\ScaUserApiModel;
use App\ApiRequests\Data\Reports\FoodCard\ScaReportFoodCardApiRequest;
use App\ApiRequestSettings\Data\Reports\FoodCard\ScaReportFoodCardApiRequestSettings;
use App\Standards\ApiModels\Abstracts\ApiModel;
use App\Standards\Callables\Accounting\ScaReportFoodCardReduceTotalsCallable;
use App\Standards\Handlers\Abstracts\Handler;
use Illuminate\Support\Collection;

/**
 * Implements help work with the sca report food card information.
 */
class ScaReportFoodCardHandler extends Handler
{
    /**
     * Returns records.
     *
     * @param ScaReportFoodCardApiRequestSettings|null $settings
     *
     * @return Collection<ScaUserApiModel>
     */
    public static function records(? ScaReportFoodCardApiRequestSettings $settings = null): Collection
    {
        $settings ??= new ScaReportFoodCardApiRequestSettings();

        $request = new ScaReportFoodCardApiRequest($settings);

        $request->execute();

        return ApiModel::create($request->get_response()->package, ScaReportFoodCardApiModel::class);
    }

    /**
     * Returns record.
     *
     * @param int $id_user
     *
     * @param ScaReportFoodCardApiRequestSettings|null $settings
     *
     * @return ScaUserApiModel
     */
    public static function record(int $id_user, ? ScaReportFoodCardApiRequestSettings $settings = null): ScaUserApiModel
    {
        $settings ??= new ScaReportFoodCardApiRequestSettings();

        $settings->id_user = $id_user;

        $request = new ScaReportFoodCardApiRequest($settings);

        $request->execute();

        return ApiModel::create_one($request->get_response()->first_package(), ScaReportFoodCardApiModel::class);
    }

    /**
     * Returns total of records.
     *
     * @param ScaReportFoodCardApiRequestSettings|null $settings
     *
     * @return int
     */
    public static function total(? ScaReportFoodCardApiRequestSettings $settings = null): int
    {
        if (!$settings)
        {
            $settings = new ScaReportFoodCardApiRequestSettings();
        }

        $settings->count_only = 1;

        $settings->limit = 0;

        $settings->offset = 0;

        $request = new ScaReportFoodCardApiRequest($settings);

        $request->execute();

        return $request->get_response()->message;
    }

    /**
     * Implements the accumulation of total values and returns them.
     *
     * @param ScaReportFoodCardApiRequestSettings|null $settings
     *
     * @return ScaReportFoodCardTotalsApiModel
     */
    public static function totals(? ScaReportFoodCardApiRequestSettings $settings = null): ScaReportFoodCardTotalsApiModel
    {
        $settings ??= new ScaReportFoodCardApiRequestSettings();

        $settings->limit = 0;

        $settings->offset = 0;

        $records = self::records($settings);

        return $records->reduce(new ScaReportFoodCardReduceTotalsCallable, new ScaReportFoodCardTotalsApiModel());
    }
}
