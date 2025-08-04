@extends(admin_directory('admin.layouts.app'))

@section('title', 'Forbidden')

@section('stylesheet-path', admin_asset_by_route_name('css', 'errors/errors'))

@section('script-path', admin_asset_by_route_name('js', 'errors/errors'))

@section('content')

    <section class="heading">

        <h1 class="heading__value heading__value--size-default heading__value--theme-persian-rose">You do not have permission to view this page!</h1>

    </section>

@endsection

{{--@extends('errors::minimal')--}}

{{--@section('title', __('Forbidden'))--}}
{{--@section('code', '403')--}}
{{--@section('message', __($exception->getMessage() ?: 'Forbidden'))--}}
