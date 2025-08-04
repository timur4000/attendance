<?php

namespace App\Standards\Elements\Traits;

/**
 * Adds svg logic to element.
 */
trait Svg
{
    /**
     * @var string
     */
    protected string $svg = 'essential-dots-horizontal';

    /**
     * Sets the given value to svg property.
     *
     * @param string $value
     *
     * @return $this
     */
    public function svg(string $value): static
    {
        $this->svg = $value;

        return $this;
    }

    /**
     * Returns svg.
     *
     * @return string
     */
    public function get_svg(): string
    {
        return $this->svg;
    }
}
