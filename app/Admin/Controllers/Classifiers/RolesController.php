<?php

namespace App\Admin\Controllers\Classifiers;

use App\Standards\ApiRequests\Classifiers\ApiRequestClassifierTypesClassifier;

/**
 * Implements roles classifier actions.
 */
class RolesController extends ClassifiersController
{
    public function __construct()
    {
        $this->set_classifier(ApiRequestClassifierTypesClassifier::ROLE);
    }
}
