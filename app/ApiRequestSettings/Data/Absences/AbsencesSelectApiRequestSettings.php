<?php

namespace App\ApiRequestSettings\Data\Absences;

use App\ApiRequests\Data\Absences\AbsencesSelectApiRequest;
use App\Standards\ApiRequests\Classifiers\ApiRequestDataTypesClassifier;
use App\Standards\ApiRequestSettings\Abstracts\ApiRequestSettings;
use App\Standards\Attributes\Requests\RequestKeyAttribute;

/**
 * Contains all possible settings of the absences select api request.
 *
 * @see AbsencesSelectApiRequest
 */
class AbsencesSelectApiRequestSettings extends ApiRequestSettings
{
    #[RequestKeyAttribute('IdUser')]
    public int $id_user = 0;

    #[RequestKeyAttribute('IdRow')]
    public float $id_row = 0;

    #[RequestKeyAttribute('Ascending')]
    public int $ascending = 0;

    public function __construct()
    {
        $this->type_request = ApiRequestDataTypesClassifier::USER_ABSENCES_SELECT;
    }
}
