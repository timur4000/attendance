@extends(admin_directory('layouts.app'))

@section('title', 'Attendance | Absent')

@section('content')

    <section class="table table--size-default table--theme-mercury" id="absent-table" data-detail-url=""
             data-url="{{ \App\Standards\RouteGroups\Abstracts\RouteGroup::get_route(\App\RoutesRequests\Admin\Presence\Absent\ScaAbsentListJsonPostRouteRequest::class) }}"></section>

@endsection