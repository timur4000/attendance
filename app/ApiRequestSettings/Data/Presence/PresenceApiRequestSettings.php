<?php

namespace App\ApiRequestSettings\Data\Presence;

use App\Standards\ApiRequestSettings\Abstracts\ApiRequestSettings;
use App\Standards\Attributes\Requests\RequestKeyAttribute;

/**
 * Contains all possible base settings of the presence requests.
 */
class PresenceApiRequestSettings extends ApiRequestSettings
{
    #[RequestKeyAttribute('Date')]
    public string $date;

    #[RequestKeyAttribute('IdUser')]
    public int $id_user = 0;

    #[RequestKeyAttribute('SurName')]
    public string $sur_name = '';

    #[RequestKeyAttribute('FirstName')]
    public string $first_name = '';

    #[RequestKeyAttribute('IdUnit')]
    public int $id_unit = 0;

    #[RequestKeyAttribute('IdPosition')]
    public int $id_position = 0;

    #[RequestKeyAttribute('IdCategory')]
    public int $id_category = 0;

    #[RequestKeyAttribute('CountOnly')]
    public int $count_only = 0;

    #[RequestKeyAttribute('Limit')]
    public int $limit = 0;

    #[RequestKeyAttribute('Offset')]
    public int $offset = 0;
}
