<?php

namespace App\ApiModels\Prices;

use App\Standards\ApiModels\Abstracts\ApiModel;
use App\Standards\ApiModels\Attributes\ApiModelResponseKeyAttribute;
use App\Standards\ApiModels\Attributes\ApiModelToDecimalAttribute;

/**
 * Implements base model instance for price responses.
 */
class PricesApiModel extends ApiModel
{
    #[ApiModelResponseKeyAttribute('IdObject')]
    public int $id_object;

    #[ApiModelResponseKeyAttribute('IdParent')]
    public int | null $id_parent;

    #[ApiModelResponseKeyAttribute('CodeObject')]
    public string $code_object;

    #[ApiModelResponseKeyAttribute('NameObject')]
    public string $name_object;

    #[ApiModelResponseKeyAttribute('PathObject')]
    public string $path_object;

    #[ApiModelResponseKeyAttribute('LevelObject')]
    public int $level_object;

    #[ApiModelResponseKeyAttribute('LineParent')]
    public string $line_parent;

    #[ApiModelResponseKeyAttribute('Level1')]
    public int $level1;

    #[ApiModelResponseKeyAttribute('Level2')]
    public int $level2;

    #[ApiModelResponseKeyAttribute('Level3')]
    public int $level3;

    #[ApiModelResponseKeyAttribute('RankObject')]
    public int $rank_object;

    #[ApiModelResponseKeyAttribute('NoteObject')]
    public string $note_object;

    #[ApiModelResponseKeyAttribute('NameShort')]
    public string $name_short;

    #[ApiModelResponseKeyAttribute('IdUser')]
    public int $id_user;

    #[ApiModelResponseKeyAttribute('IdCurrency')]
    public int $id_currency;

    #[ApiModelResponseKeyAttribute('CodeCurrency')]
    public string $code_currency;

    #[ApiModelResponseKeyAttribute('NameCurrency')]
    public string $name_currency;

    #[ApiModelResponseKeyAttribute('LastChanged')]
    public string $last_changed;

    #[ApiModelResponseKeyAttribute('UserName')]
    public string $user_name;

    #[ApiModelResponseKeyAttribute('PriceObject'), ApiModelToDecimalAttribute]
    public string $price_object;
}
