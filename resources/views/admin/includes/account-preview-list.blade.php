<div class="dropdown-content dropdown-content--theme-white" id="account-possibilities">

    <ul class="dropdown-content__list dropdown-content__list--size-small">

        {{--        <li class="dropdown-content__item dropdown-content__item--size-default dropdown-content__item--theme-mercury dropdown-content__item--type-group">--}}

        {{--            <h4 class="dropdown-content__heading dropdown-content__heading--theme-jumbo dropdown-content__heading--size-small">--}}
        {{--                Main--}}
        {{--            </h4>--}}

        {{--        </li>--}}

        <li class="dropdown-content__item dropdown-content__item--size-default dropdown-content__item--type-normal">

            <a href="#" class="dropdown-content__link dropdown-content__link--size-middle dropdown-content__link--theme-azure">

                <span class="dropdown-content__link-icon">
                    {!! svg('user-profile', [ 'class' => 'icon icon-size-16' ]) !!}
                </span>

                Account view

            </a>

        </li>

        <li class="dropdown-content__item dropdown-content__item--size-default dropdown-content__item--type-normal">

            <a href="#" class="dropdown-content__link dropdown-content__link--size-middle dropdown-content__link--theme-azure">

                <span class="dropdown-content__link-icon">
                    {!! svg('user-edit', [ 'class' => 'icon icon-size-16' ]) !!}
                </span>

                Account edit

            </a>

        </li>

        <li class="dropdown-content__item dropdown-content__item--size-default dropdown-content__item--type-normal">

            <a href="#" class="dropdown-content__link dropdown-content__link--size-middle dropdown-content__link--theme-azure">

                <span class="dropdown-content__link-icon">
                    {!! svg('settings-gear', [ 'class' => 'icon icon-size-16' ]) !!}
                </span>

                Settings

            </a>

        </li>

        <li class="dropdown-content__item dropdown-content__item--size-default dropdown-content__item--theme-mercury dropdown-content__item--type-separator"></li>

        <li class="dropdown-content__item dropdown-content__item--size-default dropdown-content__item--type-normal">

            <a href="{{ route(\App\Standards\RouteGroups\Abstracts\RouteGroup::get_request_sequence(\App\RoutesRequests\Admin\Authorization\AuthorizationLogoutPostRouteRequest::class)) }}"
               class="dropdown-content__link dropdown-content__link--size-middle dropdown-content__link--theme-persian-rose">

                <span class="dropdown-content__link-icon">
                    {!! svg('arrows-logout', [ 'class' => 'icon icon-size-16' ]) !!}
                </span>

                Log out

            </a>

        </li>

    </ul>

</div>