<?php

namespace App\Handlers\Admin\Configurations\Types;

use App\Models\Admin\Systems\Configurations\Types\SConfigurationTypes;
use App\Standards\Handlers\Abstracts\Handler;
use App\Standards\Handlers\Interfaces\IDeleting;
use App\Standards\Handlers\Interfaces\IGetting;
use App\Standards\Handlers\Interfaces\ISelectable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Implements help work with configuration types information.
 */
class TypesHandler extends Handler implements IGetting, IDeleting, ISelectable
{
    /**
     * Returns all records.
     *
     * @return Collection
     */
    public static function records(): Collection
    {
        $records = SConfigurationTypes::query();

        self::order_by(request()->json('order_by'), $records);

        return $records->get();
    }

    /**
     * @inheritdoc
     *
     * @param int|null $id
     *
     * @return Model|null
     */
    public static function get(? int $id = 0): Model | null
    {
        return SConfigurationTypes::query()
            ->where('id', '=', $id)
            ->first();
    }

    /**
     * @inheritdoc
     *
     * @param int|null $id
     *
     * @return mixed
     */
    public static function delete(? int $id = null): mixed
    {
        return SConfigurationTypes::query()
            ->where('id', '=', $id)
            ->delete();
    }

    /**
     * Creates record with the given attributes and returns it.
     *
     * @param array $attributes
     *
     * @return Builder|Model
     */
    public static function create(array $attributes): Builder | Model
    {
        return SConfigurationTypes::query()->create($attributes);
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
        return SConfigurationTypes::query()->updateOrCreate($attributes, $values);
    }

    public static function to_select_options(string $key, string $value): \Illuminate\Support\Collection
    {
        return self::records()->pluck($value, $key);
    }
}
