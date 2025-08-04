<?php

namespace App\Admin\Controllers\Gallery;

use App\Admin\Controllers\BaseController;
use App\ApiRequestSettings\Data\Rfid\RegistrationRecords\RegistrationRecordsApiRequestSettings;
use App\Handlers\Admin\Rfid\RegistrationRecords\RegistrationRecordsHandler;
use App\RoutesRequests\Admin\Gallery\GalleryIndexGetRouteRequest;
use App\Standards\Response\Classes\Response;
use App\Standards\RouteGroups\Abstracts\RouteGroup;
use Illuminate\Contracts\View\View;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use ReflectionException;

/**
 * Implements actions of the gallery routes.
 */
class GalleryController extends BaseController
{
    /**
     * Displaying index page.
     *
     * @return View
     */
    public function index(): View
    {
        $this->add_breadcrumb(RouteGroup::get_route(GalleryIndexGetRouteRequest::class), 'Gallery');

        return view(admin_directory('admin.gallery.index'))
            ->with($this->get_breadcrumbs_to_with());
    }

    /**
     * Returns all records of registration by current day.
     *
     * @param Request $request
     *
     * @return JsonResponse
     *
     * @throws ReflectionException
     */
    public function registration_records(Request $request): JsonResponse
    {
        $settings = new RegistrationRecordsApiRequestSettings();

        $settings->update($request->json()->all());

        $all = RegistrationRecordsHandler::all($settings);

        $records = RegistrationRecordsHandler::create_model($all->package);

        return Response::get_instance()->set_data($records)->json();
    }
}
