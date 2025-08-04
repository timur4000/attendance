import { structureMerge } from '../../../tea-modules/Functions/Structures/structureMerge.js';
import { TablePositionsClassifier } from '../Standards/TablePositionsClassifier.js';


/**
 * @class
 *
 * @description Contains all possible settings of the TableSelect class.
 **/
export class TableSelectSettings
{
    /**
     * @typedef { Object } TableSelectOption
     *
     * @property { string } value - The value of the option.
     *
     * @property { boolean } isSelected - Determines whether an option is selected.
     *
     * @property { string } text - The text for displaying.
     **/
    
    /**
     * @typedef { Object } TableSelectSettingProperties
     *
     * @property { TablePositionsClassifier ? } position - The position of table.
     *
     * @property { string } elementName - The name of the element.
     *
     * @property { string ? } elementAttribute - The data attribute of the element.
     *
     * @property { ( 1 | 0 ) ? } withSearch - Determines whether a search is needed.
     *
     * @property { ( 1 | 0 ) ? } withLabel - Determines whether a label is needed.
     *
     * @property { string } placeholder - The placeholder for the label.
     *
     * @property { string ? } searchPlaceholder - The placeholder for the search input.
     *
     * @property { TableSelectOption[] } options - The options of the select.
     *
     * @property { CustomSelectSettingsItems } customSelectSettings - The settings of the custom select.
     **/
    
    /**
     * @public
     *
     * @type { TablePositionsClassifier }
     **/
    position = TablePositionsClassifier.TOP_RIGHT;
    
    /**
     * @public
     *
     * @type { string }
     **/
    elementName;
    
    /**
     * @public
     *
     * @type { string }
     **/
    elementAttribute = 'data-table-custom-select';
    
    /**
     * @public
     *
     * @type { ( 1 | 0 ) }
     **/
    withSearch = 0;
    
    /**
     * @public
     *
     * @type { ( 1 | 0 ) }
     **/
    withLabel = 1;
    
    /**
     * @public
     *
     * @type { string }
     **/
    placeholder;
    
    /**
     * @public
     *
     * @type { string }
     **/
    searchPlaceholder;
    
    /**
     * @public
     *
     * @type { TableSelectOption[] }
     **/
    options = [];
    
    /**
     * @public
     *
     * @type { CustomSelectSettingsItems }
     **/
    customSelectSettings = {};
    
    /**
     * @constructor
     *
     * @param { TableSelectSettingProperties ? } settings
     **/
    constructor(settings = {})
    {
        structureMerge(this, settings);
    }
}
