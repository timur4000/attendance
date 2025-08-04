import { ChartSettings }  from '../ChartSettings.js';
import { ChartTypesClassifier } from '../Standards/ChartTypesClassifier.js';


/**
 * @description Contains all possible extends settings of the LineChart component.
 **/
export class LineChartSettings extends ChartSettings
{
    /**
     * @typedef { ChartSetting } LineChartSetting
     *
     * @extends ChartSettings
     *
     * @property { string } [type]
     *
     * @property { string } [annotationBorderColor]
     *
     * @property { string } [annotationFillColor]
     *
     * @property { string } [number]
     **/
    
    /**
     * @public
     *
     * @type { string }
     **/
    type = ChartTypesClassifier.LINE;
    
    /**
     * @public
     *
     * @type { string }
     **/
    annotationBorderColor = baseColors.PERSIAN_ROSE;
    
    /**
     * @public
     *
     * @type { string }
     **/
    annotationFillColor= baseColors.PERSIAN_ROSE;
    
    /**
     * @public
     *
     * @type { number }
     **/
    strokeWidth= 4;
    
    /**
     * @constructor
     *
     * @param { LineChartSetting } settings
     **/
    constructor(settings = {})
    {
        super(settings);
        
    }
}
