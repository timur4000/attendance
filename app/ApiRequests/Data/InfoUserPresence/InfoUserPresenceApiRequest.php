<?php

namespace App\ApiRequests\Data\InfoUserPresence;

use App\ApiRequests\Data\DataApiRequest;
use App\ApiRequestSettings\Data\InfoUserPresence\InfoUserPresenceApiRequestSettings;

/**
 * Implements request for the data of the info user presence.
 */
class InfoUserPresenceApiRequest extends DataApiRequest
{
    public function __construct(InfoUserPresenceApiRequestSettings $settings)
    {
        parent::__construct($settings);
    }
}
