import { structureMerge } from '../../../tea-modules/Functions/Structures/structureMerge.js';
import { TableEarTypesClassifier } from './TableEarTypesClassifier.js';


export class TableEarSettings
{
    /**
     * @typedef { Object } TableEarSettingProperties
     *
     * @property { TableEarTypesClassifier } type - The type of the element.
     *
     * @property { string ? } elementClass - The class name of the element.
     *
     * @property { string ? } circleClass - The class name of the circle element.
     *
     * @property { string ? } iconClass - The class name of the icon element.
     *
     * @property { string ? } iconId - The id of the icon element.
     **/
    
    /**
     * @public
     *
     * @type { TableEarTypesClassifier }
     **/
    type;
    
    /**
     * @public
     *
     * @type { string }
     **/
    elementClass= 'table-ear';
    
    /**
     * @public
     *
     * @type { string }
     **/
    circleClass= 'table-ear__circle';
    
    /**
     * @public
     *
     * @type { string }
     **/
    iconClass= 'table-ear__icon icon icon-size-24';
    
    /**
     * @public
     *
     * @type { string }
     **/
    iconId= 'arrows-left';
    
    /**
     * @constructor
     *
     * @param { TableEarSettingProperties } settings
     **/
    constructor(settings)
    {
        structureMerge(this, settings);
    }
}