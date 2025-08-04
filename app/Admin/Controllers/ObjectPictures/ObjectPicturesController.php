<?php

namespace App\Admin\Controllers\ObjectPictures;

use App\Admin\Controllers\BaseController;
use App\ApiRequestSettings\Data\Pictures\ObjectPictureSelectApiRequestSettings;
use App\Handlers\Admin\Pictures\ObjectPicturesHandler;
use App\Standards\Response\Classes\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Implements actions of the object pictures.
 */
class ObjectPicturesController extends BaseController
{
    /**
     * Returns json of picture record.
     *
     * @param Request $request
     *
     * @return JsonResponse
     *
     * @throws \ReflectionException
     */
    public function picture_json(Request $request): JsonResponse
    {
        $settings =  new ObjectPictureSelectApiRequestSettings();

        $settings->update($request->json()->all());

        $record = ObjectPicturesHandler::get($settings);

        return Response::get_instance()->set_record($record)->json();
    }
}
