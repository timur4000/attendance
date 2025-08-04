<?php

namespace App\Standards\Classifiers\Routes;

/**
 * Contains all possible methods of Route class.
 */
enum RouteMethodsClassifiers
{
    case any;

    case get;

    case post;

    case put;

    case patch;

    case delete;
}
