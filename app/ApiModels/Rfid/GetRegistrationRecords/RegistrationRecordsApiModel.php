<?php

namespace App\ApiModels\Rfid\GetRegistrationRecords;

use App\Standards\ApiModels\Abstracts\ApiModel;
use App\Standards\ApiModels\Attributes\ApiModelResponseKeyAttribute;
use App\Standards\ApiRequests\Classifiers\DetectedRfidTagsIdActionsClassifier;

/**
 * Implements model instance for registration records response.
 */
class RegistrationRecordsApiModel extends ApiModel
{
    #[ApiModelResponseKeyAttribute('IdUser')]
    public int $id_user;

    #[ApiModelResponseKeyAttribute('UserRfid')]
    public string $user_rfid;

    #[ApiModelResponseKeyAttribute('IdRow')]
    public int $id_row;

    #[ApiModelResponseKeyAttribute('IdAntennaDatabaseStandard')]
    public DetectedRfidTagsIdActionsClassifier $id_antenna_database_standard;

    #[ApiModelResponseKeyAttribute('IdAntennaHardwareStandard')]
    public int $id_antenna_hardware_standard;

    #[ApiModelResponseKeyAttribute('Milliseconds')]
    public int $milliseconds;

    #[ApiModelResponseKeyAttribute('IdDevice')]
    public string $id_device;

    #[ApiModelResponseKeyAttribute('FirstName')]
    public string $first_name;

    #[ApiModelResponseKeyAttribute('SurName')]
    public string $sur_name;

    #[ApiModelResponseKeyAttribute('Patronymic')]
    public string $patronymic;

    #[ApiModelResponseKeyAttribute('IdStatus')]
    public int $id_status;

    #[ApiModelResponseKeyAttribute('IdUnit')]
    public int $id_unit;

    #[ApiModelResponseKeyAttribute('IdCategory')]
    public int $id_category;

    #[ApiModelResponseKeyAttribute('IdPosition')]
    public int $id_position;

    #[ApiModelResponseKeyAttribute('IdFile')]
    public int $id_file;

    #[ApiModelResponseKeyAttribute('LenFile')]
    public int $len_file;

    #[ApiModelResponseKeyAttribute('TotalSeconds')]
    public int $total_seconds;

    #[ApiModelResponseKeyAttribute('RegularSeconds')]
    public int $regular_seconds;

    #[ApiModelResponseKeyAttribute('TimeRegistrationString')]
    public string $time_registration_string;

    #[ApiModelResponseKeyAttribute('TimeFirstEnterString')]
    public string $time_first_enter_string;

    #[ApiModelResponseKeyAttribute('TimeLastExitString')]
    public string $time_last_exit_string;

    #[ApiModelResponseKeyAttribute('CountEmployees')]
    public int $count_employees;

    #[ApiModelResponseKeyAttribute('NameStatus')]
    public string $name_status;

    #[ApiModelResponseKeyAttribute('IsExit')]
    public int $is_exit;
}
