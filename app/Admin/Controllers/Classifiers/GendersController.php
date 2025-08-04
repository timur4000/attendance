<?php

namespace App\Admin\Controllers\Classifiers;

use App\Standards\ApiRequests\Classifiers\ApiRequestClassifierTypesClassifier;

/**
 * Implements genders classifier actions.
 */
class GendersController extends ClassifiersController
{
    public function __construct()
    {
        $this->set_classifier(ApiRequestClassifierTypesClassifier::GENDER);
    }
}
