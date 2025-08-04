<?php

namespace App\Standards\ApiRequests\Classifiers;

/**
 * Contains all possible code entity types of the object picture request.
 */
enum PictureCodeEntityTypesClassifier: string
{
    case USER = 'user';

    case FOOD = 'food';
}
