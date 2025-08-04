<?php

namespace App\ApiRequests\Data\Classifiers;

use App\ApiRequests\Data\DataApiRequest;
use App\ApiRequestSettings\Data\Classifiers\ClassifierSelectApiRequestSettings;

/**
 * Implements request for data of the classifiers api.
 */
class ClassifierSelectApiRequest extends DataApiRequest
{
    public function __construct(ClassifierSelectApiRequestSettings $settings)
    {
        parent::__construct($settings);
    }
}
