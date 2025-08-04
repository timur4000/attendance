@extends(admin_directory('layouts.app'))

@section('stylesheet-path', admin_asset_by_route_name('css', $asset_path))

@section('script-path', admin_asset_by_route_name('js', $asset_path))

@section('content')

    <section class="table table--size-default table--theme-mercury" id="classifier-table" data-detail-url="{{ $detail_url }}" data-url="{{ $json_list_url }}"></section>

@endsection