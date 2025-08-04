import { Chart } from '../Chart.js';
import { clearArray } from '../../../../tea-modules/Functions/Arrays/clearArray.js';


/**
 * Implements logic for the column chart component.
 **/
export class ColumnChart extends Chart
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
     * @param { string ? } heading
     *
     * @return { DonutChart }
     **/
    constructor(columnSize, heading = '')
    {
        super(columnSize, heading);
        
        console.log(this);
    }
    
    async getOptions()
    {
        return {
            series: [{
                name: '',
                data: []
            }],
            grid: {
                borderColor: baseColors.MERCURY,
                strokeDashArray: 7,
            },
            chart: {
                height: 350,
                type: 'bar',
                zoom: {
                    enabled: false
                },
                toolbar: {
                    show: false
                },
            },
            plotOptions: {
                bar: {
                    borderRadius: 6,
                    dataLabels: {
                        position: 'top',
                    },
                }
            },
            dataLabels: {
                enabled: true,
                formatter: function (val) {
                    return val;
                },
                offsetY: -20,
                style: {
                    fontSize: '12px',
                    colors: [ baseColors.CHARADE ]
                }
            },
            colors: [ baseColors.AZURE ],
            xaxis: {
                categories: this.categories,
            },
            yaxis: {},
        };
    }
    
    async initialization()
    {
        this.options = await this.getOptions();
        
        await this.apexChartLibProcessing();
        
        await this.apexChartLib.initialization();
    }
    
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
