<?php

namespace App\Standards\SpriteIcons\Classes;

use App\Managers\Reflections\ReflectionManager;
use App\Standards\SpriteIcons\Abstracts\SpriteIcons;
use App\Standards\SpriteIcons\Attributes\SpriteIconPropertyAttributeClassifierAttribute;
use App\Standards\SpriteIcons\Attributes\SpritePropertyFillAttribute;
use App\Standards\SpriteIcons\Classifiers\SpriteIconAttributesClassifier;
use DOMDocumentFragment;
use DOMElement;
use DOMNodeList;
use Illuminate\Support\Str;

/**
 * Implements logic for sprite icon.
 */
class SpriteIcon
{
    /**
     * @var SpriteIcons
     */
    public SpriteIcons $instance;

    /**
     * @var DOMElement
     */
    public DOMElement $symbol;

    /**
     * @var string
     */
    #[SpriteIconPropertyAttributeClassifierAttribute( SpriteIconAttributesClassifier::UUID )]
    public string $uuid;

    /**
     * @var string
     */
    #[SpriteIconPropertyAttributeClassifierAttribute( SpriteIconAttributesClassifier::ID ), SpritePropertyFillAttribute]
    public string $id;

    /**
     * @var string
     */
    #[SpriteIconPropertyAttributeClassifierAttribute( SpriteIconAttributesClassifier::VIEW_BOX ), SpritePropertyFillAttribute]
    public string $view_box;

    /**
     * @var string
     */
    #[SpritePropertyFillAttribute]
    public string $inner_html;

    /**
     * @var string
     */
    public string $outer_html;

    /**
     * @param SpriteIcons $instance
     *
     * @param DOMElement $symbol
     */
    public function __construct(SpriteIcons $instance, DOMElement $symbol)
    {
        $this->instance = $instance;

        $this->symbol = $symbol;

        $this->attributes_processing();

        $this->update_processing();

        $this->inner_html = $this->instance->to_string($this->children());

        $this->outer_html = $this->instance->to_string($this->symbol);
    }

    /**
     * Implements process of the attributes.
     *
     * @return void
     */
    private function attributes_processing(): void
    {
        foreach (ReflectionManager::properties(ReflectionManager::create($this)) as $reflection_property)
        {
            $attribute_instance = ReflectionManager::first_attribute_instance($reflection_property, SpriteIconPropertyAttributeClassifierAttribute::class);

            if ($attribute_instance && $this->symbol->hasAttribute($attribute_instance->classifier->value))
            {
                $this->{ $reflection_property->getName() } = $this->symbol->getAttribute($attribute_instance->classifier->value);
            }
        }
    }

    /**
     * Implements process of the update.
     *
     * @return void
     */
    private function update_processing(): void
    {
        if ($this->has_uuid())
        {
            return ;
        }

        $this->set_uuid();

        $this->instance->need_update = true;
    }

    /**
     * Removes fill attribute for each the given nodes.
     *
     * @param DOMNodeList $nodes
     *
     * @return void
     */
    private function removeFillAttribute(DOMNodeList $nodes): void
    {
        foreach ($nodes as $node)
        {
            if ($node->nodeType === 3)
            {
                continue ;
            }

            $node->removeAttribute(SpriteIconAttributesClassifier::FILL->value);
        }
    }

    /**
     * Fills the instance properties by the given values.
     *
     * @param array $values
     *
     * @return void
     */
    public function fill(array $values = []): void
    {
        foreach (ReflectionManager::properties(ReflectionManager::create($this)) as $reflection_property)
        {
            $first_attribute = ReflectionManager::first_attribute($reflection_property, SpritePropertyFillAttribute::class);

            if (!$first_attribute)
            {
                continue ;
            }

            $value = $values[ $reflection_property->getName() ];

            if (!$value)
            {
                continue ;
            }

            $this->{ 'set_' . $reflection_property->getName() }($value);
        }
    }

    /**
     * Returns fragment of the children.
     *
     * @return DOMDocumentFragment
     */
    public function children(): DOMDocumentFragment
    {
        $fragment = $this->instance->dom->createDocumentFragment();

        foreach ($this->symbol->childNodes as $child_node)
        {
            $clone_node = $child_node->cloneNode(true);

            $fragment->append($clone_node);
        }

        return $fragment;
    }

    /**
     * Saves sprite icon. If not exists appends to svg element.
     *
     * @return void
     */
    public function save(): void
    {
        if (!$this->instance->has_sprite_icon($this->get_uuid()))
        {
            $this->instance->svg->prepend($this->symbol);
        }

        $this->instance->save();
    }

    /**
     * Removes sprite icon.
     *
     * @return void
     */
    public function delete(): void
    {
        if (!$this->instance->has_sprite_icon($this->get_uuid()))
        {
            return ;
        }

        $this->instance->svg->removeChild($this->symbol);

        $this->instance->save();
    }

    /**
     * Removes children of the symbol.
     *
     * @return void
     */
    public function delete_children(): void
    {
        while ($this->symbol->hasChildNodes())
        {
            $this->symbol->firstChild->remove();
        }
    }

    /**
     * @return bool
     */
    public function has_uuid(): bool
    {
        return isset($this->uuid);
    }

    /**
     * @return string
     */
    public function get_uuid(): string
    {
        return $this->uuid;
    }

    /**
     * @return SpriteIcon
     */
    public function set_uuid(): static
    {
        $this->uuid = Str::uuid();

        $this->symbol->setAttribute(SpriteIconAttributesClassifier::UUID->value, $this->uuid);

        return $this;
    }

    /**
     * @return string
     */
    public function get_id(): string
    {
        return $this->id;
    }

    /**
     * @param string $id
     *
     * @return SpriteIcon
     */
    public function set_id(string $id): static
    {
        $this->id = $id;

        $this->symbol->setAttribute(SpriteIconAttributesClassifier::ID->value, $id);

        return $this;
    }

    /**
     * @return string
     */
    public function get_view_box(): string
    {
        return $this->view_box;
    }

    /**
     * @param string $view_box
     *
     * @return SpriteIcon
     */
    public function set_view_box(string $view_box): static
    {
        $this->view_box = $view_box;

        $this->symbol->setAttribute(SpriteIconAttributesClassifier::VIEW_BOX->value, $view_box);

        return $this;
    }

    /**
     * @return string
     */
    public function get_inner_html(): string
    {
        return $this->inner_html;
    }

    /**
     * @param string $inner_html
     *
     * @return SpriteIcon
     */
    public function set_inner_html(string $inner_html): static
    {
        $this->inner_html = $inner_html;

        $this->delete_children();

        $this->symbol->append($this->instance->string_to_nodes_convert($inner_html));

        $this->removeFillAttribute($this->symbol->childNodes);

        return $this;
    }
}
