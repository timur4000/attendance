<?php

namespace App\Standards\Callables\Handlers\Orders;

use App\Admin\Controllers\Canteen\Orders\OrdersController;
use App\ApiModels\Prices\Food\FoodsApiModel;
use App\ApiRequestSettings\Data\Pictures\ObjectPictureSelectApiRequestSettings;
use App\Handlers\Admin\Pictures\ObjectPicturesHandler;
use App\Standards\ApiRequests\Classifiers\PictureCodeEntityTypesClassifier;

/**
 * Implements callable for the map method for pictures adding.
 *
 * @see OrdersController::items_json
 */
class OrdersItemsPictureAddMapCallable
{
    /**
     * @param FoodsApiModel $record
     *
     * @param int $index
     *
     * @return FoodsApiModel
     */
    public function __invoke(FoodsApiModel $record, int $index): FoodsApiModel
    {
        $settings = new ObjectPictureSelectApiRequestSettings();

        $settings->code_entity = PictureCodeEntityTypesClassifier::FOOD;

        $settings->id_object = $record->id_object;

        $record->add_property('picture', ObjectPicturesHandler::get($settings));

        return $record;
    }
}
