<?php

namespace App\Standards\Classifiers\ApiRequests;

/**
 * Contains all possible data types to the attendance api.
 */
enum ApiRequestDataTypesClassifier: string
{
    case USER_SELECT = 'UserSelect';

    case USER_COUNT_SELECT = 'UserCount';

    case CLASSIFIER_SELECT = 'ClassifierSelect';

    case ATTENDANCE_PERSONNEL_BY_CATEGORY = 'AttendancePersonnelByCategory';

    case ATTENDANCE_LATECOMERS = 'AttendanceLatecomers';

    case SCA_LATECOMERS = 'ScaLatecomers';

    case ATTENDANCE_ARRIVED_ON_TIME = 'AttendanceArrivedOnTime';

    case SCA_ARRIVED_ON_TIME = 'ScaArrivedOnTime';

    case PAYER_SELECT = 'PayerSelect';

    case PRICE_LIST_INVOICE_SELECT = 'PriceListInvoiceSelect';

    case PRICE_INVOICE_UPDATE = 'PriceInvoiceUpdate';

    case PRICE_LIST_FOOD_SELECT = 'PriceListFoodSelect';

    case PRICE_FOOD_UPDATE = 'PriceFoodUpdate';
}
