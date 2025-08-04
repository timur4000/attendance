<?php

namespace App\Standards\Callables\ApiRequestSettings;

use App\Standards\ApiModels\Abstracts\ApiModel;
use App\Standards\Callables\Interfaces\ICallable;
use ReflectionException;
use ReflectionProperty;

/**
 * Implements callable logic for converting array to specified string.
 *
 * @example '"NameOfColumn" ASC, "NameOfColumn" DESC'.
 */
class OrderByArrayToString implements ICallable
{
    public string $model;

    public function __construct(ApiModel | string $model)
    {
        $this->model = $model;
    }

    /**
     * @param array $array
     *
     * @param ReflectionProperty $property
     *
     * @return string
     *
     * @throws ReflectionException
     */
    public function __invoke(array $array, ReflectionProperty $property): string
    {
        $string = '';

        foreach ($array as $value)
        {
            $original = ApiModel::original_key_by_property($value[ 'name' ], $this->model);

            if (!empty($string))
            {
                $string .= ', ';
            }

            $string .= '"'. $original . '" ' . strtoupper($value['direction']);
        }

        return $string;
    }
}
