<?php

namespace App\Standards\Callables\Exports;

use App\Standards\Callables\Interfaces\ICallable;

/**
 * Implements callable method for searching the required columns by the given columns.
 */
class ExportColumnsAccessCallable implements ICallable
{
    /**
     * @var array
     */
    private array $columns;

    /**
     * @param array $columns
     */
    public function __construct(array $columns)
    {
        $this->columns = $columns;
    }

    /**
     * @param object|array $target
     *
     * @return array
     */
    public function __invoke(object | array $target): array
    {
        return array_intersect_key((array) $target, array_flip($this->columns));
    }
}
