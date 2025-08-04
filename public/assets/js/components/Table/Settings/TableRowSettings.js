import { structureMerge } from '../../../tea-modules/Functions/Structures/structureMerge.js';


/**
 * @class
 *
 * @description Contains all possible settings of the TableRow class.
 **/
export class TableRowSettings
{
    /**
     * @typedef { Object } TableRowSettingProperties
     *
     * @property { string[] ? } elementClass - The class of the element.
     *
     * @property { string ? } identifierAttribute - The name of the identifier attribute.
     **/
    
    /**
     * @public
     *
     * @type { string[] }
     **/
    elementClass = [ 'table-element__row' ];
    
    /**
     * @public
     *
     * @type { string }
     **/
    identifierAttribute = 'data-identifier';
    
    /**
     * @constructor
     *
     * @param { TableRowSettingProperties ? } settings
     *
     * @return { TableRowSettings }
     **/
    constructor(settings = {})
    {
        structureMerge(this, settings);
    }
}
