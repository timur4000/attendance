<?php

namespace App\Handlers\Admin\AdminRoles;

use App\Models\Admin\Systems\AdminRoles\SAdminPermissionGroupsToApiRoles;
use App\Standards\Handlers\Abstracts\Handler;
use App\Standards\Handlers\Interfaces\IDeleting;
use App\Standards\Handlers\Interfaces\IGetting;
use App\Standards\Handlers\Interfaces\IIdsRecording;
use App\Standards\Handlers\Interfaces\IRecording;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

/**
 * Implements help work with the admin roles information.
 */
class AdminRolesHandler extends Handler implements IRecording, IIdsRecording, IGetting, IDeleting
{
    /**
     * @inheritdoc
     *
     * @return Collection
     */
    public static function records(): Collection
    {
        $records = SAdminPermissionGroupsToApiRoles::query()
            ->with('admin_permission_group');

        self::order_by(request()->json('order_by'), $records);

        return $records->get();
    }

    /**
     * @inheritdoc
     *
     * @param array $ids
     *
     * @return Collection
     */
    public static function records_by_ids(array $ids = []): Collection
    {
        return SAdminPermissionGroupsToApiRoles::query()
            ->with('admin_permission_group')
            ->whereIn('id_role', $ids)
            ->get();
    }

    /**
     * Creates record with the given attributes and return it.
     *
     * @param array $attributes
     *
     * @return Builder|Model
     */
    public static function create(array $attributes): Builder | Model
    {
        return SAdminPermissionGroupsToApiRoles::query()->create($attributes);
    }

    /**
     * Creates or update record with the given values and returns it.
     *
     * @param array $attributes
     *
     * @param array $values
     *
     * @return Builder|Model
     */
    public static function updateOrCreate(array $attributes, array $values = []): Builder | Model
    {
        return SAdminPermissionGroupsToApiRoles::query()->updateOrCreate($attributes, $values);
    }

    /**
     * @inheritdoc
     *
     * @param int|null $id
     *
     * @return Model|null
     */
    public static function get(?int $id = null): Model|null
    {
        return SAdminPermissionGroupsToApiRoles::query()
            ->find($id);
    }

    /**
     * @inheritdoc
     *
     * @param int $id
     *
     * @return mixed
     */
    public static function delete(int $id): mixed
    {
        return SAdminPermissionGroupsToApiRoles::query()
            ->find($id)
            ->delete();
    }
}
