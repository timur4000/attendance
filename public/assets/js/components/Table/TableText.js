import { TableTextSettings } from './Settings/TableTextSettings.js';
import { createElement }     from '../../tea-modules/Functions/DOM/Elements/createElement.js';


/**
 * @class
 *
 * @description Implements help work with the table text component.
 **/
export class TableText
{
    /**
     * @public
     *
     * @type { TableTextSettings }
     **/
    settings;
    
    /**
     * @public
     *
     * @type { HTMLDivElement }
     **/
    element;
    
    /**
     * @private
     *
     * @type { Element | Text }
     **/
    _value;
    
    /**
     * @constructor
     *
     * @param { HTMLElement | string ? } value
     *
     * @param { TableTextSettingProperties ? } settings
     *
     * @return { TableText }
     **/
    constructor(value = '', settings)
    {
        this.settings = new TableTextSettings(settings);
        
        this.value = value;
        
        this.element = this._createElement();
        
        this.appendValue(value);
    }
    
    /**
     * @public
     *
     * @description Setter for the value property.
     *
     * @param { HTMLElement | string } value
     *
     * @return { void }
     **/
    set value(value)
    {
        this._value = value;
    }
    
    /**
     * @private
     *
     * @description Creates html node of the base element.
     *
     * @return { HTMLDivElement }
     **/
    _createElement()
    {
        return createElement('div', { class: this.settings.elementClass }, [ this.value ]);
    }
    
    /**
     * @public
     *
     * @description Sets the given value to the element.
     *
     * @param { HTMLElement | string } value
     *
     * @return { void }
     **/
    appendValue(value)
    {
        this.clear();
        
        this.element.append(value);
    }
    
    /**
     * @public
     *
     * @description Clears all inner nodes of the element.
     *
     * @return { void }
     **/
    clear()
    {
        this.element.innerHTML = '';
    }
    
    /**
     * @public
     *
     * @description Returns current html element.
     *
     * @return { HTMLDivElement }
     **/
    getElement()
    {
        return this.element;
    }
    
    /**
     * @public
     *
     * @description Returns position value of settings.
     *
     * @return { TablePositionsClassifier }
     **/
    getPosition()
    {
        return this.settings.position;
    }
}
