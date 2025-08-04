<?php

namespace App\Standards\Fields\Classes;

use App\Standards\Elements\Abstracts\Element;
use App\Standards\Elements\Classifiers\AttributesClassifier;
use App\Standards\Elements\Classifiers\ViewsClassifier;
use App\Standards\Fields\Classifiers\FieldInputTypesClassifier;
use App\Standards\Fields\Traits\FieldLabel;
use App\Standards\Fields\Traits\FieldName;
use App\Standards\Fields\Traits\FieldTypes;

/**
 * Implements logic for buttons.
 */
class Button extends Element
{
    use FieldTypes, FieldLabel, FieldName;

    /**
     * @param string $name
     *
     * @param string|null $label
     */
    public function __construct(string $name, ? string $label = null)
    {
        parent::__construct();

        $this->name($name);

        $this->label($label ?? ucfirst($name));

        $this->type(FieldInputTypesClassifier::submit);
    }

    /**
     * @inheritdoc
     *
     * @return $this
     */
    public function initialization(): static
    {
        $this->add_attribute(AttributesClassifier::TYPE, $this->get_type());

        $this->add_attribute(AttributesClassifier::NAME, $this->get_name());

        return $this;
    }

    /**
     * @inheritdoc
     *
     * @return string
     */
    public function render(): string
    {
        return view(ViewsClassifier::button->value)
            ->with($this->to_with())
            ->render();
    }
}