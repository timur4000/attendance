<?php

namespace App\Standards\Classifiers\Http;

/**
 * Contains all possible request types of the Http.
 */
enum HttpRequestedTypesClassifier: string
{
    case XML_HTTP_REQUEST = 'XmlHttpRequest';
}
