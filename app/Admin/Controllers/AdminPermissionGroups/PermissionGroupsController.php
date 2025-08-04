<?php

namespace App\Admin\Controllers\AdminPermissionGroups;

use App\Admin\Controllers\BaseController;
use App\Handlers\Admin\AdminPermissionGroups\AdminPermissionGroupsHandler;
use App\Handlers\Admin\Permissions\PermissionsHandler;
use App\RoutesRequests\Admin\AdminPermissionGroups\AdminPermissionGroupsIndexGetRouteRequest;
use App\RoutesRequests\Admin\AdminPermissionGroups\AdminPermissionGroupsPatchRouteRequest;
use App\RoutesRequests\Admin\Permissions\AdminPermissionsIndexGetRouteRequest;
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
 * Implements logic action of the permission groups.
 */
class PermissionGroupsController extends BaseController
{
    /**
     * Displaying index page.
     *
     * @return View
     */
    public function index(): View
    {
        $this->add_breadcrumb('', 'Admin Permission Groups');

        return view(admin_directory('admin.admin-permission-groups.index'))
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
        $this->add_breadcrumb(RouteGroup::get_route(AdminPermissionsIndexGetRouteRequest::class), 'Admin Permission Groups');

        $this->add_breadcrumb('', 'Detail record');

        $record = AdminPermissionGroupsHandler::get($id)?->toArray();

        if (!$record)
        {
            abort(HttpCodesClassifier::NOT_FOUND->value);
        }

        return view(admin_directory('admin.admin-permission-groups.detail'))
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
            ->set_id('admin-permission-groups')
            ->action_by_route_request(AdminPermissionGroupsPatchRouteRequest::class)
            ->method(HttpMethodsClassifiers::POST)
            ->handler(AdminPermissionGroupsHandler::instance(), $id);

        $form->text('code', 'Code')->set_rules('required|string');

        $form->text('description', 'Description')->set_rules('nullable|string');

        $form
            ->multiple_select('admin_permissions', 'Admin Permissions')
            ->options(PermissionsHandler::instance())
            ->set_relation_name('admin_permissions')
            ->set_rules('required');

        $form->button('submit', 'Submit');

        $form->initialization();

        $this->add_breadcrumb(RouteGroup::get_route(AdminPermissionGroupsIndexGetRouteRequest::class), 'Admin Permissions');

        $this->add_breadcrumb('', $form->is_editing() ? 'Edit record' : 'New record');

        return view(admin_directory('admin.admin-permission-groups.form'))
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
        $validator = Form::get_validator($request, 'admin-permission-groups');

        if ($validator->fails())
        {
            return redirect()
                ->back()
                ->withInput()
                ->withErrors($validator);
        }

        AdminPermissionGroupsHandler::updateOrCreate($request->all('id'), $request->all());

        return redirect()->route(RouteGroup::get_sequence(AdminPermissionGroupsIndexGetRouteRequest::class));
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
        AdminPermissionGroupsHandler::delete($id);

        return redirect()->route(RouteGroup::get_sequence(AdminPermissionGroupsIndexGetRouteRequest::class));
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
        $records = AdminPermissionGroupsHandler::records();

        return response()->json(
            [
                'data' => $records,
            ]
        );
    }
}
