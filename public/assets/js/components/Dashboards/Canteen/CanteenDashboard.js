import { BaseDashboard } from '../BaseDashboard.js';
import { DashboardCanteenIconLineInfoInformation } from '../../../Informations/IconLineInformations/Dashboards/Canteen/DashboardCanteenIconLineInfoInformation.js';
import { DashboardCanteenIntegerStatisticsInformation } from '../../../Informations/IntegerStatistics/Dashboards/Canteen/DashboardCanteenIntegerStatisticsInformation.js';
import { HttpRequest } from '../../../tea-modules/Classes/Requests/HttpRequest.js';
import { HttpRequestMethodsClassifier } from '../../../tea-modules/Classes/Requests/Standards/HttpRequestMethodsClassifier.js';
import { InformationEventsClassifier } from '../../Information/Standards/InformationEventsClassifier.js';
import { HttpRequestReadyStatesClassifier } from '../../../tea-modules/Classes/Requests/Standards/HttpRequestReadyStatesClassifier.js';
import { isXhr } from '../../../tea-modules/Functions/Is/isXhr.js';
import { Information } from '../../Information/Information.js';
import { OneMonthChartInformation } from '../../../Informations/ChartInformations/Dashboards/Canteen/OneMonthChartInformation.js';
import { ConfigurationCodesClassifier } from '../../../standards/Classifiers/Configurations/ConfigurationCodesClassifier.js';
import { CanteenClientsModalTable } from '../../../ModalTables/Dashboards/Canteen/Clients/CanteenClientsModalTable.js';
import { IntegerStatisticsEventsClassifier } from '../../IntegerStatistics/Standards/IntegerStatisticsEventsClassifier.js';
import { CanteenOrdersModalTable }                      from '../../../ModalTables/Dashboards/Canteen/Orders/CanteenOrdersModalTable.js';

/**
 * @description Implements logic for the CanteenDashboard component.
 *
 * @extends BaseDashboard
 **/
export class CanteenDashboard extends BaseDashboard
{
    /**
     * @inheritDoc
     **/
    autoUpdateDelayConfigurationCode = ConfigurationCodesClassifier.DASHBOARD_CANTEEN_AUTO_UPDATE_DELAY;
    
    /**
     * @public
     *
     * @type { DashboardCanteenIntegerStatisticsInformation }
     **/
    dashboardCanteenIntegerStatisticsInformation;
    
    /**
     * @public
     *
     * @type { DashboardCanteenIconLineInfoInformation }
     **/
    dashboardCanteenIconLineInfoInformation;
    
    /**
     * @public
     *
     * @type { ChartInformation }
     **/
    oneMonthChartInformation;
    
    /**
     * @public
     *
     * @type { string }
     **/
    twoDaysUrl =  'admin/dashboards/canteen/two-days';
    
    /**
     * @public
     *
     * @type { string }
     **/
    twoMonthsSumUrl =  'admin/dashboards/canteen/two-months-sum';
    
    /**
     * @public
     *
     * @type { string }
     **/
    oneMonthUrl =  'admin/dashboards/canteen/one-month';
    
    /**
     * @public
     *
     * @type { boolean }
     **/
    isMonth = false;
    
    /**
     * @public
     *
     * @type { HttpRequest }
     **/
    httpRequest;
    
    /**
     * @public
     *
     * @type { HttpRequest }
     **/
    oneMonthHttpRequest;
    
    /**
     * @public
     *
     * @type { number }
     **/
    autoUpdateIntervalId = 0;
    
    /**
     * @public
     *
     * @type { CanteenClientsModalTable }
     **/
    clientsModalTable;
    
    /**
     * @public
     *
     * @type { CanteenOrdersModalTable }
     **/
    ordersModalTable;
    
    /**
     * @inheritDoc
     **/
    async initialization()
    {
        await super.initialization();
        
        this._clientsModalTableProcessing();
        
        this._ordersModalTableProcessing();
        
        await this.oneMonthChartInformationProcessing();
        
        await this.dashboardCanteenIconLineInfoInformationProcessing();
        
        await this.dashboardCanteenIntegerStatisticsManagerProcessing();
        
        this.addLine(this.dashboardCanteenIntegerStatisticsInformation.getElement());
        
        this.addLine(this.dashboardCanteenIconLineInfoInformation.getElement());
        
        this.addLine(this.oneMonthChartInformation.getElement());
    }
    
    /**
     * @inheritDoc
     **/
    async _updateProcessing()
    {
        this.upperInformationUpdate();
        
        this.chartInformationUpdate();
        
        this._clientsModalTableUpdate();
        
        this._ordersModalTableUpdate();
    }
    
    /**
     * @private
     *
     * @description Implements process of the ClientsModalTable component.
     *
     * @return { void }
     **/
    _clientsModalTableProcessing()
    {
        this.clientsModalTable = new CanteenClientsModalTable();
        
        this.clientsModalTable.initialization();
    }
    
    /**
     * @private
     *
     * @description Implements process of the OrdersModalTable component.
     *
     * @return { void }
     **/
    _ordersModalTableProcessing()
    {
        this.ordersModalTable = new CanteenOrdersModalTable();
        
        this.ordersModalTable.initialization();
    }
    
    /**
     * @protected
     *
     * @description Implements process of the DashboardCanteenIconLineInfoInformation component.
     *
     * @return { void }
     **/
    async dashboardCanteenIconLineInfoInformationProcessing()
    {
        this.dashboardCanteenIconLineInfoInformation = new DashboardCanteenIconLineInfoInformation();
        
        await this.dashboardCanteenIconLineInfoInformation.baseInitialization();
        
        await this.dashboardCanteenIconLineInfoInformation.initialization();
    }
    
    /**
     * @protected
     *
     * @description Implements process of the DashboardCanteenIntegerStatisticsManager component.
     *
     * @return { void }
     **/
    async dashboardCanteenIntegerStatisticsManagerProcessing()
    {
        this.dashboardCanteenIntegerStatisticsInformation = new DashboardCanteenIntegerStatisticsInformation();
        
        await this.dashboardCanteenIntegerStatisticsInformation.baseInitialization();
        
        this.dashboardCanteenIntegerStatisticsInformation.information.customEvents.subscribe(InformationEventsClassifier.KEY_UP, this._dashboardCanteenIntegerStatisticsInformationKeyUpHandler.bind(this));
        
        this.dashboardCanteenIntegerStatisticsInformation.information.customEvents.subscribe(InformationEventsClassifier.TOGGLE_BUTTONS_TOGGLE, this._dashboardCanteenIntegerStatisticsInformationToggleButtonsToggleHandler.bind(this));
        
        this.dashboardCanteenIntegerStatisticsInformation.integerStatisticsManager.customEvents.subscribe(IntegerStatisticsEventsClassifier.EXTERNAL_BUTTON_CLICK, this._dashboardCanteenIntegerStatisticsExternalButtonClickHandler.bind(this));
        
        await this.dashboardCanteenIntegerStatisticsInformation.initialization();
    }
    
    /**
     * @protected
     *
     * @description Implements process of the ChartInformation component.
     *
     * @return { void }
     **/
    async oneMonthChartInformationProcessing()
    {
        this.oneMonthChartInformation = new OneMonthChartInformation();

        await this.oneMonthChartInformation.baseInitialization();

        this.oneMonthChartInformation.information.customEvents.subscribe(InformationEventsClassifier.KEY_UP, this._oneMonthChartInformationKeyUpHandler.bind(this));

        await this.oneMonthChartInformation.initialization();
    }
    
    /**
     * @private
     *
     * @description Implements a keyup handler for the DashboardCanteenIntegerStatisticsInformation component.
     *
     * @param { HTMLInputElement } input
     *
     * @param { CustomInput } customInput
     *
     * @param { Information } instance
     *
     * @return { void }
     **/
    async _dashboardCanteenIntegerStatisticsInformationKeyUpHandler(input, customInput, instance)
    {
        await this.update();
        
        this._modalTableHttpRequestSettingsProcessing();
    }
    
    /**
     * @private
     *
     * @description Implements a toggle handler for the DashboardCanteenIntegerStatisticsInformation toggle-buttons component.
     *
     * @param { boolean } state
     *
     * @param { Button } button
     *
     * @param { ToggleButtons } toggleButtons
     *
     * @param { Information } instance
     *
     * @return { void }
     **/
    async _dashboardCanteenIntegerStatisticsInformationToggleButtonsToggleHandler(state, button, toggleButtons, instance)
    {
        this.isMonth = button.getName() === 'month';
        
        const input = this.dashboardCanteenIntegerStatisticsInformation.information.getCustomInputById('information-date');

        let settings =
                {
                    dateFormat: this.isMonth ? 'yyyy, MMMM' : 'yyyy-MM-dd',
                    view: this.isMonth ? 'months' : 'days',
                    minView: this.isMonth ? 'months' : 'days',
                };

        input.datepicker.update(settings);
        
        this._modalTableHttpRequestSettingsProcessing();
        
        await this.update();
    }
    
    /**
     * @private
     *
     * @description Implements process of the HttpRequestSettings of the ModalTable components.
     **/
    _modalTableHttpRequestSettingsProcessing()
    {
        const input = this.dashboardCanteenIntegerStatisticsInformation.information.getCustomInputById('information-date');
        
        if (!this.clientsModalTable.table.settings.httpRequestSettings.data)
        {
            this.clientsModalTable.table.settings.httpRequestSettings.data = {};
        }
        
        if (!this.ordersModalTable.table.settings.httpRequestSettings.data)
        {
            this.ordersModalTable.table.settings.httpRequestSettings.data = {};
        }
        
        this.clientsModalTable.table.settings.httpRequestSettings.data.date_end = input.getValue();
        
        this.ordersModalTable.table.settings.httpRequestSettings.data.date_end = input.getValue();
    }
    
    /**
     * @private
     *
     * @description Implements a keyup handler for the OneMonthChartInformation component.
     *
     * @param { HTMLInputElement } input
     *
     * @param { CustomInput } customInput
     *
     * @param { Information } instance
     *
     * @return { void }
     **/
    async _oneMonthChartInformationKeyUpHandler(input, customInput, instance)
    {
        await this.update();
    }
    
    /**
     * @private
     *
     * @description Implements an external button click handler for the dashboardCanteenIntegerStatisticsInformation component.
     *
     * @param { PointerEvent } event
     *
     * @param { Button } button
     *
     * @param { IntegerStatistics } integerStatistics
     *
     * @param { IntegerStatisticsManager } instance
     *
     * @return { void }
     **/
    async _dashboardCanteenIntegerStatisticsExternalButtonClickHandler(event, button, integerStatistics, instance)
    {
        this['_' + button.getName() + 'ModalTableOpen'] && this['_' + button.getName() + 'ModalTableOpen']();
    }
    
    /**
     * @private
     *
     * @description Opens the ClientsModalTable component.
     *
     * @return { void }
     **/
    async _clientsModalTableOpen()
    {
        this.clientsModalTable.modal.open();
        
        await this.clientsModalTable.activate();
    }
    
    /**
     * @private
     *
     * @description Opens the OrdersModalTable component.
     *
     * @return { void }
     **/
    async _ordersModalTableOpen()
    {
        this.ordersModalTable.modal.open();
        
        await this.ordersModalTable.activate();
    }
    
    /**
     * @public
     *
     * @description Implements request to the get data.
     *
     * @return { ResponseStandard }
     **/
    async request()
    {
        const httpRequest = new HttpRequest(
            {
                url: () => { return this.isMonth ? this.twoMonthsSumUrl : this.twoDaysUrl },
                method: HttpRequestMethodsClassifier.POST,
                data: () => { return { date: this.dashboardCanteenIntegerStatisticsInformation.information.getCustomInputById('information-date').getValue() } },
            }
        );
        
        this.httpRequest = httpRequest;
        
        return httpRequest.execute();
    }
    
    /**
     * @public
     *
     * @description Implements request to the get data.
     *
     * @return { ResponseStandard }
     **/
    async oneMonthRequest()
    {
        const httpRequest = new HttpRequest(
            {
                url: this.oneMonthUrl,
                method: HttpRequestMethodsClassifier.POST,
                data: () => { return { date: this.oneMonthChartInformation.information.getCustomInputById('chart-information-date').getValue() } },
            }
        );
        
        this.oneMonthHttpRequest = httpRequest;
        
        return httpRequest.execute();
    }
    
    /**
     * @public
     *
     * @description Updates the upper information components.
     *
     * @return { void }
     **/
    async upperInformationUpdate()
    {
        this.dashboardCanteenIconLineInfoInformation.loading(true);
        
        this.dashboardCanteenIntegerStatisticsInformation.loading(true);
        
        if (this.httpRequest && this.httpRequest.getReadyState() !== HttpRequestReadyStatesClassifier.DONE)
        {
            this.httpRequest.cancel();
        }
        
        const response = await this.request();
        
        if (!isXhr(response))
        {
            this.dashboardCanteenIconLineInfoInformation.update(response);
            
            this.dashboardCanteenIntegerStatisticsInformation.update(response);
        }
        
        this.dashboardCanteenIconLineInfoInformation.loading(false);
        
        this.dashboardCanteenIntegerStatisticsInformation.loading(false);
    }
    
    /**
     * @public
     *
     * @description Updates the ChartInformation component.
     *
     * @return { void }
     **/
    async chartInformationUpdate()
    {
        if (this.oneMonthHttpRequest && this.oneMonthHttpRequest.getReadyState() !== HttpRequestReadyStatesClassifier.DONE)
        {
            this.oneMonthHttpRequest.cancel();
        }
        
        this.oneMonthChartInformation.loading(true);
        
        const response  = await this.oneMonthRequest();
        
        if (!isXhr(response))
        {
            this.oneMonthChartInformation.update(response);
        }
        
        this.oneMonthChartInformation.loading(false);
    }
    
    /**
     * @public
     *
     * @description Updates the ClientsModalTable component.
     *
     * @return { void }
     **/
    async _clientsModalTableUpdate()
    {
        if (!this.clientsModalTable.modal.isDisplay())
        {
            return ;
        }
        
        this.clientsModalTable.table.update();
    }
    
    /**
     * @public
     *
     * @description Updates the OrdersModalTable component.
     *
     * @return { void }
     **/
    async _ordersModalTableUpdate()
    {
        if (!this.ordersModalTable.modal.isDisplay())
        {
            return ;
        }
        
        this.ordersModalTable.table.update();
    }
}
