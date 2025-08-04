<div class="menu-content">
    <ul class="menu-list menu-list--size-default menu-list--theme-mercury menu-list--type-inner">

        @foreach($trees as $tree)

            @continue(!\App\Handlers\Admin\AdminMenu\AdminMenuHandler::has_permissions($tree->id) || !\App\Handlers\Admin\AdminMenu\AdminMenuHandler::has_permission_group($tree->id))

            @include(admin_directory('admin.includes.menu.item'), [ 'record' => $tree ])

        @endforeach

    </ul>

</div>