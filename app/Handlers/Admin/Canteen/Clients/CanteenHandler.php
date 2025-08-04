<?php

namespace App\Handlers\Admin\Canteen\Clients;

use App\ApiModels\Canteen\Clients\CanteenClientsApiModel;
use App\ApiModels\StandardResponse\StandardResponseApiModel;
use App\ApiRequests\Data\Canteen\Clients\CanteenClientsApiRequest;
use App\ApiRequestSettings\Data\Canteen\Clients\CanteenClientsApiRequestSettings;
use App\Standards\ApiModels\Abstracts\ApiModel;
use App\Standards\Handlers\Abstracts\Handler;
use Illuminate\Support\Collection;

/**
 * Implements help work with the report canteen one day information.
 */
class CanteenHandler extends Handler
{
    /**
     * Returns records of clients.
     *
     * @param CanteenClientsApiRequestSettings|null $settings
     *
     * @return StandardResponseApiModel
     */
    public static function clients(? CanteenClientsApiRequestSettings $settings = null): StandardResponseApiModel
    {
        $settings ??= new CanteenClientsApiRequestSettings();

        $request = new CanteenClientsApiRequest($settings);

        $request->execute();

        return $request->get_response();
    }

    /**
     * Returns total of the records of clients.
     *
     * @param CanteenClientsApiRequestSettings|null $settings
     *
     * @return StandardResponseApiModel
     */
    public static function clients_total(? CanteenClientsApiRequestSettings $settings = null): StandardResponseApiModel
    {
        $settings ??= new CanteenClientsApiRequestSettings();

        $settings->count_only = 1;

        $settings->limit = 0;

        $settings->offset = 0;

        $request = new CanteenClientsApiRequest($settings);

        $request->execute();

        return $request->get_response();
    }

    /**
     * Creates instance of the ApiModel by the given records.
     *
     * @param array $records
     *
     * @param bool $is_collection
     *
     * @return Collection|CanteenClientsApiModel
     */
    public static function create(array $records, bool $is_collection = false): Collection | CanteenClientsApiModel
    {
        return $is_collection ? ApiModel::create($records, CanteenClientsApiModel::class) : ApiModel::create_one($records, CanteenClientsApiModel::class);
    }
}
