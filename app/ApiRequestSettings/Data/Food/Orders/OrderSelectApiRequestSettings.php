<?php

namespace App\ApiRequestSettings\Data\Food\Orders;

use App\ApiModels\Food\Orders\OrderApiModel;
use App\ApiModels\Food\Orders\OrderSummaryApiModel;
use App\ApiRequests\Data\Food\Orders\OrderSelectApiRequest;
use App\Standards\ApiRequests\Classifiers\ApiRequestDataTypesClassifier;
use App\Standards\ApiRequestSettings\Abstracts\ApiRequestSettings;
use App\Standards\ApiRequestSettings\Classifiers\AscendingStatesClassifier;
use App\Standards\ApiRequestSettings\Classifiers\Food\Orders\OrderPaymentStatesClassifier;
use App\Standards\Attributes\Requests\RequestKeyAttribute;
use App\Standards\Classifiers\Date\DateFormatsClassifier;

/**
 * Contains all possible settings of the order select api request.
 *
 * @see OrderSelectApiRequest
 */
class OrderSelectApiRequestSettings extends ApiRequestSettings
{
    #[RequestKeyAttribute('IdUser')]
    public int $id_user = 0;

    #[RequestKeyAttribute('IdOrder')]
    public int $id_order = 0;

    #[RequestKeyAttribute('SurName')]
    public string $sur_name = '';

    #[RequestKeyAttribute('FirstName')]
    public string $first_name = '';

    #[RequestKeyAttribute('LastIdOrder')]
    public int $last_id_order = 0;

    #[RequestKeyAttribute('DateStart')]
    public string $date_start = '';

    #[RequestKeyAttribute('DateEnd')]
    public string $date_end = '';

    #[RequestKeyAttribute('SummaryData')]
    public int $summary_data = 1;

    #[RequestKeyAttribute('CountOnly')]
    public int $count_only = 0;

    #[RequestKeyAttribute('Limit')]
    public int $limit = 0;

    #[RequestKeyAttribute('Offset')]
    public int $offset = 0;

    #[RequestKeyAttribute('PaymentCompleted')]
    public OrderPaymentStatesClassifier $payment_completed = OrderPaymentStatesClassifier::ALL;

    #[RequestKeyAttribute('Ascending')]
    public AscendingStatesClassifier $ascending = AscendingStatesClassifier::DESC;

    #[RequestKeyAttribute('UserBarcode')]
    public string $user_barcode = '';

    public function __construct()
    {
        $this->type_request = ApiRequestDataTypesClassifier::FOOD_ORDER_SELECT;

        $this->date_end = date(DateFormatsClassifier::Y_m_d->value);
    }

    /**
     * Returns needed namespace of model by the given force.
     *
     * @param bool $force
     *
     * @return OrderApiModel|OrderSummaryApiModel|string
     */
    public static function get_model(bool $force): OrderApiModel | OrderSummaryApiModel | string
    {
        return $force  ? OrderSummaryApiModel::class : OrderApiModel::class;
    }
}
