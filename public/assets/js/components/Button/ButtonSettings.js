import { structureMerge } from '../../tea-modules/Functions/Structures/structureMerge.js';

/**
 * @class
 *
 * @description Contains all possible settings of the Button class.
 **/
export class ButtonSettings
{
    /**
     * @typedef { Object } ButtonSettingProperties
     *
     * @property { string[] } [elementClass] - The class name of the element.
     *
     * @property { string } [elementName] - The name of the element.
     *
     * @property { string } [iconClass] - The class name of the icon element.
     *
     * @property { string } [iconId] - The id of the icon element.
     *
     * @property { string } [text] - The text for the element.
     *
     * @property { boolean } [isConfirm] - Determines whether 'confirm' window is needed.
     *
     * @property { boolean } [isToggle] - Determines whether 'toggle' logic is needed.
     *
     * @property { ClueSettingProperties } [clueSettings] - The settings of the clue component.
     *
     * @property { Object<string> } [attributes] - The attributes of the element.
     *
     * @property { string } [href] - The href of the button.
     *
     * @property { string | number } [customId] - The custom id.
     **/
    
    /**
     * @public
     *
     * @type { string[] }
     **/
    elementClass = [ 'button' ];
    
    /**
     * @public
     *
     * @type { string }
     **/
    elementName = '';
    
    /**
     * @public
     *
     * @type { string }
     **/
    iconClass = 'icon icon-size-10';
    
    /**
     * @public
     *
     * @type { string }
     **/
    loadingIconClass = 'icon icon-size-16';
    
    /**
     * @public
     *
     * @type { string }
     **/
    textClass = 'button__text';
    
    /**
     * @public
     *
     * @type { string }
     **/
    iconId;
    
    /**
     * @public
     *
     * @type { string }
     **/
    loadingIconId = 'settings-long-loader';
    
    /**
     * @public
     *
     * @type { string }
     **/
    text = '';
    
    /**
     * @public
     *
     * @type { boolean }
     **/
    isConfirm = false;
    
    /**
     * @public
     *
     * @type { boolean }
     **/
    isToggle = false;
    
    /**
     * @public
     *
     * @type { ClueSettingProperties }
     **/
    clueSettings;
    
    /**
     * @public
     *
     * @type { Object<String> }
     **/
    attributes = {};
    
    /**
     * @public
     *
     * @type { string }
     **/
    href;
    
    /**
     * @public
     *
     * @type { string | number }
     **/
    customId;
    
    /**
     * @constructor
     *
     * @param { ButtonSettingProperties } settings
     *
     * @return { ButtonSettings }
     **/
    constructor(settings)
    {
        structureMerge(this, settings);
    }
    
    /**
     * @public
     *
     * @description Sets properties of the given node to the current class.
     *
     * @param { HTMLButtonElement | HTMLAnchorElement } element
     *
     * @return { void }
     **/
    fromNode(element)
    {
        if (element.dataset.hasOwnProperty('isConfirm'))
        {
            this.isConfirm = true;
        }
        
        if (element.href)
        {
            this.href = element.href;
            
            element.removeAttribute('href');
        }
    }
}
