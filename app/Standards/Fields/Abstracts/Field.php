<?php

namespace App\Standards\Fields\Abstracts;

use App\Standards\Elements\Abstracts\Element;
use App\Standards\Fields\Traits\FieldName;
use App\Standards\Fields\Traits\FieldPseudoName;
use App\Standards\Fields\Traits\FieldRules;
use App\Standards\Fields\Traits\FieldValue;
use App\Standards\Forms\Classes\Form;

/**
 * Implements abstract logic for all fields.
 */
abstract class Field extends Element
{
    use FieldName, FieldPseudoName, FieldRules, FieldValue;

    /**
     * @var Form
     */
    protected Form $form;

    /**
     * Sets form property.
     *
     * @param Form $form
     *
     * @return Form
     */
    public function form(Form $form): Form
    {
        return $this->form = $form;
    }

    /**
     * Returns form property.
     *
     * @return Form
     */
    public function get_form(): Form
    {
        return $this->form;
    }

    /**
     * Checks if the current field has old value.
     *
     * @param mixed $value
     *
     * @return bool
     */
    public function check_old(mixed $value): bool
    {
        if (is_array(old($this->get_name())))
        {
            return in_array($value, old($this->get_name()));
        }

        return $this->has_old();
    }

    /**
     * Checks if the current field has old value.
     *
     * @return bool
     */
    public function has_old(): bool
    {
        return is_numeric($this->get_old()) && intval($this->get_old()) === 0 || !empty($this->get_old());
    }

    /**
     * Returns old value of the current field.
     *
     * @return mixed
     */
    public function get_old(): mixed
    {
        return old($this->get_name());
    }

    /**
     * Implements processing at editing.
     *
     * @return void
     */
    protected function edit_processing(): void
    {
        $value = $this->form->get_record()?->{ $this->get_pseudo_name() ?? $this->get_name() };

        if ($value !== 0 && empty($value))
        {
            return ;
        }

        $this->set_value($value);
    }
}
