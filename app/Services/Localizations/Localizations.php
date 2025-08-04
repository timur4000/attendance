<?php


namespace App\Services\Localizations;


class Localizations
{
    static public function locale()
    {
        $locale = request()->segment(1);

        if ($locale && in_array($locale, config( 'app.locales')))
        {
            return $locale;
        }

        return config( 'app.locale');
    }
}
