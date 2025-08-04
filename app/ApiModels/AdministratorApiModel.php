<?php

namespace App\ApiModels;

use App\Standards\Abstracts\ApiModels\ApiModel;
use App\Standards\Attributes\ApiModel\ApiModelResponseKeyAttribute;

/**
 * Implements model instance for administrator response.
 */
class AdministratorApiModel extends ApiModel
{
    #[ApiModelResponseKeyAttribute('AccessKey')]
    public string $access_key;

    #[ApiModelResponseKeyAttribute('RefreshKey')]
    public string $refresh_key;

    #[ApiModelResponseKeyAttribute('LoginKey')]
    public string $login_key;

    #[ApiModelResponseKeyAttribute('LogoutKey')]
    public string $logout_key;

    #[ApiModelResponseKeyAttribute('PersonName')]
    public string $person_name;

    #[ApiModelResponseKeyAttribute('DatabaseName')]
    public string $database_name;

    #[ApiModelResponseKeyAttribute('Surname')]
    public string $surname;

    #[ApiModelResponseKeyAttribute('FirstName')]
    public string $first_name;

    #[ApiModelResponseKeyAttribute('Patronymic')]
    public string $patronymic;

    #[ApiModelResponseKeyAttribute('ListOfRoles')]
    public string $list_of_roles;

    #[ApiModelResponseKeyAttribute('Category')]
    public string $category;
}
