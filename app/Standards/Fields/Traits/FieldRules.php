<?php

namespace App\Standards\Fields\Traits;

/**
 * Adds validation rules logic to field element.
 */
trait FieldRules
{
    protected string $rules = '';

    /**
     * @return bool
     */
    public function has_rules(): bool
    {
        return !empty($this->rules);
    }

    /**
     * @return string
     */
    public function get_rules(): string
    {
        return $this->rules;
    }

    /**
     * @param string $rules
     *
     * @return FieldRules
     */
    public function set_rules(string $rules): static
    {
        $this->rules = $rules;

        return $this;
    }
}
