@extends(admin_directory('admin.layouts.app'))

@section('title', 'Main Sprite Icons | Attendance')

@section('content')

    <section class="icons-grid" id="main-icons-grid">

        <div class="icons-grid__upper grid-row">

            <div class="grid-column grid-column-6">

                {{--                @include(admin_directory('admin.includes.forms.default-input'), [ 'data' => [ 'input_name' => 'icon-grid-search', 'icon_id' => 'essential-dots-horizontal', 'input_type' => 'text', 'input_placeholder' => 'Search', 'autocomplete' => false ] ])--}}

            </div>

            <div class="grid-column grid-column-6 grid-column--type-justify-end">

                <a href="{{ \App\Standards\RouteGroups\Abstracts\RouteGroup::get_route(\App\RoutesRequests\Admin\MainSpriteIcons\MainSpriteIconsPutGetRouteRequest::class) }}"
                   class="button button--type-square button--size-middle button--theme-white-azure-wild-sand" data-clue="New icon">
                    {!! svg('essential-add-square', [ 'class' => 'icon icon-size-12' ]) !!}
                </a>

            </div>

        </div>

        <div class="icons-grid__middle margin-top-20 grid-row">

            @foreach(\App\Handlers\Admin\SpriteIcons\MainSpriteIcons\MainSpriteIconsHandler::records() as $record)

                <div class="grid-column grid-column-2">

                    <div class="icons-grid-item icons-grid-item--size-default icons-grid-item--theme-default" data-icons-grid-item data-clue="{{ $record->get_id() }}" data-position="top">

                        <div class="icons-grid-item__icon">
                            {!! svg($record->get_id(), [ 'class' => 'icon icon-size-20' ]) !!}
                        </div>

                        <div class="icons-grid-item-covering">

                            <button href="#" class="button button--type-square button--size-middle-small button--theme-white-azure-wild-sand" data-id="{{ $record->get_id() }}" data-clue="To clipboard"
                                    data-icons-grid-clipboard>
                                {!! svg('learning-clipboard', [ 'class' => 'icon icon-size-12' ]) !!}
                            </button>

                            <a href="{{ \App\Standards\RouteGroups\Abstracts\RouteGroup::get_route(\App\RoutesRequests\Admin\MainSpriteIcons\MainSpriteIconsPutGetRouteRequest::class, [ 'uuid' => $record->get_uuid() ]) }}"
                               class="button button--type-square button--size-middle-small button--theme-white-azure-wild-sand margin-left-15" data-clue="Edit">
                                {!! svg('content-edit', [ 'class' => 'icon icon-size-12' ]) !!}
                            </a>

                            <button onclick="if (confirm()) location.href = '{{ \App\Standards\RouteGroups\Abstracts\RouteGroup::get_route(\App\RoutesRequests\Admin\MainSpriteIcons\MainSpriteIconsDeleteGetRouteRequest::class, [ 'uuid' => $record->get_uuid() ]) }}';" class="button button--type-square button--size-middle-small button--theme-white-azure-bittersweet margin-left-15" data-clue="Delete">
                                {!! svg('essential-trash', [ 'class' => 'icon icon-size-12' ]) !!}
                            </button>

                        </div>

                    </div>

                </div>

            @endforeach

        </div>

    </section>

@endsection