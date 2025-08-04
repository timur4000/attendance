<?php

namespace App\Admin\Controllers\AdminMenu;

use App\Admin\Controllers\BaseController;
use App\Handlers\Admin\AdminMenu\AdminMenuHandler;
use App\Handlers\Admin\AdminPermissionGroups\AdminPermissionGroupsHandler;
use App\Handlers\Admin\Permissions\PermissionsHandler;
use App\Handlers\Admin\SpriteIcons\MainSpriteIcons\MainSpriteIconsHandler;
use App\Handlers\Systems\Routes\RoutesHandler;
use App\RoutesRequests\Admin\AdminMenu\AdminMenuIndexGetRouteRequest;
use App\RoutesRequests\Admin\AdminMenu\AdminMenuPatchRouteRequest;
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
 * Implements logic action of the admin menu groups.
 */
class AdminMenuController extends BaseController
{
    /**
     * Displaying index page.
     *
     * @return View
     */
    public function index(): View
    {
        $this->add_breadcrumb('', 'Admin Menu');

        return view(admin_directory('admin.admin-menu.index'))
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
        $this->add_breadcrumb(RouteGroup::get_route(AdminMenuIndexGetRouteRequest::class), 'Admin Menu');

        $this->add_breadcrumb('', 'Detail record');

        $record = AdminMenuHandler::get($id)?->toArray();

        if (!$record)
        {
            abort(HttpCodesClassifier::NOT_FOUND->value);
        }

        return view(admin_directory('admin.admin-menu.detail'))
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
            ->set_id('admin-menu')
            ->action_by_route_request(AdminMenuPatchRouteRequest::class)
            ->method(HttpMethodsClassifiers::POST)
            ->handler(AdminMenuHandler::instance(), $id);

        $form->text('title', 'Title')->set_rules('required|string|max:255');

        $form->textarea('description', 'Description')->set_rules('nullable|string|max:255')->set_rows(3);

        $form
            ->single_select('id_parent', 'Id parent')
            ->set_with_empty(true)
            ->options(AdminMenuHandler::instance(), 'id', 'title')
            ->set_rules('nullable|numeric');

        $form
            ->multiple_select('admin_permissions', 'Admin Permissions')
            ->options(PermissionsHandler::instance())
            ->set_relation_name('admin_permissions')
            ->set_rules('required');

        $form
            ->multiple_select('admin_permission_groups', 'Admin Permission Group')
            ->options(AdminPermissionGroupsHandler::instance())
            ->set_relation_name('admin_permission_groups')
            ->set_rules('required');

        $form->single_select('id_icon', 'Id icon')
            ->set_with_empty(true)
            ->options(MainSpriteIconsHandler::instance(), 'id', 'id')
            ->set_rules('nullable|string');

        $form->single_select('route', 'Route')
            ->options(RoutesHandler::instance())
            ->set_with_empty(true)
            ->set_rules('nullable|string');

        $form->number('sort_order', 'Sort order')->set_value(0)->set_step(100)->set_min(0);

        $form->boolean('is_active', 'Is active')->set_checked(true);

        $form->button('submit', 'Submit');

        $form->initialization();

        $this->add_breadcrumb(RouteGroup::get_route(AdminMenuIndexGetRouteRequest::class), 'Admin Menu');

        $this->add_breadcrumb('', $form->is_editing() ? 'Edit record' : 'New record');

        return view(admin_directory('admin.admin-menu.form'))
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
        $validator = Form::get_validator($request, 'admin-menu');

        if ($validator->fails())
        {
            return redirect()
                ->back()
                ->withInput()
                ->withErrors($validator);
        }

        AdminMenuHandler::updateOrCreate($request->all('id'), $request->all());

        return redirect()->route(RouteGroup::get_sequence(AdminMenuIndexGetRouteRequest::class));
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
        AdminMenuHandler::delete($id);

        return redirect()->route(RouteGroup::get_sequence(AdminMenuIndexGetRouteRequest::class));
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
        $records = AdminMenuHandler::records();

        return response()->json(
            [
                'data' => $records,
            ]
        );
    }
}
