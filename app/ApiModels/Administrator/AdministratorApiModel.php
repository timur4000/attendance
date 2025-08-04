<?php

namespace App\ApiModels\Administrator;

use App\Standards\ApiModels\Abstracts\ApiModel;
use App\Standards\ApiModels\Attributes\ApiModelResponseKeyAttribute;
use App\Standards\ApiModels\Attributes\ApiModelStringToArrayByCommaAttribute;
use App\Standards\Classifiers\Chars\CharsClassifiers;

/**
 * Implements model instance for administrator response.
 */
class AdministratorApiModel extends ApiModel
{
    #[ApiModelResponseKeyAttribute('IdUser')]
    public string $id_user;

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

    #[ApiModelResponseKeyAttribute('ListOfRoles'), ApiModelStringToArrayByCommaAttribute]
    public array $list_of_roles;

    #[ApiModelResponseKeyAttribute('ListOfIdRoles'), ApiModelStringToArrayByCommaAttribute]
    public array $list_of_id_roles;

    #[ApiModelResponseKeyAttribute('CategoryCode')]
    public string $category_code;

    #[ApiModelResponseKeyAttribute('CategoryName')]
    public string $category_name;

    /**
     * Returns full name.
     *
     * @return string
     */
    public function full_name(): string
    {
        return $this->surname . CharsClassifiers::SPACE . $this->first_name . CharsClassifiers::SPACE . $this->patronymic;
    }
}
