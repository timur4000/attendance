@extends(admin_directory('admin.layouts.app'))

@section('title', 'Http Methods')

@section('stylesheet-path', asset('assets/css/pages/admin/http-methods/form.css'))

@section('script-path', asset('assets/js/pages/admin/http-methods/form.js'))

@section('content')

    <section class="form-view">

        {!! $form->render() !!}

    </section>

@endsection