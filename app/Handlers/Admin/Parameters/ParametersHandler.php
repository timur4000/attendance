<?php

namespace App\Handlers\Admin\Parameters;

use App\ApiModels\Parameters\ParameterApiModel;
use App\ApiModels\StandardResponse\StandardResponseApiModel;
use App\ApiRequests\Data\Parameters\ParameterSelectApiRequest;
use App\ApiRequestSettings\Data\Parameters\ParameterSelectApiRequestSettings;
use App\Standards\ApiModels\Abstracts\ApiModel;
use App\Standards\ApiRequestSettings\Classifiers\Parameters\ParametersIdsClassifier;
use App\Standards\Handlers\Abstracts\Handler;
use Illuminate\Support\Collection;

/**
 * Implements help work with the parameters.
 */
class ParametersHandler extends Handler
{
    /**
     * Returns standard response.
     *
     * @param ParametersIdsClassifier $id_parameter
     *
     * @param ParameterSelectApiRequestSettings|null $settings
     *
     * @return StandardResponseApiModel
     */
    public static function response(ParametersIdsClassifier $id_parameter = ParametersIdsClassifier::ALL, ? ParameterSelectApiRequestSettings $settings = null): StandardResponseApiModel
    {
        $settings ??= new ParameterSelectApiRequestSettings();

        $settings->id_parameter ??= $id_parameter;

        $request = new ParameterSelectApiRequest($settings);

        $request->execute();

        return $request->get_response();
    }

    /**
     * Returns collection of api models records or first model.
     *
     * @param StandardResponseApiModel $standard
     *
     * @param bool $is_first
     *
     * @return Collection|ParameterApiModel
     */
    public static function records_from_response(StandardResponseApiModel $standard, bool $is_first = false): Collection | ParameterApiModel
    {
        if ($is_first)
        {
            return ApiModel::create_one($standard->first_package(), ParameterApiModel::class);
        }

        return ApiModel::create($standard->package, ParameterApiModel::class);
    }
}
