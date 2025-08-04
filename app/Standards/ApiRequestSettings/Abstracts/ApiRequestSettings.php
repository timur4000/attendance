<?php

namespace App\Standards\ApiRequestSettings\Abstracts;

use App\Managers\Enums\EnumsManager;
use App\Managers\Reflections\ReflectionManager;
use App\Standards\ApiModels\Abstracts\ApiModel;
use App\Standards\ApiRequests\Classifiers\ApiRequestDataTypesClassifier;
use App\Standards\Attributes\Classes\ClassAttribute;
use App\Standards\Attributes\Processes\ValueProcessAttribute;
use App\Standards\Attributes\Requests\RequestKeyAttribute;
use App\Standards\Callables\ApiRequestSettings\OrderByArrayToString;
use App\Standards\Classifiers\Errors\ErrorMessagesClassifier;
use ReflectionException;
use ReflectionProperty;
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
     *
     * @throws ReflectionException
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

            if (!$attribute)
            {
                continue ;

//                throw new \ValueError(sprintf(ErrorMessagesClassifier::MISSING_REFLECTION_ATTRIBUTE->value, $property->getName()));
            }

            $value_process_attribute = ReflectionManager::first_attribute_instance($property, ValueProcessAttribute::class);

            if ($value_process_attribute)
            {
                $value = $value_process_attribute->process($value, $property);
            }

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
     *
     * @throws ReflectionException
     */
    public function update(array $values): void
    {
        foreach ($values as $key => $value)
        {
            if (!isset($this->{ $key }))
            {
                continue ;
            }

            if ($this->{ $key } instanceof UnitEnum)
            {
                try
                {
                    EnumsManager::set_property_by_value($this, $key, $value);
                }
                catch (\Exception $exception)
                {
                    // code..
                }

                continue ;
            }

            $this->{ $key } = $value ?? ReflectionManager::property($this::class, $key)->getDefaultValue();
        }
    }

    /**
     * Returns hash of the current instance.
     *
     * @return string
     */
    public function to_sha256(): string
    {
        return hash('sha256', json_encode($this));
    }

    /**
     * Returns converted string of the order_by variable.
     *
     * @param ReflectionProperty $property
     *
     * @return string
     *
     * @throws ReflectionException
     *
     * @deprecated
     *
     * @see OrderByArrayToString
     */
    public function order_by_processing(ReflectionProperty $property): string
    {
        $string = '';

        $class = ReflectionManager::first_attribute_instance($property, ClassAttribute::class)->value;

        foreach ($this->{ $property->getName() } as $value)
        {
            $original = ApiModel::original_key_by_property($value[ 'name' ], $class);

            if (!empty($string))
            {
                $string .= ', ';
            }

            $string .= '"'. $original . '" ' . strtoupper($value['direction']);
        }

        return $string;
    }
}
