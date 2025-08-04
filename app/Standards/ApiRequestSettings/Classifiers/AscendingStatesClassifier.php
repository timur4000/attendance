<?php

namespace App\Standards\ApiRequestSettings\Classifiers;

/**
 * Contains all possible states of the api settings ascending property.
 */
enum AscendingStatesClassifier: int
{
    case DESC = 0;

    case ASC = 1;
}
