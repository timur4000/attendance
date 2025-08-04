<?php

namespace App\Handlers\Admin\Configurations\Values;

use App\Models\Admin\Systems\Configurations\Values\SConfigurationValues;
use App\Standards\Handlers\Abstracts\Handler;
use App\Standards\Handlers\Interfaces\IDeleting;
use App\Standards\Handlers\Interfaces\IGetting;
use App\Standards\Handlers\Interfaces\ISelectable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Implements help work with configuration values information.
 */
class ValuesHandler extends Handler implements IGetting, IDeleting, ISelectable
{
    /**
     * Returns all records.
     *
     * @return Collection
     */
    public static function records(): Collection
    {
        $records = SConfigurationValues::query()
            ->with('group')
            ->with('type');

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
        return SConfigurationValues::query()
            ->with('group')
            ->with('type')
            ->where('id', '=', $id)
            ->first();
    }

    /**
     * Returns record by the specified code.
     *
     * @param string $code
     *
     * @return Model|null
     */
    public static function get_by_code(string $code): Model | null
    {
        return SConfigurationValues::query()
            ->with('group')
            ->with('type')
            ->where('code', '=', $code)
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
        return SConfigurationValues::query()
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
        return SConfigurationValues::query()->create($attributes);
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
        return SConfigurationValues::query()->updateOrCreate($attributes, $values);
    }

    public static function to_select_options(string $key, string $value): \Illuminate\Support\Collection
    {
        return self::records()->pluck($value, $key);
    }
}
