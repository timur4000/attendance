<?php

namespace App\ApiRequests\Data\Rfid\DetectedRfidTags;

use App\ApiRequests\Data\DataApiRequest;
use App\ApiRequestSettings\Data\Rfid\DetectedRfidTags\DetectedRfidTagsApiRequestSettings;

/**
 * Implements request for the data of the detected rfid tags.
 */
class DetectedRfidTagsApiRequest extends DataApiRequest
{
    public function __construct(DetectedRfidTagsApiRequestSettings $settings)
    {
        parent::__construct($settings);
    }
}
