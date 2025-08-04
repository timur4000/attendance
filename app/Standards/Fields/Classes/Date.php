<?php

namespace App\Standards\Fields\Classes;

use App\Standards\Elements\Classifiers\AttributesClassifier;
use App\Standards\Elements\Classifiers\ViewsClassifier;

/**
 * Implements logic for date fields.
 */
class Date extends Text
{
    /**
     * @var string
     */
    public string $selected_date;

    /**
     * @var string
     */
    public string $min_date;

    /**
     * @var string
     */
    public string $max_date;

    /**
     * @var bool
     */
    public bool $timepicker = false;

    /**
     * @var bool
     */
    public bool $auto_close = true;

    /**
     * @inheritdoc
     *
     * @return Date
     */
    public function initialization(): static
    {
        $this->svg('time-calendar-2');

        $this->add_attribute(AttributesClassifier::AUTOCOMPLETE, 'off');

        if (isset($this->selected_date))
        {
            $this->add_attribute(AttributesClassifier::DATA_SELECTED_DATE, $this->get_selected_date());
        }

        if (isset($this->min_date))
        {
            $this->add_attribute(AttributesClassifier::DATA_MIN_DATE, $this->get_min_date());
        }

        if (isset($this->max_date))
        {
            $this->add_attribute(AttributesClassifier::DATA_MAX_DATE, $this->get_max_date());
        }

        if (isset($this->timepicker))
        {
            $this->add_attribute(AttributesClassifier::DATA_TIMEPICKER, $this->is_timepicker());
        }

        if (isset($this->auto_close))
        {
            $this->add_attribute(AttributesClassifier::DATA_AUTO_CLOSE, $this->is_auto_close());
        }

        return parent::initialization();
    }

    /**
     * @return string
     */
    public function get_min_date(): string
    {
        return $this->min_date;
    }

    /**
     * @param string $min_date
     *
     * @return Date
     */
    public function set_min_date(string $min_date): static
    {
        $this->min_date = $min_date;

        return $this;
    }

    /**
     * @return string
     */
    public function get_selected_date(): string
    {
        return $this->selected_date;
    }

    /**
     * @param string $selected_date
     *
     * @return Date
     */
    public function set_selected_date(string $selected_date): static
    {
        $this->selected_date = $selected_date;

        return $this;
    }

    /**
     * @return string
     */
    public function get_max_date(): string
    {
        return $this->max_date;
    }

    /**
     * @param string $max_date
     *
     * @return Date
     */
    public function set_max_date(string $max_date): static
    {
        $this->max_date = $max_date;

        return $this;
    }

    /**
     * @return bool
     */
    public function is_timepicker(): bool
    {
        return $this->timepicker;
    }

    /**
     * @param bool $timepicker
     *
     * @return Date
     */
    public function set_timepicker(bool $timepicker): static
    {
        $this->timepicker = $timepicker;

        return $this;
    }

    /**
     * @return bool
     */
    public function is_auto_close(): bool
    {
        return $this->auto_close;
    }

    /**
     * @param bool $auto_close
     *
     * @return Date
     */
    public function set_auto_close(bool $auto_close): static
    {
        $this->auto_close = $auto_close;

        return $this;
    }

    /**
     * @inheritdoc
     *
     * @return string
     */
    public function render(): string
    {
        return view(ViewsClassifier::input_date->value)
            ->with($this->to_with())
            ->render();
    }
}
