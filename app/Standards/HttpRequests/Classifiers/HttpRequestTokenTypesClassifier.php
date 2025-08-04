<?php

namespace App\Standards\HttpRequests\Classifiers;

/**
 * Contains all possible token types of Http Request class.
 */
enum HttpRequestTokenTypesClassifier: string
{
    case BEARER = 'Bearer';

    case REFRESH = 'Refresh';

    case LOGOUT = 'Logout';
}
