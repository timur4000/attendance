<?php

namespace App\Standards\Classifiers\Http;

/**
 * Contains all possible codes of http protocol.
 */
enum HttpCodesClassifier: int
{
    case SUCCESS = 200;

    case BAD_REQUEST = 400;

    case UNAUTHORIZED = 401;

    case FORBIDDEN = 403;

    case NOT_FOUND = 404;

    case NOT_ALLOWED = 405;

    case CONFLICT = 409;
}
