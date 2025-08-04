import { structureMerge }                   from '../../../tea-modules/Functions/Structures/structureMerge.js';
import { IntegerStatisticsTypesClassifier } from '../Standards/IntegerStatisticsTypesClassifier.js';


/**
 * @description Contains all possible settings of the IntegerStatisticsManager component.
 **/
export class IntegerStatisticsManagerSettings
{
    /**
     * @typedef { Object } IntegerStatisticsManagerSetting
     *
     * @property { ? IntegerStatisticsTypesClassifier } [itemsType]
     *
     * @property { HttpRequestSettingProperties } httpRequestSettings
     *
     * @property { Array<IntegerStatisticsSetting> } items
     *
     * @property { ? string | HTMLDivElement } [manager]
     *
     * @property { ? string } [domManagerClassName]
     *
     * @property { ? number } [countInRow]
     **/
    
    /**
     * @public
     *
     * @type { IntegerStatisticsTypesClassifier }
     **/
    itemsType = IntegerStatisticsTypesClassifier.GROUP;
    
    /**
     * @public
     *
     * @type { HttpRequestSettingProperties }
     **/
    httpRequestSettings = {};
    
    /**
     * @public
     *
     * @type { Array<IntegerStatisticsSetting> }
     **/
    items = [];
    
    /**
     * @public
     *
     * @type { string | HTMLDivElement }
     **/
    manager;
    
    /**
     * @public
     *
     * @type { string }
     **/
    domManagerClassName = 'integer-statistics-manager';
    
    /**
     * @public
     *
     * @type { number }
     **/
    countInRow = 4;
    
    /**
     * @constructor
     *
     * @param { IntegerStatisticsManagerSetting } settings
     **/
    constructor(settings = {})
    {
        structureMerge(this, settings);
    }
}
