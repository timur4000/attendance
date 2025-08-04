<div class="grid-row">

    <div class="grid-column grid-column-4">

        <div class="row-detail row-detail--size-default row-detail--theme-default">

            <ul class="list-detail report-attendance-list-detail" data-list-detail-data="{{ json_encode([ 'id_user' => $record->id_user ]) }}" data-list-detail-url="{{ \App\Standards\RouteGroups\Abstracts\RouteGroup::get_route(\App\RoutesRequests\Admin\ScaUsers\ScaUsersReportAttendancePostRouteRequest::class) }}"></ul>

        </div>

    </div>

    <div class="grid-column grid-column-8">

        <section class="table table--size-default table--theme-mercury" id="users-arrivals-departures-table" data-id-user="{{ $record->id_user }}" data-delete-action="{{ \App\Standards\RouteGroups\Abstracts\RouteGroup::get_route(\App\RoutesRequests\Admin\Users\UsersArrivalsDeparturesPostRouteRequest::class) }}"></section>

    </div>

</div>