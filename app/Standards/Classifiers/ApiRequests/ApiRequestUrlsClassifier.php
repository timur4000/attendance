<?php

namespace App\Standards\Classifiers\ApiRequests;

/**
 * Contains all possible urls of Api Request class.
 */
enum ApiRequestUrlsClassifier: string
{
    case TEST = 'test';

    case ACCESS_GET = 'access/get';

    case ACCESS_REFRESH = 'access/refresh';

    case ACCESS_LOGOUT = 'access/logout';

    case DATA = 'request';
}
