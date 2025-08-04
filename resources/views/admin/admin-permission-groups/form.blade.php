@extends(admin_directory('admin.layouts.app'))

@section('title', 'Admin Permission Groups | Form')

@section('stylesheet-path', asset('assets/css/pages/admin/admin-permission-groups/form.css'))

@section('script-path', asset('assets/js/pages/admin/admin-permission-groups/form.js'))

@section('content')

    <section class="form-view">

        {!! $form->render() !!}

    </section>

@endsection