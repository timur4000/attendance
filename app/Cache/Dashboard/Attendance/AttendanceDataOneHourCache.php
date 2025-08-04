<?php

namespace App\Cache\Dashboard\Attendance;

use App\Standards\Cache\Abstracts\Cache;
use App\Standards\Cache\Classifiers\CacheIdentifiersClassifier;
use App\Standards\Classifiers\Chars\CharsClassifiers;

/**
 * Implements work with the cache of the summary attendance data one hour.
 */
class AttendanceDataOneHourCache extends Cache
{
    public function __construct(int $hour)
    {
        $this->identifier = CacheIdentifiersClassifier::ATTENDANCE_DATA_ONE_HOUR->name . CharsClassifiers::LARAVEL_DELIMITER . $hour;
    }
}
