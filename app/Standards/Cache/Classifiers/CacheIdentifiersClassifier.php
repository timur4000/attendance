<?php

namespace App\Standards\Cache\Classifiers;

/**
 * Contains all possible identifiers of the Cache class.
 */
enum CacheIdentifiersClassifier
{
    case ATTENDANCE_DATA_ONE_HOUR;

    case ATTENDANCE_SUMMARY_DATA_ONE_HOUR;

    case HTTP_REQUEST;
}
