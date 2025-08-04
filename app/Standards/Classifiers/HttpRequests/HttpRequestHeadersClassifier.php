<?php

namespace App\Standards\Classifiers\HttpRequests;

/**
 * Contains all possible names of Http Request class headers.
 */
enum HttpRequestHeadersClassifier: string
{
    case AUTHORIZATION = 'Authorization';

    case ACCESS_LOGIN = 'Login-Key';

    case ACCESS_LOGOUT = 'Logout-Key';

    case ACCESS_REFRESH = 'Refresh-Key';
}
