@extends(admin_directory('layouts.app'))

@section('title', 'Attendance | Tuition')

@section('content')

    <section class="table table--size-default table--theme-mercury" id="main-table"
             data-url="{{ \App\Standards\RouteGroups\Abstracts\RouteGroup::get_route(\App\RoutesRequests\Admin\Prices\Food\FoodListJsonPostRouteRequest::class) }}"></section>


    <template data-modal-template="edit-modal">

        <form action="{{ \App\Standards\RouteGroups\Abstracts\RouteGroup::get_route(\App\RoutesRequests\Admin\Prices\Food\FoodUpdatePostRouteRequest::class) }}" method="post" class="form">

            @include('admin.includes.forms.input', [ 'data' => [ 'input_type' => 'text', 'input_name' => 'price', 'icon_id' => 'essential-numeric', 'input_placeholder' => 'Sum' ] ])

            @csrf

            @include('admin.includes.forms.hidden', [ 'data' => [ 'name' => 'id_object' ] ])

        </form>

    </template>

@endsection