<?php

namespace App\ApiModels\Food\FoodCard;

use App\Standards\ApiModels\Abstracts\ApiModel;
use App\Standards\ApiModels\Attributes\ApiModelResponseKeyAttribute;

/**
 * Implements model instance for food card history balance response.
 */
class FoodCardHistorySelectApiModel extends ApiModel
{
    #[ApiModelResponseKeyAttribute('IdRow')]
    public int $id_row;

    #[ApiModelResponseKeyAttribute('IdUser')]
    public int $id_user;

    #[ApiModelResponseKeyAttribute('IdUserInvoker')]
    public int $id_user_invoker;

    #[ApiModelResponseKeyAttribute('DateEvent')]
    public string $date_event;

    #[ApiModelResponseKeyAttribute('FirstName')]
    public string $first_name;

    #[ApiModelResponseKeyAttribute('SurName')]
    public string $sur_name;

    #[ApiModelResponseKeyAttribute('MoneyBefore')]
    public int $money_before;

    #[ApiModelResponseKeyAttribute('MoneyAdded')]
    public int $money_added;

    #[ApiModelResponseKeyAttribute('MoneyAfter')]
    public int $money_after;

    #[ApiModelResponseKeyAttribute('NoteObject')]
    public string $note_object;

    #[ApiModelResponseKeyAttribute('DateEventAsText')]
    public string $date_event_as_text;

    #[ApiModelResponseKeyAttribute('CodeCurrency')]
    public string $code_currency;

    #[ApiModelResponseKeyAttribute('UserInvoker')]
    public string $user_invoker;
}
