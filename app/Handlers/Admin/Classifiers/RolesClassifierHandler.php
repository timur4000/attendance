<?php

namespace App\Handlers\Admin\Classifiers;

use App\ApiModels\Classifiers\ClassifierApiModel;
use App\ApiRequestSettings\Data\Classifiers\ClassifierSelectApiRequestSettings;
use App\Standards\ApiRequests\Classifiers\ApiRequestClassifierTypesClassifier;
use App\Standards\Handlers\Interfaces\ISelectable;
use Illuminate\Support\Collection;

/**
 * Implements help work with the roles classifier information.
 */
class RolesClassifierHandler extends ClassifiersHandler implements ISelectable
{
    public static function record(ClassifierSelectApiRequestSettings $settings): ClassifierApiModel
    {
        $settings->classifier = ApiRequestClassifierTypesClassifier::ROLE;

        return parent::record($settings);
    }

    /**
     * @inheritdoc
     *
     * @param string $key
     *
     * @param string $value
     *
     * @return Collection
     */
    public static function to_select_options(string $key, string $value): Collection
    {
        $settings = new ClassifierSelectApiRequestSettings();

        $settings->classifier = ApiRequestClassifierTypesClassifier::ROLE;

        return self::records($settings)->pluck($value, $key);
    }
}
