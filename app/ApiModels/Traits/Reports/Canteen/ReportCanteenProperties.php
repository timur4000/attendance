<?php

namespace App\ApiModels\Traits\Reports\Canteen;

use App\Standards\ApiModels\Attributes\ApiModelResponseKeyAttribute;

/**
 * Implements adding base properties of report canteen standard.
 */
trait ReportCanteenProperties
{
    #[ApiModelResponseKeyAttribute('Date')]
    public string $date;

    #[ApiModelResponseKeyAttribute('CountClients')]
    public float $count_clients;

    #[ApiModelResponseKeyAttribute('CountOrders')]
    public float $count_orders;

    #[ApiModelResponseKeyAttribute('CountOrdersPaid')]
    public float $count_orders_paid;

    #[ApiModelResponseKeyAttribute('CountOrdersUnpaid')]
    public float $count_orders_unpaid;

    #[ApiModelResponseKeyAttribute('SumOrders')]
    public float $sum_orders;

    #[ApiModelResponseKeyAttribute('SumOrdersPaid')]
    public float $sum_orders_paid;

    #[ApiModelResponseKeyAttribute('SumOrdersUnpaid')]
    public float $sum_orders_unpaid;

    #[ApiModelResponseKeyAttribute('OrdersPerClient')]
    public float $orders_per_client;

    #[ApiModelResponseKeyAttribute('AverageCostPerOrder')]
    public float $average_cost_per_order;

    #[ApiModelResponseKeyAttribute('MxStart')]
    public float $mx_start;

    #[ApiModelResponseKeyAttribute('MxPlus')]
    public float $mx_plus;

    #[ApiModelResponseKeyAttribute('MxMinus')]
    public float $mx_minus;

    #[ApiModelResponseKeyAttribute('MxPurchase')]
    public float $mx_purchase;

    #[ApiModelResponseKeyAttribute('MxWithdraw')]
    public float $mx_withdraw;

    #[ApiModelResponseKeyAttribute('MxDiff')]
    public float $mx_diff;

    #[ApiModelResponseKeyAttribute('MxEnd')]
    public float $mx_end;
}
