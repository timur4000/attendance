<?php

namespace App\Standards\ApiRequests\Classifiers;

/**
 * Contains all possible numbers of response.
 */
enum ApiRequestNumberClassifier: int
{
    case SUCCESS = 0;

    case UNSPECIFIED_ERROR = 60001;

    case INCORRECT_USERNAME_OR_PASSWORD = 60002;

    case TOKEN_EXPIRED = 60003;

    case USER_NOT_FOUND = 60004;

    case UNAUTHORIZED_ACCESS = 60008;

    case UNKNOWN_REQUEST_TYPE = 60021;

    case STORED_PROCEDURE_ERROR = 60015;

    case INCORRECT_REQUEST_CLIENT_DATA = 60041;

    case ACTION_CANNOT_BE_PERFORMED = 60052;
}
