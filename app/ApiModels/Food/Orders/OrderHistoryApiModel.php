<?php

namespace App\ApiModels\Food\Orders;

use App\ApiModels\Traits\Food\Orders\OrderProperties;
use App\Standards\ApiModels\Abstracts\ApiModel;
use App\Standards\ApiModels\Attributes\ApiModelResponseKeyAttribute;

/**
 * Implements model instance for order history standard.
 */
class OrderHistoryApiModel extends ApiModel
{
    #[ApiModelResponseKeyAttribute('IdUser')]
    public int $id_user;

    #[ApiModelResponseKeyAttribute('IdUserInvoker')]
    public int $id_user_invoker;

    #[ApiModelResponseKeyAttribute('IdOrder')]
    public int $id_order;

    #[ApiModelResponseKeyAttribute('DateOrder')]
    public string $date_order;

    #[ApiModelResponseKeyAttribute('DateOrderAsText')]
    public string $date_order_as_text;

    #[ApiModelResponseKeyAttribute('MustPay')]
    public int $must_pay;

    #[ApiModelResponseKeyAttribute('MoneyPaid')]
    public int $money_paid;

    #[ApiModelResponseKeyAttribute('IsPaid')]
    public int $is_paid;

    #[ApiModelResponseKeyAttribute('SurName')]
    public string $sur_name;

    #[ApiModelResponseKeyAttribute('FirstName')]
    public string $first_name;

    #[ApiModelResponseKeyAttribute('Patronymic')]
    public string $patronymic;

    #[ApiModelResponseKeyAttribute('IdItem')]
    public int $id_item;

    #[ApiModelResponseKeyAttribute('NameItem')]
    public string $name_item;

    #[ApiModelResponseKeyAttribute('PriceOneItem')]
    public int $price_one_item;

    #[ApiModelResponseKeyAttribute('Quantity')]
    public int $quantity;

    #[ApiModelResponseKeyAttribute('MoneyInvoice')]
    public int $money_invoice;

    #[ApiModelResponseKeyAttribute('IdCurrency')]
    public int $id_currency;

    #[ApiModelResponseKeyAttribute('CodeCurrency')]
    public string $code_currency;

    #[ApiModelResponseKeyAttribute('NameCurrency')]
    public string $name_currency;

    #[ApiModelResponseKeyAttribute('NoteItem')]
    public string $note_item;

}
