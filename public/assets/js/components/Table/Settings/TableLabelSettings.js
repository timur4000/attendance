import { structureMerge } from '../../../tea-modules/Functions/Structures/structureMerge.js';
import { TableLabelTypesClassifier } from '../Standards/TableLabelTypesClassifier.js';


/**
 * @class
 *
 * @description Contains all possible settings of the TableLabel class.
 **/
export class TableLabelSettings
{
    /**
     * @typedef { Object } TableLabelSettingProperties
     *
     * @property { string[] ? } elementClass - The class of the element.
     *
     * @property { Element | string } value - The value to displaying.
     *
     * @property { TableLabelTypesClassifier ? } type - The type of the element.
     *
     * @property { TableStatusTypesClassifier } statusType - The status type of the element.
     **/
    
    /**
     * @public
     *
     * @type { string[] }
     **/
    elementClass = [ 'table-label' ];
    
    /**
     * @public
     *
     * @type { Element | string }
     **/
    value;
    
    /**
     * @public
     *
     * @type { TableLabelTypesClassifier }
     **/
    type = TableLabelTypesClassifier.TEXT;
    
    /**
     * @public
     *
     * @type { TableStatusTypesClassifier }
     **/
    statusType;
    
    /**
     * @constructor
     *
     * @param { TableLabelSettingProperties } settings
     *
     * @return { TableLabelSettings }
     **/
    constructor(settings)
    {
        structureMerge(this, settings);
    }
}
