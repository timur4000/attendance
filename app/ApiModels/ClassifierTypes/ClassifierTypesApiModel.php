<?php

namespace App\ApiModels\ClassifierTypes;

use App\Standards\ApiModels\Abstracts\ApiModel;
use App\Standards\ApiModels\Attributes\ApiModelResponseKeyAttribute;

/**
 * Implements model instance of classifier types response.
 */
class ClassifierTypesApiModel extends ApiModel
{
    #[ApiModelResponseKeyAttribute('IdObject')]
    public int $id_object;

    #[ApiModelResponseKeyAttribute('IdStatus')]
    public int $id_status;

    #[ApiModelResponseKeyAttribute('MaxNestingLevel')]
    public int $max_nesting_level;

    #[ApiModelResponseKeyAttribute('CodeObject')]
    public string $code_object;

    #[ApiModelResponseKeyAttribute('CodeGroup')]
    public string $code_group;

    #[ApiModelResponseKeyAttribute('RankObject')]
    public int $rank_object;

    #[ApiModelResponseKeyAttribute('NameEntity')]
    public string $name_entity;

    #[ApiModelResponseKeyAttribute('NameTable')]
    public string $name_table;

    #[ApiModelResponseKeyAttribute('NoteEntity')]
    public string $note_entity;
}
