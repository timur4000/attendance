<?php

namespace App\Admin\Controllers\Classifiers;

use App\Standards\ApiRequests\Classifiers\ApiRequestClassifierTypesClassifier;

/**
 * Implements absences classifier actions.
 */
class AbsencesController extends ClassifiersController
{
    public function __construct()
    {
        $this->set_classifier(ApiRequestClassifierTypesClassifier::ABSENCE);
    }
}
