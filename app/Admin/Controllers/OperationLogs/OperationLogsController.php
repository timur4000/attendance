<?php

namespace App\Admin\Controllers\OperationLogs;

use App\Admin\Controllers\BaseController;
use App\Handlers\Admin\OperationLogs\OperationLogsHandler;
use Illuminate\Contracts\View\View;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Implements operation logs actions.
 */
class OperationLogsController extends BaseController
{
    /**
     * Displaying index page.
     *
     * @return View
     */
    public function index(): View
    {
        $this->add_breadcrumb('', 'Operation Logs');

        return view(admin_directory('admin.operation-logs.index'))
            ->with($this->get_breadcrumbs_to_with());
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
        $records = OperationLogsHandler::records();

        return response()->json(
            [
                'data' => $records,
                'total' => OperationLogsHandler::total(),
            ]
        );
    }
}
