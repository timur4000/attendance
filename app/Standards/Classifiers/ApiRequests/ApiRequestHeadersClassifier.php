<?php

namespace App\Standards\Classifiers\ApiRequests;

/**
 * Contains all possible header names of Api request class.
 */
enum ApiRequestHeadersClassifier: string
{
    case ACCESS_LOGOUT = 'Logout-Key';

    case ACCESS_REFRESH = 'Refresh-Key';
}
