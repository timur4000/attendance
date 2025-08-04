<?php

namespace App\ApiRequests\Data\Absences;

use App\ApiRequests\Data\DataApiRequest;
use App\ApiRequestSettings\Data\Absences\AbsencesDeleteApiRequestSettings;

/**
 * Implements request for the data of the absences delete.
 */
class AbsencesDeleteApiRequest extends DataApiRequest
{
    public function __construct(AbsencesDeleteApiRequestSettings $settings)
    {
        parent::__construct($settings);
    }
}
