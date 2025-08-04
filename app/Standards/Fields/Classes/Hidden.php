<?php

namespace App\Standards\Fields\Classes;

use App\Standards\Elements\Classifiers\ViewsClassifier;
use App\Standards\Fields\Abstracts\Input;
use App\Standards\Fields\Classifiers\FieldInputTypesClassifier;

/**
 * Implements logic for hidden field.
 */
class Hidden extends Input
{
    /**
     * @param string $name
     *
     * @param string $value
     */
    public function __construct(string $name, string $value)
    {
        parent::__construct();

        $this->name($name);

        $this->set_value($value);

        $this->type(FieldInputTypesClassifier::hidden);
    }

    public function initialization(): static
    {
        return $this;
    }

    public function render(): string
    {
        return view(ViewsClassifier::hidden->value)
            ->with($this->to_with())
            ->render();
    }
}