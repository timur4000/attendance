<?php

namespace App\Exports\Users;

use App\ApiRequestSettings\Data\Users\UsersArrivalsDeparturesApiRequestSettings;
use App\Handlers\Admin\Users\UsersArrivalsDeparturesHandler;
use App\Standards\Exports\Abstracts\TablesCollectionExport;
use Illuminate\Support\Collection;
use ReflectionException;

/**
 * Implements exports arrivals and departures records to excel.
 */
class UsersArrivalsDeparturesExport extends TablesCollectionExport
{
    /**
     * @return Collection
     *
     * @throws ReflectionException
     */
    protected function set_collection(): Collection
    {
        $settings = new UsersArrivalsDeparturesApiRequestSettings();

        $settings->update(request()->all());

        return UsersArrivalsDeparturesHandler::records($settings);
    }
}
