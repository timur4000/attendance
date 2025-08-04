<?php

namespace App\Admin\Controllers\Classifiers;

use App\Standards\ApiRequests\Classifiers\ApiRequestClassifierTypesClassifier;

/**
 * Implements currency classifier actions.
 */
class CurrencyController extends ClassifiersController
{
    public function __construct()
    {
        $this->set_classifier(ApiRequestClassifierTypesClassifier::CURRENCY);
    }
}
