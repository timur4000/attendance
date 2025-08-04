<?php

namespace App\Handlers\Admin\Food\FoodCard;

use App\ApiModels\Food\FoodCard\FoodCardHistorySelectApiModel;
use App\ApiModels\Food\FoodCard\FoodCardSelectApiModel;
use App\ApiModels\Parameters\ParameterApiModel;
use App\ApiModels\StandardResponse\StandardResponseApiModel;
use App\ApiRequests\Data\Food\FoodCard\FoodCardAddMoneyApiRequest;
use App\ApiRequests\Data\Food\FoodCard\FoodCardCancelLastAddingMoneyApiRequest;
use App\ApiRequests\Data\Food\FoodCard\FoodCardCancelWithdrawMoneyApiRequest;
use App\ApiRequests\Data\Food\FoodCard\FoodCardHistorySelectApiRequest;
use App\ApiRequests\Data\Food\FoodCard\FoodCardSelectApiRequest;
use App\ApiRequests\Data\Food\FoodCard\FoodCardWithdrawMoneyApiRequest;
use App\ApiRequestSettings\Data\Food\FoodCard\FoodCardAddMoneyApiRequestSettings;
use App\ApiRequestSettings\Data\Food\FoodCard\FoodCardCancelLastAddingMoneyApiRequestSettings;
use App\ApiRequestSettings\Data\Food\FoodCard\FoodCardCancelWithdrawMoneyApiRequestSettings;
use App\ApiRequestSettings\Data\Food\FoodCard\FoodCardHistorySelectApiRequestSettings;
use App\ApiRequestSettings\Data\Food\FoodCard\FoodCardSelectApiRequestSettings;
use App\ApiRequestSettings\Data\Food\FoodCard\FoodCardWithdrawMoneyApiRequestSettings;
use App\Handlers\Admin\Parameters\ParametersHandler;
use App\Standards\ApiModels\Abstracts\ApiModel;
use App\Standards\ApiRequestSettings\Classifiers\Parameters\ParametersIdsClassifier;
use App\Standards\Handlers\Abstracts\Handler;
use Illuminate\Support\Collection;

/**
 * Implements help work with the food card.
 */
class FoodCardHandler extends Handler
{
    /**
     * Returns record.
     *
     * @param int $id_user
     *
     * @return FoodCardSelectApiModel
     */
    public static function get(int $id_user): FoodCardSelectApiModel
    {
        $settings = new FoodCardSelectApiRequestSettings();

        $settings->id_user = $id_user;

        $request = new FoodCardSelectApiRequest($settings);

        $request->execute();

        return new FoodCardSelectApiModel($request->get_response()->first_package());
    }

    /**
     * Creates record.
     *
     * @param int $id_user
     *
     * @param float $amount
     *
     * @return StandardResponseApiModel
     */
    public static function create(int $id_user, float $amount): StandardResponseApiModel
    {
        $settings = new FoodCardAddMoneyApiRequestSettings();

        $settings->id_user = $id_user;

        $settings->money_added = $amount;

        $request = new FoodCardAddMoneyApiRequest($settings);

        $request->execute();

        return $request->get_response();
    }

    /**
     * Removes last record.
     *
     * @param int $id_user
     *
     * @param float $amount
     *
     * @return StandardResponseApiModel
     */
    public static function last_remove(int $id_user, float $amount): StandardResponseApiModel
    {
        $settings = new FoodCardCancelLastAddingMoneyApiRequestSettings();

        $settings->id_user = $id_user;

        $settings->money_added = $amount;

        $request = new FoodCardCancelLastAddingMoneyApiRequest($settings);

        $request->execute();

        return $request->get_response();
    }

    /**
     * Returns history records.
     *
     * @param int $id_user
     *
     * @param FoodCardHistorySelectApiRequestSettings|null $settings
     *
     * @return Collection<FoodCardHistorySelectApiModel>
     */
    public static function history(int $id_user, ? FoodCardHistorySelectApiRequestSettings $settings = null): Collection
    {
        $settings ??= new FoodCardHistorySelectApiRequestSettings();

        $settings->id_user = $id_user;

        $request = new FoodCardHistorySelectApiRequest($settings);

        $request->execute();

        return ApiModel::create($request->get_response()->package, FoodCardHistorySelectApiModel::class);
    }

    /**
     * Withdraws from the card.
     *
     * @param int $id_user
     *
     * @param FoodCardWithdrawMoneyApiRequestSettings|null $settings
     *
     * @return StandardResponseApiModel
     */
    public static function withdraw(int $id_user, ? FoodCardWithdrawMoneyApiRequestSettings $settings = null): StandardResponseApiModel
    {
        $settings ??= new FoodCardWithdrawMoneyApiRequestSettings();

        $settings->id_user = $id_user;

        $request = new FoodCardWithdrawMoneyApiRequest($settings);

        $request->execute();

        return $request->get_response();
    }

    /**
     * Cancels last withdraw.
     *
     * @param int $id_user
     *
     * @param FoodCardCancelWithdrawMoneyApiRequestSettings|null $settings
     *
     * @return StandardResponseApiModel
     */
    public static function cancel_withdraw(int $id_user, ? FoodCardCancelWithdrawMoneyApiRequestSettings $settings = null): StandardResponseApiModel
    {
        $settings ??= new FoodCardCancelWithdrawMoneyApiRequestSettings();

        $settings->id_user = $id_user;

        $request = new FoodCardCancelWithdrawMoneyApiRequest($settings);

        $request->execute();

        return $request->get_response();
    }

    /**
     * Returns total of history records.
     *
     * @param int $id_user
     *
     * @param FoodCardHistorySelectApiRequestSettings|null $settings
     *
     * @return int
     */
    public static function history_total(int $id_user, ? FoodCardHistorySelectApiRequestSettings $settings = null): int
    {
        $settings ??= new FoodCardHistorySelectApiRequestSettings();

        $settings->id_user = $id_user;

        $settings->count_only = 1;

        $settings->limit = 0;

        $settings->offset = 0;

        $request = new FoodCardHistorySelectApiRequest($settings);

        $request->execute();

        return $request->get_response()->message;
    }

    /**
     * Creates and returns instance of the food card api model.
     *
     * @param StandardResponseApiModel $model
     *
     * @return FoodCardSelectApiModel
     */
    public static function create_model(StandardResponseApiModel $model): FoodCardSelectApiModel
    {
        return ApiModel::create_one($model->first_package(), FoodCardSelectApiModel::class);
    }

    /**
     * Returns parameter of the food card balance minimum.
     *
     * @return ParameterApiModel
     */
    public static function get_food_card_balance_minimum(): ParameterApiModel
    {
        return ParametersHandler::records_from_response(ParametersHandler::response(ParametersIdsClassifier::FOOD_CARD_BALANCE_MINIMUM), true);
    }
}
