<header class="header header--type-app header--theme-white template">

    <div class="template-wrapper">

        <div class="header__column header__column--type-left">

            @include(admin_directory('includes.breadcrumbs'))

        </div>

        <div class="header__column header__column--type-right">

            @include(admin_directory('includes.search'))

            @include(admin_directory('includes.notification-bell'))

            @include(admin_directory('includes.account-preview'))

        </div>

    </div>
    
</header>