<?php

namespace App\Admin\Controllers\Configurations\Values;

use App\Admin\Controllers\BaseController;
use App\Handlers\Admin\Configurations\Groups\GroupsHandler;
use App\Handlers\Admin\Configurations\Types\TypesHandler;
use App\Handlers\Admin\Configurations\Values\ValuesHandler;
use App\RoutesRequests\Admin\Configurations\Values\ValuesIndexGetRouteRequest;
use App\RoutesRequests\Admin\Configurations\Values\ValuesPutPostRouteRequest;
use App\Standards\Classifiers\Http\HttpCodesClassifier;
use App\Standards\Classifiers\Http\HttpMethodsClassifiers;
use App\Standards\Forms\Classes\Form;
use App\Standards\Response\Classes\Response;
use App\Standards\RouteGroups\Abstracts\RouteGroup;
use Illuminate\Contracts\View\View;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Psr\Container\ContainerExceptionInterface;
use Psr\Container\NotFoundExceptionInterface;

/**
 * Implements actions of the configuration values routes.
 */
class ValuesController extends BaseController
{
    /**
     * Displaying index page.
     *
     * @return View
     */
    public function index(): View
    {
        $this->add_breadcrumb(RouteGroup::get_route(ValuesIndexGetRouteRequest::class), 'Configuration values');

        return view(admin_directory('admin.configurations.values.index'))
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
        $this->add_breadcrumb(RouteGroup::get_route(ValuesIndexGetRouteRequest::class), 'Configuration values');

        $this->add_breadcrumb('', 'Detail record');

        $record = ValuesHandler::get($id)?->toArray();

        if (!$record)
        {
            abort(HttpCodesClassifier::NOT_FOUND->value);
        }

        return view(admin_directory('admin.configurations.values.detail'))
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
            ->set_id('configuration-values')
            ->action_by_route_request(ValuesPutPostRouteRequest::class)
            ->method(HttpMethodsClassifiers::POST)
            ->handler(ValuesHandler::instance(), $id);

        $form->single_select('id_configuration_group', 'Group')->options(GroupsHandler::instance());

        $form->single_select('id_configuration_type', 'Type')->options(TypesHandler::instance());

        $form->number('value_integer', 'Value')->set_readonly(false)->set_rules('required|integer');

        $form->number('value_min', 'Min')->set_readonly(false);

        $form->number('value_max', 'Max')->set_readonly(false);

        $form->text('value_string', 'Value')->set_rules('nullable|string');

        $form->boolean('value_boolean', 'Is')->set_rules('nullable|boolean')->set_pseudo_name('value_integer');

        $form->text('code', 'Code')->set_rules('required|string');

        $form->text('description', 'Description')->set_rules('nullable|string');

        $form->number('sort_order', 'Sort order')->set_value(0)->set_step(100)->set_min(0);

        $form->boolean('is_editable', 'Is editable')->set_checked(true);

        $form->boolean('is_hidden', 'Is hidden')->set_checked(false);

        $form->button('submit', 'Submit');

        $form->initialization();

        $this->add_breadcrumb(RouteGroup::get_route(ValuesIndexGetRouteRequest::class), 'Configuration values');

        $this->add_breadcrumb('', $form->is_editing() ? 'Edit record' : 'New record');

        return view(admin_directory('admin.configurations.values.form'))
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
        $validator = Form::get_validator($request, 'configuration-values');

        if ($validator->fails())
        {
            return redirect()
                ->back()
                ->withInput()
                ->withErrors($validator);
        }

        if ($request->post('id_configuration_type') != 2)
        {
            $request->merge(
                [
                    'value_integer' => 0,
                    'value_min' => 0,
                    'value_max' => 0,
                ]);
        }

        if ($request->post('id_configuration_type') != 3)
        {
            $request->merge([ 'value_string' => '' ]);
        }

        if ($request->post('id_configuration_type') == 4)
        {
            $request->merge([ 'value_integer' => $request->post('value_boolean') ]);
        }

        ValuesHandler::updateOrCreate($request->all('id'), $request->all());

        return redirect()->route(RouteGroup::get_sequence(ValuesIndexGetRouteRequest::class));
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
        ValuesHandler::delete($id);

        return redirect()->route(RouteGroup::get_sequence(ValuesIndexGetRouteRequest::class));
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
        $records = ValuesHandler::records();

        return Response::get_instance()->set_data($records)->json();
    }

    /**
     * Returns records of json.
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function record_json(Request $request): JsonResponse
    {
        if (empty($request->json('code')))
        {
            return $this->records_json($request);
        }

        $record = ValuesHandler::get_by_code($request->json('code'));

        return Response::get_instance()->set_record($record)->json();
    }
}