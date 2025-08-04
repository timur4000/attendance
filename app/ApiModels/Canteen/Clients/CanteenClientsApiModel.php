<?php

namespace App\ApiModels\Canteen\Clients;

use App\Standards\ApiModels\Abstracts\ApiModel;
use App\Standards\ApiModels\Attributes\ApiModelResponseKeyAttribute;

/**
 * Implements model instance of canteen clients response.
 */
class CanteenClientsApiModel extends ApiModel
{
    #[ApiModelResponseKeyAttribute('IdRow')]
    public int $id_row;

    #[ApiModelResponseKeyAttribute('IdUser')]
    public int $id_user;

    #[ApiModelResponseKeyAttribute('SurName')]
    public string $sur_name;

    #[ApiModelResponseKeyAttribute('FirstName')]
    public string $first_name;

    #[ApiModelResponseKeyAttribute('Patronymic')]
    public string $patronymic;

    #[ApiModelResponseKeyAttribute('UserBarcode')]
    public string $user_barcode;

    #[ApiModelResponseKeyAttribute('IdCategory')]
    public int $id_category;

    #[ApiModelResponseKeyAttribute('NameCategory')]
    public string $name_category;

    #[ApiModelResponseKeyAttribute('NameUnit')]
    public string $name_unit;

    #[ApiModelResponseKeyAttribute('NamePosition')]
    public string $name_position;

    #[ApiModelResponseKeyAttribute('UserRank')]
    public string $user_rank;

    #[ApiModelResponseKeyAttribute('CodeCurrency')]
    public string $code_currency;

    #[ApiModelResponseKeyAttribute('MoneyToPay')]
    public int $money_to_pay;

    #[ApiModelResponseKeyAttribute('MoneyPaid')]
    public int $money_paid;

    #[ApiModelResponseKeyAttribute('ClientsDebt')]
    public int $client_debt;
}
