<?php

namespace App\Admin\Controllers\Parameters;

use App\Handlers\Admin\Parameters\ParametersHandler;
use App\Standards\ApiRequestSettings\Classifiers\Parameters\ParametersIdsClassifier;
use App\Standards\Response\Classes\Response;
use Illuminate\Contracts\View\View;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Implements parameters actions.
 */
class ParametersController
{
    /**
     * Displaying index page.
     *
     * @return View
     */
    public function index(): View
    {
        return view(admin_directory('admin.parameters.index'));
    }

    /**
     * Returns json of the records.
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function records_json(Request $request): JsonResponse
    {
        $response = ParametersHandler::response();

        $records = ParametersHandler::records_from_response($response);

        return Response::get_instance()->set_data($records)->json();
    }

    /**
     * Returns json of the record by the specified id parameter.
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function record_json(Request $request): JsonResponse
    {
        $idParameter = ParametersIdsClassifier::from($request->json('id_parameter'));

        $response = ParametersHandler::response($idParameter);

        $record = ParametersHandler::records_from_response($response, true);

        return Response::get_instance()->set_record($record)->json();
    }
}
