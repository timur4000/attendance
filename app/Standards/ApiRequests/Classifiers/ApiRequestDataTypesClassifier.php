<?php

namespace App\Standards\ApiRequests\Classifiers;

/**
 * Contains all possible data types to the attendance api.
 */
enum ApiRequestDataTypesClassifier: string
{
    case USER_SELECT = 'UserSelect';

    case USER_COUNT_SELECT = 'UserCount';

    case SCA_USER_SELECT = 'ScaUserSelect';

    case CLASSIFIER_SELECT = 'ClassifierSelect';

    case ATTENDANCE_PERSONNEL_BY_CATEGORY = 'AttendancePersonnelByCategory';

    case ATTENDANCE_LATECOMERS = 'AttendanceLatecomers';

    case SCA_LATECOMERS = 'ScaLatecomers';

    case ATTENDANCE_ARRIVED_ON_TIME = 'AttendanceArrivedOnTime';

    case SCA_ARRIVED_ON_TIME = 'ScaArrivedOnTime';

    case SCA_ABSENT = 'ScaAbsent';

    case PAYER_SELECT = 'PayerSelect';

    case PRICE_LIST_INVOICE_SELECT = 'PriceListInvoiceSelect';

    case PRICE_INVOICE_UPDATE = 'PriceInvoiceUpdate';

    case PRICE_LIST_FOOD_SELECT = 'PriceListFoodSelect';

    case PRICE_FOOD_UPDATE = 'PriceFoodUpdate';

    case ATTENDANCE_DATA_ONE_HOUR = 'AttendanceDataOneHour';

    case ATTENDANCE_DATA_ONE_DAY_BY_HOURS = 'AttendanceDataOneDayByHours';

    case FOOD_ORDER_CREATE = 'FoodOrderCreate';

    case FOOD_ORDER_SELECT = 'FoodOrderSelect';

    case FOOD_ORDER_HISTORY_SELECT = 'FoodExpensesHistorySelect';

    case FOOD_ORDER_DELETE = 'FoodOrderDelete';

    case FOOD_ORDER_PAY_THE_BILL = 'FoodPayTheBill';

    case FOOD_ORDER_PAYMENT_CANCEL = 'FoodPaymentCancel';

    case FOOD_CARD_SELECT = 'FoodCardSelect';

    case FOOD_CARD_HISTORY_SELECT = 'FoodCardHistorySelect';

    case FOOD_CARD_ADD_MONEY = 'FoodCardAddMoney';

    case FOOD_CARD_WITHDRAW_MONEY = 'FoodCardMoneyWithdraw';

    case FOOD_CARD_CANCEL_WITHDRAW_MONEY = 'FoodCardWithdrawCancel';

    case FOOD_CARD_CANCEL_LAST_ADDING_MONEY = 'FoodCardCancelLastAddingMoney';

    case FOOD_ORDER_FIND_DELETED = 'FoodOrderFindDeleted';

    case OBJECT_PICTURE_SELECT = 'ObjectPictureSelect';

    case USER_ABSENCES_SELECT = 'UserAbsenceSelect';

    case USER_ABSENCES_INSERT = 'UserAbsenceInsert';

    case USER_ABSENCES_DELETE = 'UserAbsenceDelete';

    case PARAMETER_SELECT = 'ParameterSelect';
    
    case INFO_USER_PRESENCE = 'InfoUserPresence';

    case SCA_REPORT_ATTENDANCE_ONE_USER = 'ScaReportAttendanceOneUser1';

    case SCA_REPORT_FOOD_CARD = 'ScaReportFoodCard2';

    case USER_ARRIVALS_AND_DEPARTURES = 'UserArrivalsAndDepartures';

    case SCA_REPORT_CANTEEN_ONE_DAY = 'ScaReportCanteenOneDay1';

    case SCA_REPORT_CANTEEN_ONE_MONTH = 'ScaReportCanteenOneMonth1';

    case SCA_REPORT_CANTEEN_TWO_DAYS = 'ScaReportCanteenTwoDays1';

    case SCA_REPORT_CANTEEN_TWO_MONTHS_SUM = 'ScaReportCanteenTwoMonthsSum1';

    case LIST_OF_CANTEEN_CLIENTS = 'ListOfCanteenClients';

    case DETECTED_RFID_TAGS = 'DetectedRfidTags';

    case REGISTRATION_RECORDS = 'GetRegistrationRecords';
}
