<?php

namespace App\Handlers\Admin\Users;

use App\ApiModels\ScaUsers\ScaUserApiModel;
use App\ApiModels\Users\UsersArrivalsDeparturesApiModel;
use App\ApiRequests\Data\Users\UsersArrivalsDeparturesApiRequest;
use App\ApiRequestSettings\Data\Users\UsersArrivalsDeparturesApiRequestSettings;
use App\Standards\ApiModels\Abstracts\ApiModel;
use App\Standards\Handlers\Abstracts\Handler;
use Illuminate\Support\Collection;

/**
 * Implements help work with the users arrivals and departures information.
 */
class UsersArrivalsDeparturesHandler extends Handler
{
    /**
     * Returns records.
     *
     * @param UsersArrivalsDeparturesApiRequestSettings|null $settings
     *
     * @return Collection<ScaUserApiModel>
     */
    public static function records(? UsersArrivalsDeparturesApiRequestSettings $settings = null): Collection
    {
        $settings ??= new UsersArrivalsDeparturesApiRequestSettings();

        $request = new UsersArrivalsDeparturesApiRequest($settings);

        $request->execute();

        return ApiModel::create($request->get_response()->package, UsersArrivalsDeparturesApiModel::class);
    }

    /**
     * Returns records by the given user id.
     *
     * @param int $id_user
     *
     * @param UsersArrivalsDeparturesApiRequestSettings|null $settings
     *
     * @return Collection<ScaUserApiModel>
     */
    public static function records_by_id_user(int $id_user = 0, ? UsersArrivalsDeparturesApiRequestSettings $settings = null): Collection
    {
        $settings ??= new UsersArrivalsDeparturesApiRequestSettings();

        $settings->id_user = $id_user;

        $request = new UsersArrivalsDeparturesApiRequest($settings);

        $request->execute();

        return ApiModel::create($request->get_response()->package, UsersArrivalsDeparturesApiModel::class);
    }

    /**
     * Returns total of records.
     *
     * @param UsersArrivalsDeparturesApiRequestSettings|null $settings
     *
     * @return int
     */
    public static function total(? UsersArrivalsDeparturesApiRequestSettings $settings = null): int
    {
        $settings ??= new UsersArrivalsDeparturesApiRequestSettings();

        $settings->count_only = 1;

        $settings->limit = 0;

        $settings->offset = 0;

        $request = new UsersArrivalsDeparturesApiRequest($settings);

        $request->execute();

        return $request->get_response()->message;
    }
}
