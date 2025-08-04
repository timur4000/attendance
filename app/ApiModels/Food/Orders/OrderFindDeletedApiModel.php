<?php

namespace App\ApiModels\Food\Orders;

use App\Standards\ApiModels\Abstracts\ApiModel;
use App\Standards\ApiModels\Attributes\ApiModelResponseKeyAttribute;

/**
 * Implements model instance for order find deleted standard.
 */
class OrderFindDeletedApiModel extends ApiModel
{
    #[ApiModelResponseKeyAttribute('IdOrder')]
    public int $id_order;
}
