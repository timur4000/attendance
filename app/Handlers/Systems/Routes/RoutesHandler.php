<?php

namespace App\Handlers\Systems\Routes;

use App\Standards\Handlers\Abstracts\Handler;
use App\Standards\Handlers\Interfaces\IRecording;
use App\Standards\Handlers\Interfaces\ISelectable;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Route;

/**
 * Implements help work with Routes.
 */
class RoutesHandler extends Handler implements IRecording, ISelectable
{
    /**
     * @return Collection<\Illuminate\Routing\Route>
     */
    public static function records(): Collection
    {
        $collection = new Collection();

        foreach (Route::getRoutes() as $record)
        {
            $collection->push($record);
        }

        return $collection;
    }

    /**
     * Converts records to select options format.
     *
     * @param string $key
     *
     * @param string $value
     *
     * @return Collection
     */
    public static function to_select_options(string $key, string $value): Collection
    {
        $collection = new Collection();

        foreach (self::records() as $record)
        {
            $collection->put($record->getName(), $record->getName());
        }

        return $collection;
    }
}