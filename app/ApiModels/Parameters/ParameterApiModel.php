<?php

namespace App\ApiModels\Parameters;

use App\Standards\ApiModels\Abstracts\ApiModel;
use App\Standards\ApiModels\Attributes\ApiModelResponseKeyAttribute;

/**
 * Implements model instance for parameter standard.
 */
class ParameterApiModel extends ApiModel
{
    #[ApiModelResponseKeyAttribute('IdParameter')]
    public string $id_parameter;

    #[ApiModelResponseKeyAttribute('GroupParameter')]
    public string $group_parameter;

    #[ApiModelResponseKeyAttribute('IdTypeParameter')]
    public int $id_type_parameter;

    #[ApiModelResponseKeyAttribute('IsEditable')]
    public int $is_editable;

    #[ApiModelResponseKeyAttribute('NoteParameter')]
    public string $note_parameter;

    #[ApiModelResponseKeyAttribute('ValueInteger')]
    public int $value_integer;

    #[ApiModelResponseKeyAttribute('ValueString')]
    public string $value_string;

    #[ApiModelResponseKeyAttribute('ValueMin')]
    public int $value_min;

    #[ApiModelResponseKeyAttribute('ValueMax')]
    public int $value_max;

    #[ApiModelResponseKeyAttribute('NameTypeParameter')]
    public string $name_type_parameter;

    #[ApiModelResponseKeyAttribute('RankObject')]
    public string $rank_object;

    #[ApiModelResponseKeyAttribute('ValueDisplay')]
    public string $value_display;

    #[ApiModelResponseKeyAttribute('ValueBoolean')]
    public string $value_boolean;
}
