<?php

namespace App\Admin\Controllers\HttpMethods;

use App\Admin\Controllers\BaseController;
use App\Handlers\Admin\HttpMethods\HttpMethodsHandler;
use App\RoutesRequests\Admin\HttpMethods\HttpMethodsPutPostRouteRequest;
use App\RoutesRequests\Admin\HttpMethods\HttpMethodsIndexGetRouteRequest;
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
 * Implements logic for the action of http methods.
 */
class HttpMethodsController extends BaseController
{
    /**
     * Displaying list of records.
     *
     * @return View
     */
    public function index(): View
    {
        $this->add_breadcrumb(RouteGroup::get_route(HttpMethodsIndexGetRouteRequest::class), 'Http Methods');

        return view(admin_directory('admin.http-methods.index'))
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
        $this->add_breadcrumb(RouteGroup::get_route(HttpMethodsIndexGetRouteRequest::class), 'Http Methods');

        $this->add_breadcrumb('', 'Detail record');

        $record = HttpMethodsHandler::get($id)?->toArray();

        if (!$record)
        {
            abort(HttpCodesClassifier::NOT_FOUND->value);
        }

        return view(admin_directory('admin.http-methods.detail'))
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
            ->set_id('http-methods')
            ->action_by_route_request(HttpMethodsPutPostRouteRequest::class)
            ->method(HttpMethodsClassifiers::POST)
            ->handler(HttpMethodsHandler::instance(), $id);

        $form->text('code', 'Code')->set_rules('required|string');

        $form->text('description', 'Description')->set_rules('nullable|string');

        $form->button('submit', 'Submit');

        $form->initialization();

        $this->add_breadcrumb(RouteGroup::get_route(HttpMethodsIndexGetRouteRequest::class), 'Http Methods');

        $this->add_breadcrumb('', $form->is_editing() ? 'Edit record' : 'New record');

        return view(admin_directory('admin.http-methods.form'))
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
        $validator = Form::get_validator($request, 'http-methods');

        if ($validator->fails())
        {
            return redirect()
                ->back()
                ->withInput()
                ->withErrors($validator);
        }

        HttpMethodsHandler::updateOrCreate($request->all('id'), $request->all());

        return redirect()->route(RouteGroup::get_sequence(HttpMethodsIndexGetRouteRequest::class));
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
        HttpMethodsHandler::delete($id);

        return redirect()->route(RouteGroup::get_sequence(HttpMethodsIndexGetRouteRequest::class));
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
        $records = HttpMethodsHandler::records();

        return response()->json(
            [
                'data' => $records,
            ]
        );
    }
}
