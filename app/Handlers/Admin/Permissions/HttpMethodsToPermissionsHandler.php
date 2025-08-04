<?php

namespace App\Handlers\Admin\Permissions;

use App\Models\Admin\Systems\Permissions\SHttpMethodsToSAdminPermissions;
use App\Standards\Handlers\Abstracts\Handler;
use App\Standards\Handlers\Interfaces\IDeleting;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

/**
 * Implements help work with http methods to admin permissions information.
 */
class HttpMethodsToPermissionsHandler extends Handler implements IDeleting
{
    /**
     * Creates record with the given attributes and return it.
     *
     * @param array $attributes
     *
     * @return Builder|Model
     */
    public static function create(array $attributes): Builder | Model
    {
        return SHttpMethodsToSAdminPermissions::query()->create($attributes);
    }

    /**
     * Deletes record by the given id.
     *
     * @param int $id
     *
     * @return Builder|Model
     */
    public static function delete(int $id): mixed
    {
        return SHttpMethodsToSAdminPermissions::query()
            ->where('id', '=', $id)
            ->delete();
    }
}
