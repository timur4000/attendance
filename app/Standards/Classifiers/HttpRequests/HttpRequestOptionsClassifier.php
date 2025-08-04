<?php

namespace App\Standards\Classifiers\HttpRequests;

/**
 * Contains all possible names of Http Request class options.
 */
enum HttpRequestOptionsClassifier
{
    case verify;

    case timeout;
}
