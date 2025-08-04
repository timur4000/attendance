<?php

namespace App\Standards\HttpRequests\Classifiers;

/**
 * Contains all possible names of Http Request class methods.
 */
enum HttpRequestMethodsClassifier
{
    case get;

    case post;
}