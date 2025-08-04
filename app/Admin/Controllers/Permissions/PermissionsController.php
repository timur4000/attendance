<?php

namespace App\Admin\Controllers\Permissions;

use App\Admin\Controllers\BaseController;
use App\Handlers\Admin\HttpMethods\HttpMethodsHandler;
use App\Handlers\Admin\Permissions\PermissionsHandler;
use App\Handlers\Systems\Routes\RoutesHandler;
use App\RoutesRequests\Admin\Permissions\AdminPermissionsIndexGetRouteRequest;
use App\RoutesRequests\Admin\Permissions\AdminPermissionsPutPatchRouteRequest;
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
 * Implements logic for action of permissions.
 */
class PermissionsController extends BaseController
{
    /**
     * Displaying list of records.
     *
     * @return View
     */
    public function index(): View
    {
        $this->add_breadcrumb(RouteGroup::get_route(AdminPermissionsIndexGetRouteRequest::class), 'Admin Permissions');

        return view(admin_directory('admin.admin-permissions.index'))
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
        $this->add_breadcrumb(RouteGroup::get_route(AdminPermissionsIndexGetRouteRequest::class), 'Admin Permissions');

        $this->add_breadcrumb('', 'Detail record');

        $record = PermissionsHandler::get($id)?->toArray();

        if (!$record)
        {
            abort(HttpCodesClassifier::NOT_FOUND->value);
        }

        return view(admin_directory('admin.admin-permissions.detail'))
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
            ->set_id('admin-permissions')
            ->action_by_route_request(AdminPermissionsPutPatchRouteRequest::class)
            ->method(HttpMethodsClassifiers::POST)
            ->handler(PermissionsHandler::instance(), $id);

        $form->text('code', 'Code')->set_rules('required|string');

        $form->text('description', 'Description')->set_rules('nullable|string');

        $form->text('custom_pattern', 'Custom pattern')->set_rules('nullable|string');

        $form
            ->multiple_select('routes', 'Route')
            ->options(RoutesHandler::instance());

        $form
            ->multiple_select('http_methods', 'Http Methods')
            ->options(HttpMethodsHandler::instance())
            ->set_relation_name('http_methods')
            ->set_rules('required');

        $form->button('submit', 'Submit');

        $form->initialization();

        $this->add_breadcrumb(RouteGroup::get_route(AdminPermissionsIndexGetRouteRequest::class), 'Admin Permissions');

        $this->add_breadcrumb('', $form->is_editing() ? 'Edit record' : 'New record');

        return view(admin_directory('admin.admin-permissions.form'))
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
     *
     * @throws NotFoundExceptionInterface
     */
    public function patch(Request $request): RedirectResponse
    {
        $validator = Form::get_validator($request, 'admin-permissions');

        if ($validator->fails())
        {
            return redirect()
                ->back()
                ->withInput()
                ->withErrors($validator);
        }

        PermissionsHandler::updateOrCreate($request->all('id'), $request->all());

        return redirect()->route(RouteGroup::get_sequence(AdminPermissionsIndexGetRouteRequest::class));
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
        PermissionsHandler::delete($id);

        return redirect()->route(RouteGroup::get_sequence(AdminPermissionsIndexGetRouteRequest::class));
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
        $records = PermissionsHandler::records();

        return response()->json(
            [
                'data' => $records,
            ]
        );
    }
}
