import { ToggleButtonsSettings }     from './ToggleButtonsSettings.js';
import { Button }                    from '../Button/Button.js';
import { createElement }             from '../../tea-modules/Functions/DOM/Elements/createElement.js';
import { CustomEvents }              from '../../tea-modules/Classes/CustomEvents/CustomEvents.js';
import { ToggleButtonsEventsClassifier } from './ToggleButtonsEventsClassifier.js';
import { ButtonEventsClassifier } from '../Button/ButtonEventsClassifier.js';
import { Storage } from '../../tea-modules/Classes/Storage/Storage.js';
import { isEmpty } from '../../tea-modules/Functions/Is/isEmpty.js';
import { querySelector } from '../../tea-modules/Functions/DOM/Queries/querySelector.js';


/**
 * @description Implements manage with button-toggle components.
 **/
export class ToggleButtons
{
    /**
     * @public
     *
     * @type { CustomEvents }
     **/
    customEvents;
    
    /**
     * @public
     *
     * @type { ToggleButtonsSettings }
     **/
    settings;
    
    /**
     * @public
     *
     * @type { HTMLDivElement }
     **/
    domWrapper;
    
    /**
     * @public
     *
     * @type { Array<Button> }
     **/
    buttons = [];
    
    /**
     * @constructor
     *
     * @param { (ToggleButtonsSettings | ToggleButtonsSetting) } settings
     **/
    constructor(settings = {})
    {
        this.customEvents = new CustomEvents();
        
        this.settings = settings instanceof ToggleButtonsSettings ? settings : new ToggleButtonsSettings(settings);
        
        this.domWrapper = this.settings.domWrapper ? querySelector(this.settings.domWrapper) : this._createWrapper();
    }
    
    /**
     * @public
     *
     * @description Implements initialize base logic.
     *
     * @return { void }
     **/
    initialization()
    {
        this._buttonsProcessing();
    }
    
    /**
     * @private
     *
     * @description Implements process of the buttons.
     **/
    _buttonsProcessing()
    {
        for (let i = 0, n = this.settings.propertiesOfButtons.length; i < n; i++)
        {
            const propertiesOfButton = this.settings.propertiesOfButtons[ i ];
            
            propertiesOfButton.elementClass = this.settings.classesOfElements;
            
            propertiesOfButton.isToggle = false;
            
            const buttonInstance = new Button(propertiesOfButton);

            if (i > 0)
            {
                buttonInstance.getElement().style.marginLeft = this.settings.marginLeft + 'px';
            }
            
            buttonInstance.customEvents.subscribe(ButtonEventsClassifier.CLICK, this._buttonClickHandler.bind(this));
            
            buttonInstance.customEvents.subscribe(ButtonEventsClassifier.TOGGLE, this._buttonToggleHandler.bind(this));
            
            this.domWrapper.append(buttonInstance.getElement());
            
            this.buttons.push(buttonInstance);
            
            if (!this.settings.isSaveStorage || !this.hasInStorage() && i === 0 || buttonInstance.getName() === this.getFromStorage())
            {
                this.toggle(buttonInstance);
            }
        }
    }
    
    /**
     * @private
     *
     * @description Implements a click handler for each button component.
     *
     * @param { MouseEvent } event
     *
     * @param { Button } instance
     *
     * @return { void }
     **/
    _buttonClickHandler(event, instance)
    {
        this.toggle(instance);
    }
    
    /**
     * @private
     *
     * @description Implements a toggle handler for each button component.
     *
     * @param { boolean } state
     *
     * @param { Button } instance
     *
     * @return { void }
     **/
    _buttonToggleHandler(state, instance) {}
    
    /**
     * @private
     *
     * @description Implements a before-toggle handler for each button component.
     *
     * @param { Button } instance
     *
     * @return { void }
     **/
    _buttonBeforeToggleHandler(instance) {}
    
    /**
     * @public
     *
     * @description Implements a toggle to the specified button.
     *
     * @param { Button } button
     *
     * @return { void }
     **/
    toggle(button)
    {
        if (this.settings.isAllTimeToggle && this.getToggleButton() === button)
        {
            return ;
        }
        
        if (this.getToggleButton() && this.getToggleButton() !== button)
        {
            this.getToggleButton().toggle();
        }
        
        button.toggle();
        
        if (this.settings.isSaveStorage)
        {
            this.saveToStorage(button);
        }
        
        this.customEvents.execute(ToggleButtonsEventsClassifier.TOGGLE,button.hasToggle(), button, this);
    }
    
    /**
     * @private
     *
     * @description Creates html node of the wrapper element.
     *
     * @return { HTMLDivElement }
     **/
    _createWrapper()
    {
        return createElement('div', { class: this.settings.elementClassName });
    }
    
    /**
     * @public
     *
     * @description Saves the specified button name to storage.
     *
     * @param { Button } button
     *
     * @return { void }
     **/
    saveToStorage(button)
    {
        Storage.set(this.settings.id, button.getName());
    }
    
    /**
     * @public
     *
     * @description Returns button instance from storage.
     *
     * @return { Button }
     **/
    getInstanceFromStorage()
    {
        return this.getToggleButtonByName(Storage.get(this.settings.id));
    }
    
    /**
     * @public
     *
     * @description Returns button name from storage.
     *
     * @return { string }
     **/
    getFromStorage()
    {
        return Storage.get(this.settings.id);
    }
    
    /**
     * @public
     *
     * @description Determines whether the storage has some button name.
     *
     * @return { boolean }
     **/
    hasInStorage()
    {
        return !isEmpty(Storage.get(this.settings.id));
    }
    
    /**
     * @public
     *
     * @description Returns toggle button.
     *
     * @return { Button }
     **/
    getToggleButton()
    {
        return this.buttons.find(button => button.hasToggle());
    }
    
    /**
     * @public
     *
     * @description Returns toggle button by the specified name.
     *
     * @param { string } name
     *
     * @return { Button }
     **/
    getToggleButtonByName(name)
    {
        return this.buttons.find(button => button.getName() === name);
    }
    
    /**
     * @public
     *
     * @description Returns wrapper element.
     *
     * @return { HTMLDivElement }
     **/
    getWrapper()
    {
        return this.domWrapper;
    }
}
