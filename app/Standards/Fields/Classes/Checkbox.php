<?php

namespace App\Standards\Fields\Classes;

use App\Standards\Elements\Classifiers\ViewsClassifier;
use App\Standards\Fields\Classifiers\FieldInputTypesClassifier;

/**
 * Implements logic for checkbox fields.
 */
class Checkbox extends CheckedInput
{
    /**
     * @var ViewsClassifier
     */
    protected ViewsClassifier $view = ViewsClassifier::input_checkbox;

    /**
     * @inheritdoc
     *
     * @return static
     */
    public function initialization(): static
    {
        $this->type(FieldInputTypesClassifier::checkbox);

        parent::initialization();

        return $this;
    }
}
