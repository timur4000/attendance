<?php

namespace App\Standards\ApiRequests\Classifiers;

/**
 * Contains all possible personal types of the rfid tags.
 */
enum RfidTagsPersonalTypesClassifier: int
{
    case NOT_DEFINED = 0;

    case YES = 1;

    case NO = 2;
}
