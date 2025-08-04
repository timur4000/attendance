<?php

namespace App\ApiRequestSettings\Data\Reports\Canteen\Days;

use App\Standards\ApiRequestSettings\Abstracts\ApiRequestSettings;
use App\Standards\Attributes\Requests\RequestKeyAttribute;

/**
 * Contains all possible base settings of the report canteen day requests.
 */
class ReportCanteenDaysApiRequestSettings extends ApiRequestSettings
{
    #[RequestKeyAttribute('Date')]
    public string $date = '';

    #[RequestKeyAttribute('IdUser')]
    public int $id_user = 0;

    #[RequestKeyAttribute('IdCategory')]
    public int $id_category = 0;
}
