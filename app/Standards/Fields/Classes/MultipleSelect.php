<?php

namespace App\Standards\Fields\Classes;

use App\Standards\Fields\Abstracts\Select;

/**
 * Implements logic for the multiple select field.
 */
class MultipleSelect extends Select
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
     * @return $this
     */
    public function initialization(): static
    {
        if (!$this->has_id())
        {
            $this->set_id($this->get_name());
        }

        $this->edit_processing();

        return $this;
    }

    /**
     * @inheritdoc
     *
     * @return string
     */
    public function render(): string
    {
        return view('forms.fields.multiple-select')
            ->with($this->to_with())
            ->render();
    }
}