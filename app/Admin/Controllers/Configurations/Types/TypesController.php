<?php

namespace App\Admin\Controllers\Configurations\Types;

use App\Admin\Controllers\BaseController;
use App\Handlers\Admin\Configurations\Types\TypesHandler;
use App\RoutesRequests\Admin\Configurations\Types\TypesIndexGetRouteRequest;
use App\RoutesRequests\Admin\Configurations\Types\TypesPutPostRouteRequest;
use App\Standards\Classifiers\Http\HttpCodesClassifier;
use App\Standards\Classifiers\Http\HttpMethodsClassifiers;
use App\Standards\Forms\Classes\Form;
use App\Standards\RouteGroups\Abstracts\RouteGroup;
use Illuminate\Contracts\View\View;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Psr\Container\ContainerExceptionInterface;
use Psr\Container\NotFoundExceptionInterface;

/**
 * Implements actions of the configuration types routes.
 */
class TypesController extends BaseController
{
    /**
     * Displaying index page.
     *
     * @return View
     */
    public function index(): View
    {
        $this->add_breadcrumb(RouteGroup::get_route(TypesIndexGetRouteRequest::class), 'Configuration types');

        return view(admin_directory('admin.configurations.types.index'))
            ->with($this->get_breadcrumbs_to_with());
    }

    /**
     * Detailed record display.
     *
     * @param int|null $id
     *
     * @return View
     */
    public function detail(? int $id = null): View
    {
        $this->add_breadcrumb(RouteGroup::get_route(TypesIndexGetRouteRequest::class), 'Configuration types');

        $this->add_breadcrumb('', 'Detail record');

        $record = TypesHandler::get($id)?->toArray();

        if (!$record)
        {
            abort(HttpCodesClassifier::NOT_FOUND->value);
        }

        return view(admin_directory('admin.configurations.types.detail'))
            ->with(compact([ 'record' ]))
            ->with($this->get_breadcrumbs_to_with());
    }

    /**
     * Displaying form.
     *
     * @param int|null $id
     *
     * @return View
     */
    public function form(? int $id = null): View
    {
        $form = (new Form())
            ->set_id('configuration-types')
            ->action_by_route_request(TypesPutPostRouteRequest::class)
            ->method(HttpMethodsClassifiers::POST)
            ->handler(TypesHandler::instance(), $id);

        $form->text('code', 'Code')->set_rules('required|string');

        $form->text('description', 'Description')->set_rules('nullable|string');

        $form->button('submit', 'Submit');

        $form->initialization();

        $this->add_breadcrumb(RouteGroup::get_route(TypesIndexGetRouteRequest::class), 'Configuration types');

        $this->add_breadcrumb('', $form->is_editing() ? 'Edit record' : 'New record');

        return view(admin_directory('admin.configurations.types.form'))
            ->with(compact([ 'form' ]))
            ->with($this->get_breadcrumbs_to_with());
    }

    /**
     * Updates or creates record.
     *
     * @param Request $request
     *
     * @return RedirectResponse
     *
     * @throws ContainerExceptionInterface
     * @throws NotFoundExceptionInterface
     */
    public function put(Request $request): RedirectResponse
    {
        $validator = Form::get_validator($request, 'configuration-types');

        if ($validator->fails())
        {
            return redirect()
                ->back()
                ->withInput()
                ->withErrors($validator);
        }

        TypesHandler::updateOrCreate($request->all('id'), $request->all());

        return redirect()->route(RouteGroup::get_sequence(TypesIndexGetRouteRequest::class));
    }

    /**
     * Deletes record.
     *
     * @param int $id
     *
     * @return RedirectResponse
     */
    public function delete(int $id): RedirectResponse
    {
        TypesHandler::delete($id);

        return redirect()->route(RouteGroup::get_sequence(TypesIndexGetRouteRequest::class));
    }

    /**
     * Returns records of json.
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function records_json(Request $request): JsonResponse
    {
        $records = TypesHandler::records();

        return response()->json(
            [
                'data' => $records,
            ]
        );
    }
}