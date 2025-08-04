import { TableButtonSettings } from './Settings/TableButtonSettings.js';
import { Button }              from '../Button/Button.js';


/**
 * @class
 *
 * @description Implement help work with the table button component.
 **/
export class TableButton
{
    /**
     * @public
     *
     * @type { TableButtonSettings }
     **/
    settings;
    
    /**
     * @public
     *
     * @type { Button }
     **/
    button;
    
    /**
     * @constructor
     *
     * @param { TableButtonSettingProperties } settings
     **/
    constructor(settings = {})
    {
        this.settings = new TableButtonSettings(settings);
        
        this.button = new Button(this.settings.buttonSettings);
        
        this.button.setModifier(this.settings.type, true);
    }
    
    /**
     * @public
     *
     * @description Returns element of the button component.
     *
     * @return { HTMLButtonElement }
     **/
    getElement()
    {
        return this.button.getElement();
    }
    
    /**
     * @public
     *
     * @description Returns position of the table.
     *
     * @return { TablePositionsClassifier }
     **/
    getPosition()
    {
        return this.settings.position;
    }
    
    /**
     * @public
     *
     * @description Returns name of the button component.
     *
     * @return { string }
     **/
    getName()
    {
        return this.button.getName();
    }
}
