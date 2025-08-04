<?php

namespace App\Admin\Controllers;

/**
 * Implements base work of all controllers.
 */
class BaseController
{
    /**
     * @var array
     */
    private array $breadcrumbs = [];

    /**
     * Adds the given values to breadcrumbs.
     *
     * @param string $url
     *
     * @param string $title
     *
     * @return void
     */
    protected function add_breadcrumb(string $url, string $title): void
    {
        $this->breadcrumbs[] = [ 'url' => $url, 'title' => $title ];
    }

    /**
     * Returns breadcrumbs.
     *
     * @return array
     */
    protected function get_breadcrumbs(): array
    {
        return $this->breadcrumbs;
    }

    /**
     * Returns breadcrumbs for the with method of the View class.
     *
     * @return array
     */
    protected function get_breadcrumbs_to_with(): array
    {
        return [ 'breadcrumbs' => $this->breadcrumbs ];
    }

    public function __construct() {}
}