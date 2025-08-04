import { structureMerge } from '../../../tea-modules/Functions/Structures/structureMerge.js';
import { TablePositionsClassifier } from '../Standards/TablePositionsClassifier.js';


/**
 * @class
 *
 * @description Contains all possible settings of the TableButton class.
 **/
export class TableButtonSettings
{
    /**
     * @typedef { Object } TableButtonSettingProperties
     *
     * @property { TablePositionsClassifier ?} position - The position of the table.
     *
     * @property { TableActionTypesClassifier ?} type - The type of the element.
     *
     * @property { ButtonSettingProperties ? } buttonSettings - The settings of the button component.
     *
     * @property { boolean ? } conditionByColumn - Checking status by column.
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
     * @type { TableActionTypesClassifier }
     **/
    type;
    
    /**
     * @public
     *
     * @type { string }
     **/
    conditionByColumn;
    
    /**
     * @public
     *
     * @type { ButtonSettingProperties }
     **/
    buttonSettings =
        {
            elementClass: [ 'table-button' ],
            iconClass: 'icon icon-size-12',
        };
    
    /**
     * @constructor
     *
     * @param { TableButtonSettingProperties } settings
     *
     * @return { TableButtonSettings }
     **/
    constructor(settings = {})
    {
        structureMerge(this, settings);
    }
}