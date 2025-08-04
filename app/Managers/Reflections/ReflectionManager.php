<?php

namespace App\Managers\Reflections;

use App\Standards\Managers\Abstracts\Manager;
use ReflectionAttribute;
use ReflectionClass;
use ReflectionException;
use ReflectionIntersectionType;
use ReflectionNamedType;
use ReflectionObject;
use ReflectionProperty;
use ReflectionUnionType;

/**
 * Implements helper work with reflection logic.
 */
class ReflectionManager extends Manager
{
    /**
     * Creates by the given parameter and returns new reflection class.
     *
     * @param object|string $class
     *
     * @return ReflectionClass
     *
     * @throws ReflectionException
     */
    public static function create(object | string $class): ReflectionClass
    {
        return new ReflectionClass($class);
    }

    /**
     * Returns all reflection properties of the given reflection class.
     *
     * @param ReflectionClass $class
     *
     * @param int|null $filter
     *
     * @return ReflectionProperty[]
     */
    public static function properties(ReflectionClass $class, int | null $filter = null): array
    {
        return $class->getProperties($filter);
    }

    /**
     * Creates and returns reflection property by the given property of the given class.
     *
     * @param object|string $class
     *
     * @param string $property
     *
     * @return ReflectionProperty
     * @throws ReflectionException
     */
    public static function property(object | string $class, string $property): ReflectionProperty
    {
        return new ReflectionProperty($class, $property);
    }

    /**
     * Creates and returns reflection property by the given property of the given reflection class.
     *
     * @param ReflectionProperty $property
     *
     * @return ReflectionIntersectionType|ReflectionNamedType|ReflectionUnionType
     */
    public static function property_type(ReflectionProperty $property): ReflectionIntersectionType | ReflectionNamedType | ReflectionUnionType
    {
        return $property->getType();
    }

    /**
     * Returns all reflection attributes of the given reflection property.
     *
     * @param ReflectionProperty $property
     *
     * @param string|null $name
     *
     * @param int $flags
     *
     * @return ReflectionAttribute[]
     */
    public static function attributes(ReflectionProperty $property, string | null $name = null, int $flags = 0): array
    {
        return $property->getAttributes($name, $flags);
    }

    /**
     * Returns first reflection attribute of the given reflection property.
     *
     * @param ReflectionProperty $property
     *
     * @param string|null $name
     *
     * @param int $flags
     *
     * @return ReflectionAttribute|null
     */
    public static function first_attribute(ReflectionProperty $property, string | null $name = null, int $flags = 0): ReflectionAttribute | null
    {
        $attributes = $property->getAttributes($name, $flags);

        if (!isset($attributes[ 0 ]))
        {
            return null;
        }

        return $attributes[ 0 ];
    }

    /**
     * Returns instance of the first reflection attribute of the given reflection property.
     *
     * @param ReflectionProperty $property
     *
     * @param string|null $name
     *
     * @param int $flags
     *
     * @return object|null
     */
    public static function first_attribute_instance(ReflectionProperty $property, string | null $name = null, int $flags = 0): object | null
    {
        $attributes = $property->getAttributes($name, $flags);

        if (!isset($attributes[ 0 ]))
        {
            return null;
        }

        return $attributes[ 0 ]->newInstance();
    }
}
