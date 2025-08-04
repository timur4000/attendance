<?php

namespace App\ApiModels\Traits\Food\Orders;

use App\Standards\ApiModels\Attributes\ApiModelResponseKeyAttribute;

/**
 * Implements adding base properties of order standard.
 */
trait OrderProperties
{
    #[ApiModelResponseKeyAttribute('IdOrder')]
    public int $id_order;

    #[ApiModelResponseKeyAttribute('IdUser')]
    public int $id_user;

    #[ApiModelResponseKeyAttribute('IdUserInvoker')]
    public int $id_user_invoker;

    #[ApiModelResponseKeyAttribute('DateEvent')]
    public string $date_event;

    #[ApiModelResponseKeyAttribute('MoneyToPay')]
    public float $money_to_pay;

    #[ApiModelResponseKeyAttribute('CodeCurrency')]
    public string $code_currency;
}
