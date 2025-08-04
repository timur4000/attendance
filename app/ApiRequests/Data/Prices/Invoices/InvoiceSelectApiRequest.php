<?php

namespace App\ApiRequests\Data\Prices\Invoices;

use App\ApiRequests\Data\DataApiRequest;
use App\ApiRequestSettings\Data\Prices\Invoices\InvoicesApiRequestSettings;

/**
 * Implements request for data of the invoices api.
 */
class InvoiceSelectApiRequest extends DataApiRequest
{
    public function __construct(InvoicesApiRequestSettings $settings)
    {
        parent::__construct($settings);
    }
}
