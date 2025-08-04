<?php

namespace App\Managers\Date;

use App\Standards\Classifiers\Chars\CharsClassifiers;
use App\Standards\Classifiers\Date\DateFormatsClassifier;

/**
 * Implements help work with the date.
 */
class DateManager
{
    /**
     * Returns datetime by the given formats.
     *
     * @param DateFormatsClassifier $format
     *
     * @param string|null $date
     *
     * @return string
     */
    public static function datetime(DateFormatsClassifier $format = DateFormatsClassifier::Y_m_d_H_i_s, ? string $date = null): string
    {
        if ($date)
        {
            return date($format->value, strtotime($date));
        }

        return date($format->value);
    }

    /**
     * Changes current month by specified modifier and returns datetime by the specified format.
     *
     * @param int $modifier
     *
     * @param DateFormatsClassifier $format
     *
     * @param string $date
     *
     * @return string
     */
    public static function month_modifier(int $modifier = 0, DateFormatsClassifier $format = DateFormatsClassifier::Y_m_d_H_i_s, string $date = ''): string
    {
        $date ??= self::datetime();

        return date($format->value, strtotime($date . CharsClassifiers::SPACE . $modifier . ' month'));
    }

    /**
     * Returns number of month by the specified date.
     *
     * @param string|null $date
     *
     * @return string
     */
    public static function month_number(? string $date = null): string
    {
        $date ??= DateManager::datetime();

        return date(DateFormatsClassifier::m->value, strtotime($date));
    }

    /**
     * Returns yesterday date by the specified format.
     *
     * @param DateFormatsClassifier $format
     *
     * @param string $date
     *
     * @return string
     */
    public static function yesterday(DateFormatsClassifier $format = DateFormatsClassifier::Y_m_d_H_i_s, string $date = ''): string
    {
        return date($format->value, strtotime((!$date ? '' : $date . CharsClassifiers::SPACE) . '-1 day'));
    }

    /**
     * Checks if the given date is current.
     *
     * @param string $date
     *
     * @return bool
     */
    public static function is_current_date(string $date): bool
    {
        return date(DateFormatsClassifier::Y_m_d->value) === date(DateFormatsClassifier::Y_m_d->value, strtotime($date));
    }

    /**
     * Checks if the given hour is current.
     *
     * @param int $hour
     *
     * @return bool
     */
    public static function is_current_hour(int $hour): bool
    {
        return self::get_hour() === $hour;
    }

    /**
     * Returns hour of the given date or the current date.
     *
     * @param string $date
     *
     * @return int
     */
    public static function get_hour(string $date = ''): int
    {
        return (empty($date) ? date(DateFormatsClassifier::H->value) : date(DateFormatsClassifier::H->value, strtotime($date)));
    }
}
