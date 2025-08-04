<?php

namespace App\ApiRequests\Data\Prices\Invoices;

use App\ApiRequests\Data\DataApiRequest;
use App\ApiRequestSettings\Data\Prices\Invoices\InvoiceUpdateApiRequestSettings;

/**
 * Implements request for data of the invoice update api.
 */
class InvoiceUpdateApiRequest extends DataApiRequest
{
    public function __construct(InvoiceUpdateApiRequestSettings $settings)
    {
        parent::__construct($settings);
    }
}
