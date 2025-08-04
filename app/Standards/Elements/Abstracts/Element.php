<?php

namespace App\Standards\Elements\Abstracts;

use App\Standards\Elements\Callables\AttributesToStringReduceCallable;
use App\Standards\Elements\Classifiers\AttributesClassifier;
use App\Standards\Elements\Classifiers\TagsClassifier;
use App\Standards\Elements\Classifiers\ViewsClassifier;
use App\Standards\Elements\Interfaces\IInitialized;
use App\Standards\Elements\Interfaces\IRendered;
use Illuminate\Support\Collection;

/**
 * Implements abstract logic for all elements.
 */
abstract class Element implements IRendered, IInitialized
{
    /**
     * @var Element
     */
    protected Element $parent;

    /**
     * @var Collection
     */
    protected Collection $children;

    /**
     * @var Collection
     */
    protected Collection $attributes;

    /**
     * @var TagsClassifier
     */
    protected TagsClassifier $tag;

    /**
     * @var ViewsClassifier
     */
    protected ViewsClassifier $view;

    /**
     * @var string
     */
    protected string $id;

    public function __construct()
    {
        $this->children = new Collection();

        $this->attributes = new Collection();
    }

    /**
     * Appends the given element to children property.
     *
     * @param Element $element
     *
     * @return static
     */
    public function append_child(Element $element): static
    {
        $this->children->push($element);

        $element->parent = $this;

        return $this;
    }

    /**
     * Returns children property.
     *
     * @return Collection
     */
    public function get_children(): Collection
    {
        return $this->children;
    }

    /**
     * Adds the given attribute.
     *
     * @param AttributesClassifier $classifier
     *
     * @param string $value
     *
     * @return void
     */
    protected function add_attribute(AttributesClassifier $classifier, string $value): void
    {
        $this->attributes->put($classifier->value, $value);
    }

    /**
     * Converts attributes to string and return it.
     *
     * @return string
     */
    public function get_attributes(): string
    {
        return $this->attributes->reduce(new AttributesToStringReduceCallable(), '');
    }

    /**
     * Sets id property.
     *
     * @param string $value
     *
     * @return static
     */
    public function set_id(string $value): static
    {
        $this->id = $value;

        return $this;
    }

    /**
     * Checks if the current instance contain id property.
     *
     * @return bool
     */
    public function has_id(): bool
    {
        return isset($this->id);
    }

    /**
     * Returns id.
     *
     * @return string
     */
    public function get_id(): string
    {
        return $this->id;
    }

    /**
     * Returns array for with method of view.
     *
     * @return array
     */
    public function to_with(): array
    {
        return [ 'element' => $this ];
    }
}
