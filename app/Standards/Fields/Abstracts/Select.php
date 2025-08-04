<?php

namespace App\Standards\Fields\Abstracts;

use App\Standards\Fields\Traits\FieldLabel;
use App\Standards\Fields\Traits\FieldValue;
use App\Standards\Handlers\Interfaces\ISelectable;
use Illuminate\Support\Collection;

/**
 * Implements abstract logic for all select fields.
 */
abstract class Select extends Field
{
    use FieldLabel, FieldValue;

    /**
     * @var Collection
     */
    protected Collection $options;

    /**
     * @var string
     */
    protected string $relation_name;

    /**
     * @var bool
     */
    protected bool $with_empty = false;

    public function __construct()
    {
        parent::__construct();

        $this->options = new Collection();
    }

    /**
     * @return Collection
     */
    public function get_options(): Collection
    {
        return $this->options;
    }

    /**
     * @return string
     */
    public function get_relation_name(): string
    {
        return $this->relation_name;
    }

    /**
     * @param string $relation_name
     *
     * @return Select
     */
    public function set_relation_name(string $relation_name): static
    {
        $this->relation_name = $relation_name;

        return $this;
    }

    /**
     * Checks if the current instance contains relation name property.
     *
     * @return bool
     */
    public function has_relation_name(): bool
    {
        return isset($this->relation_name);
    }

    /**
     * @return bool
     */
    public function is_with_empty(): bool
    {
        return $this->with_empty;
    }

    /**
     * @param bool $with_empty
     *
     * @return Select
     */
    public function set_with_empty(bool $with_empty): static
    {
        $this->with_empty = $with_empty;

        return $this;
    }

    /**
     * @param ISelectable $handler
     *
     * @param string $key
     *
     * @param string $label
     *
     * @return Select
     */
    public function options(ISelectable $handler, string $key = 'id', string $label = 'code'): static
    {
        $this->options = $handler::to_select_options($key, $label);

        return $this;
    }
}
