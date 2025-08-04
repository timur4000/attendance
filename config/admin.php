<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Routes prefix
    |--------------------------------------------------------------------------
    |
    | The unique identifier for all routes in admin group.
    |
    */

    'identifier' => env('ADMIN_ROUTE_IDENTIFIER', 'admin'),

    /*
    |--------------------------------------------------------------------------
    | Routes prefix
    |--------------------------------------------------------------------------
    |
    | The name of directory to the admin resources.
    |
    */

    'directory_name' => env('ADMIN_DIRECTORY_NAME', 'admin'),

    /*
    |--------------------------------------------------------------------------
    | Locale
    |--------------------------------------------------------------------------
    |
    | The default locale.
    |
    */

    'locale' => 'en',

    /*
    |--------------------------------------------------------------------------
    | Locales
    |--------------------------------------------------------------------------
    |
    | The all possible locales.
    |
    */

    'locales' => [ 'en', 'ru' ],

    /*
    |--------------------------------------------------------------------------
    | Attendance api host
    |--------------------------------------------------------------------------
    |
    | The host to attendance api.
    |
    */

    'attendance_api_host' => env('ATTENDANCE_API_HOST'),

    /*
    |--------------------------------------------------------------------------
    | Variables asset path
    |--------------------------------------------------------------------------
    |
    | The path of the variables asset path.
    |
    */

    'variables_asset_path' => env('ASSET_VARIABLES_PATH', 'assets/%extension%/variables/%file_name%/%prefix%-%file_name%.%extension%'),

    /*
    |--------------------------------------------------------------------------
    | Variables asset path prefix
    |--------------------------------------------------------------------------
    |
    | The prefix of the asset variables path.
    |
    */

    'variables_asset_path_prefix' => env('ASSET_VARIABLES_PATH_PREFIX', 'base'),

    /*
    |--------------------------------------------------------------------------
    | Max size log files
    |--------------------------------------------------------------------------
    |
    | The max size of all log files in bytes.
    |
    */

    'max_size_log_files' => env('MAX_SIZE_LOG_FILES', 10000000),
];
