import { structureMerge } from '../../../tea-modules/Functions/Structures/structureMerge.js';
import { TablePositionsClassifier } from '../Standards/TablePositionsClassifier.js';


/**
 * @class
 *
 * @description Contains all possible settings of the TableInput class.
 **/
export class TableInputSettings
{
    /**
     * @typedef { Object } TableInputSettingProperties
     *
     * @property { TablePositionsClassifier ? } position - The position of table.
     *
     * @property { string[] ? } elementClassName - The class name of the element.
     *
     * @property { string ? } elementAttribute - The attribute of the element.
     *
     * @property { string[] ? } labelClassName - The class name of the label element.
     *
     * @property { string[] ? } iconClassName - The class name of the icon element.
     *
     * @property { string ? } elementType - The type of the element.
     *
     * @property { string ? } iconId - The id of the icon element.
     *
     * @property { string[] ? } inputClassName - The class name of the input element.
     *
     * @property { string ? } inputId - The id of the input element.
     *
     * @property { string } inputPlaceholder - The placeholder of the input element.
     *
     * @property { string } inputName - The name of the input element.
     *
     * @property { number ? } timeout - The timeout of the event execute.
     *
     * @property { boolean ? } isDatepicker - Determines whether input is a datepicker.
     *
     * @property { Object ? } datepickerSettings - The settings of the datepicker component.
     *
     * @property { boolean ? } isToLoad - Determines whether data should be loaded after input.
     *
     * @property { string ? } value - The default value of component.
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
     * @type { string[] }
     **/
    elementClassName = [ 'input-outer', 'input-outer--theme-mercury', 'input-outer--size-middle' ];
    
    /**
     * @public
     *
     * @type { string }
     **/
    elementAttribute = 'data-table-input';
    
    /**
     * @public
     *
     * @type { string[] }
     **/
    labelClassName = [ 'input-outer__label', 'input-outer__label--size-middle', 'input-outer__label--theme' ];
    
    /**
     * @public
     *
     * @type { string[] }
     **/
    iconClassName = [ 'icon', 'icon-size-16' ];
    
    /**
     * @public
     *
     * @type { string }
     **/
    elementType = 'text';
    
    /**
     * @public
     *
     * @type { string }
     **/
    iconId;
    
    /**
     * @public
     *
     * @type { string[] }
     **/
    inputClassName = [ 'input', 'input--theme', 'input--size-middle', 'input-outer__input', 'custom-input__input' ];
    
    /**
     * @public
     *
     * @type { string }
     **/
    inputId;
    
    /**
     * @public
     *
     * @type { string }
     **/
    inputPlaceholder;
    
    /**
     * @public
     *
     * @type { string }
     **/
    inputName;
    
    /**
     * @public
     *
     * @type { number }
     **/
    timeout = 300;
    
    /**
     * @public
     *
     * @type { boolean }
     **/
    isDatepicker = false;
    
    /**
     * @public
     *
     * @type { Object }
     **/
    datepickerSettings = {};
    
    /**
     * @public
     *
     * @type { boolean }
     **/
    isToLoad = false;
    
    /**
     * @public
     *
     * @type { string }
     **/
    value;
    
    /**
     * @constructor
     *
     * @param { TableInputSettingProperties } settings
     *
     * @return { TableInputSettings }
     **/
    constructor(settings)
    {
        structureMerge(this, settings);
    }
}
