<?php

namespace App\Handlers\Admin\Rfid\DetectedRfidTags;

use App\ApiModels\Rfid\DetectedRfidTags\DetectedRfidTagsApiModel;
use App\ApiModels\StandardResponse\StandardResponseApiModel;
use App\ApiRequests\Data\Rfid\DetectedRfidTags\DetectedRfidTagsApiRequest;
use App\ApiRequestSettings\Data\Rfid\DetectedRfidTags\DetectedRfidTagsApiRequestSettings;
use App\Standards\ApiModels\Abstracts\ApiModel;
use App\Standards\Handlers\Abstracts\Handler;
use Illuminate\Support\Collection;

/**
 * Implements help work with the detected rfid tags information.
 */
class DetectedRfidTagsHandler extends Handler
{
    /**
     * Returns all records.
     *
     * @param DetectedRfidTagsApiRequestSettings|null $settings
     *
     * @return StandardResponseApiModel
     */
    public static function all(? DetectedRfidTagsApiRequestSettings $settings = null): StandardResponseApiModel
    {
        $settings ??= new DetectedRfidTagsApiRequestSettings();

        $request = new DetectedRfidTagsApiRequest($settings);

        $request->execute();

        return $request->get_response();
    }

    /**
     * Creates instances of the model by specified records.
     *
     * @param array $records
     *
     * @param bool $is_collection
     *
     * @return Collection|DetectedRfidTagsApiModel
     */
    public static function create_model(array $records, bool $is_collection = true): Collection | DetectedRfidTagsApiModel
    {
        $method = $is_collection ? 'create' : 'create_one';

        return ApiModel::{ $method }($records, DetectedRfidTagsApiModel::class);
    }
}
