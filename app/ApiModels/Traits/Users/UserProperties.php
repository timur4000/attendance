<?php

namespace App\ApiModels\Traits\Users;

use App\Standards\ApiModels\Attributes\ApiModelResponseKeyAttribute;

/**
 * Implements adding user properties.
 */
trait UserProperties
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

    #[ApiModelResponseKeyAttribute('SaltHash')]
    public string $salt_hash;

    #[ApiModelResponseKeyAttribute('HasLogin')]
    public int $has_login;

    #[ApiModelResponseKeyAttribute('HasRole')]
    public int $has_role;
}