<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

\App\RoutesPublishers\AdminRoutesPublisher::booting();

Route::get('/', fn() => redirect()->route(\App\Standards\RouteGroups\Abstracts\RouteGroup::get_sequence(\App\RoutesRequests\Admin\Dashboard\DashboardIndexGetRouteRequest::class)));
