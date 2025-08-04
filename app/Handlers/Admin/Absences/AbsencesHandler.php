<?php

namespace App\Handlers\Admin\Absences;

use App\ApiModels\Absences\AbsencesApiModel;
use App\ApiModels\StandardResponse\StandardResponseApiModel;
use App\ApiRequests\Data\Absences\AbsencesDeleteApiRequest;
use App\ApiRequests\Data\Absences\AbsencesInsertApiRequest;
use App\ApiRequests\Data\Absences\AbsencesSelectApiRequest;
use App\ApiRequestSettings\Data\Absences\AbsencesDeleteApiRequestSettings;
use App\ApiRequestSettings\Data\Absences\AbsencesInsertApiRequestSettings;
use App\ApiRequestSettings\Data\Absences\AbsencesSelectApiRequestSettings;
use App\Standards\ApiModels\Abstracts\ApiModel;
use App\Standards\Handlers\Abstracts\Handler;
use Illuminate\Support\Collection;

/**
 * Implements help work with the absences.
 */
class AbsencesHandler extends Handler
{
    /**
     * Returns records.
     *
     * @param int $id_user
     *
     * @param AbsencesSelectApiRequestSettings|null $settings
     *
     * @return Collection
     */
    public static function records(int $id_user, ? AbsencesSelectApiRequestSettings $settings = null): Collection
    {
        $settings ??= new AbsencesSelectApiRequestSettings();

        $settings->id_user = $id_user;

        $request = new AbsencesSelectApiRequest($settings);

        $request->execute();

        return ApiModel::create($request->get_response()->package, AbsencesApiModel::class);
    }

    /**
     * Creates record.
     *
     * @param AbsencesInsertApiRequestSettings $settings
     *
     * @return StandardResponseApiModel
     */
    public static function create(AbsencesInsertApiRequestSettings $settings): StandardResponseApiModel
    {
        $request = new AbsencesInsertApiRequest($settings);

        $request->execute();

        return $request->get_response();
    }

    /**
     * Deletes record by the given id row.
     *
     * @param int $id_row
     *
     * @return StandardResponseApiModel
     */
    public static function delete(int $id_row): StandardResponseApiModel
    {
        $settings = new AbsencesDeleteApiRequestSettings();

        $settings->id_row = $id_row;

        $request = new AbsencesDeleteApiRequest($settings);

        $request->execute();

        return $request->get_response();
    }
}
