<?php

namespace App\Standards\Fields\Classes;

use App\Standards\Elements\Classifiers\AttributesClassifier;
use App\Standards\Elements\Classifiers\ViewsClassifier;
use App\Standards\Fields\Abstracts\Input;
use App\Standards\Fields\Classifiers\FieldInputTypesClassifier;

/**
 * Implements logic for text fields.
 */
class Text extends Input
{
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
    }

    /**
     * @inheritdoc
     *
     * @return static
     */
    public function initialization(): static
    {
        if (!$this->has_type())
        {
            $this->type(FieldInputTypesClassifier::text);
        }

        if (!$this->has_id())
        {
            $this->set_id($this->get_name());
        }

        if (!$this->has_placeholder())
        {
            $this->placeholder($this->get_label());
        }

        $this->edit_processing();

        $this->add_attribute(AttributesClassifier::TYPE, $this->get_type());

        $this->add_attribute(AttributesClassifier::VALUE, $this->get_value());

        $this->add_attribute(AttributesClassifier::NAME, $this->get_name());

        $this->add_attribute(AttributesClassifier::PLACEHOLDER, $this->get_placeholder());

        return $this;
    }

    /**
     * @inheritdoc
     *
     * @return string
     */
    public function render(): string
    {
        return view(ViewsClassifier::input_text->value)
            ->with($this->to_with())
            ->render();
    }
}
