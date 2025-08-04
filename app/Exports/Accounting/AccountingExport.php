<?php

namespace App\Exports\Accounting;

use App\ApiRequestSettings\Data\Reports\FoodCard\ScaReportFoodCardApiRequestSettings;
use App\Handlers\Admin\Reports\FoodCard\ScaReportFoodCardHandler;
use App\Standards\Exports\Abstracts\TablesCollectionExport;
use Illuminate\Support\Collection;
use ReflectionException;

/**
 * Implements export for the accounting records.
 */
class AccountingExport extends TablesCollectionExport
{
    /**
     * @return Collection
     *
     * @throws ReflectionException
     */
    protected function set_collection(): Collection
    {
        $settings = new ScaReportFoodCardApiRequestSettings();

        $settings->update(request()->all());

        return ScaReportFoodCardHandler::records($settings);
    }
}
