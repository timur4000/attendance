<!doctype html>
<html lang="{{ locale() }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <meta name="csrf-token" content="{{ csrf_token() }}" />

    <title>@yield('title')</title>

    @include(admin_directory('admin.includes.variables'))

    <link rel="icon" href="{{ asset('assets/icons/systems/radar-white.svg') }}">

    <link rel="stylesheet" href="@yield('stylesheet-path', admin_asset_by_route_name('css'))">

</head>
<body>

<main class="main main--type-empty">

    @yield('content')

</main>

<script src="@yield('script-path', admin_asset_by_route_name('js'))" type="module"></script>

</body>
</html>