<?php

namespace App\Handlers\Admin\Dashboard\Attendance;

use App\ApiModels\Dashboard\Attendance\AttendanceDataOneHour\AttendanceSummaryDataOneHourApiModel;
use App\ApiModels\Dashboard\Attendance\AttendancePersonnelByCategoryApiModel;
use App\ApiRequests\Data\Dashboard\Attendance\AttendanceDataOneDayByHoursApiRequest;
use App\ApiRequests\Data\Dashboard\Attendance\AttendanceDataOneHourApiRequest;
use App\ApiRequests\Data\Dashboard\Attendance\AttendancePersonnelByCategoryApiRequest;
use App\ApiRequestSettings\Data\Dashboard\Attendance\AttendanceDataOneDayByHoursApiRequestSettings;
use App\ApiRequestSettings\Data\Dashboard\Attendance\AttendanceDataOneHourApiRequestSettings;
use App\ApiRequestSettings\Data\Dashboard\Attendance\AttendancePersonnelByCategoryApiRequestSettings;
use App\Handlers\Admin\Dashboard\DashboardHandler;
use App\Managers\Date\DateManager;
use App\Standards\ApiModels\Abstracts\ApiModel;
use App\Standards\Callables\Handlers\Dashboard\Attendance\AttendanceHandlerUsersByCategoryCodeCategoryFilterCallable;
use App\Standards\Callables\Handlers\Dashboard\Attendance\AttendanceHandlerUsersByCategoryFirstByCodeCategoryCallable;
use App\Standards\Classifiers\Date\DateFormatsClassifier;
use Illuminate\Support\Collection;

/**
 * Implements help work with attendance dashboard information.
 */
class AttendanceHandler extends DashboardHandler
{
    /**
     * Returns the attendance of users by categories by the given settings.
     *
     * @param AttendancePersonnelByCategoryApiRequestSettings $settings
     *
     * @return Collection
     */
    public static function users_by_categories(AttendancePersonnelByCategoryApiRequestSettings $settings): Collection
    {
        $request = new AttendancePersonnelByCategoryApiRequest($settings);

        $request->execute();

        $collection = ApiModel::create($request->get_response()->package, AttendancePersonnelByCategoryApiModel::class);

        $collection->prepend(AttendancePersonnelByCategoryApiModel::get_total_record($collection));

        return $collection
            ->filter(new AttendanceHandlerUsersByCategoryCodeCategoryFilterCallable);
    }

    /**
     * Returns first the attendance of users by categories by the given settings.
     *
     * @param AttendancePersonnelByCategoryApiRequestSettings $settings
     *
     * @param string $code_category
     *
     * @return AttendancePersonnelByCategoryApiModel|null
     */
    public static function first_users_by_categories(AttendancePersonnelByCategoryApiRequestSettings $settings, string $code_category = ''): AttendancePersonnelByCategoryApiModel | null
    {
        $collection = self::users_by_categories($settings);

        return $collection
            ->first(new AttendanceHandlerUsersByCategoryFirstByCodeCategoryCallable($code_category));
    }

    /**
     * Returns the attendance users by one hour.
     *
     * @param AttendanceDataOneHourApiRequestSettings $settings
     *
     * @return Collection|AttendanceSummaryDataOneHourApiModel
     */
    public static function attendance_users_by_hour(AttendanceDataOneHourApiRequestSettings $settings): Collection | AttendanceSummaryDataOneHourApiModel
    {
        $request = new AttendanceDataOneHourApiRequest($settings);

        $request->execute();

        if ($settings->is_summary())
        {
            return ApiModel::create_one($request->get_response()->first_package(), $settings->get_model());
        }

        return ApiModel::create($request->get_response()->package, $settings->get_model());
    }

    /**
     * Returns attendance users by the all hours of the day.
     *
     * @param AttendanceDataOneHourApiRequestSettings|null $settings
     *
     * @return Collection
     */
    public static function attendance_users_by_hours(? AttendanceDataOneHourApiRequestSettings $settings = null): Collection
    {
        $settings ??= new AttendanceDataOneHourApiRequestSettings();

        $collection = new Collection();

        for ($i = 0; $i < 24; $i++)
        {
            $settings->hour = $i;

            if ($settings->is_summary())
            {
                self::attendance_summary_users_by_hours_processing($i, $settings, $collection);

                continue ;
            }

            self::attendance_users_by_hours_processing($settings, $collection);
        }

        return $collection;
    }

    /**
     * Implements process for the summary attendance users.
     *
     * @param int $index
     *
     * @param AttendanceDataOneHourApiRequestSettings $settings
     *
     * @param Collection $collection
     *
     * @return void
     */
    private static function attendance_summary_users_by_hours_processing(int $index, AttendanceDataOneHourApiRequestSettings $settings, Collection $collection): void
    {
        if (DateManager::is_current_date($settings->date) && $index > DateManager::get_hour())
        {
            $collection->push(AttendanceSummaryDataOneHourApiModel::get_empty_record($settings->date, $index));

            return ;
        }

        $collection->push(self::attendance_users_by_hour($settings));
    }

    /**
     * Implements process for the attendance users.
     *
     * @param AttendanceDataOneHourApiRequestSettings $settings
     *
     * @param Collection $collection
     *
     * @return void
     */
    private static function attendance_users_by_hours_processing(AttendanceDataOneHourApiRequestSettings $settings, Collection &$collection): void
    {
        $collection = $collection->merge(self::attendance_users_by_hour($settings));
    }

    /**
     * Returns the attendance users by the whole day.
     *
     * @param AttendanceDataOneDayByHoursApiRequestSettings|null $settings
     *
     * @return Collection
     */
    public static function attendance_users_by_day(? AttendanceDataOneDayByHoursApiRequestSettings $settings = null): Collection
    {
        $settings ??= new AttendanceDataOneDayByHoursApiRequestSettings();

        $records = self::users_by_day($settings);

        if ($settings->is_summary())
        {
            return self::attendance_summary_users_by_day_processing($records, $settings);
        }

        return $records;
    }

    /**
     * Returns the attendance users by the whole day.
     *
     * @param AttendanceDataOneDayByHoursApiRequestSettings|null $settings
     *
     * @return Collection
     */
    private static function users_by_day(? AttendanceDataOneDayByHoursApiRequestSettings $settings = null): Collection
    {
        $settings ??= new AttendanceDataOneDayByHoursApiRequestSettings();

        $request = new AttendanceDataOneDayByHoursApiRequest($settings);

        $request->execute();

        return ApiModel::create($request->get_response()->package, $settings->get_model());
    }

    /**
     * Creates new collection with empty records if the given records does not have a specific hour.
     *
     * @param Collection $records
     *
     * @param AttendanceDataOneDayByHoursApiRequestSettings $settings
     *
     * @return Collection
     */
    private static function attendance_summary_users_by_day_processing(Collection $records, AttendanceDataOneDayByHoursApiRequestSettings $settings): Collection
    {
        $collection = new Collection();

        $records = $records->keyBy('hour');

        for ($i = 0; $i < 24; $i++)
        {
            if (!$records->get($i))
            {
                $collection->push(AttendanceSummaryDataOneHourApiModel::get_empty_record($settings->date, $i));

                continue ;
            }

            $collection->push($records->get($i));
        }

        return $collection;
    }

    /**
     * Returns the summary attendance users by hours.
     *
     * @param AttendanceDataOneHourApiRequestSettings $settings
     *
     * @return Collection
     *
     * @deprecated Added new universal method for this.
     *
     * @see AttendanceHandler::attendance_users_by_hours
     */
    public static function summary_users_by_hours(AttendanceDataOneHourApiRequestSettings $settings): Collection
    {
        $collection = new Collection();

        $current_hour = DateManager::get_hour();

        $settings->summary_data = 1;

        for ($i = 0; $i < 24; $i++)
        {
            $data = null;

            if (DateManager::is_current_date($settings->date) && $i > $current_hour)
            {
                $data = AttendanceSummaryDataOneHourApiModel::get_empty_record($settings->date, $i);
            }
            else
            {
                $settings->hour = $i;

                $data = self::attendance_users_by_hour($settings);
            }

            $collection->push($data);
        }

        return $collection;
    }

    /**
     * Returns the attendance users by hours.
     *
     * @param AttendanceDataOneHourApiRequestSettings $settings
     *
     * @return Collection
     *
     * @deprecated Added new universal method for this.
     *
     * @see AttendanceHandler::attendance_users_by_hours
     */
    public static function users_by_hours(AttendanceDataOneHourApiRequestSettings $settings): Collection
    {
        $collection = new Collection();

        for ($i = 0; $i < 24; $i++)
        {
            $settings->hour = $i;

            $data = self::attendance_users_by_hour($settings);

            foreach ($data as $datum)
            {
                $collection->push($datum);
            }
        }

        return $collection;
    }

    public static function check_models(): void
    {
        $settings_records_by_hour = new AttendanceDataOneHourApiRequestSettings();

        $settings_records_by_hour->date = date(DateFormatsClassifier::Y_m_d->value, strtotime('- 10 day'));

        $records_by_hours = self::users_by_hours($settings_records_by_hour);
//
//
//        $records_by_hours = self::summary_users_by_hours($settings_records_by_hour);
//
        $settings_records_by_day = new AttendanceDataOneDayByHoursApiRequestSettings();

        $settings_records_by_day->date = date(DateFormatsClassifier::Y_m_d->value, strtotime('- 10 day'));
//
//        $settings_records_by_day->summary_data = 1;

        $records_by_day = self::users_by_day($settings_records_by_day);

//        $records_by_day = $records_by_day->mapWithKeys(function ($record)
//        {
//            return [ $record->id_user => $record ];
//        });

//        p($records_by_day);
//        p($records_by_day->get(40));

        p($records_by_day->count());
        p($records_by_hours->count());

        $i = 0;

        foreach ($records_by_hours as $value)
        {
            foreach ($records_by_day as $inner_value)
            {
                if ($inner_value->date === $value->date && $inner_value->hour === $value->hour && $inner_value->id_user === $value->id_user)
                {
                    $i++;

                    if (array_diff((array) $value, (array) $inner_value ))
                    {
                        p((array) $value);
                        p((array) $inner_value);
                    }
//                    p(array_diff((array) $value, (array) $inner_value ));

//                    p($value);
                }
            }
//            p(array_diff((array) $value, (array) $records_by_day->get($value->id_user)));
//            p($value);
        }

        p($i);
//
//        p($settings_records_by_hour->date);
//        foreach ($records_by_hours as $records_by_hour)
//        {
//            if (!isset($records_by_day[ $records_by_hour->hour ]))
//            {
//                p('Record with hour ' . $records_by_hour->hour . ' is not set!');
//            }
//            else
//            {
//                $records_by_hour->count_seconds = 12;
//                $array_diff = array_diff((array) $records_by_hour, (array) $records_by_day[ $records_by_hour->hour ]);
//
//                if (!empty($array_diff))
//                {
//                    p('Differences:');
//                    p($array_diff);
//
//                    p('By hour array:');
//                    p((array) $records_by_hour);
//
//                    p('By day array:');
//                    p((array) $records_by_day[ $records_by_hour->hour ]);
//                }
//                else
//                {
//                    p('Record with hour ' . $records_by_hour->hour . ' not has differences');
//                }
////                $test = (array) $records_by_hour;
////
////                $test['count_enter'] =123;
////                p();
////                p((array) $records_by_hour);
////
////                p((array) $records_by_day[ $records_by_hour->hour ]);
//            }
//            p();
////            p($records_by_hour);
//        }
//
//        p($records_by_day);
//
//        p($records_by_hours);
    }
}
