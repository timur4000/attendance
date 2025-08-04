<?php

namespace App\Standards\Classifiers\HttpRequests;

/**
 * Contains all possible names of Http Request class methods.
 */
enum HttpRequestMethodsClassifier
{
    case get;

    case post;
}