<?php

namespace App\Exports\ScaUsers;

use App\Handlers\Admin\ScaUsers\ScaUsersHandler;
use App\Standards\Exports\Abstracts\TablesCollectionExport;
use Illuminate\Support\Collection;

/**
 * Implements export of Sca Users.
 */
class ScaUsersExport extends TablesCollectionExport
{
    /**
    * @return Collection
    */
    public function set_collection(): Collection
    {
        return ScaUsersHandler::records();
    }
}
