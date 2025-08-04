<?php

namespace App\Standards\Fields\Traits;

use App\Standards\Fields\Classifiers\FieldInputTypesClassifier;

/**
 * Adds types logic to field element.
 */
trait FieldTypes
{
    /**
     * @var FieldInputTypesClassifier
     */
    protected FieldInputTypesClassifier $type;

    /**
     * Sets type property.
     *
     * @param FieldInputTypesClassifier $classifier
     *
     * @return $this
     */
    public function type(FieldInputTypesClassifier $classifier): static
    {
        $this->type = $classifier;

        return $this;
    }

    /**
     * Checks if the current instance contain type property.
     *
     * @return bool
     */
    public function has_type(): bool
    {
        return isset($this->type->name);
    }

    /**
     * Returns type property.
     *
     * @return string
     */
    public function get_type(): string
    {
        return $this->type->name;
    }
}
