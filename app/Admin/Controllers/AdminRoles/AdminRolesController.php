<?php

namespace App\Admin\Controllers\AdminRoles;

use App\Admin\Controllers\BaseController;
use App\Handlers\Admin\AdminPermissionGroups\AdminPermissionGroupsHandler;
use App\Handlers\Admin\AdminRoles\AdminRolesHandler;
use App\Handlers\Admin\Classifiers\RolesClassifierHandler;
use App\RoutesRequests\Admin\AdminRoles\AdminRolesIndexGetRouteRequest;
use App\RoutesRequests\Admin\AdminRoles\AdminRolesPutPatchRouteRequest;
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
 * Implements logic action of the admin roles.
 */
class AdminRolesController extends BaseController
{
    /**
     * Displaying index page.
     *
     * @return View
     */
    public function index(): View
    {
        $this->add_breadcrumb(RouteGroup::get_route(AdminRolesIndexGetRouteRequest::class), 'Admin Roles');

        return view(admin_directory('admin.admin-roles.index'))
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
        $this->add_breadcrumb(RouteGroup::get_route(AdminRolesIndexGetRouteRequest::class), 'Admin Roles');

        $this->add_breadcrumb('', 'Detail record');

        $record = AdminRolesHandler::get($id)?->toArray();

        if (!$record)
        {
            abort(HttpCodesClassifier::NOT_FOUND->value);
        }

        return view(admin_directory('admin.admin-roles.detail'))
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
            ->set_id('admin-roles')
            ->action_by_route_request(AdminRolesPutPatchRouteRequest::class)
            ->method(HttpMethodsClassifiers::POST)
            ->handler(AdminRolesHandler::instance(), $id);

        $form->text('description', 'Description')->set_rules('nullable|string');

        $form
            ->single_select('id_admin_permission_group', 'Admin Permission Group')
            ->options(AdminPermissionGroupsHandler::instance())
            ->set_rules('required');

        $form
            ->single_select('id_role', 'Role')
            ->options(RolesClassifierHandler::instance(), 'id_object', 'name_object')
            ->set_rules('required');

        $form->button('submit', 'Submit');

        $form->initialization();

        $this->add_breadcrumb(RouteGroup::get_route(AdminRolesIndexGetRouteRequest::class), 'Admin Roles');

        $this->add_breadcrumb('', $form->is_editing() ? 'Edit record' : 'New record');

        return view(admin_directory('admin.admin-roles.form'))
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
        $validator = Form::get_validator($request, 'admin-roles');

        if ($validator->fails())
        {
            return redirect()
                ->back()
                ->withInput()
                ->withErrors($validator);
        }

        AdminRolesHandler::updateOrCreate($request->all('id'), $request->all());

        return redirect()->route(RouteGroup::get_sequence(AdminRolesIndexGetRouteRequest::class));
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
        AdminRolesHandler::delete($id);

        return redirect()->route(RouteGroup::get_sequence(AdminRolesIndexGetRouteRequest::class));
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
        $records = AdminRolesHandler::records();

        return response()->json(
            [
                'data' => $records,
            ]
        );
    }
}
