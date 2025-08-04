<?php

namespace App\Standards\Fields\Traits;

/**
 * Adds label logic to field element.
 */
trait FieldLabel
{
    /**
     * @var string
     */
    protected string $label = '';

    /**
     * Sets label property.
     *
     * @param string $value
     *
     * @return $this
     */
    public function label(string $value): static
    {
        $this->label = $value;

        return $this;
    }

    /**
     * Returns label property.
     *
     * @return string
     */
    public function get_label(): string
    {
        return $this->label;
    }
}
