@extends(admin_directory('admin.layouts.empty'))

@section('title', 'Simple Orders | Attendance')

@section('content')

    <section class="orders orders--size-default orders--theme-default grid-row" id="simple-orders" data-account-url="{{ \App\Standards\RouteGroups\Abstracts\RouteGroup::get_route(\App\RoutesRequests\Admin\ScaUsers\ScaUsersRecordJsonPostRouteRequest::class) }}" data-items-url="{{ \App\Standards\RouteGroups\Abstracts\RouteGroup::get_route(\App\RoutesRequests\Admin\Orders\OrdersItemsJsonPostRouteRequest::class) }}" data-confirmation-url="{{ \App\Standards\RouteGroups\Abstracts\RouteGroup::get_route(\App\RoutesRequests\Admin\SimpleOrders\SimpleOrdersConfirmationPutRouteRequest::class) }}" data-balance-url="{{ \App\Standards\RouteGroups\Abstracts\RouteGroup::get_route(\App\RoutesRequests\Admin\ScaUsers\ScaUsersFoodCardBalancePostRouteRequest::class) }}"></section>

    <template data-modal-template="deficit-modal">

        <p class="paragraph paragraph--size-medium paragraph--theme-royal-blue">You don't have enough funds on your card!</p>

    </template>

    <template data-modal-template="complete-modal">

        <p class="paragraph paragraph--size-medium paragraph--theme-royal-blue">Order has been created! Continue?</p>

    </template>

    <template data-modal-template="notification-modal">

        <p class="paragraph paragraph--size-medium paragraph--theme-royal-blue">Bon appetit!</p>

        <br />

        <p class="paragraph paragraph--size-medium paragraph--theme-royal-blue" id="notification-modal-prepend-text"></p>

    </template>

@endsection