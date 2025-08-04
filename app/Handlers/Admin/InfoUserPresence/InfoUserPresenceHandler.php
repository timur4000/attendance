<?php

namespace App\Handlers\Admin\InfoUserPresence;

use App\ApiModels\InfoUserPresence\ScaInfoUserPresenceApiModel;
use App\ApiRequests\Data\InfoUserPresence\InfoUserPresenceApiRequest;
use App\ApiRequestSettings\Data\InfoUserPresence\InfoUserPresenceApiRequestSettings;
use App\Standards\ApiModels\Abstracts\ApiModel;
use App\Standards\Handlers\Abstracts\Handler;
use Illuminate\Support\Collection;

/**
 * Implements help work with the info user presence information.
 */
class InfoUserPresenceHandler extends Handler
{
    /**
     * Returns records.
     *
     * @param InfoUserPresenceApiRequestSettings|null $settings
     *
     * @return Collection<ScaInfoUserPresenceApiModel>
     */
    public static function records(? InfoUserPresenceApiRequestSettings $settings = null): Collection
    {
        $settings ??= new InfoUserPresenceApiRequestSettings();

        $request = new InfoUserPresenceApiRequest($settings);

        $request->execute();

        return ApiModel::create($request->get_response()->package, ScaInfoUserPresenceApiModel::class);
    }

    /**
     * Returns total of records.
     *
     * @param InfoUserPresenceApiRequestSettings|null $settings
     *
     * @return int
     */
    public static function total(? InfoUserPresenceApiRequestSettings $settings = null): int
    {
        if (!$settings)
        {
            $settings = new InfoUserPresenceApiRequestSettings();
        }

        $settings->count_only = 1;

        $settings->limit = 0;

        $settings->offset = 0;

        $request = new InfoUserPresenceApiRequest($settings);

        $request->execute();

        return $request->get_response()->message;
    }
}
