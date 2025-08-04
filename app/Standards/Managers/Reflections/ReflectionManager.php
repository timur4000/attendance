<?php

namespace App\Standards\Managers\Reflections;

use App\Standards\Classifiers\Errors\ErrorMessagesClassifier;
use ReflectionAttribute;
use ReflectionClass;
use ReflectionObject;
use ReflectionProperty;

/**
 * Implements helper work with reflection logic.
 */
class ReflectionManager
{
    /**
     * Creates by the given parameter and returns new reflection class.
     *
     * @param object|string $class
     *
     * @return ReflectionClass
     */
    public static function create(object | string $class): ReflectionClass
    {
        return new ReflectionObject($class);
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
     * Returns instance of the first reflection attribute of the given reflection property.
     *
     * @param ReflectionProperty $property
     *
     * @param string|null $name
     *
     * @param int $flags
     *
     * @return object
     */
    public static function first_attribute_instance(ReflectionProperty $property, string | null $name = null, int $flags = 0): object
    {
        $attributes = $property->getAttributes($name, $flags);

        if (!isset($attributes[ 0 ]))
        {
            throw new \ValueError(sprintf(ErrorMessagesClassifier::MISSING_REFLECTION_ATTRIBUTE->value, $property->getName()));
        }

        return $attributes[ 0 ]->newInstance();
    }
}
