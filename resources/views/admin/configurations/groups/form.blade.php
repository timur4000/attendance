@extends(admin_directory('admin.layouts.app'))

@section('title', 'Configuration groups | Form')

@section('stylesheet-path', asset('assets/css/pages/admin/configurations/groups/form.css'))

@section('script-path', asset('assets/js/pages/admin/configurations/groups/form.js'))

@section('content')

    <section class="form-view">

        {!! $form->render() !!}

    </section>

@endsection