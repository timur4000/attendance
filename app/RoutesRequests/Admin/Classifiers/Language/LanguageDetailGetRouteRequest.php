<?php

namespace App\RoutesRequests\Admin\Classifiers\Language;

use App\Admin\Controllers\Classifiers\LanguageController;
use App\Standards\Classifiers\Common\CommonTermClassifier;
use App\Standards\RouteRequests\Abstracts\RouteRequest;

/**
 * Implements declare units route of admin group.
 */
class LanguageDetailGetRouteRequest extends RouteRequest
{
    /**
     * @inheritdoc
     *
     * @var array|string[]
     */
    protected array $action = [ LanguageController::class, 'detail' ];

    public function __construct()
    {
        parent::__construct();

        $this->add_variable(CommonTermClassifier::DETAIL->value);

        $this->set_identifier('languages.detail');
    }
}
