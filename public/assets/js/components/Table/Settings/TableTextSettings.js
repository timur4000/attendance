import { structureMerge } from '../../../tea-modules/Functions/Structures/structureMerge.js';
import { TablePositionsClassifier } from '../Standards/TablePositionsClassifier.js';


/**
 * @class
 *
 * @description Contains all possible settings of the TableText class.
 **/
export class TableTextSettings
{
    /**
     * @typedef { Object } TableTextSettingProperties
     *
     * @property { TablePositionsClassifier ? } position - The position of the table component.
     *
     * @property { string[] ? } elementClass - The class of the element.
     **/
    
    /**
     * @public
     *
     * @type { TablePositionsClassifier }
     **/
    position = TablePositionsClassifier.BOTTOM_LEFT;
    
    /**
     * @public
     *
     * @type { string[] }
     **/
    elementClass = [ 'table-text' ];
    
    /**
     * @constructor
     *
     * @param { TableTextSettingProperties } settings
     *
     * @return { TableTextSettings }
     **/
    constructor(settings)
    {
        structureMerge(this, settings);
    }
}
