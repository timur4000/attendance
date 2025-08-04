<?php

namespace App\Standards\Callables\Accounting;


use App\ApiModels\Reports\FoodCard\ScaReportFoodCardApiModel;
use App\ApiModels\Reports\FoodCard\ScaReportFoodCardTotalsApiModel;
use App\Standards\Callables\Interfaces\ICallable;

/**
 * Implements callable of responsible for aggregating the totals of food card reports.
 */
class ScaReportFoodCardReduceTotalsCallable implements ICallable
{
    /**
     * @param ScaReportFoodCardTotalsApiModel $totals
     *
     * @param ScaReportFoodCardApiModel $model
     *
     * @return ScaReportFoodCardTotalsApiModel
     */
    public function __invoke(ScaReportFoodCardTotalsApiModel $totals, ScaReportFoodCardApiModel $model): ScaReportFoodCardTotalsApiModel
    {
        $totals->mx_start += $model->mx_start;

        $totals->mx_plus += $model->mx_plus;

        $totals->mx_minus += $model->mx_minus;

        $totals->mx_purchase += $model->mx_purchase;

        $totals->mx_withdraw += $model->mx_withdraw;

        $totals->mx_diff += $model->mx_diff;

        $totals->mx_end += $model->mx_end;

        return $totals;
    }
}
