import { ChartInformation } from '../../ChartInformation.js';
import { ConfigurationCodesClassifier } from '../../../../standards/Classifiers/Configurations/ConfigurationCodesClassifier.js';
import { DateManager } from '../../../../tea-modules/Classes/Dates/DateManager.js';


/**
 * @description Implements extends logic of the ChartInformation component.
 *
 * @extends ChartInformation
 **/
export class OneMonthChartInformation extends ChartInformation
{
    /**
     * @type { Object<string, string> }
     **/
    labels =
        {
            count_clients: 'Number of Clients',
            count_orders: 'Total Number of Orders',
            count_orders_paid: 'Number of Paid Orders',
            count_orders_unpaid: 'Number of Unpaid Orders',
            sum_orders: 'Total Order Amount',
            average_cost_per_order: 'Average Cost per Order',
            sum_orders_paid: 'Amount of Paid Orders',
            sum_orders_unpaid: 'Amount of Unpaid Orders',
            orders_per_client: 'Average Cost per Client',
            mx_start: 'Start',
            mx_plus: 'Plus',
            mx_minus: 'Minus',
            mx_purchase: 'Purchase',
            mx_withdraw: 'Withdraw',
            mx_diff: 'Difference',
            mx_end: 'End',
        };
    
    /**
     * @inheritDoc
     **/
    configurationCode = ConfigurationCodesClassifier.DASHBOARD_CANTEEN_CHART_PROPERTIES;
    
    /**
     * @inheritDoc
     **/
    async baseInitialization()
    {
        await super.baseInitialization();
        
        this.chart.addCategories([ ...Array(DateManager.countDaysOfMonth()).keys()].map(n => `${ (n + 1).toString().padStart(2, '0') }`));
    }
    
    /**
     * @return { LineChartSetting }
     **/
    _getChartSettings()
    {
        return { height: 580 };
    }
}
