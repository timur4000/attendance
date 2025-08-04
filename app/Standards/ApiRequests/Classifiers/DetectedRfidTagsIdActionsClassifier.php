<?php

namespace App\Standards\ApiRequests\Classifiers;

/**
 * Contains all possible id actions of the detected rfid tags.
 */
enum DetectedRfidTagsIdActionsClassifier: int
{
    case NOT_DEFINED = 0;

    case ARRIVAL = 1;

    case EXIT = 2;
}
