<?php

namespace App\Handlers\Admin\Prices\Food;

use App\ApiModels\Prices\Food\FoodsApiModel;
use App\ApiModels\Prices\Invoices\InvoicesApiModel;
use App\ApiRequests\Data\Prices\Food\FoodSelectApiRequest;
use App\ApiRequests\Data\Prices\Food\FoodUpdateApiRequest;
use App\ApiRequestSettings\Data\Prices\Food\FoodApiRequestSettings;
use App\ApiRequestSettings\Data\Prices\Food\FoodUpdateApiRequestSettings;
use App\Standards\ApiModels\Abstracts\ApiModel;
use App\Standards\Handlers\Abstracts\Handler;
use Illuminate\Support\Collection;

/**
 * Implements helper work with the food.
 */
class FoodHandler extends Handler
{
    /**
     * Returns all records by the given settings.
     *
     * @param FoodApiRequestSettings|null $settings
     *
     * @return Collection
     */
    public static function records(? FoodApiRequestSettings $settings = null): Collection
    {
        $settings ??= new FoodApiRequestSettings();

        $request = new FoodSelectApiRequest($settings);

        $request->execute();

        return ApiModel::create($request->get_response()->package, FoodsApiModel::class);
    }

    /**
     * Updates record and returns it.
     *
     * @param FoodUpdateApiRequestSettings $settings
     *
     * @return InvoicesApiModel
     */
    public static function update(FoodUpdateApiRequestSettings $settings): InvoicesApiModel
    {
        $request = new FoodUpdateApiRequest($settings);

        $request->execute();

        return ApiModel::create_one($request->get_response()->first_package(), InvoicesApiModel::class);
    }
}
