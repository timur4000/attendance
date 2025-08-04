<?php

namespace App\Cache\HttpRequest;

use App\Standards\Cache\Abstracts\Cache;
use App\Standards\Cache\Classifiers\CacheIdentifiersClassifier;
use App\Standards\Classifiers\Chars\CharsClassifiers;

/**
 * Implements work with the cache of the http requests.
 */
class HttpRequestCache extends Cache
{
    public function __construct(string $request_identifier)
    {
        $this->identifier = CacheIdentifiersClassifier::HTTP_REQUEST->name . CharsClassifiers::LARAVEL_DELIMITER . $request_identifier;
    }
}
