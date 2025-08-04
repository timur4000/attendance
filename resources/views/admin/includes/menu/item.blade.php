@php($is_active = $record->route && (is_route($record->route) || is_route(postfix(preg_replace('/(?<=.)[^.]*$/', '', $record->route), \App\Standards\Classifiers\Chars\CharsClassifiers::ALL_DESIGNATE))))

<li class="menu-item menu-item--size-default {{ get_is('active', $is_active) }}" {{ get_is('data-menu-content', $record->trees->isNotEmpty()) }}>

    <a {{ get_is('href' . ($record->route ? '=' . route($record->route) : ''), !$record->trees->isNotEmpty()) }} class="menu-link menu-link--size-default menu-link--theme-charade" data-clue="{{ $record->title }}" data-position="right">

        <div class="menu-link__main">

            <div class="menu-link__icon menu-link__icon--type-incline">{!! svg($record->id_icon, [ 'class' => 'icon icon-size-18' ]) !!}</div>

            <div class="menu-link__text">
                {{ $record->title }}
            </div>

        </div>

        @if($record->trees->isNotEmpty())

            <div class="menu-link__append menu-link__append--size-default menu-link__append--type-arrow">{!! svg('arrows-down', [ 'class' => 'icon icon-size-12' ]) !!}</div>

        @endif

    </a>

    @if($record->trees->isNotEmpty())

        @include(admin_directory('admin.includes.menu.content'), [ 'trees' => $record->trees ])

    @endif

</li>