<?php

namespace App\ApiModels\Food\Orders;

use App\ApiModels\Traits\Food\Orders\OrderProperties;
use App\Standards\ApiModels\Abstracts\ApiModel;
use App\Standards\ApiModels\Attributes\ApiModelResponseKeyAttribute;
use Illuminate\Support\Collection;

/**
 * Implements model instance for order summary standard.
 */
class OrderSummaryApiModel extends ApiModel
{
    use OrderProperties;

    #[ApiModelResponseKeyAttribute('MoneyPaid')]
    public float $money_paid;

    #[ApiModelResponseKeyAttribute('NoteObject')]
    public string $note_object;

    #[ApiModelResponseKeyAttribute('SurName')]
    public string $sur_name;

    #[ApiModelResponseKeyAttribute('FirstName')]
    public string $first_name;

    #[ApiModelResponseKeyAttribute('Patronymic')]
    public string $patronymic;

    #[ApiModelResponseKeyAttribute('UserBarcode')]
    public string $user_barcode;

    #[ApiModelResponseKeyAttribute('IsPaid')]
    public int $is_paid;

    /**
     * @var Collection<OrderItemApiModel>
     */
    public Collection $items;
}
