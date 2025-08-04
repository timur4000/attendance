@extends(admin_directory('layouts.authorization'))

@section('title', 'Login | Attendance')

@section('content')

    <main class="main main--type-authorization">

        <div class="template">

            <div class="template-wrapper">

                <div class="card card--size-middle">

                    <div class="card__header card__header--size-middle card__header--position-center">

                        <h2 class="card__heading card__heading--size-middle">
                            Welcome Back
                        </h2>

                    </div>

                    <div class="card__main">

                        <form action="{{ route(\App\Standards\RouteGroups\Abstracts\RouteGroup::get_request_sequence(\App\RoutesRequests\Admin\Authorization\AuthorizationLoginGetRouteRequest::class)) }}"
                              method="post" class="form" id="login-form">

                            @csrf

                            @if(session()->get('error'))

                                <p class="alert alert--size-default alert--theme-persian-rose margin-top-20 margin-bottom-20">

                                    {{ session()->get('error') }}

                                </p>

                            @endif

                            @include(admin_directory('includes.forms.input'), [ 'data' => [ 'input_type' => 'text', 'input_name' => 'login', 'icon_id' => 'user-profile', 'input_placeholder' => 'Login' ] ])

                            @include(admin_directory('includes.forms.password'), [ 'data' => [ 'input_name' => 'password', 'icon_id' => 'security-lock', 'input_placeholder' => 'Password' ] ])

                            @include(admin_directory('includes.forms.checkbox'), [ 'data' => [ 'input_name' => 'is_remember', 'input_placeholder' => 'Remember me' ] ])

                            <button type="submit" class="button button--value-bubble button--theme-royal-blue button--type-full button--size-middle margin-top-40">
                                <span>Log in</span>
                            </button>

                        </form>

                    </div>
                </div>

            </div>

        </div>

    </main>

@endsection
