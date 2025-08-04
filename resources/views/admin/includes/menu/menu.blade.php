<section class="menu menu--size-default" id="menu">

    <ul class="menu-list">

        @foreach(\App\Handlers\Admin\AdminMenu\AdminMenuHandler::tree_records() as $record)

            @continue(!\App\Handlers\Admin\AdminMenu\AdminMenuHandler::has_permissions($record->id) || !\App\Handlers\Admin\AdminMenu\AdminMenuHandler::has_permission_group($record->id))

            @include(admin_directory('admin.includes.menu.item'), [ 'record' => $record ])

        @endforeach


        <li style="display: none;"
            class="menu-item menu-item--size-default {{ get_is('active', \App\Standards\RouteGroups\Abstracts\RouteGroup::is_route(\App\RoutesRequests\Admin\Dashboard\DashboardIndexGetRouteRequest::class)) }}">

            <a href="{{ route(\App\Standards\RouteGroups\Abstracts\RouteGroup::get_sequence(\App\RoutesRequests\Admin\Dashboard\DashboardIndexGetRouteRequest::class)) }}"
               class="menu-link menu-link--size-default menu-link--theme-charade" data-clue="Dashboard" data-position="right">

                <div class="menu-link__main">

                    <div class="menu-link__icon menu-link__icon--type-incline">{!! svg('business-trend-up', [ 'class' => 'icon icon-size-18' ]) !!}</div>

                    <div class="menu-link__text">Dashboard</div>

                </div>

            </a>

        </li>

        <li style="display: none;"
            class="menu-item menu-item--size-default {{ get_is('active', \App\Standards\RouteGroups\Abstracts\RouteGroup::is_route(\App\RoutesRequests\Admin\AdminMenu\AdminMenuIndexGetRouteRequest::class, true)) }}">

            <a href="{{ route(\App\Standards\RouteGroups\Abstracts\RouteGroup::get_sequence(\App\RoutesRequests\Admin\AdminMenu\AdminMenuIndexGetRouteRequest::class)) }}"
               class="menu-link menu-link--size-default menu-link--theme-charade" data-clue="Admin Menu" data-position="right">

                <div class="menu-link__main">

                    <div class="menu-link__icon menu-link__icon--type-incline">{!! svg('content-clipboard-text', [ 'class' => 'icon icon-size-18' ]) !!}</div>

                    <div class="menu-link__text">Admin Menu</div>

                </div>

            </a>

        </li>

        <li style="display: none;"
            class="menu-item menu-item--size-default {{ get_is('active', \App\Standards\RouteGroups\Abstracts\RouteGroup::is_route(\App\RoutesRequests\Admin\MainSpriteIcons\MainSpriteIconsIndexGetRouteRequest::class, true)) }}">

            <a href="{{ route(\App\Standards\RouteGroups\Abstracts\RouteGroup::get_sequence(\App\RoutesRequests\Admin\MainSpriteIcons\MainSpriteIconsIndexGetRouteRequest::class)) }}"
               class="menu-link menu-link--size-default menu-link--theme-charade" data-clue="Main Sprite Icons" data-position="right">

                <div class="menu-link__main">

                    <div class="menu-link__icon menu-link__icon--type-incline">{!! svg('content-clipboard-text', [ 'class' => 'icon icon-size-18' ]) !!}</div>

                    <div class="menu-link__text">Main Sprite Icons</div>

                </div>

            </a>

        </li>

        <li style="display: none;"
            class="menu-item menu-item--size-default {{ get_is('active', \App\Standards\RouteGroups\Abstracts\RouteGroup::is_route(\App\RoutesRequests\Admin\HttpMethods\HttpMethodsIndexGetRouteRequest::class, true)) }}">

            <a href="{{ route(\App\Standards\RouteGroups\Abstracts\RouteGroup::get_sequence(\App\RoutesRequests\Admin\HttpMethods\HttpMethodsIndexGetRouteRequest::class)) }}"
               class="menu-link menu-link--size-default menu-link--theme-charade" data-clue="Http Methods" data-position="right">

                <div class="menu-link__main">

                    <div class="menu-link__icon menu-link__icon--type-incline">{!! svg('content-clipboard-text', [ 'class' => 'icon icon-size-18' ]) !!}</div>

                    <div class="menu-link__text">Http Methods</div>

                </div>

            </a>

        </li>

        <li style="display: none;"
            class="menu-item menu-item--size-default {{ get_is('active', \App\Standards\RouteGroups\Abstracts\RouteGroup::is_route(\App\RoutesRequests\Admin\Permissions\AdminPermissionsIndexGetRouteRequest::class, true)) }}">

            <a href="{{ route(\App\Standards\RouteGroups\Abstracts\RouteGroup::get_sequence(\App\RoutesRequests\Admin\Permissions\AdminPermissionsIndexGetRouteRequest::class)) }}"
               class="menu-link menu-link--size-default menu-link--theme-charade" data-clue="Admin Permissions" data-position="right">

                <div class="menu-link__main">

                    <div class="menu-link__icon menu-link__icon--type-incline">{!! svg('security-shield', [ 'class' => 'icon icon-size-18' ]) !!}</div>

                    <div class="menu-link__text">Admin Permissions</div>

                </div>

            </a>

        </li>

        <li style="display: none;"
            class="menu-item menu-item--size-default {{ get_is('active', \App\Standards\RouteGroups\Abstracts\RouteGroup::is_route(\App\RoutesRequests\Admin\AdminPermissionGroups\AdminPermissionGroupsIndexGetRouteRequest::class, true)) }}">

            <a href="{{ route(\App\Standards\RouteGroups\Abstracts\RouteGroup::get_sequence(\App\RoutesRequests\Admin\AdminPermissionGroups\AdminPermissionGroupsIndexGetRouteRequest::class)) }}"
               class="menu-link menu-link--size-default menu-link--theme-charade" data-clue="Admin Permission Groups" data-position="right">

                <div class="menu-link__main">

                    <div class="menu-link__icon menu-link__icon--type-incline">{!! svg('security-shield', [ 'class' => 'icon icon-size-18' ]) !!}</div>

                    <div class="menu-link__text">Admin Permission Groups</div>

                </div>

            </a>

        </li>

        <li style="display: none;"
            class="menu-item menu-item--size-default {{ get_is('active', \App\Standards\RouteGroups\Abstracts\RouteGroup::is_route(\App\RoutesRequests\Admin\AdminRoles\AdminRolesIndexGetRouteRequest::class, true)) }}">

            <a href="{{ route(\App\Standards\RouteGroups\Abstracts\RouteGroup::get_sequence(\App\RoutesRequests\Admin\AdminRoles\AdminRolesIndexGetRouteRequest::class)) }}"
               class="menu-link menu-link--size-default menu-link--theme-charade" data-clue="Admin Roles" data-position="right">

                <div class="menu-link__main">

                    <div class="menu-link__icon menu-link__icon--type-incline">{!! svg('security-shield', [ 'class' => 'icon icon-size-18' ]) !!}</div>

                    <div class="menu-link__text">Admin Roles</div>

                </div>

            </a>

        </li>

        {{--        <li class="menu-item menu-item--size-default">--}}

        {{--            <a href="#" class="menu-link menu-link--size-default menu-link--theme-charade" data-clue="Statistics" data-position="right">--}}

        {{--                <div class="menu-link__main">--}}

        {{--                    <div class="menu-link__icon menu-link__icon--type-incline">{!! svg('business-chart', [ 'class' => 'icon icon-size-18' ]) !!}</div>--}}

        {{--                    <div class="menu-link__text">Statistics</div>--}}

        {{--                </div>--}}

        {{--                <div class="menu-link__append menu-link__append--size-default menu-link__append--theme-royal-blue menu-link__append--type-notification">12</div>--}}

        {{--            </a>--}}

        {{--        </li>--}}

        <li style="display: none;"
            class="menu-item menu-item--size-default {{ get_is('active', \App\Standards\RouteGroups\Abstracts\RouteGroup::is_route(\App\RoutesRequests\Admin\Users\UsersIndexGetRouteRequest::class)) }}">

            <a href="{{ route(\App\Standards\RouteGroups\Abstracts\RouteGroup::get_sequence(\App\RoutesRequests\Admin\Users\UsersIndexGetRouteRequest::class)) }}"
               class="menu-link menu-link--size-default menu-link--theme-charade" data-clue="Users" data-position="right">

                <div class="menu-link__main">

                    <div class="menu-link__icon menu-link__icon--type-incline">{!! svg('user-profiles', [ 'class' => 'icon icon-size-18' ]) !!}</div>

                    <div class="menu-link__text">Users</div>

                </div>

            </a>

        </li>

        <li style="display: none;"
            class="menu-item menu-item--size-default {{ get_is([ 'close', 'open' ], \App\Standards\RouteGroups\Abstracts\RouteGroup::is_route(\App\RouteGroups\Admin\Prices\PricesRouteGroup::class)) }}"
            data-menu-content>

            <a class="menu-link menu-link--size-default menu-link--theme-charade" data-clue="Prices" data-position="right">

                <div class="menu-link__main">

                    <div class="menu-link__icon menu-link__icon--type-incline">{!! svg('money-dollar-square', [ 'class' => 'icon icon-size-18' ]) !!}</div>

                    <div class="menu-link__text">Prices</div>

                </div>

                <div class="menu-link__append menu-link__append--size-default menu-link__append--type-arrow">{!! svg('arrows-down', [ 'class' => 'icon icon-size-12' ]) !!}</div>

            </a>

            <div class="menu-content">
                <ul class="menu-list menu-list--size-default menu-list--theme-mercury menu-list--type-inner">

                    <li class="menu-item menu-item--size-default {{ get_is('active', \App\Standards\RouteGroups\Abstracts\RouteGroup::is_route(\App\RoutesRequests\Admin\Prices\Invoices\InvoicesIndexGetRouteRequest::class, true)) }}">

                        <a href="{{ route(\App\Standards\RouteGroups\Abstracts\RouteGroup::get_sequence(\App\RoutesRequests\Admin\Prices\Invoices\InvoicesIndexGetRouteRequest::class)) }}"
                           class="menu-link menu-link--size-default menu-link--theme-charade" data-clue="Invoices" data-position="right">

                            <div class="menu-link__main">

                                <div class="menu-link__icon menu-link__icon--type-incline">{!! svg('money-empty-wallet-time', [ 'class' => 'icon icon-size-18' ]) !!}</div>

                                <div class="menu-link__text">Invoices</div>

                            </div>

                        </a>

                    </li>

                    <li class="menu-item menu-item--size-default {{ get_is('active', \App\Standards\RouteGroups\Abstracts\RouteGroup::is_route(\App\RoutesRequests\Admin\Prices\Food\FoodIndexGetRouteRequest::class, true)) }}">

                        <a href="{{ route(\App\Standards\RouteGroups\Abstracts\RouteGroup::get_sequence(\App\RoutesRequests\Admin\Prices\Food\FoodIndexGetRouteRequest::class)) }}"
                           class="menu-link menu-link--size-default menu-link--theme-charade" data-clue="Food" data-position="right">

                            <div class="menu-link__main">

                                <div class="menu-link__icon menu-link__icon--type-incline">{!! svg('money-empty-wallet-time', [ 'class' => 'icon icon-size-18' ]) !!}</div>

                                <div class="menu-link__text">Food</div>

                            </div>

                        </a>

                    </li>

                </ul>

            </div>

        </li>

        <li style="display: none;" class="menu-item menu-item--size-default {{ get_is([ 'close', 'open' ], \App\Standards\RouteGroups\Abstracts\RouteGroup::is_route(\App\RouteGroups\Admin\Presence\PresenceRouteGroup::class)) }}"
            data-menu-content>

            <a class="menu-link menu-link--size-default menu-link--theme-charade" data-clue="Presence" data-position="right">

                <div class="menu-link__main">

                    <div class="menu-link__icon menu-link__icon--type-incline">{!! svg('time-calendar', [ 'class' => 'icon icon-size-18' ]) !!}</div>

                    <div class="menu-link__text">Presence</div>

                </div>

                <div class="menu-link__append menu-link__append--size-default menu-link__append--type-arrow">{!! svg('arrows-down', [ 'class' => 'icon icon-size-12' ]) !!}</div>

            </a>

            <div class="menu-content">
                <ul class="menu-list menu-list--size-default menu-list--theme-mercury menu-list--type-inner">

                    <li class="menu-item menu-item--size-default {{ get_is('active', \App\Standards\RouteGroups\Abstracts\RouteGroup::is_route(\App\RoutesRequests\Admin\Presence\Latecomers\ScaLatecomersIndexGetRouteRequest::class, true)) }}">

                        <a href="{{ route(\App\Standards\RouteGroups\Abstracts\RouteGroup::get_sequence(\App\RoutesRequests\Admin\Presence\Latecomers\ScaLatecomersIndexGetRouteRequest::class)) }}"
                           class="menu-link menu-link--size-default menu-link--theme-charade" data-clue="Latecomers" data-position="right">

                            <div class="menu-link__main">

                                <div class="menu-link__icon menu-link__icon--type-incline">{!! svg('time-clock-alert-outline', [ 'class' => 'icon icon-size-18' ]) !!}</div>

                                <div class="menu-link__text">Latecomers</div>

                            </div>

                        </a>

                    </li>

                    <li class="menu-item menu-item--size-default {{ get_is('active', \App\Standards\RouteGroups\Abstracts\RouteGroup::is_route(\App\RoutesRequests\Admin\Presence\Arrived\ScaArrivedOnTimeIndexGetRouteRequest::class, true)) }}">

                        <a href="{{ route(\App\Standards\RouteGroups\Abstracts\RouteGroup::get_sequence(\App\RoutesRequests\Admin\Presence\Arrived\ScaArrivedOnTimeIndexGetRouteRequest::class)) }}"
                           class="menu-link menu-link--size-default menu-link--theme-charade" data-clue="Arrived on time" data-position="right">

                            <div class="menu-link__main">

                                <div class="menu-link__icon menu-link__icon--type-incline">{!! svg('time-clock-check-outline', [ 'class' => 'icon icon-size-18' ]) !!}</div>

                                <div class="menu-link__text">Arrived on time</div>

                            </div>

                        </a>

                    </li>

                </ul>

            </div>

        </li>

        <li style="display: none;" class="menu-item menu-item--size-default {{ get_is([ 'close', 'open' ], \App\Standards\RouteGroups\Abstracts\RouteGroup::is_route(\App\RouteGroups\Admin\ServicesPayment\ServicesPaymentRouteGroup::class)) }}"
            data-menu-content>

            <a class="menu-link menu-link--size-default menu-link--theme-charade" data-clue="Services Payment" data-position="right">

                <div class="menu-link__main">

                    <div class="menu-link__icon menu-link__icon--type-incline">{!! svg('money-receipt-item', [ 'class' => 'icon icon-size-18' ]) !!}</div>

                    <div class="menu-link__text">Services Payment</div>

                </div>

                <div class="menu-link__append menu-link__append--size-default menu-link__append--type-arrow">{!! svg('arrows-down', [ 'class' => 'icon icon-size-12' ]) !!}</div>

            </a>

            <div class="menu-content">
                <ul class="menu-list menu-list--size-default menu-list--theme-mercury menu-list--type-inner">

                    <li class="menu-item menu-item--size-default {{ get_is('active', \App\Standards\RouteGroups\Abstracts\RouteGroup::is_route(\App\RoutesRequests\Admin\ServicesPayment\Tuition\TuitionIndexGetRouteRequest::class, true)) }}">

                        <a href="{{ route(\App\Standards\RouteGroups\Abstracts\RouteGroup::get_sequence(\App\RoutesRequests\Admin\ServicesPayment\Tuition\TuitionIndexGetRouteRequest::class)) }}"
                           class="menu-link menu-link--size-default menu-link--theme-charade" data-clue="Tuition" data-position="right">

                            <div class="menu-link__main">

                                <div class="menu-link__icon menu-link__icon--type-incline">{!! svg('money-empty-wallet-time', [ 'class' => 'icon icon-size-18' ]) !!}</div>

                                <div class="menu-link__text">Tuition</div>

                            </div>

                        </a>

                    </li>

                </ul>

            </div>

        </li>

        <li style="display: none;" class="menu-item menu-item--size-default {{ get_is('active', \App\Standards\RouteGroups\Abstracts\RouteGroup::is_route(\App\RoutesRequests\Admin\ClassifierTypes\ClassifierTypesIndexGetRouteRequest::class)) }}">

            <a href="{{ route(\App\Standards\RouteGroups\Abstracts\RouteGroup::get_sequence(\App\RoutesRequests\Admin\ClassifierTypes\ClassifierTypesIndexGetRouteRequest::class)) }}"
               class="menu-link menu-link--size-default menu-link--theme-charade" data-clue="Classifier Types" data-position="right">

                <div class="menu-link__main">

                    <div class="menu-link__icon menu-link__icon--type-incline">{!! svg('content-menu-board', [ 'class' => 'icon icon-size-18' ]) !!}</div>

                    <div class="menu-link__text">Classifier Types</div>

                </div>

            </a>

        </li>

        <li style="display: none;" class="menu-item menu-item--size-default {{ get_is([ 'close', 'open' ], \App\Standards\RouteGroups\Abstracts\RouteGroup::is_route(\App\RouteGroups\Admin\Classifiers\ClassifiersRouteGroup::class)) }}"
            data-menu-content>

            <a class="menu-link menu-link--size-default menu-link--theme-charade" data-clue="Classifiers" data-position="right">

                <div class="menu-link__main">

                    <div class="menu-link__icon menu-link__icon--type-incline">{!! svg('content-clipboard-text', [ 'class' => 'icon icon-size-18' ]) !!}</div>

                    <div class="menu-link__text">Classifiers</div>

                </div>

                <div class="menu-link__append menu-link__append--size-default menu-link__append--type-arrow">{!! svg('arrows-down', [ 'class' => 'icon icon-size-12' ]) !!}</div>

            </a>

            <div class="menu-content">
                <ul class="menu-list menu-list--size-default menu-list--theme-mercury menu-list--type-inner">

                    <li class="menu-item menu-item--size-default {{ get_is('active', \App\Standards\RouteGroups\Abstracts\RouteGroup::is_route(\App\RoutesRequests\Admin\Classifiers\Unit\UnitGetRouteRequest::class)) }}">

                        <a href="{{ route(\App\Standards\RouteGroups\Abstracts\RouteGroup::get_request_sequence(\App\RoutesRequests\Admin\Classifiers\Unit\UnitGetRouteRequest::class)) }}"
                           class="menu-link menu-link--size-default menu-link--theme-charade" data-clue="Units" data-position="right">

                            <div class="menu-link__main">

                                <div class="menu-link__icon menu-link__icon--type-incline">{!! svg('programming-hierarchy', [ 'class' => 'icon icon-size-18' ]) !!}</div>

                                <div class="menu-link__text">Units</div>

                            </div>

                        </a>

                    </li>

                    <li class="menu-item menu-item--size-default {{ get_is('active', \App\Standards\RouteGroups\Abstracts\RouteGroup::is_route(\App\RoutesRequests\Admin\Classifiers\Position\PositionGetRouteRequest::class)) }}">

                        <a href="{{ route(\App\Standards\RouteGroups\Abstracts\RouteGroup::get_request_sequence(\App\RoutesRequests\Admin\Classifiers\Position\PositionGetRouteRequest::class)) }}"
                           class="menu-link menu-link--size-default menu-link--theme-charade" data-clue="Positions" data-position="right">

                            <div class="menu-link__main">

                                <div class="menu-link__icon menu-link__icon--type-incline">{!! svg('user-people', [ 'class' => 'icon icon-size-18' ]) !!}</div>

                                <div class="menu-link__text">Positions</div>

                            </div>

                        </a>

                    </li>

                    <li class="menu-item menu-item--size-default {{ get_is('active', \App\Standards\RouteGroups\Abstracts\RouteGroup::is_route(\App\RoutesRequests\Admin\Classifiers\Currency\CurrencyGetRouteRequest::class)) }}">

                        <a href="{{ route(\App\Standards\RouteGroups\Abstracts\RouteGroup::get_request_sequence(\App\RoutesRequests\Admin\Classifiers\Currency\CurrencyGetRouteRequest::class)) }}"
                           class="menu-link menu-link--size-default menu-link--theme-charade" data-clue="Currencies" data-position="right">

                            <div class="menu-link__main">

                                <div class="menu-link__icon menu-link__icon--type-incline">{!! svg('money-wallet', [ 'class' => 'icon icon-size-18' ]) !!}</div>

                                <div class="menu-link__text">Currencies</div>

                            </div>

                        </a>

                    </li>

                    <li class="menu-item menu-item--size-default {{ get_is('active', \App\Standards\RouteGroups\Abstracts\RouteGroup::is_route(\App\RoutesRequests\Admin\Classifiers\Language\LanguageGetRouteRequest::class)) }}">

                        <a href="{{ route(\App\Standards\RouteGroups\Abstracts\RouteGroup::get_request_sequence(\App\RoutesRequests\Admin\Classifiers\Language\LanguageGetRouteRequest::class)) }}"
                           class="menu-link menu-link--size-default menu-link--theme-charade" data-clue="Languages" data-position="right">

                            <div class="menu-link__main">

                                <div class="menu-link__icon menu-link__icon--type-incline">{!! svg('location-global', [ 'class' => 'icon icon-size-18' ]) !!}</div>

                                <div class="menu-link__text">Languages</div>

                            </div>

                        </a>

                    </li>

                    <li class="menu-item menu-item--size-default {{ get_is('active', \App\Standards\RouteGroups\Abstracts\RouteGroup::is_route(\App\RoutesRequests\Admin\Classifiers\Food\FoodGetRouteRequest::class)) }}">

                        <a href="{{ route(\App\Standards\RouteGroups\Abstracts\RouteGroup::get_request_sequence(\App\RoutesRequests\Admin\Classifiers\Food\FoodGetRouteRequest::class)) }}"
                           class="menu-link menu-link--size-default menu-link--theme-charade" data-clue="Food" data-position="right">

                            <div class="menu-link__main">

                                <div class="menu-link__icon menu-link__icon--type-incline">{!! svg('essential-reserve', [ 'class' => 'icon icon-size-18' ]) !!}</div>

                                <div class="menu-link__text">Food</div>

                            </div>

                        </a>

                    </li>

                    <li class="menu-item menu-item--size-default {{ get_is('active', \App\Standards\RouteGroups\Abstracts\RouteGroup::is_route(\App\RoutesRequests\Admin\Classifiers\Gender\GenderGetRouteRequest::class)) }}">

                        <a href="{{ route(\App\Standards\RouteGroups\Abstracts\RouteGroup::get_request_sequence(\App\RoutesRequests\Admin\Classifiers\Gender\GenderGetRouteRequest::class)) }}"
                           class="menu-link menu-link--size-default menu-link--theme-charade" data-clue="Genders" data-position="right">

                            <div class="menu-link__main">

                                <div class="menu-link__icon menu-link__icon--type-incline">{!! svg('user-gender', [ 'class' => 'icon icon-size-18' ]) !!}</div>

                                <div class="menu-link__text">Genders</div>

                            </div>

                        </a>

                    </li>

                    <li class="menu-item menu-item--size-default {{ get_is('active', \App\Standards\RouteGroups\Abstracts\RouteGroup::is_route(\App\RoutesRequests\Admin\Classifiers\Country\CountryGetRouteRequest::class)) }}">

                        <a href="{{ route(\App\Standards\RouteGroups\Abstracts\RouteGroup::get_request_sequence(\App\RoutesRequests\Admin\Classifiers\Country\CountryGetRouteRequest::class)) }}"
                           class="menu-link menu-link--size-default menu-link--theme-charade" data-clue="Countries" data-position="right">

                            <div class="menu-link__main">

                                <div class="menu-link__icon menu-link__icon--type-incline">{!! svg('programming-hierarchy', [ 'class' => 'icon icon-size-18' ]) !!}</div>

                                <div class="menu-link__text">Countries</div>

                            </div>

                        </a>

                    </li>

                    <li class="menu-item menu-item--size-default {{ get_is('active', \App\Standards\RouteGroups\Abstracts\RouteGroup::is_route(\App\RoutesRequests\Admin\Classifiers\Person\PersonGetRouteRequest::class)) }}">

                        <a href="{{ route(\App\Standards\RouteGroups\Abstracts\RouteGroup::get_request_sequence(\App\RoutesRequests\Admin\Classifiers\Person\PersonGetRouteRequest::class)) }}"
                           class="menu-link menu-link--size-default menu-link--theme-charade" data-clue="Person Categories" data-position="right">

                            <div class="menu-link__main">

                                <div class="menu-link__icon menu-link__icon--type-incline">{!! svg('content-menu-board', [ 'class' => 'icon icon-size-18' ]) !!}</div>

                                <div class="menu-link__text">Person Categories</div>

                            </div>

                        </a>

                    </li>

                    <li class="menu-item menu-item--size-default {{ get_is('active', \App\Standards\RouteGroups\Abstracts\RouteGroup::is_route(\App\RoutesRequests\Admin\Classifiers\Status\StatusGetRouteRequest::class)) }}">

                        <a href="{{ route(\App\Standards\RouteGroups\Abstracts\RouteGroup::get_request_sequence(\App\RoutesRequests\Admin\Classifiers\Status\StatusGetRouteRequest::class)) }}"
                           class="menu-link menu-link--size-default menu-link--theme-charade" data-clue="Statuses" data-position="right">

                            <div class="menu-link__main">

                                <div class="menu-link__icon menu-link__icon--type-incline">{!! svg('business-health', [ 'class' => 'icon icon-size-18' ]) !!}</div>

                                <div class="menu-link__text">Statuses</div>

                            </div>

                        </a>

                    </li>

                    <li class="menu-item menu-item--size-default {{ get_is('active', \App\Standards\RouteGroups\Abstracts\RouteGroup::is_route(\App\RoutesRequests\Admin\Classifiers\Absence\AbsenceGetRouteRequest::class)) }}">

                        <a href="{{ route(\App\Standards\RouteGroups\Abstracts\RouteGroup::get_request_sequence(\App\RoutesRequests\Admin\Classifiers\Absence\AbsenceGetRouteRequest::class)) }}"
                           class="menu-link menu-link--size-default menu-link--theme-charade" data-clue="Absences" data-position="right">

                            <div class="menu-link__main">

                                <div class="menu-link__icon menu-link__icon--type-incline">{!! svg('user-profile-delete', [ 'class' => 'icon icon-size-18' ]) !!}</div>

                                <div class="menu-link__text">Absences</div>

                            </div>

                        </a>

                    </li>

                    <li class="menu-item menu-item--size-default {{ get_is('active', \App\Standards\RouteGroups\Abstracts\RouteGroup::is_route(\App\RoutesRequests\Admin\Classifiers\Role\RoleGetRouteRequest::class)) }}">

                        <a href="{{ route(\App\Standards\RouteGroups\Abstracts\RouteGroup::get_request_sequence(\App\RoutesRequests\Admin\Classifiers\Role\RoleGetRouteRequest::class)) }}"
                           class="menu-link menu-link--size-default menu-link--theme-charade" data-clue="Roles" data-position="right">

                            <div class="menu-link__main">

                                <div class="menu-link__icon menu-link__icon--type-incline">{!! svg('user-profiles', [ 'class' => 'icon icon-size-18' ]) !!}</div>

                                <div class="menu-link__text">Roles</div>

                            </div>

                        </a>

                    </li>

                </ul>

            </div>

        </li>

    </ul>

</section>