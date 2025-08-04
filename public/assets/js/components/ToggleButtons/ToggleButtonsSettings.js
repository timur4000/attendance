import { structureMerge } from '../../tea-modules/Functions/Structures/structureMerge.js';


/**
 * @description Contains all possible settings of the ToggleButtons component.
 **/
export class ToggleButtonsSettings
{
    /**
     * @typedef { Object } ToggleButtonsSetting
     *
     * @property { (string | HTMLElement) } [domWrapper]
     *
     * @property { Array<string> } [classesOfElements]
     *
     * @property { Array<ButtonSettingProperties> } propertiesOfButtons
     *
     * @property { string } id
     *
     * @property { string } [cssMargin]
     *
     * @property { boolean } [isAllTimeToggle]
     *
     * @property { boolean } [isSaveStorage]
     **/
    
    /**
     * @public
     *
     * @type { string | HTMLElement }
     **/
    domWrapper;
    
    /**
     * @public
     *
     * @type { Array<string> }
     **/
    classesOfElements = [];
    
    /**
     * @public
     *
     * @type { Array<ButtonSettingProperties> }
     **/
    propertiesOfButtons = [];
    
    /**
     * @public
     *
     * @type { string }
     **/
    id;
    
    /**
     * @public
     *
     * @type { string }
     **/
    elementClassName = 'toggle-buttons';
    
    /**
     * @public
     *
     * @type { number }
     **/
    marginLeft = 10;
    
    /**
     * @public
     *
     * @type { boolean }
     **/
    isAllTimeToggle = true;
    
    /**
     * @public
     *
     * @type { boolean }
     **/
    isSaveStorage = true;
    
    /**
     * @constructor
     *
     * @param { ToggleButtonsSetting } settings
     **/
    constructor(settings = {})
    {
        structureMerge(this, settings);
    }
}
