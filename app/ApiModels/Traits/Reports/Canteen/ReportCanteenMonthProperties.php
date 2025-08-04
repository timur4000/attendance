<?php

namespace App\ApiModels\Traits\Reports\Canteen;

use App\Standards\ApiModels\Attributes\ApiModelResponseKeyAttribute;

/**
 * Implements adding base properties of report canteen months standard.
 */
trait ReportCanteenMonthProperties
{
    #[ApiModelResponseKeyAttribute('Year')]
    public int $year;

    #[ApiModelResponseKeyAttribute('Month')]
    public int $month;

    #[ApiModelResponseKeyAttribute('Day')]
    public int $day;
}
