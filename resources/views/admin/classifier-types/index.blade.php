@extends(admin_directory('layouts.app'))

@section('title', 'Attendance | Classifier Types')

@section('content')

    <section class="table table--size-default table--theme-mercury" id="classifier-types-table"
             data-detail-url="{{ \App\Standards\RouteGroups\Abstracts\RouteGroup::get_route(\App\RoutesRequests\Admin\ClassifierTypes\ClassifierTypesDetailGetRouteRequest::class, [ \App\Standards\Classifiers\Common\CommonTermClassifier::DETAIL->value => '%s' ]) }}"
             data-url="{{ \App\Standards\RouteGroups\Abstracts\RouteGroup::get_route(\App\RoutesRequests\Admin\ClassifierTypes\ClassifierTypesListJsonPostRouteRequest::class) }}"></section>

@endsection