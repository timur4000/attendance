<?php

namespace App\Standards\Fields\Traits;

/**
 * Adds pseudo-name logic to field element.
 */
trait FieldPseudoName
{
    /**
     * @var string|null
     */
    protected ? string $pseudo_name = null;

    /**
     * Sets pseudo-name property.
     *
     * @param string $value
     *
     * @return $this
     */
    public function set_pseudo_name(string $value): static
    {
        $this->pseudo_name = $value;

        return $this;
    }

    /**
     * Returns pseudo-name property.
     *
     * @return string|null
     */
    public function get_pseudo_name(): string | null
    {
        return $this->pseudo_name;
    }
}