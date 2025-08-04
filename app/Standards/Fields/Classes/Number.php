<?php

namespace App\Standards\Fields\Classes;

use App\Standards\Elements\Classifiers\AttributesClassifier;
use App\Standards\Elements\Classifiers\ViewsClassifier;
use App\Standards\Fields\Abstracts\Input;
use App\Standards\Fields\Classifiers\FieldInputTypesClassifier;

/**
 * Implements logic for number fields.
 */
class Number extends Input
{
    /**
     * @var int
     */
    protected int $step = 1;

    /**
     * @var int
     */
    protected int $min;

    /**
     * @var int
     */
    protected int $max;

    /**
     * @var bool
     */
    protected bool $readonly = true;

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
        $this->type(FieldInputTypesClassifier::number);

        $this->svg('essential-numeric');

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
     * @return int
     */
    public function get_step(): int
    {
        return $this->step;
    }

    /**
     * @param int $step
     *
     * @return Number
     */
    public function set_step(int $step): static
    {
        $this->step = $step;

        return $this;
    }

    /**
     * @return bool
     */
    public function has_min(): bool
    {
        return isset($this->min);
    }

    /**
     * @return int
     */
    public function get_min(): int
    {
        return $this->min ?? 0;
    }

    /**
     * @param int $min
     *
     * @return Number
     */
    public function set_min(int $min): static
    {
        $this->min = $min;

        return $this;
    }

    /**
     * @return bool
     */
    public function has_max(): bool
    {
        return isset($this->max);
    }

    /**
     * @return int
     */
    public function get_max(): int
    {
        return $this->max ?? 0;
    }

    /**
     * @param int $max
     *
     * @return Number
     */
    public function set_max(int $max): static
    {
        $this->max = $max;

        return $this;
    }

    /**
     * @return bool
     */
    public function is_readonly(): bool
    {
        return $this->readonly;
    }

    /**
     * @param bool $readonly
     *
     * @return Number
     */
    public function set_readonly(bool $readonly): static
    {
        $this->readonly = $readonly;

        return $this;
    }

    /**
     * @inheritdoc
     *
     * @return string
     */
    public function render(): string
    {
        return view(ViewsClassifier::input_number->value)
            ->with($this->to_with())
            ->render();
    }
}
