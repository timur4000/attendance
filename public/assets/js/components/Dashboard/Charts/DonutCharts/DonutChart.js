import { Chart } from '../Chart.js';


export class DonutChart extends Chart
{
    /**
     * @public
     *
     * @type { Array }
     **/
    series = [];
    
    /**
     * @public
     *
     * @type { Array<string> }
     **/
    labels = [];
    
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
    
    /**
     * @inheritDoc
     **/
    async getOptions()
    {
        return (
            {
                series: [],
                chart: {
                    height: 351.5,
                    type: 'donut',
                },
                labels: this.labels,
                dataLabels:
                    {
                        formatter: function (val, opts) {
                            return opts.w.config.series[opts.seriesIndex]
                        },
                    },
                legend: {
                    position: 'bottom'
                },
                stroke: {
                    show: true,
                    width: 4,
                },
                tooltip:
                    {
                        // enabled: false,
                    },
                plotOptions: {
                    pie: {
                        donut: {
                            size: '60%'
                        }
                    }
                },
                colors: [ baseColors.AZURE, baseColors.EMERALD, baseColors.ROYAL_BLUE,  ],
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
    }
    
    /**
     * @public
     *
     * @description Adds series.
     *
     * @param { Array } series
     *
     * @return { void }
     **/
    addSeries(series)
    {
        this.series = series;
    }
    
    /**
     * @public
     *
     * @description Adds labels.
     *
     * @param { Array } labels
     *
     * @return { void }
     **/
    addLabels(labels)
    {
        this.labels = labels;
    }
}
