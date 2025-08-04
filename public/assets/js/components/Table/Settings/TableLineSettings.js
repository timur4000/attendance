import { structureMerge } from '../../../tea-modules/Functions/Structures/structureMerge.js';


/**
 * @class
 *
 * @description Contains all possible settings for the TableLine class.
 **/
export class TableLineSettings
{
    /**
     * @typedef { Object } TableLineSettingProperties
     *
     * @property { string[] ? } elementClass - The class name of the element.
     *
     * @property { string[] ? } columnClass - The class name of the column element.
     **/
    
    /**
     * @public
     *
     * @type { string[] }
     **/
    elementClass = [ 'table-line' ];
    
    /**
     * @public
     *
     * @type { string[] }
     **/
    columnClass = [ 'table-line__column' ];
    
    /**
     * @constructor
     *
     * @param { TableLineSettingProperties } settings
     *
     * @return { TableLineSettings }
     **/
    constructor(settings)
    {
        structureMerge(this, settings);
    }
}
