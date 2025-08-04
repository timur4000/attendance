<?php

namespace App\Standards\Elements\Callables;

use App\Standards\Callables\Interfaces\ICallable;

/**
 * Implements each loop of the attributes reduce method.
 */
class AttributesToStringReduceCallable implements ICallable
{
    /**
     * @return mixed
     */
    public function __invoke($accumulator, $value, $key): string
    {
        $accumulator .= $key . '="' . $value . '"';

        return $accumulator;
    }
}
