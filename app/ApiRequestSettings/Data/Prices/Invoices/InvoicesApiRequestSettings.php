<?php

namespace App\ApiRequestSettings\Data\Prices\Invoices;

use App\Standards\ApiRequests\Classifiers\ApiRequestDataTypesClassifier;
use App\Standards\ApiRequestSettings\Abstracts\ApiRequestSettings;
use App\Standards\Attributes\Requests\RequestKeyAttribute;

/**
 * Contains all possible base settings of the invoice requests.
 */
class InvoicesApiRequestSettings extends ApiRequestSettings
{
    #[RequestKeyAttribute('IdObject')]
    public int $id_object = 0;

    public function __construct()
    {
        $this->type_request = ApiRequestDataTypesClassifier::PRICE_LIST_INVOICE_SELECT;
    }
}
