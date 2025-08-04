@extends(admin_directory('admin.layouts.app'))

@section('title', 'Users | Attendance')

@section('content')

    <div class="tabs-content__view" data-id="information">@include(admin_directory('admin.sca-users.detail-tabs.information'))</div>

    @if(admin_authorization()->has_permission_route(\App\RoutesRequests\Admin\ScaUsers\ScaUsersFoodCardBalancePostRouteRequest::class))

        <div class="tabs-content__view" data-id="canteen">@include(admin_directory('admin.sca-users.detail-tabs.canteen'))</div>

    @endif

    @if(admin_authorization()->has_permission_route(\App\RoutesRequests\Admin\Absences\AbsencesRecordsJsonPostRouteRequest::class))

        <div class="tabs-content__view" data-id="absences">@include(admin_directory('admin.sca-users.detail-tabs.absences'))</div>

    @endif

{{--    <div class="tabs" id="user-detail-tabs">--}}

{{--        <div class="tabs-panel tabs-panel--size-default tabs-panel--theme-default" data-tabs-element="panel">--}}

{{--            <button type="button" class="tabs-button tabs-button--size-default tabs-button--theme-default" data-tabs-element="button" data-id="information">--}}

{{--                <span class="tabs-button__icon">{!! svg('essential-circle-info', [ 'class' => 'icon icon-size-16' ]) !!}</span>--}}

{{--                <span class="tabs-button__text tabs-button__text--size-default tabs-button__text--theme-default">Information</span>--}}

{{--            </button>--}}

{{--            <button type="button" class="tabs-button tabs-button--size-default tabs-button--theme-default" data-tabs-element="button" data-id="canteen">--}}

{{--                <span class="tabs-button__icon">{!! svg('essential-reserve', [ 'class' => 'icon icon-size-16' ]) !!}</span>--}}

{{--                <span class="tabs-button__text tabs-button__text--size-default tabs-button__text--theme-default">Canteen</span>--}}

{{--            </button>--}}


{{--            <button type="button" class="tabs-button tabs-button--size-default tabs-button--theme-default" data-tabs-element="button" data-id="absences">--}}

{{--                <span class="tabs-button__icon">{!! svg('user-profile-delete', [ 'class' => 'icon icon-size-16' ]) !!}</span>--}}

{{--                <span class="tabs-button__text tabs-button__text--size-default tabs-button__text--theme-default">Absences</span>--}}

{{--            </button>--}}

{{--            <button type="button" class="tabs-button tabs-button--size-default tabs-button--theme-default" data-tabs-element="button" data-id="statistics">--}}

{{--                <span class="tabs-button__icon">{!! svg('business-chart', [ 'class' => 'icon icon-size-16' ]) !!}</span>--}}

{{--                <span class="tabs-button__text tabs-button__text--size-default tabs-button__text--theme-default">Statistics</span>--}}

{{--            </button>--}}

{{--            <button type="button" class="tabs-button tabs-button--size-default tabs-button--theme-default" data-tabs-element="button" data-id="tuition">--}}

{{--                <span class="tabs-button__icon">{!! svg('money-empty-wallet-time', [ 'class' => 'icon icon-size-16' ]) !!}</span>--}}

{{--                <span class="tabs-button__text tabs-button__text--size-default tabs-button__text--theme-default">Tuition</span>--}}

{{--            </button>--}}

{{--        </div>--}}


{{--        <section class="tabs-content tabs-content--size-default" data-tabs-element="content">--}}

{{--            --}}

{{--            <div class="tabs-view" data-tabs-element="view" data-id="statistics">@include(admin_directory('admin.sca-users.detail-tabs.statistics'))</div>--}}

{{--        </section>--}}

{{--    </div>--}}

@endsection