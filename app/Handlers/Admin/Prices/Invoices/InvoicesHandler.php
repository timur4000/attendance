<?php

namespace App\Handlers\Admin\Prices\Invoices;

use App\ApiModels\Prices\Invoices\InvoicesApiModel;
use App\ApiRequests\Data\Prices\Invoices\InvoiceSelectApiRequest;
use App\ApiRequests\Data\Prices\Invoices\InvoiceUpdateApiRequest;
use App\ApiRequestSettings\Data\Prices\Invoices\InvoicesApiRequestSettings;
use App\ApiRequestSettings\Data\Prices\Invoices\InvoiceUpdateApiRequestSettings;
use App\Standards\ApiModels\Abstracts\ApiModel;
use App\Standards\Handlers\Abstracts\Handler;
use Illuminate\Support\Collection;

/**
 * Implements helper work with the invoices.
 */
class InvoicesHandler extends Handler
{
    /**
     * Returns all records by the given settings.
     *
     * @param InvoicesApiRequestSettings $settings
     *
     * @return Collection
     */
    public static function records(InvoicesApiRequestSettings $settings): Collection
    {
        $request = new InvoiceSelectApiRequest($settings);

        $request->execute();

        return ApiModel::create($request->get_response()->package, InvoicesApiModel::class);
    }

    /**
     * Updates record and returns it.
     *
     * @param InvoiceUpdateApiRequestSettings $settings
     *
     * @return InvoicesApiModel
     */
    public static function update(InvoiceUpdateApiRequestSettings $settings): InvoicesApiModel
    {
        $request = new InvoiceUpdateApiRequest($settings);

        $request->execute();

        return ApiModel::create_one($request->get_response()->first_package(), InvoicesApiModel::class);
    }
}
