<?php

namespace App\Handlers\Admin\Rfid\RegistrationRecords;

use App\ApiModels\Rfid\GetRegistrationRecords\RegistrationRecordsApiModel;
use App\ApiModels\StandardResponse\StandardResponseApiModel;
use App\ApiRequests\Data\Rfid\RegistrationRecords\RegistrationRecordsApiRequest;
use App\ApiRequestSettings\Data\Rfid\RegistrationRecords\RegistrationRecordsApiRequestSettings;
use App\Standards\ApiModels\Abstracts\ApiModel;
use App\Standards\Handlers\Abstracts\Handler;
use Illuminate\Support\Collection;

/**
 * Implements help work with the registration records information.
 */
class RegistrationRecordsHandler extends Handler
{
    /**
     * Returns all records.
     *
     * @param RegistrationRecordsApiRequestSettings|null $settings
     *
     * @return StandardResponseApiModel
     */
    public static function all(? RegistrationRecordsApiRequestSettings $settings = null): StandardResponseApiModel
    {
        $settings ??= new RegistrationRecordsApiRequestSettings();

        $request = new RegistrationRecordsApiRequest($settings);

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
     * @return Collection|RegistrationRecordsApiModel
     */
    public static function create_model(array $records, bool $is_collection = true): Collection | RegistrationRecordsApiModel
    {
        $method = $is_collection ? 'create' : 'create_one';

        return ApiModel::{ $method }($records, RegistrationRecordsApiModel::class);
    }
}
