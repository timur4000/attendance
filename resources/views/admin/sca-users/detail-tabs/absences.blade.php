<div class="grid-row">

    <div class="grid-column grid-column-12">

        <section class="table table--size-default table--theme-mercury" id="sca-user-absences-table" data-id-user="{{ $record->id_user }}" data-delete-action="{{ \App\Standards\RouteGroups\Abstracts\RouteGroup::get_route(\App\RoutesRequests\Admin\Absences\AbsencesDeletePostRouteRequest::class) }}"></section>

    </div>

</div>

<template data-modal-template="absence-create-modal">

    {!! \App\Admin\Controllers\AbsencesController\AbsencesController::get_form($record->id_user)->render() !!}

</template>