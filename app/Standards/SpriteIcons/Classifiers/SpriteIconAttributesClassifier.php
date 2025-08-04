<?php

namespace App\Standards\SpriteIcons\Classifiers;

/**
 * Contains all possible attributes for sprite icon elements.
 */
enum SpriteIconAttributesClassifier: string
{
    case ID = 'id';

    case VIEW_BOX = 'viewBox';

    case FILL = 'fill';

    case DISPLAY = 'display';

    case XMLNS = 'xmlns';

    case UUID = 'data-uuid';
}
