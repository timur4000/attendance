<?php

namespace App\Handlers\Admin\Presence\Latecomers;

use App\ApiModels\Presence\Latecomers\ScaLatecomerApiModel;
use App\ApiRequests\Data\Presences\Latecomers\ScaLatecomersApiRequest;
use App\ApiRequestSettings\Data\Presence\Latecomers\ScaLatecomersApiRequestSettings;
use App\Standards\ApiModels\Abstracts\ApiModel;
use App\Standards\Handlers\Abstracts\Handler;
use Illuminate\Support\Collection;

/**
 * Implements helper work with users.
 */
class LatecomersHandler extends Handler
{
    /**
     * Returns all records by the given settings.
     *
     * @param ScaLatecomersApiRequestSettings $settings
     *
     * @return Collection
     */
    public static function records(ScaLatecomersApiRequestSettings $settings): Collection
    {
        $request = new ScaLatecomersApiRequest($settings);

        $request->execute();

        return ApiModel::create($request->get_response()->package, ScaLatecomerApiModel::class);
    }

    /**
     * Returns count of records.
     *
     * @param ScaLatecomersApiRequestSettings $settings
     *
     * @return int
     */
    public static function total(ScaLatecomersApiRequestSettings $settings): int
    {
        $settings->count_only = 1;

        $settings->offset = 0;

        $settings->limit = 0;

        $request = new ScaLatecomersApiRequest($settings);

        $request->execute();

        return (int) $request->get_response()->message;
    }
}
