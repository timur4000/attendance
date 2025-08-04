<?php

namespace App\ApiModels\Reports\FoodCard;

use App\Standards\ApiModels\Abstracts\ApiModel;
use App\Standards\ApiModels\Attributes\ApiModelResponseKeyAttribute;

/**
 * Implements model instance for sca report food card response.
 */
class ScaReportFoodCardApiModel extends ApiModel
{
    #[ApiModelResponseKeyAttribute('IdUser')]
    public int $id_user;

    #[ApiModelResponseKeyAttribute('IdUnit')]
    public int $id_unit;

    #[ApiModelResponseKeyAttribute('IdPosition')]
    public int $id_position;

    #[ApiModelResponseKeyAttribute('IdCategory')]
    public int $id_category;

    #[ApiModelResponseKeyAttribute('SurName')]
    public string $sur_name;

    #[ApiModelResponseKeyAttribute('FirstName')]
    public string $first_name;

    #[ApiModelResponseKeyAttribute('Patronymic')]
    public string $patronymic;

    #[ApiModelResponseKeyAttribute('NameUnit')]
    public string $name_unit;

    #[ApiModelResponseKeyAttribute('NamePosition')]
    public string $name_position;

    #[ApiModelResponseKeyAttribute('NameCategory')]
    public string $name_category;

    #[ApiModelResponseKeyAttribute('MxStart')]
    public float $mx_start;

    #[ApiModelResponseKeyAttribute('MxPlus')]
    public float $mx_plus;

    #[ApiModelResponseKeyAttribute('MxMinus')]
    public float $mx_minus;

    #[ApiModelResponseKeyAttribute('MxPurchase')]
    public float $mx_purchase;

    #[ApiModelResponseKeyAttribute('MxWithdraw')]
    public float $mx_withdraw;

    #[ApiModelResponseKeyAttribute('MxDiff')]
    public float $mx_diff;

    #[ApiModelResponseKeyAttribute('MxEnd')]
    public float $mx_end;

    #[ApiModelResponseKeyAttribute('Rank')]
    public int $rank;
}
