<?php

namespace App\Handlers\Admin\Permissions;

use App\Models\Admin\Systems\Permissions\SAdminPermissions;
use App\Standards\Handlers\Abstracts\Handler;
use App\Standards\Handlers\Interfaces\IDeleting;
use App\Standards\Handlers\Interfaces\IGetting;
use App\Standards\Handlers\Interfaces\ISelectable;
use App\Standards\Handlers\Interfaces\ISynchronous;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

/**
 * Implements help work with permissions information.
 */
class PermissionsHandler extends Handler implements IGetting, IDeleting, ISelectable, ISynchronous
{
    /**
     * Returns all records.
     *
     * @return Collection
     */
    public static function records(): Collection
    {
        $records = SAdminPermissions::query()
            ->with('http_methods');

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
        $record = SAdminPermissions::query()->create($attributes);

        self::sync($record, $attributes['http_methods']);

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
        $record = SAdminPermissions::query()->updateOrCreate($attributes, $values);

        self::sync($record, $values['http_methods']);

        return $record;
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
        return SAdminPermissions::query()
            ->with('http_methods')
            ->where('id', '=', $id)
            ->first();
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
            $record = SAdminPermissions::query()->find($id);

            self::sync($record);

            $record->delete();
        });

        return false;
    }

    /**
     * @inheritdoc
     *
     * @param string $key
     *
     * @param string $value
     *
     * @return \Illuminate\Support\Collection
     */
    public static function to_select_options(string $key = 'id', string $value = 'code'): \Illuminate\Support\Collection
    {
        return SAdminPermissions::query()
            ->get()
            ->pluck($value, $key);
    }

    /**
     * @inheritdoc
     *
     * @param Model $record
     *
     * @param array $ids
     *
     * @return void
     */
    public static function sync(Model $record, ? array $ids = []): void
    {
        $record->http_methods()->sync($ids);
    }
}
