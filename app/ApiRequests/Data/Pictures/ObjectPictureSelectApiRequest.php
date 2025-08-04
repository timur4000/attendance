<?php

namespace App\ApiRequests\Data\Pictures;

use App\ApiRequests\Data\DataApiRequest;
use App\ApiRequestSettings\Data\Pictures\ObjectPictureSelectApiRequestSettings;

/**
 * Implements request for the data of the object picture.
 */
class ObjectPictureSelectApiRequest extends DataApiRequest
{
    public function __construct(ObjectPictureSelectApiRequestSettings $settings)
    {
        $this->is_cache = false;

        $this->cache_identifier = $settings->to_sha256();

        parent::__construct($settings);
    }
}
