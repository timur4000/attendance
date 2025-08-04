<?php

namespace App\ApiModels\ScaUsers;

use App\ApiModels\Traits\Users\UserCustomProperties;
use App\ApiModels\Traits\Users\UserProperties;
use App\Standards\ApiModels\Abstracts\ApiModel;
use App\Standards\ApiModels\Attributes\ApiModelResponseKeyAttribute;
use App\Standards\Classifiers\Chars\CharsClassifiers;

/**
 * Implements model instance for sca user response.
 */
class ScaUserApiModel extends ApiModel
{
    #[ApiModelResponseKeyAttribute('FoodCardMoney')]
    public int $food_card_money;

    #[ApiModelResponseKeyAttribute('IdAbsence')]
    public int $id_absence;

    #[ApiModelResponseKeyAttribute('CodeCurrency')]
    public string $code_currency;

    use UserProperties, UserCustomProperties;

    public function get_person_name(): string
    {
        return $this->sur_name . CharsClassifiers::SPACE . $this->first_name . CharsClassifiers::SPACE . $this->patronymic;
    }
}
