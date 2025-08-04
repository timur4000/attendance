<?php

namespace App\Handlers\Admin\AdminPermissionGroups;

use App\Models\Admin\Systems\AdminPermissionGroups\SAdminPermissionGroups;
use App\Standards\Handlers\Abstracts\Handler;
use App\Standards\Handlers\Interfaces\IDeleting;
use App\Standards\Handlers\Interfaces\IGetting;
use App\Standards\Handlers\Interfaces\IRecording;
use App\Standards\Handlers\Interfaces\ISelectable;
use App\Standards\Handlers\Interfaces\ISynchronous;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

/**
 * Implements help work with admin permission groups information.
 */
class AdminPermissionGroupsHandler extends Handler implements IRecording, ISynchronous, IGetting, ISelectable, IDeleting
{
    /**
     * @inheritdoc
     *
     * @return Collection
     */
    public static function records(): Collection
    {
        $records = SAdminPermissionGroups::query()
            ->with('admin_permissions');

        self::order_by(request()->json('order_by'), $records);

        return $records->get();
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
        $record = SAdminPermissionGroups::query()->create($attributes);

        self::sync($record, $attributes['admin_permissions']);

        return $record;
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
        $record = SAdminPermissionGroups::query()->updateOrCreate($attributes, $values);

        self::sync($record, $values['admin_permissions']);

        return $record;
    }

    /**
     * @inheritdoc
     *
     * @param Model|SAdminPermissionGroups $record
     *
     * @param array $ids
     *
     * @return void
     */
    public static function sync(Model | SAdminPermissionGroups $record, array $ids = []): void
    {
        $record->admin_permissions()->sync($ids);
    }

    /**
     * @inheritdoc
     *
     * @param int|null $id
     *
     * @return Model|null
     */
    public static function get(?int $id = null): Model | null
    {
        return SAdminPermissionGroups::query()
            ->with('admin_permissions')
            ->find($id);
    }

    /**
     * @inheritdoc
     *
     * @param string $key
     *
     * @param string $value
     *
     * @return Collection
     */
    public static function to_select_options(string $key, string $value): Collection
    {
        return self::records()->pluck($value, $key);
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
        DB::transaction(function () use ($id)
        {
            $record = SAdminPermissionGroups::query()->find($id);

            self::sync($record);

            $record->delete();
        });

        return true;
    }
}
