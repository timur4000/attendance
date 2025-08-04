<?php

namespace App\Exports\FoodCard;

use App\Handlers\Admin\Food\FoodCard\FoodCardHandler;
use App\Standards\Exports\Abstracts\TablesCollectionExport;
use Illuminate\Support\Collection;

/**
 * Implements exports food card history records.
 */
class FoodCardHistoryExport extends TablesCollectionExport
{
    /**
     * @inheritDoc
     */
    public function set_collection(): Collection
    {
        return FoodCardHandler::history(request()->input('id_user'));
    }
}
