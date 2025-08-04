<?php

namespace App\Standards\Fields\Traits;

/**
 * Adds name logic to field element.
 */
trait FieldName
{
    /**
     * @var string
     */
    protected string $name;

    /**
     * Sets name property.
     *
     * @param string $value
     *
     * @return $this
     */
    public function name(string $value): static
    {
        $this->name = $value;

        return $this;
    }

    /**
     * Returns name property.
     *
     * @return string
     */
    public function get_name(): string
    {
        return $this->name ?? '';
    }
}