<?php

namespace App\Standards\ApiRequestSettings\Classifiers\Food\Orders;

use App\ApiRequestSettings\Data\Food\Orders\OrderSelectApiRequestSettings;

/**
 * Contains all possible states of the order select api settings payment_completed property.
 *
 * @see OrderSelectApiRequestSettings::$payment_completed
 */
enum OrderPaymentStatesClassifier: int
{
    case UNPAID = 0;

    case PAID = 1;

    case ALL = 2;
}
