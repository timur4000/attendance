@extends(admin_directory('admin.layouts.app'))

@section('title', 'Main Sprite Icons')

@section('stylesheet-path', asset('assets/css/pages/admin/main-sprite-icons/form.css'))

@section('script-path', asset('assets/js/pages/admin/main-sprite-icons/form.js'))

@section('content')

    <section class="form-view">

        {!! $form->render() !!}

    </section>

@endsection