<?php

namespace App\Standards\SpriteIcons\Classes\MainSpriteIcons;

use App\Standards\SpriteIcons\Abstracts\SpriteIcons;
use App\Standards\SpriteIcons\Classifiers\SpriteIconsFileNamesClassifier;

/**
 * Implements logic for main sprite icons.
 */
class MainSpriteIcons extends SpriteIcons
{
    public function __construct()
    {
        $this->file_name = SpriteIconsFileNamesClassifier::main;

        parent::__construct();
    }
}
