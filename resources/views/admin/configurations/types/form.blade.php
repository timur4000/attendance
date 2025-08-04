@extends(admin_directory('admin.layouts.app'))

@section('title', 'Configuration types | Form')

@section('stylesheet-path', asset('assets/css/pages/admin/configurations/types/form.css'))

@section('script-path', asset('assets/js/pages/admin/configurations/types/form.js'))

@section('content')

    <section class="form-view">

        {!! $form->render() !!}

    </section>

@endsection