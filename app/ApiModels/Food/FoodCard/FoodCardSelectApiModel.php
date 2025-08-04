<?php

namespace App\ApiModels\Food\FoodCard;

use App\Standards\ApiModels\Abstracts\ApiModel;
use App\Standards\ApiModels\Attributes\ApiModelResponseKeyAttribute;

/**
 * Implements model instance for food card balance response.
 */
class FoodCardSelectApiModel extends ApiModel
{
    #[ApiModelResponseKeyAttribute('IdUser')]
    public int $id_user;

    #[ApiModelResponseKeyAttribute('IdCurrency')]
    public int $id_currency;

    #[ApiModelResponseKeyAttribute('MoneyAmount')]
    public float $money_amount;

    #[ApiModelResponseKeyAttribute('CodeCurrency')]
    public string $code_currency;

    #[ApiModelResponseKeyAttribute('NameCurrency')]
    public string $name_currency;

    #[ApiModelResponseKeyAttribute('SurName')]
    public string $sur_name;

    #[ApiModelResponseKeyAttribute('FirstName')]
    public string $first_name;

    #[ApiModelResponseKeyAttribute('Patronymic')]
    public string $patronymic;

    #[ApiModelResponseKeyAttribute('UserName')]
    public string $user_name;
}
