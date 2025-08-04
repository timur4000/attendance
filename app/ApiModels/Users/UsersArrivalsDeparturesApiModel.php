<?php

namespace App\ApiModels\Users;

use App\Standards\ApiModels\Abstracts\ApiModel;
use App\Standards\ApiModels\Attributes\ApiModelResponseKeyAttribute;

/**
 * Implements model instance for users arrivals and departures response.
 */
class UsersArrivalsDeparturesApiModel extends ApiModel
{
    #[ApiModelResponseKeyAttribute('IdRow')]
    public int $id_row;

    #[ApiModelResponseKeyAttribute('IdUser')]
    public int $id_user;

    #[ApiModelResponseKeyAttribute('DateEvent')]
    public string $date_event;

    #[ApiModelResponseKeyAttribute('IdAction')]
    public int $id_action;

    #[ApiModelResponseKeyAttribute('FirstName')]
    public string $first_name;

    #[ApiModelResponseKeyAttribute('SurName')]
    public string $sur_name;

    #[ApiModelResponseKeyAttribute('NameAction')]
    public string $name_action;

    #[ApiModelResponseKeyAttribute('TimeAtWorkSeconds')]
    public int $time_at_work_seconds;

    #[ApiModelResponseKeyAttribute('TimeAtWorkAsText')]
    public string $time_at_work_as_text;

    #[ApiModelResponseKeyAttribute('DateEventAsText')]
    public string $date_event_as_text;

    #[ApiModelResponseKeyAttribute('TimeEventAsText')]
    public string $time_event_as_text;
}
