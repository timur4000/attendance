@extends(admin_directory('layouts.app'))

@section('title', 'Canteen dashboard | Attendance')

@section('content')

    <template data-modal-template="clients-modal">

        <section class="table table--size-default table--theme-mercury" id="clients-modal-table"></section>

    </template>

    <template data-modal-template="orders-modal">

        <section class="table table--size-default table--theme-mercury" id="orders-modal-table"></section>

    </template>

@endsection