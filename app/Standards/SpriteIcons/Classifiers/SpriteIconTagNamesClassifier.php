<?php

namespace App\Standards\SpriteIcons\Classifiers;

/**
 * Contains all possible tags for sprite icon elements.
 */
enum SpriteIconTagNamesClassifier: string
{
    case SVG = 'svg';

    case SYMBOL = 'symbol';

    case PATH = 'path';
}
