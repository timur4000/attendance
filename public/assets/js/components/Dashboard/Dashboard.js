import { CustomSelect } from '../CustomSelect/CustomSelect.js';
import { HttpRequestMethodsClassifier } from '../../tea-modules/Classes/Requests/Standards/HttpRequestMethodsClassifier.js';
import { CustomSelectEventTypesClassifier } from '../CustomSelect/CustomSelectEventTypesClassifier.js';
import { AirDatepickerOuter } from '../AirDatepickerOuter/AirDatepickerOuter.js';
import { AttendanceUsersByCategory } from './StatisticCards/AttendanceUsersByCategory.js';
import { querySelector } from '../../tea-modules/Functions/DOM/Queries/querySelector.js';
import { LineChart } from './Charts/LineCharts/LineChart.js';
import { HttpRequest } from '../../tea-modules/Classes/Requests/HttpRequest.js';
import { setClasses } from '../../tea-modules/Functions/DOM/Elements/setClasses.js';
import { removeClasses } from '../../tea-modules/Functions/DOM/Elements/removeClasses.js';
import { DonutChart } from './Charts/DonutCharts/DonutChart.js';
import { ChartEventsClassifier } from './Charts/ChartEventsClassifier.js';
import { LatecomersModalTable } from './ModalTables/LatecomersModalTable.js';
import { ModalTableEventsClassifier }       from './ModalTables/ModalTableEventsClassifier.js';
import { ArrivedOnTimeModalTable } from './ModalTables/ArrivedOnTimeModalTable.js';
import { UsersByHourModalTable } from './ModalTables/UsersByHourModalTable.js';
import { ColumnChart } from './Charts/ColumnCharts/ColumnChart.js';
import { AbsentModalTable } from './ModalTables/AbsentModalTable.js';


/**
 * @class
 *
 * @description Implements connect with dashboard components.
 **/
export class Dashboard
{
    /**
     * @public
     *
     * @type { CustomSelect[] }
     **/
    customSelects = [];
    
    /**
     * @public
     *
     * @type { AttendanceUsersByCategory[] }
     **/
    statisticCards = [];
    
    /**
     * @public
     *
     * @type { HTMLElement }
     **/
    domStatisticCards;
    
    /**
     * @public
     *
     * @type { AirDatepickerOuter }
     **/
    airDatepickerOuter;
    
    /**
     * @public
     *
     * @type { HTMLElement }
     **/
    domStatisticUpperCharts;
    
    /**
     * @public
     *
     * @type { HTMLElement }
     **/
    domStatisticLowerCharts;
    
    /**
     * @public
     *
     * @type { LineChart }
     **/
    entrancesExitsLineChart;
    
    /**
     * @public
     *
     * @type { ColumnChart }
     **/
    hoursEntrancesExitsColumnChart;
    
    /**
     * @public
     *
     * @type { DonutChart }
     **/
    latecomersArrivedDonutChart;
    
    /**
     * @public
     *
     * @type { number }
     **/
    intervalId;
    
    /**
     * @public
     *
     * @type { number }
     **/
    autoUpdateSeconds = 30;
    
    /**
     * @public
     *
     * @type { LatecomersModalTable }
     **/
    latecomersModalTable;
    
    /**
     * @public
     *
     * @type { ArrivedOnTimeModalTable }
     **/
    arrivedOnTimeModalTable;
    
    /**
     * @public
     *
     * @type { AbsentModalTable }
     **/
    absentModalTable;
    
    /**
     * @public
     *
     * @type { UsersByHourModalTable }
     **/
    usersByHourModalTable;
    
    
    /**
     * @public
     *
     * @type { ( 'line' | 'column' ) }
     **/
    usersByHourModalTableType;
    
    /**
     * @public
     *
     * @type { number }
     **/
    hourSelect;
    
    /**
     * @constructor
     *
     * @return { void }
     **/
    constructor()
    {
        this.airDatepickerOuter = AirDatepickerOuter.getInstanceByTheInputName('date');
        
        this.domStatisticCards = querySelector('[data-dashboard-statistic-cards]');
        
        this.domStatisticUpperCharts = querySelector('[data-dashboard-statistic-upper-charts]');
        
        this.domStatisticLowerCharts = querySelector('[data-dashboard-statistic-lower-charts]');
        
        console.log(this);
    }
    
    /**
     * @public
     *
     * @description Implements initialize base methods and logic.
     *
     * @return { void }
     **/
    async initialization()
    {
        this._customSelectInitial();
        
        this._statisticCardsInitial();
        
        await this._hoursChartsInitial();
        
        await this._donutChartsInitial();
        
        this._presenceModalTableInitial();
        
        this._usersByHourModalTableInitial();
        
        this._eventProcessing();
        
        this.update();
    }
    
    /**
     * @private
     *
     * @description Implements process of declare events.
     *
     * @return { void }
     **/
    _eventProcessing()
    {
        this.airDatepickerOuter.input.addEventListener('keyup', this._airDatepickerOuterInputHandler.bind(this));
     
        this.latecomersArrivedDonutChart.customEvents.subscribe(ChartEventsClassifier.DATA_POINT_SELECTION, this._presenceDonutChartDataPointSelectionHandler.bind(this));

        this.entrancesExitsLineChart.customEvents.subscribe(ChartEventsClassifier.MARKER_CLICK, this._entrancesExitsLineChartMarkerClickHandler.bind(this));
        
        this.hoursEntrancesExitsColumnChart.customEvents.subscribe(ChartEventsClassifier.DATA_POINT_SELECTION, this._entrancesExitsColumnChartMarkerClickHandler.bind(this));
    }
    
    /**
     * @private
     *
     * @description Implements initial for the presence modal table components.
     *
     * @return { void }
     **/
    _presenceModalTableInitial()
    {
        this.latecomersModalTable = new LatecomersModalTable();
        
        this.latecomersModalTable.initialization();
        
        this.latecomersModalTable.customEvents.subscribe(ModalTableEventsClassifier.TABLE_REQUEST_PROCESSING, this._presenceModalTableRequestProcessingHandler.bind(this));
        
        
        this.arrivedOnTimeModalTable = new ArrivedOnTimeModalTable();
        
        this.arrivedOnTimeModalTable.initialization();
        
        this.arrivedOnTimeModalTable.customEvents.subscribe(ModalTableEventsClassifier.TABLE_REQUEST_PROCESSING, this._presenceModalTableRequestProcessingHandler.bind(this));

        this.absentModalTable = new AbsentModalTable();
        
        this.absentModalTable.initialization();
        
        this.absentModalTable.customEvents.subscribe(ModalTableEventsClassifier.TABLE_REQUEST_PROCESSING, this._presenceModalTableRequestProcessingHandler.bind(this));
    }
    
    /**
     * @private
     *
     * @description Implements initial for the users by hour modal table component.
     *
     * @return { void }
     **/
    _usersByHourModalTableInitial()
    {
        this.usersByHourModalTable = new UsersByHourModalTable();
        
        this.usersByHourModalTable.initialization();
        
        this.usersByHourModalTable.customEvents.subscribe(ModalTableEventsClassifier.TABLE_REQUEST_PROCESSING, this._usersByHourModalTableRequestProcessingHandler.bind(this));
    }
    
    /**
     * @private
     *
     * @description Implements handler for the data point selection event of the latecomers/arrived donut chart.
     *
     * @param { MouseEvent } mouseEvent
     *
     * @param { Object } chartContext
     *
     * @param { Object } config
     *
     * @return { void }
     **/
    _presenceDonutChartDataPointSelectionHandler(mouseEvent, chartContext, config)
    {
        if (config.dataPointIndex === 0)
        {
            this.latecomersModalTable.activate();
        }
        else if (config.dataPointIndex === 1)
        {
            this.arrivedOnTimeModalTable.activate();
        }
        else if (config.dataPointIndex === 2)
        {
            this.absentModalTable.activate();
        }
    }
    
    /**
     * @private
     *
     * @description Implements handler for the request processing event of the presence modal table component.
     *
     * @param { HttpRequestSettingProperties } httpRequestSettings
     *
     * @param { Table } instance
     *
     * @return { void }
     **/
    _presenceModalTableRequestProcessingHandler(httpRequestSettings, instance)
    {
        httpRequestSettings.data.date = this.airDatepickerOuter.input.value;
        
        for (let i = 0, n = this.customSelects.length; i < n; i++)
        {
            if (!this.customSelects[i].getSelected())
            {
                continue ;
            }
            
            httpRequestSettings.data[this.customSelects[i].getName()] = this.customSelects[i].getSelected().value;
        }
    }
    
    /**
     * @private
     *
     * @description Implements handler for the request processing event of the users by hour modal table component.
     *
     * @param { HttpRequestSettingProperties } httpRequestSettings
     *
     * @param { Table } instance
     *
     * @return { void }
     **/
    _usersByHourModalTableRequestProcessingHandler(httpRequestSettings, instance)
    {
        httpRequestSettings.data.date = this.airDatepickerOuter.input.value;
        
        for (let i = 0, n = this.customSelects.length; i < n; i++)
        {
            if (!this.customSelects[i].getSelected())
            {
                continue ;
            }
            
            httpRequestSettings.data[this.customSelects[i].getName()] = this.customSelects[i].getSelected().value;
        }
        
        httpRequestSettings.data.hour = this.hourSelect;
        
        httpRequestSettings.data.type = this.usersByHourModalTableType;
    }
    
    /**
     * @private
     *
     * @description Implements handler for the marker click event of the entrances/exits line chart.
     *
     * @param { MouseEvent } mouseEvent
     *
     * @param { Object } chartContext
     *
     * @param { number } seriesIndex
     *
     * @param { number } dataPointIndex
     *
     * @param { Object } config
     *
     * @return { void }
     **/
    _entrancesExitsLineChartMarkerClickHandler(mouseEvent, chartContext, seriesIndex, dataPointIndex, config)
    {
        this.hourSelect = dataPointIndex;
        
        this.usersByHourModalTableType = 'line';
        
        this.usersByHourModalTable.activate();
    }
    
    /**
     * @private
     *
     * @description Implements handler for the marker click event of the entrances/exits column chart.
     *
     * @param { MouseEvent } mouseEvent
     *
     * @param { Object } chartContext
     *
     * @param { number } seriesIndex
     *
     * @return { void }
     **/
    _entrancesExitsColumnChartMarkerClickHandler(mouseEvent, chartContext, seriesIndex)
    {
        this.hourSelect = seriesIndex.dataPointIndex;
        
        this.usersByHourModalTableType = 'column';
        
        this.usersByHourModalTable.activate();
    }
    
    /**
     * @private
     *
     * @description Implements running auto update of the component.
     *
     * @return { void }
     **/
    _autoUpdateRunning()
    {
        this.intervalId = setInterval(this._autoUpdateRunningCallback.bind(this), this.autoUpdateSeconds * 1000);
    }
    
    /**
     * @private
     *
     * @description Implements callback for the interval of the auto update booting method.
     *
     * @return { void }
     **/
    _autoUpdateRunningCallback()
    {
        this.update();
    }
    
    /**
     * @public
     *
     * @description Updates components.
     *
     * @return { void }
     **/
    async update()
    {
        clearInterval(this.intervalId);
        
        this._statisticCardsUpdate();
        
        this._hoursChartsUpdate();
        
        this._donutChartsUpdate();
        
        this._autoUpdateRunning();
    }
    
    /**
     * @private
     *
     * @description Implements initial for the donut chart components.
     *
     * @return { void }
     **/
    async _donutChartsInitial()
    {
        this.latecomersArrivedDonutChart = new DonutChart(4, 'Attendance for the specified day');
        
        this.latecomersArrivedDonutChart.addSeries([ 12, 33, 44 ]);
        
        this.latecomersArrivedDonutChart.addLabels([ 'Latecomers', 'Arrived on time', 'Absent' ]);
        
        this.domStatisticUpperCharts.append(this.latecomersArrivedDonutChart.domElement);
        
        await this.latecomersArrivedDonutChart.initialization();
    }
    
    /**
     * @private
     *
     * @description Implements update for the donut chart components.
     *
     * @return { void }
     **/
    async _donutChartsUpdate()
    {
        setClasses(this.latecomersArrivedDonutChart.domElement, [ 'loading' ]);
        
        const data = await this.scaPresenceTotalRequest();
        
        this.latecomersArrivedDonutChart.addSeries(data);
        
        this.latecomersArrivedDonutChart.update();
        
        removeClasses(this.latecomersArrivedDonutChart.domElement, [ 'loading' ]);
    }
    
    /**
     * @public
     *
     * @description Implements request for the presence total.
     *
     * @return { Promise<Array<int>> }
     **/
    async scaPresenceTotalRequest()
    {
        const request = new HttpRequest(
            {
                url: '/admin/dashboard/sca-presence-total',
                method: HttpRequestMethodsClassifier.POST,
                data: this.getScaPresenceTotalDataRequest(),
            });
        
        return request.execute();
    }
    
    /**
     * @public
     *
     * @description Returns data for the sca presence request.
     *
     * @return { Object }
     **/
    getScaPresenceTotalDataRequest()
    {
        const data = {};
        
        if (this.airDatepickerOuter.input.value)
        {
            data.date = this.airDatepickerOuter.input.value;
        }
        
        for (let i = 0, n = this.customSelects.length; i < n; i++)
        {
            if (!this.customSelects[i].getSelected())
            {
                continue ;
            }
            
            data[this.customSelects[i].getName()] = this.customSelects[i].getSelected().value;
        }
        
        return data;
    }
    
    /**
     * @private
     *
     * @description Implements initial for the line chart components.
     *
     * @return { void }
     **/
    async _hoursChartsInitial()
    {
        this.entrancesExitsLineChart = new LineChart(8, 'Number of entrances and exits of employees');
        
        this.entrancesExitsLineChart.addCategories([ ...Array(24).keys()].map(n => `${ (n).toString().padStart(2, '0') }`));
        
        await this.entrancesExitsLineChart.initialization();
        
        this.domStatisticUpperCharts.append(this.entrancesExitsLineChart.domElement);
        
        this.hoursEntrancesExitsColumnChart = new ColumnChart(12, 'Number of man-hours worked (by hours)');
        
        this.hoursEntrancesExitsColumnChart.addCategories([ ...Array(24).keys()].map(n => `${ (n).toString().padStart(2, '0') }`));

        await this.hoursEntrancesExitsColumnChart.initialization();

        this.domStatisticLowerCharts.append(this.hoursEntrancesExitsColumnChart.domElement);
    }
    
    /**
     * @private
     *
     * @description Implements update for the line chart components.
     *
     * @return { void }
     **/
    async _hoursChartsUpdate()
    {
        setClasses(this.entrancesExitsLineChart.domElement, [ 'loading' ]);
        
        setClasses(this.hoursEntrancesExitsColumnChart.domElement, [ 'loading' ]);
        
        const data = await this.summaryLineChartRequest();
        
        this.entrancesExitsLineChart.addSeries('Entrances', data.map(a => a.count_enter));
        
        this.entrancesExitsLineChart.addSeries('Exits', data.map(a => -a.count_exit));
        
        this.entrancesExitsLineChart.update();
        
        this.hoursEntrancesExitsColumnChart.addSeries('Hours', data.map(a => (a.count_seconds / 60 / 60).toFixed(2)));

        this.hoursEntrancesExitsColumnChart.update();

        removeClasses(this.entrancesExitsLineChart.domElement, [ 'loading' ]);

        removeClasses(this.hoursEntrancesExitsColumnChart.domElement, [ 'loading' ]);
    }
    
    /**
     * @public
     *
     * @description Implements request for the summary data by hours.
     *
     * @return { Promise<Object> }
     **/
    async summaryLineChartRequest()
    {
        const request = new HttpRequest(
            {
                url: '/admin/dashboard/summary-users-by-hours',
                method: HttpRequestMethodsClassifier.POST,
                data: this.getSummaryLineChartDataRequest(),
            });
        
        return request.execute();
    }
    
    /**
     * @public
     *
     * @description Returns data for the summary line charts request.
     *
     * @return { Object }
     **/
    getSummaryLineChartDataRequest()
    {
        const data = {};
        
        if (this.airDatepickerOuter.input.value)
        {
            data.date = this.airDatepickerOuter.input.value;
        }
        
        for (let i = 0, n = this.customSelects.length; i < n; i++)
        {
            if (!this.customSelects[i].getSelected())
            {
                continue ;
            }
            
            data[this.customSelects[i].getName()] = this.customSelects[i].getSelected().value;
        }
        
        return data;
    }
    
    /**
     * @private
     *
     * @description Implements handler for the change event of the custom select.
     *
     * @return { void }
     **/
    _customSelectChangeHandler()
    {
        this.update();
    }
    
    /**
     * @private
     *
     * @description Implements handler for the change event of the air datepicker outer.
     *
     * @return { void }
     **/
    _airDatepickerOuterInputHandler()
    {
        if (!this.airDatepickerOuter.input.value)
        {
            return ;
        }
        
        this.update();
    }
    
    /**
     * @private
     *
     * @description Implements initial for the statistic card components.
     *
     * @return { void }
     **/
    _statisticCardsInitial()
    {
        this.statisticCards.push(new AttendanceUsersByCategory('c_total', 'statistic-progress statistic-progress--theme-chateau-green statistic-progress--size-default'));
        
        this.statisticCards.push(new AttendanceUsersByCategory('c_teacher'));
        
        this.statisticCards.push(new AttendanceUsersByCategory('c_spec'));
        
        this.statisticCards.push(new AttendanceUsersByCategory('c_student'));
        
        this.statisticCards.forEach(a => this.domStatisticCards.append(a.element));
    }
    
    /**
     * @private
     *
     * @description Implements update for the statistic card components.
     *
     * @return { void }
     **/
    _statisticCardsUpdate()
    {
        this.statisticCards.forEach(a => a.update());
    }
    
    /**
     * @private
     *
     * @description Implements initial for the custom select components.
     *
     * @return { void }
     **/
    _customSelectInitial()
    {
        {
            const customSelect = new CustomSelect('[data-dashboard-custom-select="unit"]',
                {
                    httpRequestSettings:
                        {
                            method: HttpRequestMethodsClassifier.POST,
                            url: '/admin/classifiers/units/list/json',
                        },
                    inputSettings:
                        {
                            placeholder: 'Unit',
                            withLabel: true,
                        },
                    contentSettings:
                        {
                            withSearch: false,
                            isTree: true,
                            treeIdKey: 'id_object',
                            treeParentIdKey: 'id_parent',
                            keyValue: 'id_object',
                            keyText: 'name_object',
                            treeMaxLevel: 3,
                        },
                });
            
            customSelect.initialization();
            
            customSelect.customEvents.subscribe(CustomSelectEventTypesClassifier.SELECT_ITEM, this._customSelectChangeHandler.bind(this));
            
            this.customSelects.push(customSelect);
        }
        
        {
            const customSelect = new CustomSelect('[data-dashboard-custom-select="position"]',
                {
                    httpRequestSettings:
                        {
                            method: HttpRequestMethodsClassifier.POST,
                            url: '/admin/classifiers/positions/list/json',
                        },
                    inputSettings:
                        {
                            placeholder: 'Position',
                            withLabel: true,
                        },
                    contentSettings:
                        {
                            withSearch: false,
                            keyValue: 'id_object',
                            keyText: 'name_object',
                        },
                });
            
            customSelect.initialization();
            
            customSelect.customEvents.subscribe(CustomSelectEventTypesClassifier.SELECT_ITEM, this._customSelectChangeHandler.bind(this));
            
            this.customSelects.push(customSelect);
        }
        
        {
            const customSelect = new CustomSelect('[data-dashboard-custom-select="category"]',
                {
                    httpRequestSettings:
                        {
                            method: HttpRequestMethodsClassifier.POST,
                            url: '/admin/classifiers/person-categories/list/json',
                        },
                    inputSettings:
                        {
                            placeholder: 'Category',
                            withLabel: true,
                        },
                    contentSettings:
                        {
                            withSearch: false,
                            keyValue: 'id_object',
                            keyText: 'name_object',
                        },
                });
            
            customSelect.initialization();
            
            customSelect.customEvents.subscribe(CustomSelectEventTypesClassifier.SELECT_ITEM, this._customSelectChangeHandler.bind(this));
            
            this.customSelects.push(customSelect);
        }
    }
}
