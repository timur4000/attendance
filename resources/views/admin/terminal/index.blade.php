@extends(admin_directory('admin.layouts.app'))

@section('title', 'Terminal | Attendance')

@section('content')

    <div class="terminal terminal--size-default terminal--theme-default" id="terminal" data-url="{{ \App\Standards\RouteGroups\Abstracts\RouteGroup::get_route(\App\RoutesRequests\Admin\Terminal\TerminalHandlePostRouteRequest::class) }}"></div>

@endsection