<?php

namespace App\Standards\Classifiers\Http;

/**
 * Contains all possible content types of http protocol.
 */
enum HttpContentTypesClassifier: string
{
    case JSON = 'application/json';
}