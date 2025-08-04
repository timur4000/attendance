<?php

namespace App\Handlers\Admin\ClassifierTypes;

use App\ApiModels\ClassifierTypes\ClassifierTypesApiModel;
use App\ApiRequests\Data\Classifiers\ClassifierSelectApiRequest;
use App\ApiRequestSettings\Data\Classifiers\ClassifierSelectApiRequestSettings;
use App\Standards\ApiModels\Abstracts\ApiModel;
use App\Standards\Handlers\Abstracts\Handler;
use Illuminate\Support\Collection;

/**
 * Implements helper work with the classifier types.
 */
class ClassifierTypesHandler extends Handler
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

        return ApiModel::create($request->get_response()->package, ClassifierTypesApiModel::class);
    }

    /**
     * Returns record by the given settings.
     *
     * @param ClassifierSelectApiRequestSettings $settings
     *
     * @return ClassifierTypesApiModel
     */
    public static function record(ClassifierSelectApiRequestSettings $settings): ClassifierTypesApiModel
    {
        $request = new ClassifierSelectApiRequest($settings);

        $request->execute();

        return ApiModel::create_one($request->get_response()->first_package(), ClassifierTypesApiModel::class);
    }
}
