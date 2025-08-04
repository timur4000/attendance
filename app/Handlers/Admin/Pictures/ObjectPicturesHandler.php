<?php

namespace App\Handlers\Admin\Pictures;

use App\ApiModels\StandardResponse\StandardResponseApiModel;
use App\ApiRequests\Data\Pictures\ObjectPictureSelectApiRequest;
use App\ApiRequestSettings\Data\Pictures\ObjectPictureSelectApiRequestSettings;
use App\Standards\ApiRequests\Classifiers\PictureCodeEntityTypesClassifier;
use App\Standards\Handlers\Abstracts\Handler;

/**
 * Implements help work with the object pictures.
 */
class ObjectPicturesHandler extends Handler
{
    /**
     * Returns standard response of the picture by the given settings.
     *
     * @param ObjectPictureSelectApiRequestSettings $settings
     *
     * @return StandardResponseApiModel
     */
    public static function get(ObjectPictureSelectApiRequestSettings $settings): StandardResponseApiModel
    {
        $request = new ObjectPictureSelectApiRequest($settings);

        $request->execute();

        return $request->get_response();
    }

    /**
     * Returns html img tag with the base64 picture.
     *
     * @param int $id_object
     *
     * @param PictureCodeEntityTypesClassifier $code_entity
     *
     * @param ObjectPictureSelectApiRequestSettings|null $settings
     *
     * @return string
     */
    public static function display(int $id_object, PictureCodeEntityTypesClassifier $code_entity, ? ObjectPictureSelectApiRequestSettings $settings = null): string
    {
        $settings ??= new ObjectPictureSelectApiRequestSettings();

        $settings->id_object = $id_object;

        $settings->code_entity = $code_entity;

        $record = self::get($settings);

        return '<img class="image__element" src="data:image/' . $record->comment . ';base64,' . $record->message . '" />';
    }

    /**
     * Returns base64 of picture.
     *
     * @param int $id_object
     *
     * @param PictureCodeEntityTypesClassifier $code_entity
     *
     * @param ObjectPictureSelectApiRequestSettings|null $settings
     *
     * @return string
     */
    public static function base64(int $id_object, PictureCodeEntityTypesClassifier $code_entity, ? ObjectPictureSelectApiRequestSettings $settings = null): string
    {
        $settings ??= new ObjectPictureSelectApiRequestSettings();

        $settings->id_object = $id_object;

        $settings->code_entity = $code_entity;

        $record = self::get($settings);

        return 'data:image/' . $record->comment . ';base64,' . $record->message;
    }
}
