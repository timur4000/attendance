<?php

namespace App\ApiRequests\Data\Absences;

use App\ApiRequests\Data\DataApiRequest;
use App\ApiRequestSettings\Data\Absences\AbsencesSelectApiRequestSettings;

/**
 * Implements request for the data of the absences select.
 */
class AbsencesSelectApiRequest extends DataApiRequest
{
    public function __construct(AbsencesSelectApiRequestSettings $settings)
    {
        parent::__construct($settings);
    }
}
