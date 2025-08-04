<?php

namespace App\Standards\Fields\Classes;

use App\Standards\Elements\Classifiers\AttributesClassifier;
use App\Standards\Fields\Abstracts\Input;

/**
 * Implements logic for fields with checked state.
 */
class CheckedInput extends Input
{
    protected bool $checked = false;

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
     * @return bool
     */
    public function is_checked(): bool
    {
        if ($this->has_value())
        {
            return $this->get_value();
        }

        if ($this->has_old())
        {
            return $this->get_old();
        }

        return $this->checked;
    }

    /**
     * @param bool $checked
     *
     * @return CheckedInput
     */
    public function set_checked(bool $checked): static
    {
        $this->checked = $checked;

        return $this;
    }

    /**
     * @inheritdoc
     *
     * @return string
     */
    public function render(): string
    {
        return view($this->view->value)
            ->with($this->to_with())
            ->render();
    }
}
