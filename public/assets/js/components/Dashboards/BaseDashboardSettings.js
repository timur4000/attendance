import { structureMerge } from '../../tea-modules/Functions/Structures/structureMerge.js';
import { DashboardTypesClassifier } from './Standards/DashboardTypesClassifier.js';


/**
 * @description Contains all possible settings of the BaseDashboard component.
 **/
export class BaseDashboardSettings
{
    /**
     * @typedef { Object } BaseDashboardSetting
     *
     * @property { ? DashboardTypesClassifier } [type]
     *
     * @property { ? string } [domElementClassName]
     *
     * @property { ? string } [domLineClassName]
     **/
    
    /**
     * @public
     *
     * @type { DashboardTypesClassifier }
     **/
    type = DashboardTypesClassifier.UNKNOWN;
    
    /**
     * @public
     *
     * @type { string }
     **/
    domElementClassName = 'dashboard dashboard--type-default dashboard--size-default';
    
    /**
     * @public
     *
     * @type { string }
     **/
    domLineClassName = 'dashboard__line';
    
    /**
     * @constructor
     *
     * @param { BaseDashboardSetting } settings
     **/
    constructor(settings)
    {
        structureMerge(this, settings);
    }
}
