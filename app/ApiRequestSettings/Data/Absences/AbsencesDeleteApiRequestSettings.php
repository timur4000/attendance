<?php

namespace App\ApiRequestSettings\Data\Absences;

use App\ApiRequests\Data\Absences\AbsencesDeleteApiRequest;
use App\Standards\ApiRequests\Classifiers\ApiRequestDataTypesClassifier;
use App\Standards\ApiRequestSettings\Abstracts\ApiRequestSettings;
use App\Standards\Attributes\Requests\RequestKeyAttribute;

/**
 * Contains all possible settings of the absences delete api request.
 *
 * @see AbsencesDeleteApiRequest
 */
class AbsencesDeleteApiRequestSettings extends ApiRequestSettings
{
    #[RequestKeyAttribute('IdRow')]
    public float $id_row = 0;

    public function __construct()
    {
        $this->type_request = ApiRequestDataTypesClassifier::USER_ABSENCES_DELETE;
    }
}
