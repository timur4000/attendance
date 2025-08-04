<ul class="breadcrumbs">

    @isset($breadcrumbs)

        @foreach($breadcrumbs as $breadcrumb)

            <li class="breadcrumbs__item breadcrumbs__item--size-default">

                <a href="{{ $breadcrumb['url'] }}" class="breadcrumbs__link breadcrumbs__link--theme-charade breadcrumbs__link--size-default">
                    <span class="breadcrumbs__link-icon breadcrumbs__link-icon--size-default">{!! svg('arrows-right', [ 'class' => 'icon icon-size-8' ]) !!}</span>

                    {{ $breadcrumb['title'] }}
                </a>

            </li>

        @endforeach

    @endisset

</ul>