import { structureMerge } from '../../../tea-modules/Functions/Structures/structureMerge.js';
import { TablePositionsClassifier } from '../Standards/TablePositionsClassifier.js';


/**
 * @class
 *
 * @description Contains all possible settings of the TableHeading class.
 **/
export class TableHeadingSettings
{
    /**
     * @typedef { Object } TableHeadingSettingProperties
     *
     * @property { TablePositionsClassifier ? } position - The position of the table component.
     *
     * @property { string ? } domElementClass - The class name of the dom element.
     *
     * @property { Element | string } text - The text of the element.
     *
     * @property { (1 | 2 | 3 | 4 | 5 | 6) ? } level - The level of the heading.
     **/
    
    /**
     * @public
     *
     * @type { TablePositionsClassifier }
     **/
    position = TablePositionsClassifier.TOP_LEFT;
    
    /**
     * @public
     *
     * @type { string }
     **/
    domElementClass = 'table-heading';
    
    /**
     * @public
     *
     * @type { Element | string }
     **/
    text;
    
    /**
     * @public
     *
     * @type { (1 | 2 | 3 | 4 | 5 | 6) }
     **/
    level = 2;
    
    /**
     * @constructor
     *
     * @param { TableHeadingSettingProperties } settings
     *
     * @return { TableHeadingSettings }
     **/
    constructor(settings)
    {
        structureMerge(this, settings);
    }
}
