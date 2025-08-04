<?php

namespace App\ApiRequestSettings\Data\Food\Orders;

use App\ApiModels\Food\Orders\OrderItemApiModel;
use App\ApiRequests\Data\Food\FoodCard\FoodCardSelectApiRequest;
use App\Handlers\Admin\Food\FoodCard\FoodCardHandler;
use App\Standards\ApiRequests\Classifiers\ApiRequestDataTypesClassifier;
use App\Standards\ApiRequestSettings\Abstracts\ApiRequestSettings;
use App\Standards\Attributes\Processes\ValueProcessAttribute;
use App\Standards\Attributes\Requests\RequestKeyAttribute;
use App\Standards\Callables\ApiRequestSettings\ApiModelsToOriginalJson;
use Illuminate\Support\Collection;

/**
 * Contains all possible settings of the order create api request.
 *
 * @see FoodCardSelectApiRequest
 */
class OrderCreateApiRequestSettings extends ApiRequestSettings
{
    #[RequestKeyAttribute('IdUser')]
    public int $id_user = 0;

    /**
     * @var Collection<OrderItemApiModel>
     */
    #[RequestKeyAttribute('Data'), ValueProcessAttribute(new ApiModelsToOriginalJson)]
    public Collection $data;

    #[RequestKeyAttribute('Note')]
    public string $note = '';

    public function __construct()
    {
        $this->type_request = ApiRequestDataTypesClassifier::FOOD_ORDER_CREATE;
    }

    /**
     * Returns total price.
     *
     * @return int
     */
    public function get_total(): int
    {
        return array_reduce($this->data->toArray(), fn (int $carry , OrderItemApiModel $item) => $item->price + $carry, 0);
    }

    /**
     * Checks if the given user does not have enough money.
     *
     * @return bool
     */
    public function is_deficit(): bool
    {
        return FoodCardHandler::get($this->id_user)->money_amount < $this->get_total();
    }

    /**
     * Checks whether the user can pay for the order.
     *
     * @return mixed
     */
    public function is_can_pay(): bool
    {
        return (FoodCardHandler::get($this->id_user)->money_amount - FoodCardHandler::get_food_card_balance_minimum()->value_integer) >= $this->get_total();
    }
}
