@extends(admin_directory('layouts.app'))

@section('stylesheet-path', 'asd')

@section('content')

    <section class="table table--size-default table--theme-mercury" id="units-table"
             data-url="{{ route(\App\Standards\RouteGroups\Abstracts\RouteGroup::get_request_sequence(\App\RoutesRequests\Admin\Classifiers\Unit\UnitListJsonPostRouteRequest::class)) }}"></section>

@endsection