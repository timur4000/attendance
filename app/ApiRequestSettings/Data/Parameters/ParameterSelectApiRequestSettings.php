<?php

namespace App\ApiRequestSettings\Data\Parameters;

use App\Standards\ApiRequests\Classifiers\ApiRequestDataTypesClassifier;
use App\Standards\ApiRequestSettings\Abstracts\ApiRequestSettings;
use App\Standards\ApiRequestSettings\Classifiers\Parameters\ParametersIdsClassifier;
use App\Standards\Attributes\Requests\RequestKeyAttribute;

/**
 * Contains all possible settings of the parameter select api request.
 */
class ParameterSelectApiRequestSettings extends ApiRequestSettings
{
    #[RequestKeyAttribute('IdParameter')]
    public ParametersIdsClassifier|string $id_parameter;

    public function __construct()
    {
        $this->type_request = ApiRequestDataTypesClassifier::PARAMETER_SELECT;
    }
}
