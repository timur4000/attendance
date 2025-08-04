<?php

namespace App\Admin\Controllers\MainSpriteIcons;

use App\Admin\Controllers\BaseController;
use App\Handlers\Admin\SpriteIcons\MainSpriteIcons\MainSpriteIconsHandler;
use App\RoutesRequests\Admin\MainSpriteIcons\MainSpriteIconsIndexGetRouteRequest;
use App\RoutesRequests\Admin\MainSpriteIcons\MainSpriteIconsPutPatchRouteRequest;
use App\Standards\Classifiers\Http\HttpCodesClassifier;
use App\Standards\Classifiers\Http\HttpMethodsClassifiers;
use App\Standards\Forms\Classes\Form;
use App\Standards\RouteGroups\Abstracts\RouteGroup;
use DOMException;
use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Psr\Container\ContainerExceptionInterface;
use Psr\Container\NotFoundExceptionInterface;

/**
 * Implements logic for the action of main sprite icons.
 */
class MainSpriteIconsController extends BaseController
{
    /**
     * Displaying index page.
     *
     * @return View
     */
    public function index(): View
    {
        $this->add_breadcrumb(RouteGroup::get_route(MainSpriteIconsIndexGetRouteRequest::class), 'Main Sprite Icons');

        return view(admin_directory('admin.main-sprite-icons.index'))
            ->with($this->get_breadcrumbs_to_with());
    }

    /**
     * Displaying form.
     *
     * @param string $uuid
     *
     * @return View
     */
    public function form(string $uuid = ''): View
    {
        $form = (new Form())
            ->set_id('main-sprite-icons')
            ->action_by_route_request(MainSpriteIconsPutPatchRouteRequest::class)
            ->method(HttpMethodsClassifiers::POST)
            ->set_record(MainSpriteIconsHandler::get($uuid))
            ->set_identifier_name('uuid');

        $sprite_icon = MainSpriteIconsHandler::get($uuid);

        if (!empty($uuid) && empty($sprite_icon))
        {
            abort(HttpCodesClassifier::NOT_FOUND->value);
        }

        $form->text('id', 'Id')->set_rules('required|string');

        $form->text('view_box', 'View Box')
            ->placeholder('0 0 0 0')
            ->set_rules('required|string|regex:/^[0-9]+\s+[0-9]+\s+[0-9]+\s+[0-9]+$/');

        $form->textarea('inner_html', 'Inner Html')
            ->placeholder('Only content of svg!')
            ->set_rules('required|string');

        $form->button('submit', 'Submit');

        $form->initialization();

        $this->add_breadcrumb(RouteGroup::get_route(MainSpriteIconsIndexGetRouteRequest::class), 'Main Sprite Icons');

        $this->add_breadcrumb('', $sprite_icon ? 'Edit record' : 'New record');

        return view(admin_directory('admin.main-sprite-icons.form'))
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
     *
     * @throws DOMException
     */
    public function patch(Request $request): RedirectResponse
    {
        $validator = Form::get_validator($request, 'main-sprite-icons');

        if ($validator->errors()->isNotEmpty())
        {
            return redirect()
                ->back()
                ->withInput()
                ->withErrors($validator);
        }

        $sprite_icon = $request->has('uuid') ? MainSpriteIconsHandler::get($request->post('uuid')) : MainSpriteIconsHandler::empty();

        $sprite_icon->fill($request->all());

        $sprite_icon->save();

        return redirect()->route(RouteGroup::get_sequence(MainSpriteIconsIndexGetRouteRequest::class));
    }

    /**
     * Implements delete action.
     *
     * @param string $uuid
     *
     * @return RedirectResponse
     */
    public function delete(string $uuid): RedirectResponse
    {
        $sprite_icon = MainSpriteIconsHandler::get($uuid);

        $sprite_icon->delete();

        return redirect()->route(RouteGroup::get_sequence(MainSpriteIconsIndexGetRouteRequest::class));
    }
}
