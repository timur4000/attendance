<div class="grid-row">

    <div class="grid-column grid-column-4">

        <div class="row-detail row-detail--size-default row-detail--theme-default">

            <div class="image-detail image-detail--type-circle image-detail--size-default image-detail--theme-default">
                {!! \App\Handlers\Admin\ScaUsers\ScaUsersHandler::picture_display($record->id_user) !!}
            </div>

        </div>

        <div class="row-detail row-detail--size-default row-detail--theme-default margin-top-20">

            <ul class="list-detail">

                <li class="list-detail__item list-detail__item--size-default">

                    <p class="list-detail__item-property list-detail__item-property--size-default list-detail__item-property--theme-default">Surname</p>

                    <p class="list-detail__item-value list-detail__item-value--size-default list-detail__item-value--theme-default">{{ $record->sur_name }}</p>

                </li>

                <li class="list-detail__item list-detail__item--size-default">

                    <p class="list-detail__item-property list-detail__item-property--size-default list-detail__item-property--theme-default">First name</p>

                    <p class="list-detail__item-value list-detail__item-value--size-default list-detail__item-value--theme-default">{{ $record->first_name }}</p>

                </li>

                <li class="list-detail__item list-detail__item--size-default">

                    <p class="list-detail__item-property list-detail__item-property--size-default list-detail__item-property--theme-default">Patronymic</p>

                    <p class="list-detail__item-value list-detail__item-value--size-default list-detail__item-value--theme-default">{{ $record->patronymic }}</p>

                </li>

                <li class="list-detail__item list-detail__item--size-default">

                    <p class="list-detail__item-property list-detail__item-property--size-default list-detail__item-property--theme-default">Date of birth</p>

                    <p class="list-detail__item-value list-detail__item-value--size-default list-detail__item-value--theme-default">{{ $record->date_birth }}</p>

                </li>

                <li class="list-detail__item list-detail__item--size-default">

                    <p class="list-detail__item-property list-detail__item-property--size-default list-detail__item-property--theme-default">Unit</p>

                    <p class="list-detail__item-value list-detail__item-value--size-default list-detail__item-value--theme-default">{{ $record->name_unit }}</p>

                </li>

                <li class="list-detail__item list-detail__item--size-default">

                    <p class="list-detail__item-property list-detail__item-property--size-default list-detail__item-property--theme-default">Position</p>

                    <p class="list-detail__item-value list-detail__item-value--size-default list-detail__item-value--theme-default">{{ $record->name_position }}</p>

                </li>

                <li class="list-detail__item list-detail__item--size-default">

                    <p class="list-detail__item-property list-detail__item-property--size-default list-detail__item-property--theme-default">Category</p>

                    <p class="list-detail__item-value list-detail__item-value--size-default list-detail__item-value--theme-default">{{ $record->name_category }}</p>

                </li>

                <li class="list-detail__item list-detail__item--size-default">

                    <p class="list-detail__item-property list-detail__item-property--size-default list-detail__item-property--theme-default">Gender</p>

                    <p class="list-detail__item-value list-detail__item-value--size-default list-detail__item-value--theme-default">{{ $record->name_gender }}</p>

                </li>

                <li class="list-detail__item list-detail__item--size-default">

                    <p class="list-detail__item-property list-detail__item-property--size-default list-detail__item-property--theme-default">Country</p>

                    <p class="list-detail__item-value list-detail__item-value--size-default list-detail__item-value--theme-default">{{ $record->name_country }}</p>

                </li>

                <li class="list-detail__item list-detail__item--size-default">

                    <p class="list-detail__item-property list-detail__item-property--size-default list-detail__item-property--theme-default">barcode</p>

                    <p class="list-detail__item-value list-detail__item-value--size-default list-detail__item-value--theme-default">{{ $record->user_barcode ?? '--' }}</p>

                </li>

                <li class="list-detail__item list-detail__item--size-default">

                    <p class="list-detail__item-property list-detail__item-property--size-default list-detail__item-property--theme-default">Parent 1</p>

                    <p class="list-detail__item-value list-detail__item-value--size-default list-detail__item-value--theme-default">{{ $record->info_parent_1 ?: '--' }}</p>

                </li>

                <li class="list-detail__item list-detail__item--size-default">

                    <p class="list-detail__item-property list-detail__item-property--size-default list-detail__item-property--theme-default">Parent 2</p>

                    <p class="list-detail__item-value list-detail__item-value--size-default list-detail__item-value--theme-default">{{ $record->info_parent_2 ?: '--' }}</p>

                </li>

                <li class="list-detail__item list-detail__item--size-default">

                    <p class="list-detail__item-property list-detail__item-property--size-default list-detail__item-property--theme-default">Driver 1</p>

                    <p class="list-detail__item-value list-detail__item-value--size-default list-detail__item-value--theme-default">{{ $record->info_driver_1 ?: '--' }}</p>

                </li>

            </ul>

        </div>

    </div>

    <div class="grid-column grid-column-8">

        <section class="table table--size-default table--theme-mercury" id="users-arrivals-departures-table" data-id-user="{{ $record->id_user }}" data-delete-action="{{ \App\Standards\RouteGroups\Abstracts\RouteGroup::get_route(\App\RoutesRequests\Admin\Users\UsersArrivalsDeparturesPostRouteRequest::class) }}"></section>

{{--        <section class="table table--size-default table--theme-mercury" id="sca-user-attendance-table" data-id-user="{{ $record->id_user }}"></section>--}}

    </div>

</div>