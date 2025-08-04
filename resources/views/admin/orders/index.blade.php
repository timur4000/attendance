@extends(admin_directory('admin.layouts.empty'))

@section('title', 'Orders | Attendance')

@section('content')

    <section class="orders orders--size-default orders--theme-default grid-row" id="orders" data-account-url="{{ \App\Standards\RouteGroups\Abstracts\RouteGroup::get_route(\App\RoutesRequests\Admin\ScaUsers\ScaUsersRecordJsonPostRouteRequest::class) }}" data-items-url="{{ \App\Standards\RouteGroups\Abstracts\RouteGroup::get_route(\App\RoutesRequests\Admin\Orders\OrdersItemsJsonPostRouteRequest::class) }}" data-confirmation-url="{{ \App\Standards\RouteGroups\Abstracts\RouteGroup::get_route(\App\RoutesRequests\Admin\Orders\OrdersConfirmationPutRouteRequest::class) }}"></section>

@endsection