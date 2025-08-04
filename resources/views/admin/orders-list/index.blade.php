@extends(admin_directory('admin.layouts.app'))

@section('title', 'Orders | Attendance')

@section('content')

    <section class="table table--size-default table--theme-mercury" id="orders-list-table"></section>

    <template data-modal-template="orders-list-detail-modal">

        <h3 class="form__alert alert alert--size-default alert--theme-persian-rose inactive" data-form-error></h3>

        <form action="" method="post" id="orders-list-form"></form>

        <ul class="orders-items orders-items--size-default orders-items--theme-default disable"
            data-change-url="{{ \App\Standards\RouteGroups\Abstracts\RouteGroup::get_route(\App\RoutesRequests\Admin\OrdersList\OrdersListChangePatchRouteRequest::class) }}"
            data-url="{{ \App\Standards\RouteGroups\Abstracts\RouteGroup::get_route(\App\RoutesRequests\Admin\Orders\OrdersItemsJsonPostRouteRequest::class) }}" data-orders-list-items></ul>

    </template>

@endsection