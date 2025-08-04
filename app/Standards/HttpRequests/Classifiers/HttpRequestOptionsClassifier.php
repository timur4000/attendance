<?php

namespace App\Standards\HttpRequests\Classifiers;

/**
 * Contains all possible names of Http Request class options.
 */
enum HttpRequestOptionsClassifier
{
    case verify;

    case timeout;

    case proxy;
}
