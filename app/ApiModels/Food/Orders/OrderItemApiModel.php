<?php

namespace App\ApiModels\Food\Orders;

use App\Standards\ApiModels\Abstracts\ApiModel;
use App\Standards\ApiModels\Attributes\ApiModelResponseKeyAttribute;

/**
 * Implements model instance for order item standard.
 */
class OrderItemApiModel extends ApiModel
{
    #[ApiModelResponseKeyAttribute('IdFood')]
    public int $id_food;

    #[ApiModelResponseKeyAttribute('Price')]
    public float $price;

    #[ApiModelResponseKeyAttribute('Quantity')]
    public float $quantity;
}
