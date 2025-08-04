import { Button } from '../Button.js';
import { TabsButtonSettings } from './TabsButtonSettings.js';


/**
 * @description Implements extends logic of the Button component.
 *
 * @extends Button
 **/
export class TabsButton extends Button
{
    /**
     * @public
     *
     * @type { TabsButtonSettings }
     **/
    settings;
    
    /**
     * @constructor
     *
     * @param { TabsButtonSetting | TabsButtonSettings } settings
     *
     * @param { HTMLElement | string ? } element
     **/
    constructor(settings, element)
    {
        settings = settings instanceof TabsButtonSettings ? settings : new TabsButtonSettings(settings);
        
        super(settings, element);
        
        this.settings = settings;
    }
    
    /**
     * @public
     *
     * @description Implements process of the tab identifier.
     *
     * @param { string } tabIdentifierName
     *
     * @return { void }
     **/
    tabIdentifierProcessing(tabIdentifierName)
    {
        this.setAttribute(tabIdentifierName, this.settings.tabIdentifierValue);
    }
}
