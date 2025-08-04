<?php

namespace App\Standards\Handlers\Abstracts;

use Illuminate\Database\Eloquent\Builder;

/**
 * Implements base abstract logic for the handlers.
 */
abstract class Handler
{
    /**
     * Creates and return current instance.
     *
     * @return $this
     */
    public static function instance(): static
    {
        return new static();
    }

    /**
     * Implements sorting by the given columns.
     *
     * @param array|null $columns
     *
     * @param Builder $builder
     *
     * @return Builder
     */
    public static function order_by(array | null $columns, Builder $builder): Builder
    {
        $columns ??= [];
        
        foreach ($columns as $column)
        {
            $builder->orderBy($column['name'], $column['direction']);
        }

        return $builder;
    }
}
