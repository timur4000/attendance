<?php

namespace App\Standards\Fields\Classes;

use App\Standards\Elements\Classifiers\AttributesClassifier;
use App\Standards\Fields\Abstracts\Field;
use App\Standards\Fields\Traits\FieldLabel;
use App\Standards\Fields\Traits\FieldPlaceholder;

/**
 * Implements logic for textarea fields.
 */
class TextArea extends Field
{
    use FieldPlaceholder, FieldLabel;

    /**
     * @var int
     */
    protected int $cols = 30;

    /**
     * @var int
     */
    protected int $rows = 10;

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
     * @return $this
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

        $this->add_attribute(AttributesClassifier::COLS, $this->get_cols());

        $this->add_attribute(AttributesClassifier::ROWS, $this->get_rows());

        $this->edit_processing();

        return $this;
    }

    /**
     * @return int
     */
    public function get_cols(): int
    {
        return $this->cols;
    }

    /**
     * @param int $cols
     *
     * @return TextArea
     */
    public function set_cols(int $cols): static
    {
        $this->cols = $cols;

        return $this;
    }

    /**
     * @return int
     */
    public function get_rows(): int
    {
        return $this->rows;
    }

    /**
     * @param int $rows
     *
     * @return TextArea
     */
    public function set_rows(int $rows): static
    {
        $this->rows = $rows;

        return $this;
    }

    /**
     * @inheritdoc
     *
     * @return string
     */
    public function render(): string
    {
        return view('forms.fields.textarea')
            ->with($this->to_with())
            ->render();
    }
}