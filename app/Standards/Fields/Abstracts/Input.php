<?php

namespace App\Standards\Fields\Abstracts;

use App\Standards\Elements\Traits\Svg;
use App\Standards\Fields\Traits\FieldLabel;
use App\Standards\Fields\Traits\FieldPlaceholder;
use App\Standards\Fields\Traits\FieldTypes;
use App\Standards\Fields\Traits\FieldValue;

/**
 * Implements base logic for all inputs.
 */
abstract class Input extends Field
{
    use FieldValue, FieldTypes, FieldPlaceholder, FieldLabel, Svg;

    public mixed $default_value;

    /**
     * @return bool
     */
    public function has_default_value(): bool
    {
        return isset($this->default_value);
    }

    /**
     * @return mixed
     */
    public function get_default_value(): mixed
    {
        return $this->default_value;
    }

    /**
     * @param mixed $default_value
     *
     * @return Input
     */
    public function set_default_value(mixed $default_value): static
    {
        $this->default_value = $default_value;

        return $this;
    }
}
