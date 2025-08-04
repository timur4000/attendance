<?php

namespace App\Handlers\Admin\AdminMenu;

use App\Models\Admin\Systems\AdminMenu\SAdminMenu;
use App\Standards\Classifiers\Chars\CharsClassifiers;
use App\Standards\Handlers\Abstracts\Handler;
use App\Standards\Handlers\Interfaces\IDeleting;
use App\Standards\Handlers\Interfaces\IGetting;
use App\Standards\Handlers\Interfaces\IRecording;
use App\Standards\Handlers\Interfaces\ISelectable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

/**
 * Implements help work with admin menu information.
 */
class AdminMenuHandler extends Handler implements IRecording, IGetting, ISelectable, IDeleting
{
    /**
     * @inheritdoc
     *
     * @return Collection
     */
    public static function records(): Collection
    {
        return SAdminMenu::query()
            ->with('admin_permission_groups')
            ->with('admin_permissions')
            ->with('admin_menu')
            ->orderBy('sort_order')
            ->get();
    }

    /**
     * Implements recursive convert records to tree view.
     *
     * @param \Illuminate\Database\Eloquent\Collection $records
     *
     * @param int $id_parent
     *
     * @return Collection
     */
    private static function tree(\Illuminate\Database\Eloquent\Collection $records, int $id_parent): Collection
    {
        $collection = new Collection();

        foreach ($records as $record)
        {
            if ($record->id_parent === $id_parent)
            {
                $collection->push($record);

                $record->trees = self::tree($records, $record->id);
            }
        }

        return $collection;
    }

    /**
     * Returns records of tree view.
     *
     * @return Collection
     */
    public static function tree_records(): Collection
    {
        $records = SAdminMenu::query()
            ->with('admin_permission_groups')
            ->with('admin_permissions')
            ->with('admin_menu')
            ->orderBy('sort_order')
            ->where('is_active', '=', true)
            ->where('id_parent', '!=', null)
            ->get();

        return self::tree($records, 0);
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
        $record = SAdminMenu::query()->create($attributes);

        self::permissions_sync($record, $attributes[ 'admin_permissions' ]);

        self::permission_groups_sync($record, $attributes[ 'admin_permission_groups' ]);

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
        $record = SAdminMenu::query()->updateOrCreate($attributes, $values);

        self::permissions_sync($record, $values[ 'admin_permissions' ]);

        self::permission_groups_sync($record, $values[ 'admin_permission_groups' ]);

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
        return SAdminMenu::query()
            ->with('admin_permission_groups')
            ->with('admin_permissions')
            ->with('admin_menu')
            ->find($id);
    }

    /**
     * Checks if the current user has permissions for viewing record by the given id.
     *
     * @param int|null $id
     *
     * @return bool
     */
    public static function has_permissions(?int $id = null): bool
    {
        $record = self::get($id);

        if (!$record)
        {
            return false;
        }

        foreach (admin_authorization()->get_roles() as $role)
        {
            $admin_permissions = $role->admin_permission_group->admin_permissions;

            foreach ($admin_permissions as $permission)
            {
                $record_admin_permission = $record->admin_permissions->find($permission->id);

                if (!empty($record_admin_permission) || $record_admin_permission?->custom_pattern === CharsClassifiers::ALL_DESIGNATE)
                {
                    return true;
                }
            }
        }

        return true;
    }

    /**
     * Checks if the current user has permission groups for viewing record by the given id.
     *
     * @param int|null $id
     *
     * @return bool
     */
    public static function has_permission_group(? int $id = null): bool
    {
        $record = self::get($id);

        if (!$record)
        {
            return false;
        }

        foreach (admin_authorization()->get_roles() as $role)
        {
            foreach ($record->admin_permission_groups as $admin_permission_group)
            {
                if ($role->id_admin_permission_group === $admin_permission_group->id)
                {
                    return true;
                }
            }
        }

        return false;
    }

    /**
     * Returns record by the given route name. If route argument not declared returns record by the current route.
     *
     * @param string|null $route
     *
     * @return Model|null
     */
    public static function get_by_route(? string $route = null): Model | null
    {
        if (is_null($route))
        {
            $route = request()->route()->getName();
        }

        return SAdminMenu::query()
            ->with('admin_permission_groups')
            ->with('admin_permissions')
            ->with('admin_menu')
            ->where('route', '=', $route)
            ->first();
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
     * Synchronizes permission recordings.
     *
     * @param Model|SAdminMenu $record
     *
     * @param array $ids
     *
     * @return void
     */
    public static function permissions_sync(Model | SAdminMenu $record, array $ids = []): void
    {
        $record->admin_permissions()->sync($ids);
    }

    /**
     * Synchronizes permission group recordings.
     *
     * @param Model|SAdminMenu $record
     *
     * @param array $ids
     *
     * @return void
     */
    public static function permission_groups_sync(Model | SAdminMenu $record, array $ids = []): void
    {
        $record->admin_permission_groups()->sync($ids);
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
            $record = SAdminMenu::query()->find($id);

            self::permissions_sync($record);

            self::permission_groups_sync($record);

            $record->delete();
        });

        return true;
    }
}
