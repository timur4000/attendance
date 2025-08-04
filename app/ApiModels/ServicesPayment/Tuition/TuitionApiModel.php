<?php

namespace App\ApiModels\ServicesPayment\Tuition;

use App\ApiModels\Traits\Users\UserCustomProperties;
use App\ApiModels\Users\UserApiModel;
use App\Standards\ApiModels\Attributes\ApiModelResponseKeyAttribute;

/**
 * Implements model instance for user tuition response.
 */
class TuitionApiModel extends UserApiModel
{
    use UserCustomProperties;

    #[ApiModelResponseKeyAttribute('Year')]
    public int $year;

    #[ApiModelResponseKeyAttribute('MustPay')]
    public string $must_pay;

    #[ApiModelResponseKeyAttribute('MoneyPaid')]
    public string $money_paid;

    #[ApiModelResponseKeyAttribute('CodeCurrency')]
    public string $code_currency;

    #[ApiModelResponseKeyAttribute('NameCurrency')]
    public string $name_currency;
}
