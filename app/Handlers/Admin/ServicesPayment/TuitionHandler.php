<?php

namespace App\Handlers\Admin\ServicesPayment;

use App\ApiModels\ServicesPayment\Tuition\TuitionApiModel;
use App\ApiRequests\Data\ServicesPayment\Tuition\TuitionSelectApiRequest;
use App\ApiRequestSettings\Data\ServicesPayment\Tuition\TuitionApiRequestSettings;
use App\Standards\ApiModels\Abstracts\ApiModel;
use App\Standards\Handlers\Abstracts\Handler;
use Illuminate\Support\Collection;

/**
 * Implements helper work with the tuition payments.
 */
class TuitionHandler extends Handler
{
    /**
     * Returns all records by the given settings.
     *
     * @param TuitionApiRequestSettings $settings
     *
     * @return Collection
     */
    public static function records(TuitionApiRequestSettings $settings): Collection
    {
        $request = new TuitionSelectApiRequest($settings);

        $request->execute();

        return ApiModel::create($request->get_response()->package, TuitionApiModel::class);
    }

    /**
     * Returns all records by the given settings.
     *
     * @param TuitionApiRequestSettings $settings
     *
     * @return int
     */
    public static function sum(TuitionApiRequestSettings $settings): int
    {
        $settings->count_only = 1;

        $settings->limit = 0;

        $settings->offset = 0;

        $request = new TuitionSelectApiRequest($settings);

        $request->execute();

        return (int) $request->get_response()->message;
    }
}
