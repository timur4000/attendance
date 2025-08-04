@extends(admin_directory('layouts.app'))

@section('title', 'Attendance | Latecomers')

@section('content')

    <section class="table table--size-default table--theme-mercury" id="latecomers-table" data-detail-url=""
             data-url="{{ \App\Standards\RouteGroups\Abstracts\RouteGroup::get_route(\App\RoutesRequests\Admin\Presence\Latecomers\ScaLatecomersListJsonPostRouteRequest::class) }}"></section>

@endsection