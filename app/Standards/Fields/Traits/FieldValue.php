<?php

namespace App\Standards\Fields\Traits;

/**
 * Adds value logic to field element.
 */
trait FieldValue
{
    /**
     * @var string
     */
    protected mixed $value;

    /**
     * @return bool
     */
    public function has_value(): bool
    {
        return isset($this->value);
    }

    /**
     * @return string
     */
    public function get_value(): mixed
    {
        return $this->value ?? old($this->get_name()) ?? '';
    }

    /**
     * @param string $value
     *
     * @return $this
     */
    public function set_value(mixed $value): static
    {
        $this->value = $value;

        return $this;
    }
}
