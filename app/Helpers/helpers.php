<?php

if (!function_exists('locale'))
{
    /**
     * Returns current app locale.
     *
     * @return string
     */
    function locale(): string
    {
        return app()->getLocale();
    }
}

if (!function_exists('is_route'))
{
    /**
     * Checks if the given pattern matches one of the routes.
     *
     * @param string $pattern
     *
     * @return bool
     */
    function is_route(string $pattern): bool
    {
        return \Illuminate\Support\Facades\Route::is($pattern);
    }
}

if (!function_exists('prefix'))
{
    /**
     * Adds the given char to begin of the given string and return processing string.
     *
     * @param string $string
     *
     * @param string $char
     *
     * @return string
     */
    function prefix(string $string, string $char): string
    {
        return $char . $string;
    }
}

if (!function_exists('postfix'))
{
    /**
     * Adds the given char to end of the given string and return processing string.
     *
     * @param string $string
     *
     * @param string $char
     *
     * @return string
     */
    function postfix(string $string, string $char): string
    {
        return $string . $char;
    }
}

if (!function_exists('admin_authorization'))
{
    /**
     * Returns an instance of the admin authorization core.
     *
     * @return \App\Core\Admin\Authorization
     */
    function admin_authorization(): \App\Core\Admin\Authorization
    {
        return \App\Core\Admin\Authorization::get_instance();
    }
}

if (!function_exists('p'))
{
    /**
     * Prints given data with tags pre.
     *
     * @param mixed $data
     *
     * @return void
     */
    function p(mixed $data = null): void
    {
        print '<pre>';

        print_r($data);

        print '</pre>';
    }
}

if (!function_exists('svg'))
{
    /**
     * Returns html-code of svg.
     *
     * @param string $id - The icon id.
     *
     * @param array|string $attributes
     *
     * @return string
     */
    function svg(string $id, array | string $attributes = []): string
    {
        if (is_array($attributes))
        {
            $attributes = str_replace('=', '="', http_build_query($attributes, null, '" ', PHP_QUERY_RFC3986)) . '"';
        }

        return '<svg ' . urldecode($attributes) . '>
                    <use xlink:href="/assets/icons/sprite.svg#' . $id . '"></use>
                </svg>';
    }
}

if (!function_exists('admin_locales'))
{
    /**
     * Returns locales of admin.
     *
     * @return array
     */
    function admin_locales(): array
    {
        return \App\Managers\Admin\AdminConfigManager::get_option(\App\Standards\Classifiers\Admin\AdminConfigClassifier::locales);
    }
}

if (!function_exists('admin_asset_by_route_name'))
{
    /**
     * Returns path to admin asset by the given route name, otherwise if the route name is empty - uses current route name.
     *
     * @param string $extension
     *
     * @param string $route_name
     *
     * @return string
     */
    function admin_asset_by_route_name(string $extension, string $route_name = ''): string
    {
        if (empty($route_name))
        {
            $route_name = request()->route()->getName();
        }

        $route_name = str_replace('.', '/', $route_name);

        $directory_name = \App\Managers\Admin\AdminConfigManager::get_option(\App\Standards\Classifiers\Admin\AdminConfigClassifier::directory_name);

        $identifier = \App\Managers\Admin\AdminConfigManager::get_option(\App\Standards\Classifiers\Admin\AdminConfigClassifier::identifier);

        if ($identifier !== $directory_name)
        {
            $route_name = preg_replace('/' . $identifier . '/', $directory_name, $route_name);
        }

        return asset('assets' . DIRECTORY_SEPARATOR . $extension . DIRECTORY_SEPARATOR . 'pages' . DIRECTORY_SEPARATOR . $route_name . '.' . $extension);
    }
}

if (!function_exists('admin_variables_asset_path'))
{
    /**
     * Returns path to admin variables asset by the given file name.
     *
     * @param string $extension
     *
     * @param string $file_name
     *
     * @return string
     */
    function admin_variables_asset_path(string $extension, string $file_name = ''): string
    {
        $prefix = \App\Managers\Admin\AdminConfigManager::get_option(\App\Standards\Classifiers\Admin\AdminConfigClassifier::variables_asset_path_prefix);

        $path = \App\Managers\Admin\AdminConfigManager::get_option(\App\Standards\Classifiers\Admin\AdminConfigClassifier::variables_asset_path);

        return asset(strtr($path, [ '%extension%' => $extension, '%prefix%' => $prefix, '%file_name%' => $file_name ]));
    }
}

if (!function_exists('admin_home_route'))
{
    /**
     * Returns name of route to admin home page.
     *
     * @return string
     */
    function admin_home_route(): string
    {
        return \App\Standards\RouteGroups\Abstracts\RouteGroup::get_request_sequence(\App\RoutesRequests\Admin\Dashboard\DashboardIndexGetRouteRequest::class);
    }
}

if (!function_exists('admin_directory'))
{
    /**
     * Returns joined name to view by the given path.
     *
     * @param string $path
     *
     * @return string
     */
    function admin_directory(string $path): string
    {
        $path = preg_replace('/^admin./', '', $path);

        $directory_name = \App\Managers\Admin\AdminConfigManager::get_option(\App\Standards\Classifiers\Admin\AdminConfigClassifier::directory_name);

        return $directory_name . \App\Standards\Classifiers\Chars\CharsClassifiers::LARAVEL_DELIMITER . $path;
    }
}

if (!function_exists('get_is'))
{
    /**
     * Returns given value by the given force.
     *
     * If force is a true - returns output else returns empty string.
     *
     * If force is a true and the given output is an array returns second element of the output else returns first element.
     *
     * @param mixed $output
     *
     * @param bool $force
     *
     * @return mixed
     */
    function get_is(mixed $output, bool $force): mixed
    {
        return is_array($output) ? $output[ (int) $force ] : ($force ? $output : '');
    }
}

if (!function_exists('get_percent_of_total'))
{
    /**
     * Returns percent of the given total by the given value.
     *
     * @param int $value
     *
     * @param int $total
     *
     * @return mixed
     */
    function get_percent_of_total(int $value, int $total): int
    {
        if ($total === 0)
        {
            return 0;
        }

        return $value / $total * 100;
    }
}

if (!function_exists('integer_to_alphabet'))
{
    /**
     * Converts an integer to a string representing its alphabetical equivalent.
     *
     * @param $integer
     *
     * @return string
     */
    function integer_to_alphabet($integer): string
    {
        for ($r = ''; $integer >= 0; $integer = intval($integer / 26) - 1)
        {
            $r = chr($integer % 26 + 0x41) . $r;
        }

        return $r;
    }
}
