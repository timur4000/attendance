<?php

namespace App\Managers;

use App\Standards\Components\Classifiers\ComponentsConfigKeysClassifier;

/**
 * Implements help work with config of components.
 */
class ComponentsManger
{
    /**
     * @param ComponentsConfigKeysClassifier $classifier
     *
     * @return mixed
     */
    static public function config(ComponentsConfigKeysClassifier $classifier): mixed
    {
        return config('components.' . $classifier->value);
    }
}