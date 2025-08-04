<?php

namespace App\ApiRequestSettings\Data\ServicesPayment\Tuition;

use App\Standards\ApiRequests\Classifiers\ApiRequestDataTypesClassifier;
use App\Standards\ApiRequestSettings\Abstracts\ApiRequestSettings;
use App\Standards\Attributes\Requests\RequestKeyAttribute;

/**
 * Contains all possible base settings of the tuition requests.
 */
class TuitionApiRequestSettings extends ApiRequestSettings
{
    #[RequestKeyAttribute('Year')]
    public int $year;

    #[RequestKeyAttribute('IdParent')]
    public int $id_parent = 0;

    #[RequestKeyAttribute('IdObject')]
    public int $id_object = 0;

    #[RequestKeyAttribute('IdUser')]
    public int $id_user = 0;

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

    public function __construct()
    {
        $this->type_request = ApiRequestDataTypesClassifier::PAYER_SELECT;

        $this->year = date('Y');
    }
}
