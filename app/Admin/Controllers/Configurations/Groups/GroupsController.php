<?php

namespace App\Admin\Controllers\Configurations\Groups;

use App\Admin\Controllers\BaseController;
use App\Handlers\Admin\Configurations\Groups\GroupsHandler;
use App\RoutesRequests\Admin\Configurations\Groups\GroupsIndexGetRouteRequest;
use App\RoutesRequests\Admin\Configurations\Groups\GroupsPutPostRouteRequest;
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
 * Implements actions of the configuration group routes.
 */
class GroupsController extends BaseController
{
    /**
     * Displaying index page.
     *
     * @return View
     */
    public function index(): View
    {
        $this->add_breadcrumb(RouteGroup::get_route(GroupsIndexGetRouteRequest::class), 'Configuration groups');

        return view(admin_directory('admin.configurations.groups.index'))
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
        $this->add_breadcrumb(RouteGroup::get_route(GroupsIndexGetRouteRequest::class), 'Configuration groups');

        $this->add_breadcrumb('', 'Detail record');

        $record = GroupsHandler::get($id)?->toArray();

        if (!$record)
        {
            abort(HttpCodesClassifier::NOT_FOUND->value);
        }

        return view(admin_directory('admin.configurations.groups.detail'))
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
            ->set_id('configuration-groups')
            ->action_by_route_request(GroupsPutPostRouteRequest::class)
            ->method(HttpMethodsClassifiers::POST)
            ->handler(GroupsHandler::instance(), $id);

        $form->text('code', 'Code')->set_rules('required|string');

        $form->text('description', 'Description')->set_rules('nullable|string');

        $form->button('submit', 'Submit');

        $form->initialization();

        $this->add_breadcrumb(RouteGroup::get_route(GroupsIndexGetRouteRequest::class), 'Configuration groups');

        $this->add_breadcrumb('', $form->is_editing() ? 'Edit record' : 'New record');

        return view(admin_directory('admin.configurations.groups.form'))
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
    public function put(Request $request): RedirectResponse
    {
        $validator = Form::get_validator($request, 'configuration-groups');

        if ($validator->fails())
        {
            return redirect()
                ->back()
                ->withInput()
                ->withErrors($validator);
        }

        GroupsHandler::updateOrCreate($request->all('id'), $request->all());

        return redirect()->route(RouteGroup::get_sequence(GroupsIndexGetRouteRequest::class));
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
        GroupsHandler::delete($id);

        return redirect()->route(RouteGroup::get_sequence(GroupsIndexGetRouteRequest::class));
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
        $records = GroupsHandler::records();

        return response()->json(
            [
                'data' => $records,
            ]
        );
    }
}