<?php

namespace App\Admin\Controllers\FrontendLogs;

use App\Logs\FrontendCustomLog;
use App\Standards\Response\Classes\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Implements frontend logs actions.
 */
class FrontendLogsController
{
    /**
     * Adds the specified log.
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function add(Request $request): JsonResponse
    {
        $json = $request->json()->all();

        $frontend_log = new FrontendCustomLog($json[ 'message' ], $json[ 'attributes' ]);

        $frontend_log->execute();

        $frontend_log = new FrontendCustomLog('');

        $frontend_log->execute();

        return Response::get_instance()->json();
    }
}
