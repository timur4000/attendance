{{--<ul class="line-switcher line-switcher--theme-mercury">--}}

{{--    @foreach(admin_locales() as $locale)--}}

{{--        <li class="line-switcher__item @if($locale === locale()) active @endif">--}}

{{--            <a href="{{ route(\App\Standards\RouteGroups\Abstracts\RouteGroup::get_request_sequence(\App\RoutesRequests\Admin\Localizations\ChangeGetRouteRequest::class), [ \App\Standards\Classifiers\Admin\LocalizationVarClassifier::locale->name => $locale ]) }}"--}}
{{--               class="line-switcher__link line-switcher__link--size-middle line-switcher__link--theme-charade">--}}
{{--                {{ strtoupper($locale) }}--}}
{{--            </a>--}}

{{--        </li>--}}

{{--    @endforeach--}}

{{--</ul>--}}