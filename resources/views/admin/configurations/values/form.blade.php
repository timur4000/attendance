@extends(admin_directory('admin.layouts.app'))

@section('title', 'Configuration values | Form')

@section('stylesheet-path', asset('assets/css/pages/admin/configurations/values/form.css'))

@section('script-path', asset('assets/js/pages/admin/configurations/values/form.js'))

@section('content')

    <section class="form-view">

        {!! $form->render() !!}

    </section>

@endsection