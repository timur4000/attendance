import { structureMerge } from '../../tea-modules/Functions/Structures/structureMerge.js';
import { ChartThemesClassifier } from './Standards/ChartThemesClassifier.js';


/**
 * @description Contains all possible settings of the Chart component.
 **/
export class ChartSettings
{
    /**
     * @typedef { Object } ChartSetting
     *
     * @property { string } [domElementClassName]
     *
     * @property { ChartTypesClassifier } [type]
     *
     * @property { ChartThemesClassifier } [theme]
     *
     * @property { number } [height]
     *
     * @property { Array<string> } [colors]
     *
     * @property { string } [borderColor]
     *
     * @property { number } [strokeDashArray]
     **/
    
    /**
     * @readonly
     *
     * @public
     *
     * @type { Array<string> }
     **/
    modifiers = [ 'theme' ];
    
    /**
     * @public
     *
     * @type { string }
     **/
    domElementClassName = 'chart';
    
    /**
     * @public
     *
     * @type { ChartThemesClassifier }
     **/
    theme = ChartThemesClassifier.DEFAULT;
    
    /**
     * @public
     *
     * @type { ChartTypesClassifier }
     **/
    type;
    
    /**
     * @public
     *
     * @type { number }
     **/
    height = 250;
    
    /**
     * @public
     *
     * @type { Array<string> }
     **/
    colors = [ baseColors.PURPLE_HEART, baseColors.EMERALD, baseColors.ROYAL_BLUE, baseColors.WEB_ORANGE, baseColors.PAARL ];
    
    /**
     * @public
     *
     * @type { string }
     **/
    borderColor = baseColors.MERCURY;
    
    /**
     * @public
     *
     * @type { number }
     **/
    gridStrokeDashArray = 7;
    
    /**
     * @constructor
     *
     * @param { ChartSetting } settings
     **/
    constructor(settings = {})
    {
        structureMerge(this, settings);
    }
}
