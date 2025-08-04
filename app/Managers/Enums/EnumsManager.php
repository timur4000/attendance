<?php

namespace App\Managers\Enums;

use App\Managers\Reflections\ReflectionManager;
use App\Standards\Managers\Abstracts\Manager;
use ReflectionException;

/**
 * Implements help work with enums.
 */
class EnumsManager extends Manager
{
    /**
     * Sets the given value to property of the given instance by the given property name.
     *
     * @param object $instance
     *
     * @param string $property_name
     *
     * @param string|int $value
     *
     * @return void
     *
     * @throws ReflectionException
     */
    public static function set_property_by_value(object $instance, string $property_name, string | int $value): void
    {
        $reflection_property = ReflectionManager::property($instance, $property_name);

        $type = ReflectionManager::property_type($reflection_property);

        $instance->{ $property_name } = $type->getName()::tryFrom($value);
    }
}
