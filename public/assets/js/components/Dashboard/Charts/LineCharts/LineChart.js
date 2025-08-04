import { Chart } from '../Chart.js';
import { clearArray } from '../../../../tea-modules/Functions/Arrays/clearArray.js';


/**
 * @class
 *
 * @extends { Chart }
 *
 * @description Implement logic with the line chart components.
 **/
export class LineChart extends Chart
{
    /**
     * @public
     *
     * @type { Object[] }
     **/
    series = [];
    
    /**
     * @public
     *
     * @type { Array }
     **/
    categories = [];
    
    /**
     * @constructor
     *
     * @param { number } columnSize
     *
     * @param { string } heading
     *
     * @return { LineChart }
     **/
    constructor(columnSize, heading)
    {
        super(columnSize, heading);
    }
    
    /**
     * @inheritDoc
     **/
    async getOptions()
    {
        return (
            {
                series: [{
                    name: '',
                    data: [],
                }],
                grid: {
                    borderColor: baseColors.MERCURY,
                    strokeDashArray: 7,
                },
                chart: {
                    zoom: {
                        enabled: false
                    },
                    toolbar: {
                        show: false
                    },
                    width: '100%',
                    height: 300,
                    type: 'line',
                },
                colors: [ baseColors.ROYAL_BLUE, baseColors.PURPLE_HEART ],
                annotations: {
                    yaxis: [{
                        y: 0,
                        borderColor: baseColors.PERSIAN_ROSE,
                        fillColor: baseColors.PERSIAN_ROSE,
                    }],
                },
                stroke: {
                    show: true,
                    curve: 'smooth',
                    lineCap: 'butt',
                    colors: undefined,
                    width: 4,
                    dashArray: 0,
                },
                yaxis:
                    {
                    },
                xaxis: {
                    categories: this.categories,
                },
                legend: {
                    // show: false
                },
            }
        );
    }
    
    /**
     * @inheritDoc
     **/
    async initialization()
    {
        this.options = await this.getOptions();
        
        await this.apexChartLibProcessing();
        
        await this.apexChartLib.initialization();
    }
    
    /**
     * @inheritDoc
     **/
    async update()
    {
        this.apexChartLibRenderProcessing();

        this.apexChartLib.lib.updateSeries(this.series);

        clearArray(this.series);
    }
    
    /**
     * @public
     *
     * @description Add series.
     *
     * @param { string } name
     *
     * @param { Array } data
     *
     * @return { void }
     **/
    addSeries(name, data)
    {
        this.series.push({ name, data });
    }
    
    /**
     * @public
     *
     * @description Adds categories.
     *
     * @param { Array } categories
     *
     * @return { void }
     **/
    addCategories(categories)
    {
        this.categories = categories;
    }
}