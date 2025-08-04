<?php

namespace App\RoutesRequests\Admin\Classifiers\Language;

use App\Admin\Controllers\Classifiers\LanguageController;
use App\Standards\Classifiers\Routes\RouteMethodsClassifiers;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare units list json route of admin group.
 */
class LanguageListJsonPostRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ LanguageController::class, 'list_json' ];

    public function __construct()
    {
        parent::__construct();

        $this->set_method(RouteMethodsClassifiers::post);

        $this->set_identifier('languages.list.json');
    }
}
