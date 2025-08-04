import { IntegerStatisticsInformation } from '../../IntegerStatisticsInformation.js';
import { en }                           from '../../../../lib/air-datepicker/locale/en.js';
import { InputOuterPositionsClassifier } from '../../../../components/Inputs/Standards/InputOuterPositionsClassifier.js';


/**
 * @description Implements extends logic of the IntegerStatisticsInformation component for DashboardCanteen.
 *
 * @extends IntegerStatisticsInformation
 **/
export class DashboardCanteenIntegerStatisticsInformation extends IntegerStatisticsInformation
{
    /**
     * @return { Array<IntegerStatisticsSetting> }
     **/
    _items()
    {
        return [
            { heading: 'Number of Clients', currentValueKey: 'data.1.count_clients', secondValueKey: 'data.0.count_clients', isFloat: false, withExternalButtonSettings: true, externalButtonSettings: { elementName: 'clients' } },
            { heading: 'Total Number of Orders', currentValueKey: 'data.1.count_orders', secondValueKey: 'data.0.count_orders', isFloat: false, withExternalButtonSettings: true, externalButtonSettings: { elementName: 'orders' } },
            { heading: 'Number of Paid Orders', currentValueKey: 'data.1.count_orders_paid', secondValueKey: 'data.0.count_orders_paid', isFloat: false },
            { heading: 'Number of Unpaid Orders', currentValueKey: 'data.1.count_orders_unpaid', secondValueKey: 'data.0.count_orders_unpaid', isFloat: false, isReverse: true, },
            { heading: 'Total Order Amount', currentValueKey: 'data.1.sum_orders', secondValueKey: 'data.0.sum_orders', isCurrency: true, },
            { heading: 'Average Cost per Order', currentValueKey: 'data.1.average_cost_per_order', secondValueKey: 'data.0.average_cost_per_order', isCurrency: true, },
            { heading: 'Amount of Paid Orders', currentValueKey: 'data.1.sum_orders_paid', secondValueKey: 'data.0.sum_orders_paid', isCurrency: true, },
            { heading: 'Amount of Unpaid Orders', currentValueKey: 'data.1.sum_orders_unpaid', secondValueKey: 'data.0.sum_orders_unpaid', isCurrency: true, isReverse: true, },
        ];
    }
    
    /**
     * @return { ToggleButtonsSetting }
     **/
    _getToggleButtonsSettings()
    {
        return {
            id: 'dashboard-canteen-integer-statistics-toggle-buttons',
            classesOfElements: [ 'button--size-small', 'button--type-default', 'button--theme-white-azure-wild-sand', ],
            propertiesOfButtons:
                [
                    { text: 'DAY', elementName: 'day', },
                    { text: 'MONTH', elementName: 'month', },
                ],
        };
    }
    
    /**
     * @inheritDoc
     **/
    _getCustomInputOptions()
    {
        return [
            {
                inputId: 'information-date',
                inputName: 'date',
                title: 'Date',
                isDatepicker: true,
                datepickerSettings:
                    {
                        locale: en,
                        selectedDates: [ new Date() ],
                        autoClose: true,
                        dateFormat: 'yyyy-MM-dd',
                        maxDate: new Date(),
                    },
                withInputOuter: true,
                inputOuterSettings: { identifier: 'information-date-between' },
                iconLabelOptions:
                    [
                        { position: InputOuterPositionsClassifier.AFTER, forAttribute: 'information-date-start', iconId: 'time-calendar-search', iconClassName: 'icon icon-size-16' },
                    ]
            },
        ];
    }
}
