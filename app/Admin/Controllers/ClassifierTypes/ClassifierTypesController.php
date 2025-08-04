<?php

namespace App\Admin\Controllers\ClassifierTypes;

use App\Admin\Controllers\BaseController;
use App\ApiRequestSettings\Data\Classifiers\ClassifierSelectApiRequestSettings;
use App\Handlers\Admin\ClassifierTypes\ClassifierTypesHandler;
use App\RoutesRequests\Admin\ClassifierTypes\ClassifierTypesIndexGetRouteRequest;
use App\Standards\ApiRequests\Classifiers\ApiRequestClassifierTypesClassifier;
use App\Standards\ApiRequests\Classifiers\ApiRequestDataTypesClassifier;
use App\Standards\Classifiers\Common\CommonTermClassifier;
use App\Standards\RouteGroups\Abstracts\RouteGroup;
use Illuminate\Contracts\View\View;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Implements actions of the classifier types.
 */
class ClassifierTypesController extends BaseController
{
    /**
     * Displaying index page.
     *
     * @return View
     */
    public function index(): View
    {
        $breadcrumbs =
            [
                [ 'url' => RouteGroup::get_route(ClassifierTypesIndexGetRouteRequest::class), 'title' => 'Classifier Types' ],
            ];

        return view(admin_directory('classifier-types.index'))
            ->with(compact([ 'breadcrumbs' ]));
    }

    /**
     * Displaying detail page.
     *
     * @param int $detail
     *
     * @return View
     */
    public function detail(int $detail): View
    {
        $settings = self::create_default_settings();

        $settings->id_object = $detail;

        $record = ClassifierTypesHandler::record($settings);

        if ($record->is_empty())
        {
            abort(404);
        }

        $breadcrumbs =
            [
                [ 'url' => RouteGroup::get_route(ClassifierTypesIndexGetRouteRequest::class), 'title' => 'Classifier Types' ],
                [ 'url' => '', 'title' => 'Detail' ],
            ];

        return view(admin_directory('classifier-types.' . CommonTermClassifier::DETAIL->value))
            ->with(compact([ 'breadcrumbs', 'record' ]));
    }

    /**
     * Returns all records in the json format.
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public static function list_json(Request $request): JsonResponse
    {
        $settings = self::create_default_settings();

        return response()->json(
            [
                'data' => ClassifierTypesHandler::records($settings),
            ]
        );
    }

    /**
     * Creates and returns base instance of the settings.
     *
     * @return ClassifierSelectApiRequestSettings
     */
    private static function create_default_settings(): ClassifierSelectApiRequestSettings
    {
        $settings = new ClassifierSelectApiRequestSettings();

        $settings->classifier = ApiRequestClassifierTypesClassifier::CLASSIFIER;

        $settings->type_request = ApiRequestDataTypesClassifier::CLASSIFIER_SELECT;

        return $settings;
    }
}
