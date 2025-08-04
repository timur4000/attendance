<?php

namespace App\RoutesRequests\Admin\Classifiers\Language;

use App\Admin\Controllers\Classifiers\LanguageController;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare units route of admin group.
 */
class LanguageGetRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ LanguageController::class, 'index' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('languages.index');
    }
}
