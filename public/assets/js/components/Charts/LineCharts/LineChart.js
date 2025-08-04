import { Chart } from '../Chart.js';
import { LineChartSettings } from './LineChartSettings.js';


/**
 * @description Implements logic of the LineChart component.
 *
 * @extends Chart
 **/
export class LineChart extends Chart
{
    /**
     * @public
     *
     * @type { LineChartSettings }
     **/
    settings;
    
    /**
     * @constructor
     *
     * @param { LineChartSetting | LineChartSettings } settings
     **/
    constructor(settings)
    {
        super(settings);
        
        this.settings = settings instanceof LineChartSettings ? settings : new LineChartSettings(settings);
    }
    
    /**
     * @inheritDoc
     **/
    getOptions()
    {
        return {
            series: this.series,
            grid: {
                borderColor: this.settings.borderColor,
                strokeDashArray: this.settings.gridStrokeDashArray,
            },
            chart: {
                zoom: {
                    enabled: false,
                },
                toolbar: {
                    show: false,
                },
                width: '100%',
                height: this.settings.height,
                type: this.settings.type,
            },
            colors: this.settings.colors,
            annotations: {
                yaxis: [
                    {
                        y: 0,
                        borderColor: this.settings.annotationBorderColor,
                        fillColor: this.settings.annotationFillColor,
                    },
                ],
            },
            stroke: {
                show: true,
                curve: 'smooth',
                lineCap: 'butt',
                colors: undefined,
                width: this.settings.strokeWidth,
                dashArray: 0,
            },
            yaxis: {},
            xaxis: {
                categories: this.categories,
            },
            legend: {
                // show: false
            },
        };
    }
}
