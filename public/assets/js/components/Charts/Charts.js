import { ChartTypesClassifier } from './Standards/ChartTypesClassifier.js';
import { LineChart }            from './LineCharts/LineChart.js';


/**
 * @description Implements manage work with charts.
 **/
export class Charts
{
    /**
     * @public
     *
     * @description Creates the instance of chart by the specified type.
     *
     * @param { ChartTypesClassifier } type
     *
     * @param { ChartSetting } settings
     *
     * @return { LineChart }
     **/
    static createChartByType(type, settings)
    {
        switch (type)
        {
            case ChartTypesClassifier.LINE: return new LineChart(settings);
        }
    };
}
