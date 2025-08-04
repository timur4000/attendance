<?php

namespace App\Admin\Controllers\Classifiers;

use App\Admin\Controllers\BaseController;
use App\ApiRequestSettings\Data\Classifiers\ClassifierSelectApiRequestSettings;
use App\Handlers\Admin\Classifiers\ClassifiersHandler;
use App\Managers\Admin\AdminConfigManager;
use App\Standards\ApiRequests\Classifiers\ApiRequestClassifierTypesClassifier;
use App\Standards\Classifiers\Admin\AdminConfigClassifier;
use App\Standards\Classifiers\Chars\CharsClassifiers;
use App\Standards\Classifiers\Common\CommonTermClassifier;
use App\Standards\RouteGroups\Abstracts\RouteGroup;
use Illuminate\Contracts\View\View;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Implements base logic for the classifier controllers.
 */
class ClassifiersController extends BaseController
{
    /**
     * @var ApiRequestClassifierTypesClassifier
     */
    protected ApiRequestClassifierTypesClassifier $classifier;

    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Displaying list of the classifier.
     *
     * @return View
     */
    public function index(): View
    {
        $breadcrumbs =
            [
                [ 'url' => $this->get_index_url(), 'title' => ucfirst($this->get_classifier()->value) ],
            ];

        $asset_path = $this->get_asset_path('index');

        $json_list_url = $this->get_json_list_url();

        $detail_url = $this->get_detail_url();

        return view(admin_directory('classifiers.index'))
            ->with(compact([ 'breadcrumbs', 'asset_path', 'json_list_url', 'detail_url' ]));
    }

    /**
     * Displaying record of the classifier.
     *
     * @param int $record
     *
     * @return View
     */
    public function detail(int $record): View
    {
        $settings = new ClassifierSelectApiRequestSettings();

        $settings->classifier = $this->get_classifier();

        $settings->id_object = $record;

        $record = ClassifiersHandler::record($settings);

        if ($record->is_empty())
        {
            abort(404);
        }

        $asset_path = $this->get_asset_path(CommonTermClassifier::DETAIL->value);

        $breadcrumbs =
            [
                [ 'url' => $this->get_index_url(), 'title' => ucfirst($this->get_classifier()->value) ],
                [ 'url' => '', 'title' => 'Detail' ],
            ];

        return view(admin_directory('classifiers.detail'))
            ->with(compact([ 'record', 'asset_path', 'breadcrumbs' ]));
    }

    /**
     * Returns list json of the classifier.
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function list_json(Request $request): JsonResponse
    {
        $json = $request->json()->all();

        $settings = new ClassifierSelectApiRequestSettings();

        $settings->classifier = $this->get_classifier();

        $settings->update($json);

        return response()->json(
            [
                'data' => ClassifiersHandler::records($settings),
            ]);
    }

    /**
     * Sets classifier property on the given value.
     *
     * @param ApiRequestClassifierTypesClassifier $classifier
     *
     * @return void
     */
    protected function set_classifier(ApiRequestClassifierTypesClassifier $classifier): void
    {
        $this->classifier = $classifier;
    }

    /**
     * Returns value of the classifier property.
     *
     * @return ApiRequestClassifierTypesClassifier
     */
    public function get_classifier(): ApiRequestClassifierTypesClassifier
    {
        return $this->classifier;
    }

    /**
     * Returns route name to the json list action url by the classifier property.
     *
     * @return string
     */
    private function get_json_list_url(): string
    {
        return route(RouteGroup::get_sequence($this->get_namespace('ListJsonPostRouteRequest')));
    }

    /**
     * Returns route name to the detail action url by the classifier property.
     *
     * @return string
     */
    private function get_detail_url(): string
    {
        return route(RouteGroup::get_sequence($this->get_namespace('DetailGetRouteRequest')), [ CommonTermClassifier::DETAIL->value => '%s' ]);
    }

    /**
     * Returns route name to the index action url by the classifier property.
     *
     * @return string
     */
    private function get_index_url(): string
    {
        return route(RouteGroup::get_sequence($this->get_namespace('GetRouteRequest')));
    }

    /**
     * Returns namespace for the given class name.
     *
     * @param string $class_name
     *
     * @return string
     */
    private function get_namespace(string $class_name): string
    {
        $classifier_name = ucfirst(mb_strtolower($this->classifier->name));

        return 'App' . CharsClassifiers::NAMESPACE_DELIMITER . 'RoutesRequests' . CharsClassifiers::NAMESPACE_DELIMITER . 'Admin' . CharsClassifiers::NAMESPACE_DELIMITER . 'Classifiers' . CharsClassifiers::NAMESPACE_DELIMITER . $classifier_name . CharsClassifiers::NAMESPACE_DELIMITER . $classifier_name . $class_name;
    }

    /**
     * Returns path for the assets with the given view name.
     *
     * @param string $view_name
     *
     * @return string
     */
    private function get_asset_path(string $view_name): string
    {
        return AdminConfigManager::get_option(AdminConfigClassifier::directory_name) . '.classifiers.' . $view_name;
    }
}
