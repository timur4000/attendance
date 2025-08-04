<?php

namespace App\Standards\Fields\Traits;

/**
 * Adds placeholder logic to field element.
 */
trait FieldPlaceholder
{
    /**
     * @var string
     */
    protected string $placeholder;

    /**
     * Sets placeholder property.
     *
     * @param string $value
     *
     * @return $this
     */
    public function placeholder(string $value): static
    {
        $this->placeholder = $value;

        return $this;
    }

    /**
     * Checks if the current instance contain placeholder property.
     *
     * @return bool
     */
    public function has_placeholder(): bool
    {
        return isset($this->placeholder);
    }

    /**
     * Returns placeholder property.
     *
     * @return string
     */
    public function get_placeholder(): string
    {
        return $this->placeholder;
    }
}
