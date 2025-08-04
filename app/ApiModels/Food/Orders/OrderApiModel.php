<?php

namespace App\ApiModels\Food\Orders;

use App\ApiModels\Traits\Food\Orders\OrderProperties;
use App\Standards\ApiModels\Abstracts\ApiModel;
use App\Standards\ApiModels\Attributes\ApiModelResponseKeyAttribute;

/**
 * Implements model instance for order standard.
 */
class OrderApiModel extends ApiModel
{
    use OrderProperties;

    #[ApiModelResponseKeyAttribute('IdItem')]
    public int $id_item;

    #[ApiModelResponseKeyAttribute('Price')]
    public float $price;

    #[ApiModelResponseKeyAttribute('Quantity')]
    public float $quantity;

    #[ApiModelResponseKeyAttribute('NameItem')]
    public string $name_item;

    #[ApiModelResponseKeyAttribute('PathObject')]
    public string $path_object;
}
