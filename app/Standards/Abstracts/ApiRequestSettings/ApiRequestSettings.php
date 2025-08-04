<?php

namespace App\Standards\Abstracts\ApiRequestSettings;

use App\Standards\Attributes\Requests\RequestKeyAttribute;
use App\Standards\Classifiers\ApiRequests\ApiRequestDataTypesClassifier;
use App\Standards\Managers\Reflections\ReflectionManager;
use UnitEnum;

/**
 * Implements abstract logic for the settings of the api request.
 */
abstract class ApiRequestSettings
{
    #[RequestKeyAttribute('TypeRequest')]
    public ApiRequestDataTypesClassifier $type_request;

    /**
     * Returns array of the all properties.
     *
     * @return array
     */
    public function to_array(): array
    {
        $array = [];

        $reflection = ReflectionManager::create($this);

        $properties = ReflectionManager::properties($reflection);

        foreach ($properties as $property)
        {
            if (!isset($this->{ $property->getName() }))
            {
                continue ;
            }

            $value = $this->{ $property->getName() };

            $attribute = ReflectionManager::first_attribute_instance($property, RequestKeyAttribute::class);

            if ($value instanceof UnitEnum)
            {
                $reflection_enum = ReflectionManager::create($value);

                $value = $reflection_enum->hasProperty('value') ? $value->value : $value->name;
            }

            $array[$attribute->value] = $value;
        }

        return $array;
    }

    /**
     * Updates current properties by the given values.
     *
     * @param array $values
     *
     * @return void
     */
    public function update(array $values): void
    {
        foreach ($values as $key => $value)
        {
            if (!isset($this->{ $key }))
            {
                continue ;
            }

            $this->{ $key } = $value;
        }
    }
}
