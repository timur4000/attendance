<?php

namespace App\ApiModels\InfoUserPresence;

use App\ApiModels\Traits\Users\UserCustomProperties;
use App\ApiModels\Traits\Users\UserProperties;
use App\Standards\ApiModels\Abstracts\ApiModel;
use App\Standards\ApiModels\Attributes\ApiModelResponseKeyAttribute;

/**
 * Implements model instance for sca info user presence response.
 */
class ScaInfoUserPresenceApiModel extends ApiModel
{
    #[ApiModelResponseKeyAttribute('IdUser')]
    public int $id_user;

    #[ApiModelResponseKeyAttribute('IdStatus')]
    public int $id_status;

    #[ApiModelResponseKeyAttribute('IdUnit')]
    public int $id_unit;

    #[ApiModelResponseKeyAttribute('IdPosition')]
    public int $id_position;

    #[ApiModelResponseKeyAttribute('IdCategory')]
    public int $id_category;

    #[ApiModelResponseKeyAttribute('IdGender')]
    public int $id_gender;

    #[ApiModelResponseKeyAttribute('IdCountry')]
    public int $id_country;

    #[ApiModelResponseKeyAttribute('IdNationality')]
    public int $id_nationality;

    #[ApiModelResponseKeyAttribute('DateBirth')]
    public string $date_birth;

    #[ApiModelResponseKeyAttribute('SurName')]
    public string $sur_name;

    #[ApiModelResponseKeyAttribute('FirstName')]
    public string $first_name;

    #[ApiModelResponseKeyAttribute('Patronymic')]
    public string $patronymic;

    #[ApiModelResponseKeyAttribute('UserLogin')]
    public string $user_login;

    #[ApiModelResponseKeyAttribute('UserNote')]
    public string $user_note;

    #[ApiModelResponseKeyAttribute('UserAge')]
    public string $user_age;

    #[ApiModelResponseKeyAttribute('UserPassport')]
    public string $user_passport;

    #[ApiModelResponseKeyAttribute('UserBarcode')]
    public string $user_barcode;

    #[ApiModelResponseKeyAttribute('UserRfid')]
    public string $user_rfid;

    #[ApiModelResponseKeyAttribute('NameStatus')]
    public string $name_status;

    #[ApiModelResponseKeyAttribute('NameUnit')]
    public string $name_unit;

    #[ApiModelResponseKeyAttribute('NamePosition')]
    public string $name_position;

    #[ApiModelResponseKeyAttribute('RankPosition')]
    public int $rank_position;

    #[ApiModelResponseKeyAttribute('CodeCategory')]
    public string $code_category;

    #[ApiModelResponseKeyAttribute('NameCategory')]
    public string $name_category;

    #[ApiModelResponseKeyAttribute('NameGender')]
    public string $name_gender;

    #[ApiModelResponseKeyAttribute('NameCountry')]
    public string $name_country;

    #[ApiModelResponseKeyAttribute('NameNationality')]
    public string $name_nationality;

    #[ApiModelResponseKeyAttribute('PathUnit')]
    public string $path_unit;

    #[ApiModelResponseKeyAttribute('UserRank')]
    public string $user_rank;

    #[ApiModelResponseKeyAttribute('DateEvent')]
    public string $date_event;

    #[ApiModelResponseKeyAttribute('FirstEnter')]
    public string $first_enter;

    #[ApiModelResponseKeyAttribute('LastEnter')]
    public string $last_enter;

    #[ApiModelResponseKeyAttribute('LastExit')]
    public string $last_exit;

    #[ApiModelResponseKeyAttribute('LocationAtWork')]
    public string $location_at_work;

    #[ApiModelResponseKeyAttribute('CountEnter')]
    public string $count_enter;

    #[ApiModelResponseKeyAttribute('CountExit')]
    public string $count_exit;

    #[ApiModelResponseKeyAttribute('TimeAtWork')]
    public string $time_at_work;

    #[ApiModelResponseKeyAttribute('NameAbsence')]
    public string $name_absence;

    #[ApiModelResponseKeyAttribute('AbsenceStart')]
    public string $absence_start;
    
    #[ApiModelResponseKeyAttribute('AbsenceEnd')]
    public string $absence_end;
}
