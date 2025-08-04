<?php

namespace App\Handlers\Admin\Users;

use App\ApiModels\Dashboard\Attendance\AttendancePersonnelByCategoryApiModel;
use App\ApiModels\Users\UserApiModel;
use App\ApiRequests\Data\Dashboard\Attendance\AttendancePersonnelByCategoryApiRequest;
use App\ApiRequests\Data\Users\UsersSelectApiRequest;
use App\ApiRequestSettings\Data\Dashboard\Attendance\AttendancePersonnelByCategoryApiRequestSettings;
use App\ApiRequestSettings\Data\Users\UsersSelectApiRequestSettings;
use App\Handlers\Admin\Dashboard\Attendance\AttendanceHandler;
use App\Standards\ApiModels\Abstracts\ApiModel;
use App\Standards\Handlers\Abstracts\Handler;
use Illuminate\Support\Collection;

/**
 * Implements helper work with users.
 */
class UsersHandler extends Handler
{
    /**
     * Returns all records by the given settings.
     *
     * @param UsersSelectApiRequestSettings $settings
     *
     * @return Collection
     */
    public static function records(UsersSelectApiRequestSettings $settings): Collection
    {
        $request = new UsersSelectApiRequest($settings);

        $request->execute();

        return ApiModel::create($request->get_response()->package, UserApiModel::class);
    }

    /**
     * Returns record by the given id user.
     *
     * @param int $id_user
     *
     * @param UsersSelectApiRequestSettings|null $settings
     *
     * @return UserApiModel
     */
    public static function record(int $id_user, ? UsersSelectApiRequestSettings $settings = null): UserApiModel
    {
        $settings ??= new UsersSelectApiRequestSettings();

        $settings->id_user = $id_user;

        $request = new UsersSelectApiRequest($settings);

        $request->execute();

        return ApiModel::create_one($request->get_response()->first_package(), UserApiModel::class);
    }

    /**
     * Returns count of records.
     *
     * @param UsersSelectApiRequestSettings $settings
     *
     * @return int
     */
    public static function total(UsersSelectApiRequestSettings $settings): int
    {
        $settings->count_only = 1;

        $settings->limit = 0;

        $settings->offset = 0;

        $request = new UsersSelectApiRequest($settings);

        $request->execute();

        return (int) $request->get_response()->message;
    }

    /**
     * Returns all users by categories by the given settings.
     *
     * @param AttendancePersonnelByCategoryApiRequestSettings $settings
     *
     * @return Collection
     *
     * @deprecated The method has been moved.
     *
     * @see AttendanceHandler::users_by_categories
     */
    public static function by_category(AttendancePersonnelByCategoryApiRequestSettings $settings): Collection
    {
        $request = new AttendancePersonnelByCategoryApiRequest($settings);

        $request->execute();

        return ApiModel::create($request->get_response()->package, AttendancePersonnelByCategoryApiModel::class);
    }
}
