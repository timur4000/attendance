<?php

namespace App\ApiModels\Absences;

use App\Standards\ApiModels\Abstracts\ApiModel;
use App\Standards\ApiModels\Attributes\ApiModelResponseKeyAttribute;

/**
 * Implements model instance of absences response.
 */
class AbsencesApiModel extends ApiModel
{
    #[ApiModelResponseKeyAttribute('IdRow')]
    public int $id_row;

    #[ApiModelResponseKeyAttribute('IdUser')]
    public int $id_user;

    #[ApiModelResponseKeyAttribute('IdAbsence')]
    public int $id_absence;

    #[ApiModelResponseKeyAttribute('IdUserInvoker')]
    public int $id_user_invoker;

    #[ApiModelResponseKeyAttribute('DateStart')]
    public string $date_start;

    #[ApiModelResponseKeyAttribute('DateEnd')]
    public string $date_end;

    #[ApiModelResponseKeyAttribute('DateCreate')]
    public string $date_create;

    #[ApiModelResponseKeyAttribute('IsActive')]
    public int $is_active;

    #[ApiModelResponseKeyAttribute('IsPast')]
    public int $is_past;

    #[ApiModelResponseKeyAttribute('IsFuture')]
    public int $is_future;

    #[ApiModelResponseKeyAttribute('NameUserInvoker')]
    public string $name_user_invoker;

    #[ApiModelResponseKeyAttribute('NameAbsence')]
    public string $note_entity;

    #[ApiModelResponseKeyAttribute('NoteAbsence')]
    public string $note_absence;

    #[ApiModelResponseKeyAttribute('RankObject')]
    public string $rank_object;

    #[ApiModelResponseKeyAttribute('Relevance')]
    public string $relevance;
}
