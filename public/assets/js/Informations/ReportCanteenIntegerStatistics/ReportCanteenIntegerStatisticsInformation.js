import { BaseInformation } from '../BaseInformation.js';
import { en }              from '../../lib/air-datepicker/locale/en.js';
import { InputOuterPositionsClassifier } from '../../components/Inputs/Standards/InputOuterPositionsClassifier.js';
import { HttpRequestMethodsClassifier } from '../../tea-modules/Classes/Requests/Standards/HttpRequestMethodsClassifier.js';
import { IntegerStatisticsManager }          from '../../components/IntegerStatistics/IntegerStatisticsManager/IntegerStatisticsManager.js';
import { InformationTypesClassifier }        from '../../components/Information/Standards/InformationTypesClassifier.js';


/**
 * @description Implements logic of the ReportCanteenIntegerStatistics information component.
 *
 * @deprecated
 **/
export class ReportCanteenIntegerStatisticsInformation extends BaseInformation
{
    /**
     * @inheritDoc
     **/
    type = InformationTypesClassifier.INPUTS;
    
    /**
     * @inheritDoc
     **/
    withHeading = false;
    
    /**
     * @public
     *
     * @type { IntegerStatisticsManager }
     **/
    integerStatisticsManager;
    
    /**
     * @public
     *
     * @type { string }
     **/
    dayUrl = 'admin/dashboards/canteen/one-day';
    
    /**
     * @public
     *
     * @type { string }
     **/
    monthUrl = 'admin/dashboards/canteen/one-month';
    
    /**
     * @constructor
     **/
    constructor()
    {
        super();
    }
    
    /**
     * @inheritDoc
     **/
    async baseInitialization()
    {
        super.baseInitialization();
        
        this.integerStatisticsManager = new IntegerStatisticsManager(this._getIntegerStatisticsManagerSettings());
    }
    
    /**
     * @inheritDoc
     **/
    async initialization()
    {
        await super.initialization();
        
        this.integerStatisticsManager.initialization();
        
        this.information.insert(this.integerStatisticsManager.getManager());
    }
    
    /**
     * @inheritDoc
     **/
    async update(...variables)
    {
        await this.integerStatisticsManager.update();
    }
    
    /**
     * @inheritDoc
     **/
    async _toggleButtonToggleHandler(state, button, toggleButtons, instance)
    {
        const datepicker = this.information.getCustomInputById('information-date').datepicker;

        let settings =
                {
                    dateFormat: button.getName() === 'month' ? 'yyyy, MMMM' : 'yyyy-MM-dd',
                    view: button.getName() === 'month' ? 'months' : 'days',
                    minView: button.getName() === 'month' ? 'months' : 'days',
                };

        datepicker.update(settings);
        
        if (this.integerStatisticsManager)
        {
            await this.integerStatisticsManager.update();
        }
    }
    
    /**
     * @inheritDoc
     **/
    async _keyUpHandler(input, customInput, instance)
    {
        await this.integerStatisticsManager.update();
    }
    
    /**
     * @private
     *
     * @description Returns settings of the integerStatisticsManager component.
     *
     * @return { IntegerStatisticsManagerSetting }
     **/
    _getIntegerStatisticsManagerSettings()
    {
        return {
            httpRequestSettings:
                        {
                            url: this._getUrlOfIntegerStatistics.bind(this),
                            method: HttpRequestMethodsClassifier.POST,
                            data: () => { return { date: this.information.getCustomInputById('information-date').getValue() } },
                        },
                    items:
                        [
                            { heading: 'Number of Clients', currentValueKey: 'count_clients', secondValueKey: 'yesterday_count_clients', isFloat: false, withExternalButtonSettings: true, },
                            { heading: 'Total Number of Orders', currentValueKey: 'count_orders', secondValueKey: 'yesterday_count_orders', isFloat: false, withExternalButtonSettings: true, },
                            { heading: 'Number of Paid Orders', currentValueKey: 'count_orders_paid', secondValueKey: 'yesterday_count_orders_paid', isFloat: false },
                            { heading: 'Number of Unpaid Orders', currentValueKey: 'count_orders_unpaid', secondValueKey: 'yesterday_count_orders_unpaid', isFloat: false, isReverse: true, },
                            { heading: 'Total Order Amount', currentValueKey: 'sum_orders', secondValueKey: 'yesterday_sum_orders', isCurrency: true, },
                            { heading: 'Average Cost per Order', currentValueKey: 'average_cost_per_order', secondValueKey: 'yesterday_average_cost_per_order', isCurrency: true, },
                            { heading: 'Amount of Paid Orders', currentValueKey: 'sum_orders_paid', secondValueKey: 'yesterday_sum_orders_paid', isCurrency: true, },
                            { heading: 'Amount of Unpaid Orders', currentValueKey: 'sum_orders_unpaid', secondValueKey: 'yesterday_sum_orders_unpaid', isCurrency: true, isReverse: true, },
                        ],
                    countInRow: 4
        };
    }
    
    /**
     * @private
     *
     * @description Returns the required url for the IntegerStatistics component.
     **/
    _getUrlOfIntegerStatistics()
    {
        return this.information.toggleButtons.getToggleButton().getName() === 'month' ? this.monthUrl : this.dayUrl;
    }
    
    /**
     * @return { ToggleButtonsSetting }
     **/
    _getToggleButtonsSettings()
    {
        return {
            id: 'report-canteen-integer-statistics-toggle-buttons',
            classesOfElements: [ 'button--size-small', 'button--type-default', 'button--theme-white-azure-wild-sand', ],
            propertiesOfButtons:
            [
                { text: 'DAY', elementName: 'day', },
                { text: 'MONTH', elementName: 'month', },
            ],
        };
    }
    
    /**
     * @return { Array<CustomInputSetting> }
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
