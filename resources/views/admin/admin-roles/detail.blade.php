@extends(admin_directory('admin.layouts.app'))

@section('title', 'AdminPermissions | Detail')

@section('content')

    <section class="record-view">

        <div class="record-view__line grid-row">

            <div class="record-view__line-column record-view__line-column--size-default grid-column grid-column-6">

                <a href="{{ \App\Standards\RouteGroups\Abstracts\RouteGroup::get_route(\App\RoutesRequests\Admin\AdminRoles\AdminRolesPutGetRouteRequest::class, [ 'id' => $record['id'] ]) }}" class="button button--type-square button--size-middle button--theme-white-azure-wild-sand margin-right-10" data-button data-clue="Edit">
                    {!! svg('content-edit', [ 'class' => 'icon icon-size-14' ]) !!}
                </a>

                <a href="{{ \App\Standards\RouteGroups\Abstracts\RouteGroup::get_route(\App\RoutesRequests\Admin\AdminRoles\AdminRolesDeleteGetRouteRequest::class, [ 'id' => $record['id'] ]) }}" class="button button--type-square button--size-middle button--theme-white-azure-bittersweet" data-button data-is-confirm data-clue="Delete">
                    {!! svg('essential-trash', [ 'class' => 'icon icon-size-14' ]) !!}
                </a>

            </div>

        </div>

        <div class="record-view__line margin-top-20">

            <div class="grid-row">

                <div class="grid-column grid-column-6">

                    <ul class="record-list record-list--theme-white">

                        @foreach($record as $key => $value)

                            <li class="record-list-item record-list-item--theme-mercury record-list-item--size-default record-list-item--type-line">

                                <div class="record-list-column record-list-column--size-default record-list-column-value record-list-column--theme-charade">{{ $key }}</div>

                                <div class="record-list-column record-list-column--size-default record-list-column-delimiter record-list-column--theme-jumbo">|</div>

                                <div class="record-list-column record-list-column--size-default record-list-column--theme-jumbo record-list-column-property">{{ json_encode($value) }}</div>

                            </li>

                        @endforeach

                    </ul>

                </div>

            </div>

        </div>

    </section>

@endsection