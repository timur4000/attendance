@extends(admin_directory('admin.layouts.app'))

@section('title', 'Admin Menu | Form')

@section('stylesheet-path', asset('assets/css/pages/admin/admin-menu/form.css'))

@section('script-path', asset('assets/js/pages/admin/admin-menu/form.js'))

@section('content')

    <section class="form-view">

        {!! $form->render() !!}

    </section>

@endsection