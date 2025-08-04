<?php

namespace App\ApiRequestSettings\Data\Absences;

use App\ApiRequests\Data\Absences\AbsencesInsertApiRequest;
use App\Standards\ApiRequests\Classifiers\ApiRequestDataTypesClassifier;
use App\Standards\ApiRequestSettings\Abstracts\ApiRequestSettings;
use App\Standards\Attributes\Requests\RequestKeyAttribute;

/**
 * Contains all possible settings of the absences insert api request.
 *
 * @see AbsencesInsertApiRequest
 */
class AbsencesInsertApiRequestSettings extends ApiRequestSettings
{
    #[RequestKeyAttribute('IdUser')]
    public int $id_user = 0;

    #[RequestKeyAttribute('IdRow')]
    public float $id_row = 0;

    #[RequestKeyAttribute('DateStart')]
    public string $date_start = '';

    #[RequestKeyAttribute('DateEnd')]
    public string $date_end = '';

    #[RequestKeyAttribute('IdAbsence')]
    public string $id_absence = '';

    #[RequestKeyAttribute('NoteAbsence')]
    public string $note_absence = '';

    public function __construct()
    {
        $this->type_request = ApiRequestDataTypesClassifier::USER_ABSENCES_INSERT;
    }
}
