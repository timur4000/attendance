<?php

namespace App\ApiRequests\Data\Dashboard\Attendance;

use App\ApiRequests\Data\DataApiRequest;
use App\ApiRequestSettings\Data\Dashboard\Attendance\AttendanceDataOneHourApiRequestSettings;
use App\Managers\Date\DateManager;
use App\Standards\Cache\Classifiers\CacheIdentifiersClassifier;

/**
 * Implements request for the data of the attendance data one hour.
 */
class AttendanceDataOneHourApiRequest extends DataApiRequest
{
    public function __construct(AttendanceDataOneHourApiRequestSettings $settings)
    {
        $this->cache_processing($settings);

        parent::__construct($settings);
    }

    /**
     * Implements process with the cache.
     *
     * @param AttendanceDataOneHourApiRequestSettings $settings
     *
     * @return void
     */
    private function cache_processing(AttendanceDataOneHourApiRequestSettings $settings): void
    {
        if (DateManager::is_current_date($settings->date) && DateManager::is_current_hour($settings->hour) || DateManager::get_hour() < $settings->hour)
        {
            return ;
        }

        $this->is_cache = true;

        $this->cache_identifier = $this->get_identifier_classifier($settings)->name . $settings->to_sha256();
    }

    /**
     * Returns the identifier by the given settings.
     *
     * @param AttendanceDataOneHourApiRequestSettings $settings
     *
     * @return CacheIdentifiersClassifier
     */
    private function get_identifier_classifier(AttendanceDataOneHourApiRequestSettings $settings): CacheIdentifiersClassifier
    {
        return $settings->is_summary() ? CacheIdentifiersClassifier::ATTENDANCE_SUMMARY_DATA_ONE_HOUR : CacheIdentifiersClassifier::ATTENDANCE_DATA_ONE_HOUR;
    }
}
