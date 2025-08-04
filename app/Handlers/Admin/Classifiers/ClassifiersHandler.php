<?php

namespace App\Handlers\Admin\Classifiers;

use App\ApiModels\Classifiers\ClassifierApiModel;
use App\ApiRequests\Data\Classifiers\ClassifierSelectApiRequest;
use App\ApiRequestSettings\Data\Classifiers\ClassifierSelectApiRequestSettings;
use App\Standards\ApiModels\Abstracts\ApiModel;
use App\Standards\Handlers\Abstracts\Handler;
use Illuminate\Support\Collection;

/**
 * Implements helper work with the classifiers.
 */
class ClassifiersHandler extends Handler
{
    /**
     * Returns all records by the given settings.
     *
     * @param ClassifierSelectApiRequestSettings $settings
     *
     * @return Collection
     */
    public static function records(ClassifierSelectApiRequestSettings $settings): Collection
    {
        $request = new ClassifierSelectApiRequest($settings);

        $request->execute();

        return ApiModel::create($request->get_response()->package, ClassifierApiModel::class);
    }

    /**
     * Returns record by the given settings.
     *
     * @param ClassifierSelectApiRequestSettings $settings
     *
     * @return ClassifierApiModel
     */
    public static function record(ClassifierSelectApiRequestSettings $settings): ClassifierApiModel
    {
        $request = new ClassifierSelectApiRequest($settings);

        $request->execute();

        return ApiModel::create_one($request->get_response()->first_package(), ClassifierApiModel::class);
    }
}
