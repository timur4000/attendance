<?php

namespace App\RouteGroups\Admin\Absences;

use App\RoutesRequests\Admin\Absences\AbsencesDeletePostRouteRequest;
use App\RoutesRequests\Admin\Absences\AbsencesPatchPostRouteRequest;
use App\RoutesRequests\Admin\Absences\AbsencesRecordsJsonPostRouteRequest;
use App\Standards\RouteGroups\Abstracts\RouteGroup;

/**
 * Implements declare route group for the absences group.
 */
class AbsencesRouteGroup extends RouteGroup
{
    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('absences');
    }

    /**
     * @inheritdoc
     *
     * @return void
     */
    public function callable(): void
    {
        $this->call_request(AbsencesRecordsJsonPostRouteRequest::class);

        $this->call_request(AbsencesPatchPostRouteRequest::class);

        $this->call_request(AbsencesDeletePostRouteRequest::class);
    }
}
