@extends(admin_directory('admin.layouts.empty'))

@section('title', 'Simple Orders | Attendance')

@section('content')

    <ul class="simple-orders-list grid-row" id="simple-orders-list"
        data-new-state-time="{{ \App\Handlers\Admin\Configurations\Values\ValuesHandler::get_by_code('ORDER_ITEM_NEW_DURATION_MINUTES')->value_integer ?? 0 }}"
        data-stale-state-time="{{ \App\Handlers\Admin\Configurations\Values\ValuesHandler::get_by_code('ORDER_ITEM_STALE_DURATION_MINUTES')->value_integer ?? 0 }}"
        data-old-state-time="{{ \App\Handlers\Admin\Configurations\Values\ValuesHandler::get_by_code('ORDER_ITEM_OLD_DURATION_MINUTES')->value_integer ?? 0 }}"
        data-orders-url="{{ \App\Standards\RouteGroups\Abstracts\RouteGroup::get_route(\App\RoutesRequests\Admin\SimpleOrdersList\SimpleOrdersListRecordsJsonPostRouteRequest::class) }}"
        data-food-url="{{ \App\Standards\RouteGroups\Abstracts\RouteGroup::get_route(\App\RoutesRequests\Admin\Orders\OrdersItemsJsonPostRouteRequest::class) }}"
        data-exist-url="{{ \App\Standards\RouteGroups\Abstracts\RouteGroup::get_route(\App\RoutesRequests\Admin\SimpleOrdersList\SimpleOrdersListExistPostRouteRequest::class) }}"
        data-remove-url="{{ \App\Standards\RouteGroups\Abstracts\RouteGroup::get_route(\App\RoutesRequests\Admin\SimpleOrdersList\SimpleOrdersListRemovePostRouteRequest::class) }}"></ul>

@endsection