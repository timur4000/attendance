<?php

namespace App\Handlers\Admin\Presence\Absent;

use App\ApiModels\Presence\Absent\ScaAbsentApiModel;
use App\ApiRequests\Data\Presences\Absent\ScaAbsentApiRequest;
use App\ApiRequestSettings\Data\Presence\Absent\ScaAbsentApiRequestSettings;
use App\Standards\ApiModels\Abstracts\ApiModel;
use App\Standards\Handlers\Abstracts\Handler;
use Illuminate\Support\Collection;

/**
 * Implements helper work with absent.
 */
class AbsentHandler extends Handler
{
    /**
     * Returns all records by the given settings.
     *
     * @param ScaAbsentApiRequestSettings $settings
     *
     * @return Collection
     */
    public static function records(ScaAbsentApiRequestSettings $settings): Collection
    {
        $request = new ScaAbsentApiRequest($settings);

        $request->execute();

        return ApiModel::create($request->get_response()->package, ScaAbsentApiModel::class);
    }

    /**
     * Returns count of records.
     *
     * @param ScaAbsentApiRequestSettings $settings
     *
     * @return int
     */
    public static function total(ScaAbsentApiRequestSettings $settings): int
    {
        $settings->count_only = 1;

        $settings->offset = 0;

        $settings->limit = 0;

        $request = new ScaAbsentApiRequest($settings);

        $request->execute();

        return (int) $request->get_response()->message;
    }
}
