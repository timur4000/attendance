<?php

namespace App\Admin\Controllers\Classifiers;

use App\Standards\ApiRequests\Classifiers\ApiRequestClassifierTypesClassifier;

/**
 * Implements statuses classifier actions.
 */
class StatusesController extends ClassifiersController
{
    public function __construct()
    {
        $this->set_classifier(ApiRequestClassifierTypesClassifier::STATUS);
    }
}
