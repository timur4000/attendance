<?php

namespace App\ApiModels\Classifiers;

use App\Standards\ApiModels\Abstracts\ApiModel;
use App\Standards\ApiModels\Attributes\ApiModelResponseKeyAttribute;

/**
 * Implements model instance of classifiers response.
 */
class ClassifierApiModel extends ApiModel
{
    #[ApiModelResponseKeyAttribute('IdObject')]
    public int $id_object;

    #[ApiModelResponseKeyAttribute('IdParent')]
    public int $id_parent;

    #[ApiModelResponseKeyAttribute('CodeObject')]
    public string $code_object;

    #[ApiModelResponseKeyAttribute('RankObject')]
    public int $rank_object;

    #[ApiModelResponseKeyAttribute('NameObject')]
    public string $name_object;

    #[ApiModelResponseKeyAttribute('NameShort')]
    public string $name_short;

    #[ApiModelResponseKeyAttribute('NoteObject')]
    public string $note_object;
}
