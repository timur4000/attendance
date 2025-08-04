<?php

namespace App\ApiRequests\Data\Absences;

use App\ApiRequests\Data\DataApiRequest;
use App\ApiRequestSettings\Data\Absences\AbsencesInsertApiRequestSettings;

/**
 * Implements request for the data of the absences insert.
 */
class AbsencesInsertApiRequest extends DataApiRequest
{
    public function __construct(AbsencesInsertApiRequestSettings $settings)
    {
        parent::__construct($settings);
    }
}
