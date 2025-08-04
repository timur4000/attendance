<?php

namespace App\Standards\SpriteIcons\Abstracts;

use App\Standards\SpriteIcons\Classes\SpriteIcon;
use App\Standards\SpriteIcons\Classifiers\SpriteIconsFileNamesClassifier;
use App\Standards\SpriteIcons\Classifiers\SpriteIconTagNamesClassifier;
use DOMDocument;
use DOMDocumentFragment;
use DOMElement;
use DOMException;
use DOMNode;
use Illuminate\Support\Collection;

/**
 * Implements abstract logic for all sprite icon classes.
 */
abstract class SpriteIcons
{
    /**
     * @var string
     */
    protected string $directory;

    /**
     * @var SpriteIconsFileNamesClassifier
     */
    protected SpriteIconsFileNamesClassifier $file_name;

    /**
     * @var DOMDocument
     */
    public DOMDocument $dom;

    /**
     * @var DOMElement
     */
    public DOMElement $svg;

    /**
     * @var Collection<SpriteIcons>
     */
    public Collection $sprite_icons;

    /**
     * @var bool
     */
    public bool $need_update = false;

    /**
     * @throws DOMException
     */
    public function __construct()
    {
        $this->directory = config('sprite-icons.directory');

        $this->dom_processing();

        $this->svg_processing();

        $this->sprite_icons_processing();

        if ($this->need_update)
        {
            $this->save();
        }
    }

    /**
     * Implements process of dom.
     *
     * @return void
     */
    private function dom_processing(): void
    {
        $this->dom = new DOMDocument();

        $this->dom->load($this->get_path());
    }

    /**
     * Implements process of svg.
     *
     * @return void
     */
    private function svg_processing(): void
    {
        $this->svg = $this->dom->getElementsByTagName(SpriteIconTagNamesClassifier::SVG->value)[ 0 ];
    }

    /**
     * Implements process of sprite icons.
     *
     * @return void
     *
     * @throws DOMException
     */
    private function sprite_icons_processing(): void
    {
        $this->sprite_icons = new Collection();

        $symbols = $this->dom->getElementsByTagName(SpriteIconTagNamesClassifier::SYMBOL->value);

        foreach ($symbols as $symbol)
        {
            $instance = $this->create_sprite_icon($symbol);

            $this->sprite_icons->put($instance->get_uuid(), $instance);
        }
    }

    /**
     * Creates and returns instance of the SpriteIcon class.
     *
     * @param DOMElement|null $symbol
     *
     * @return SpriteIcon
     *
     * @throws DOMException
     */
    public function create_sprite_icon(? DOMElement $symbol = null): SpriteIcon
    {
        if (!$symbol)
        {
            $symbol = $this->dom->createElement(SpriteIconTagNamesClassifier::SYMBOL->value);
        }

        return new SpriteIcon($this, $symbol);
    }

    /**
     * Converts the given string to nodes and return fragment.
     *
     * @param string $string
     *
     * @return DOMDocumentFragment
     */
    public function string_to_nodes_convert(string $string): DOMDocumentFragment
    {
        $fragment = $this->dom->createDocumentFragment();

        $dom = new DOMDocument();

        $dom->loadXML('<' . SpriteIconTagNamesClassifier::SVG->value . '>' . $string . '</' . SpriteIconTagNamesClassifier::SVG->value . '>');

        $svg = $dom->getElementsByTagName(SpriteIconTagNamesClassifier::SVG->value)[ 0 ];

        foreach ($svg->childNodes as $child_node)
        {
            $fragment->append($this->dom->importNode($child_node, true));
        }

        return $fragment;
    }

    /**
     * Converts the given node to string.
     *
     * @param DOMNode $node $string
     *
     * @return string
     */
    public function to_string(DOMNode $node): string
    {
        return $this->dom->saveXML($node);
    }

    /**
     * Returns absolute path to file.
     *
     * @return string
     */
    public function get_path(): string
    {
        return $this->directory . $this->file_name->value;
    }

    /**
     * Checks if sprite icon with the given uuid is an exist.
     *
     * @param string $uuid
     *
     * @return bool
     */
    public function has_sprite_icon(string $uuid): bool
    {
        return $this->sprite_icons->has($uuid);
    }

    /**
     * Returns sprite icon by the given uuid.
     *
     * @param string $uuid
     *
     * @return SpriteIcon|null
     */
    public function get_sprite_icon(string $uuid): SpriteIcon | null
    {
        return $this->sprite_icons->get($uuid);
    }

    /**
     * Saves the dom to file.
     *
     * @return bool
     */
    public function save(): bool
    {
        return $this->dom->save($this->get_path());
    }
}
