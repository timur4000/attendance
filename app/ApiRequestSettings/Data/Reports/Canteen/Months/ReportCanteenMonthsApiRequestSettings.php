<?php

namespace App\ApiRequestSettings\Data\Reports\Canteen\Months;

use App\Managers\Date\DateManager;
use App\Standards\ApiRequestSettings\Abstracts\ApiRequestSettings;
use App\Standards\Attributes\Requests\RequestKeyAttribute;
use App\Standards\Classifiers\Date\DateFormatsClassifier;
use ReflectionException;

/**
 * Contains all possible base settings of the report canteen month requests.
 */
class ReportCanteenMonthsApiRequestSettings extends ApiRequestSettings
{
    public ? string $date = null;

    #[RequestKeyAttribute('Year')]
    public int $year = 0;

    #[RequestKeyAttribute('Month')]
    public int $month = 0;

    #[RequestKeyAttribute('IdUser')]
    public int $id_user = 0;

    #[RequestKeyAttribute('IdCategory')]
    public int $id_category = 0;

    public function __construct()
    {
        $this->date ??= DateManager::datetime();
    }

    /**
     * @return array
     *
     * @throws ReflectionException
     */
    public function to_array(): array
    {
        $this->date = str_replace(',', '-', $this->date);

        $this->year = DateManager::datetime(DateFormatsClassifier::Y, $this->date);

        $this->month = DateManager::datetime(DateFormatsClassifier::m, $this->date);

        return parent::to_array();
    }
}
