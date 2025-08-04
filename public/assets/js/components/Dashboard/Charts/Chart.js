import { CustomEvents } from '../../../tea-modules/Classes/CustomEvents/CustomEvents.js';
import { convertToHtml } from '../../../tea-modules/Functions/Convertations/convertToHtml.js';
import { querySelector } from '../../../tea-modules/Functions/DOM/Queries/querySelector.js';
import { ApexChartLib } from '../../ApexChartOuter/ApexChartLib.js';
import { ChartStatesClassifier } from './ChartStatesClassifier.js';
import { ChartEventsClassifier } from './ChartEventsClassifier.js';


/**
 * @abstract
 *
 * @class
 *
 * @description Implements abstract logic for the all charts.
 **/
export class Chart
{
    /**
     * @public
     *
     * @type { CustomEvents }
     **/
    customEvents;
    
    /**
     * @public
     *
     * @type { number }
     **/
    columnSize;
    
    /**
     * @public
     *
     * @type { string }
     **/
    heading;
    
    /**
     * @public
     *
     * @type { Object }
     **/
    options;
    
    /**
     * @public
     *
     * @type { ApexChartLib }
     **/
    apexChartLib;
    
    /**
     * @public
     *
     * @type { HTMLElement }
     **/
    domElement;
    
    /**
     * @public
     *
     * @type { HTMLElement }
     **/
    domChart;
    
    /**
     * @public
     *
     * @type { ChartStatesClassifier }
     **/
    state = ChartStatesClassifier.UN_RENDERED;
    
    /**
     * @constructor
     *
     * @param { number } columnSize
     *
     * @param { string ? } heading
     *
     * @return { Chart }
     **/
    constructor(columnSize, heading = '')
    {
        this.customEvents = new CustomEvents();
        
        this.columnSize = columnSize;
        
        this.heading = heading;
        
        this.domElement = convertToHtml(this.getHtml());
        
        this.domChart = querySelector('[data-chart]', { root: this.domElement });
    }
    
    /**
     * @abstract
     *
     * @public
     *
     * @description Implements initialize base logic.
     *
     * @return { void }
     **/
    async initialization() {};
    
    /**
     * @abstract
     *
     * @public
     *
     * @description Returns base options of the chart.
     *
     * @return { Object }
     **/
    async getOptions() {};
    
    /**
     * @abstract
     *
     * @public
     *
     * @description Updates the chart.
     *
     * @return { void }
     **/
    async update() {};
    
    /**
     * @public
     *
     * @description Implements process of create for the apex chart.
     *
     * @return { Promise<void> }
     **/
    async apexChartLibProcessing()
    {
        this._apexChartLibEventsProcessing();
        
        this.apexChartLib = new ApexChartLib(this.domChart, this.options);
        
        return this.apexChartLib.load();
    };
    
    /**
     * @private
     *
     * @description Implements process of events for the apex chart.
     *
     * @return { void }
     **/
    _apexChartLibEventsProcessing()
    {
        this.options.chart.events =
            {
                click: this._apexChartLibClickHandler.bind(this),
                
                dataPointSelection: this._apexChartLibDataPointSelectionHandler.bind(this),
                
                markerClick: this._apexChartLibMarkerClickHandler.bind(this),
            };
    };
    
    /**
     * @private
     *
     * @description Implements handler for the click event.
     *
     * @param { MouseEvent } mouseEvent
     *
     * @param { Object } chartContext
     *
     * @param { Object } config
     *
     * @return { void }
     **/
    _apexChartLibClickHandler(mouseEvent, chartContext, config)
    {
        this.customEvents.execute(ChartEventsClassifier.CLICK, mouseEvent, chartContext, config);
    };
    
    /**
     * @private
     *
     * @description Implements handler for the data point selection event.
     *
     * @param { MouseEvent } mouseEvent
     *
     * @param { Object } chartContext
     *
     * @param { Object } config
     *
     * @return { void }
     **/
    _apexChartLibDataPointSelectionHandler(mouseEvent, chartContext, config)
    {
        this.customEvents.execute(ChartEventsClassifier.DATA_POINT_SELECTION, mouseEvent, chartContext, config);
    };
    
    /**
     * @private
     *
     * @description Implements handler for the marker click event.
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
    _apexChartLibMarkerClickHandler(mouseEvent, chartContext, { seriesIndex, dataPointIndex, config})
    {
        this.customEvents.execute(ChartEventsClassifier.MARKER_CLICK, mouseEvent, chartContext, seriesIndex, dataPointIndex, config);
    };
    
    /**
     * @public
     *
     * @description Implements process of render for the apex chart.
     *
     * @return { void }
     **/
    apexChartLibRenderProcessing()
    {
        if (this.state === ChartStatesClassifier.RENDERED)
        {
            return ;
        }
        
        this.apexChartLib.lib.render();
        
        this.state = ChartStatesClassifier.RENDERED;
    };
    
    /**
     * @public
     *
     * @description Returns html of the element.
     *
     * @return { string }
     **/
    getHtml()
    {
        return (
            `<div class="grid-column grid-column-${ this.columnSize }">

                <div class="card card--theme-white">

                    <div class="card-head card-head--size-default card-head--theme-jumbo">

                        <div class="grid-row">

                            <div class="grid-column grid-column--type-middle grid-column-12">
                                <h3 class="card-heading card-heading--size-default card-heading--theme-jumbo">${ this.heading }</h3>
                            </div>
                            
                        </div>

                    </div>

                    <div class="card-main card-main--size-default">
                        <div class="" data-chart></div>
                    </div>

                </div>

            </div>`
        );
    }
}
