<nav class="left-navigation left-navigation--theme-white" id="left-navigation">

    <div class="left-navigation__header left-navigation__header--type-underline left-navigation__header--theme-mercury left-navigation__header--size-default">

        @include(admin_directory('admin.includes.logotype'))

        <button type="button" class="button button--value-bubble left-navigation__toggle left-navigation__toggle--theme left-navigation__toggle--size-middle" data-left-navigation-toggle>
            {!! svg('system-menu-line', [ 'class' => 'icon icon-size-14' ]) !!}
        </button>

    </div>

    <div class="left-navigation__main">

        @include(admin_directory('admin.includes.menu.menu'))

    </div>

</nav>