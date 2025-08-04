import { ButtonSettings } from '../ButtonSettings.js';
import { structureMerge } from '../../../tea-modules/Functions/Structures/structureMerge.js';


/**
 * @class
 *
 * @description Contains all possible extends settings of the TabsButton class.
 **/
export class TabsButtonSettings extends ButtonSettings
{
    /**
     * @typedef { ButtonSettingProperties } TabsButtonSetting
     *
     * @property { string } tabIdentifierValue
     *
     * @property { boolean } [withView]
     *
     * @property { HTMLElement | Text | string } [viewNode]
     **/
    
    /**
     * @inheritDoc
     **/
    iconClass = 'icon icon-size-16';
    
    /**
     * @public
     *
     * @type { string }
     **/
    tabIdentifierValue;
    
    /**
     * @public
     *
     * @type { boolean }
     **/
    withView = false;
    
    /**
     * @public
     *
     * @type { HTMLElement | Text | string }
     **/
    viewNode;
    
    /**
     * @constructor
     *
     * @param { TabsButtonSetting } settings
     **/
    constructor(settings)
    {
        super(settings);
        
        structureMerge(this, settings);
    }
}
