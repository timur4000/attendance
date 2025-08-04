<?php

namespace App\Standards\Fields\Classes;

use App\Standards\Elements\Classifiers\ViewsClassifier;

/**
 * Implements logic for date time fields.
 */
class DateTime extends Date
{
    /**
     * @inheritdoc
     *
     * @return static
     */
    public function initialization(): static
    {
        $this->set_timepicker(true);

        $this->set_auto_close(false);

        parent::initialization();

        return $this;
    }

    /**
     * @inheritdoc
     *
     * @return string
     */
    public function render(): string
    {
        return view(ViewsClassifier::input_date_time->value)
            ->with($this->to_with())
            ->render();
    }
}
