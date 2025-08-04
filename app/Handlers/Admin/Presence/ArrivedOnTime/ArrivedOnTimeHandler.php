<?php

namespace App\Handlers\Admin\Presence\ArrivedOnTime;

use App\ApiModels\Presence\ArrivedOnTime\ScaArrivedOnTimeApiModel;
use App\ApiRequests\Data\Presences\ArrivedOnTime\ScaArrivedOnTimeApiRequest;
use App\ApiRequestSettings\Data\Presence\ArrivedOnTime\ScaArrivedOnTimeApiRequestSettings;
use App\Standards\ApiModels\Abstracts\ApiModel;
use App\Standards\Handlers\Abstracts\Handler;
use Illuminate\Support\Collection;

/**
 * Implements helper work with users.
 */
class ArrivedOnTimeHandler extends Handler
{
    /**
     * Returns all records by the given settings.
     *
     * @param ScaArrivedOnTimeApiRequestSettings $settings
     *
     * @return Collection
     */
    public static function records(ScaArrivedOnTimeApiRequestSettings $settings): Collection
    {
        $request = new ScaArrivedOnTimeApiRequest($settings);

        $request->execute();

        return ApiModel::create($request->get_response()->package, ScaArrivedOnTimeApiModel::class);
    }

    /**
     * Returns count of records.
     *
     * @param ScaArrivedOnTimeApiRequestSettings $settings
     *
     * @return int
     */
    public static function total(ScaArrivedOnTimeApiRequestSettings $settings): int
    {
        $settings->count_only = 1;

        $settings->offset = 0;

        $settings->limit = 0;

        $request = new ScaArrivedOnTimeApiRequest($settings);

        $request->execute();

        return (int) $request->get_response()->message;
    }
}
