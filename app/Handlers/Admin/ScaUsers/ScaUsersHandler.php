<?php

namespace App\Handlers\Admin\ScaUsers;

use App\ApiModels\ScaUsers\ScaUserApiModel;
use App\ApiModels\StandardResponse\StandardResponseApiModel;
use App\ApiRequests\Data\ScaUsers\ScaUsersSelectApiRequest;
use App\ApiRequestSettings\Data\Pictures\ObjectPictureSelectApiRequestSettings;
use App\ApiRequestSettings\Data\ScaUsers\ScaUsersApiRequestSettings;
use App\Handlers\Admin\Pictures\ObjectPicturesHandler;
use App\Standards\ApiModels\Abstracts\ApiModel;
use App\Standards\ApiRequests\Classifiers\PictureCodeEntityTypesClassifier;
use App\Standards\Handlers\Abstracts\Handler;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;

/**
 * Implements help work with the sca users information.
 */
class ScaUsersHandler extends Handler
{
    /**
     * Returns records.
     *
     * @param ScaUsersApiRequestSettings|null $settings
     *
     * @return Collection<ScaUserApiModel>
     */
    public static function records(? ScaUsersApiRequestSettings $settings = null): Collection
    {
        $settings ??= new ScaUsersApiRequestSettings();

        $request = new ScaUsersSelectApiRequest($settings);

        $request->execute();

        return ApiModel::create($request->get_response()->package, ScaUserApiModel::class);
    }

    /**
     * Returns record.
     *
     * @param int $id_user
     *
     * @param ScaUsersApiRequestSettings|null $settings
     *
     * @return ScaUserApiModel
     */
    public static function record(int $id_user, ? ScaUsersApiRequestSettings $settings = null): ScaUserApiModel
    {
        $settings ??= new ScaUsersApiRequestSettings();

        $settings->id_user = $id_user;

        $request = new ScaUsersSelectApiRequest($settings);

        $request->execute();

        return ApiModel::create_one($request->get_response()->first_package(), ScaUserApiModel::class);
    }

    /**
     * Returns record by the given settings.
     *
     * @param ScaUsersApiRequestSettings $settings
     *
     * @return ScaUserApiModel
     */
    public static function record_by_settings(ScaUsersApiRequestSettings $settings): ScaUserApiModel
    {
        $request = new ScaUsersSelectApiRequest($settings);

        $request->execute();

        return ApiModel::create_one($request->get_response()->first_package(), ScaUserApiModel::class);
    }

    /**
     * Returns html img tag with the base64 picture of the record.
     *
     * @param int $id_user
     *
     * @param ObjectPictureSelectApiRequestSettings|null $settings
     *
     * @return string
     */
    public static function picture_display(int $id_user, ? ObjectPictureSelectApiRequestSettings $settings = null): string
    {
        return ObjectPicturesHandler::display($id_user, PictureCodeEntityTypesClassifier::USER, $settings);
    }

    /**
     * Returns record of the picture.
     *
     * @param int $id_user
     *
     * @param ObjectPictureSelectApiRequestSettings|null $settings
     *
     * @return StandardResponseApiModel
     */
    public static function picture(int $id_user, ? ObjectPictureSelectApiRequestSettings $settings = null): StandardResponseApiModel
    {
        $settings ??= new ObjectPictureSelectApiRequestSettings();

        $settings->code_entity = PictureCodeEntityTypesClassifier::USER;

        $settings->id_object = $id_user;

        return ObjectPicturesHandler::get($settings);
    }

    /**
     * Returns total of records.
     *
     * @param ScaUsersApiRequestSettings|null $settings
     *
     * @return int
     */
    public static function total(? ScaUsersApiRequestSettings $settings = null): int
    {
        if (!$settings)
        {
            $settings = new ScaUsersApiRequestSettings();
        }

        $settings->count_only = 1;

        $settings->limit = 0;

        $settings->offset = 0;

        $request = new ScaUsersSelectApiRequest($settings);

        $request->execute();

        return $request->get_response()->message;
    }
}
