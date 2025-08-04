<?php

namespace App\ApiRequestSettings\Data\Classifiers;

use App\Standards\ApiRequests\Classifiers\ApiRequestClassifierTypesClassifier;
use App\Standards\ApiRequests\Classifiers\ApiRequestDataTypesClassifier;
use App\Standards\ApiRequestSettings\Abstracts\ApiRequestSettings;
use App\Standards\Attributes\Requests\RequestKeyAttribute;

/**
 * Contains all possible settings of the classifier select api request.
 */
class ClassifierSelectApiRequestSettings extends ApiRequestSettings
{
    #[RequestKeyAttribute('CodeEntity')]
    public ApiRequestClassifierTypesClassifier $classifier;

    #[RequestKeyAttribute('IdObject')]
    public int $id_object = 0;

    public function __construct()
    {
        $this->type_request = ApiRequestDataTypesClassifier::CLASSIFIER_SELECT;
    }
}
