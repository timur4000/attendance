@extends(admin_directory('layouts.app'))

@section('title', 'Attendance | Tuition')

@section('content')

    <section class="table table--size-default table--theme-mercury" id="main-table"
             data-detail-url="{{ \App\Standards\RouteGroups\Abstracts\RouteGroup::get_route(\App\RoutesRequests\Admin\ServicesPayment\Tuition\TuitionDetailGetRouteRequest::class, [ 'user_id' => '%s' ]) }}"
             data-url="{{ \App\Standards\RouteGroups\Abstracts\RouteGroup::get_route(\App\RoutesRequests\Admin\ServicesPayment\Tuition\TuitionListJsonPostRouteRequest::class) }}"></section>

@endsection