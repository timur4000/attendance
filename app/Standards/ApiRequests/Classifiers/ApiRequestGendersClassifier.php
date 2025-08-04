<?php

namespace App\Standards\ApiRequests\Classifiers;

/**
 * Contains all possible genders of the api requests.
 */
enum ApiRequestGendersClassifier: int
{
    case UNKNOWN = 0;

    case MALE = 1;

    case FEMALE = 2;
}
