@extends(admin_directory('layouts.app'))

@section('title', 'Attendance | Employees')

@section('content')

    <section class="table table--size-default table--theme-mercury" id="users-table" data-detail-url=""
             data-url="{{ \App\Standards\RouteGroups\Abstracts\RouteGroup::get_route(\App\RoutesRequests\Admin\Users\UsersListJsonPostRouteRequest::class) }}"></section>

@endsection