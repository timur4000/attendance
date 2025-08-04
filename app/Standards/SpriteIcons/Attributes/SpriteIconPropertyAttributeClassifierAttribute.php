<?php

namespace App\Standards\SpriteIcons\Attributes;

use App\Standards\SpriteIcons\Classifiers\SpriteIconAttributesClassifier;
use Attribute;

/**
 * Implements attribute with classifier for property.
 */
#[Attribute]
class SpriteIconPropertyAttributeClassifierAttribute
{
    public SpriteIconAttributesClassifier $classifier;

    public function __construct(SpriteIconAttributesClassifier $classifier)
    {
        $this->classifier = $classifier;
    }
}
