<div class="grid-row">

    <div class="grid-column grid-column-5 grid-column--type-justify-star">

        <section class="table table--size-default table--theme-mercury margin-top-30" id="sca-user-food-card-history-table" data-id-user="{{ $record->id_user }}"
                 data-history-excel-action="{{ \App\Standards\RouteGroups\Abstracts\RouteGroup::get_route(\App\RoutesRequests\Admin\FoodCard\Export\FoodCardHistoryExportExcelGetRouteRequest::class) }}"
                 data-withdraw-action="{{ \App\Standards\RouteGroups\Abstracts\RouteGroup::get_route(\App\RoutesRequests\Admin\FoodCard\FoodCardWithdrawPostRouteRequest::class) }}"
                 data-cancel-withdraw-action="{{ \App\Standards\RouteGroups\Abstracts\RouteGroup::get_route(\App\RoutesRequests\Admin\FoodCard\FoodCardCancelWithdrawPostRouteRequest::class) }}"
                 data-delete-action="{{ \App\Standards\RouteGroups\Abstracts\RouteGroup::get_route(\App\RoutesRequests\Admin\FoodCard\FoodCardDeleteDeleteRouteRequest::class) }}"></section>

        <template data-modal-template="food-card-add-modal">

            {!!\App\Admin\Controllers\FoodCard\FoodCardController::get_form($record->id_user)->render() !!}

        </template>

    </div>

    <div class="grid-column grid-column-7">
        <section class="table table--size-default table--theme-mercury" id="sca-user-orders-history-table" data-id-user="{{ $record->id_user }}"></section>
    </div>

</div>