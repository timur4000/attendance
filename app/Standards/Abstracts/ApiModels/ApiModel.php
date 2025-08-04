<?php

namespace App\Standards\Abstracts\ApiModels;

use App\Standards\Attributes\ApiModel\ApiModelResponseKeyAttribute;
use App\Standards\Classifiers\Errors\ErrorMessagesClassifier;
use App\Standards\Interfaces\ApiModels\IApiModelAttributesHandled;
use App\Standards\Managers\Json\JsonManager;
use App\Standards\Managers\Reflections\ReflectionManager;
use Illuminate\Support\Collection;
use ReflectionClass;
use ReflectionProperty;

/**
 * Implements abstract for all api models.
 */
abstract class ApiModel
{
    /**
     * @param array $values
     */
    public function __construct(array $values)
    {
        $this->fill($values);
    }

    /**
     * Fills instance with given values.
     *
     * @param array $values
     *
     * @return void
     */
    public function fill(array $values): void
    {
        $reflection_properties = $this->get_reflection_properties();

        foreach ($reflection_properties as $reflection_property)
        {
            $key = $reflection_property->getName();

            if (!isset($values[ $key ]))
            {
                $key = $this->get_response_key($reflection_property);
            }

            if (!isset($values[ $key ]))
            {
                continue;
            }

            $value = $values[ $key ];

            if (JsonManager::is_json($value))
            {
                $value = JsonManager::from_json($value);
            }

            $value = $this->another_attributes_processing($reflection_property, $value);

            $this->{ $reflection_property->getName() } = $value;
        }
    }

    /**
     * Merges api model with similar type to current.
     *
     * @param ApiModel $model
     *
     * @return ApiModel
     */
    public function merge(ApiModel $model): ApiModel
    {
        if (!$this->is_similar($model))
        {
            throw new \Error(ErrorMessagesClassifier::API_MODEL_TYPE_DIFFERENT->value);
        }

        foreach ($model as $key => $value)
        {
            $this->{ $key } = $value;
        }

        return $this;
    }

    /**
     * Checks if the given api model is the type of the current instance.
     *
     * @param ApiModel $model
     *
     * @return bool
     */
    protected function is_similar(ApiModel $model): bool
    {
        return $model::class === $this::class;
    }

    /**
     * Implements processing with the given value by properties of attributes, that are implements of the IApiModelAttributesHandled interface.
     *
     * @param ReflectionProperty $reflection_property
     *
     * @param mixed $value
     *
     * @return mixed
     */
    protected function another_attributes_processing(ReflectionProperty $reflection_property, mixed $value): mixed
    {
        $reflection_attributes = $reflection_property->getAttributes();

        foreach ($reflection_attributes as $reflection_attribute)
        {
            $reflection_attribute_name = $reflection_attribute->getName();

            if (!is_subclass_of($reflection_attribute_name, IApiModelAttributesHandled::class))
            {
                continue ;
            }

            $value = $reflection_attribute_name::handle($value);
        }

        return $value;
    }

    /**
     * Returns key name of api response from attribute.
     *
     * @param ReflectionProperty $reflection_property
     *
     * @return string
     */
    protected function get_response_key(ReflectionProperty $reflection_property): string
    {
        $attributes = $reflection_property->getAttributes(ApiModelResponseKeyAttribute::class);

        if (empty($attributes[ 0 ]))
        {
            throw new \Error(sprintf(ErrorMessagesClassifier::REFLECTION_ATTRIBUTE_NOT_DECLARED->value, $reflection_property->getName()));
        }

        $instance = $attributes[ 0 ]->newInstance();

        return $instance->value;
    }

    /**
     * Returns reflection class of current model.
     *
     * @return ReflectionClass
     */
    private function get_reflection_class(): ReflectionClass
    {
        return ReflectionManager::create($this);
    }

    /**
     * Returns all reflection properties of current model.
     *
     * @return ReflectionProperty[]
     */
    private function get_reflection_properties(): array
    {
        return ReflectionManager::properties($this->get_reflection_class());
    }

    /**
     * Checks if the model is empty.
     *
     * @return bool
     */
    public function is_empty(): bool
    {
        $array = (array) $this;

        return !$array;
    }

    /**
     * Creates collection with the model instances of the given records.
     *
     * @param array $records
     *
     * @param string $namespace
     *
     * @return Collection
     */
    public static function create(array $records, string $namespace): Collection
    {
        if (!is_subclass_of($namespace, ApiModel::class))
        {
            throw new \Error(ErrorMessagesClassifier::API_MODEL_TYPE_DIFFERENT->value);
        }

        foreach ($records as &$record)
        {
            $record = new $namespace($record);
        }

        return new Collection($records);
    }

    /**
     * Creates model instance of the given record.
     *
     * @param array $record
     *
     * @param string $namespace
     *
     * @return Object
     */
    public static function create_one(array $record, string $namespace): Object
    {
        if (!is_subclass_of($namespace, ApiModel::class))
        {
            throw new \Error(ErrorMessagesClassifier::API_MODEL_TYPE_DIFFERENT->value);
        }

        return new $namespace($record);
    }}
