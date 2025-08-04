import { CustomNumberSettings } from './CustomNumberSettings.js';
import { querySelector }        from '../../tea-modules/Functions/DOM/Queries/querySelector.js';
import { isUndefined }          from '../../tea-modules/Functions/Is/isUndefined.js';
import { isEmpty }              from '../../tea-modules/Functions/Is/isEmpty.js';
import { createElement }        from '../../tea-modules/Functions/DOM/Elements/createElement.js';
import { createSvgElement }     from '../../tea-modules/Functions/DOM/Elements/createSvgElement.js';
import { CustomEvents }         from '../../tea-modules/Classes/CustomEvents/CustomEvents.js';
import { CustomNumberEventsClassifier } from './CustomNumberEventsClassifier.js';
import { CustomNumberModifiersClassifier } from './CustomNumberModifiersClassifier.js';


/**
 * @class
 *
 * @description Implements logic for the custom number.
 **/
export class CustomNumber
{
    /**
     * @public
     *
     * @type { CustomNumber[] }
     **/
    static instances = [];
    
    /**
     * @public
     *
     * @type { CustomEvents }
     **/
    customEvents;
    
    /**
     * @public
     *
     * @type { HTMLDivElement }
     **/
    domElement;
    
    /**
     * @public
     *
     * @type { CustomNumberSettings }
     **/
    settings;
    
    /**
     * @public
     *
     * @type { HTMLInputElement }
     **/
    domInput;
    
    /**
     * @public
     *
     * @type { HTMLButtonElement }
     **/
    domMinusButton;
    
    /**
     * @public
     *
     * @type { HTMLButtonElement }
     **/
    domAddButton;
    
    /**
     * @public
     *
     * @type { number }
     **/
    _value = 0;
    
    /**
     * @constructor
     *
     * @param { HTMLDivElement ? } domElement
     *
     * @param { CustomNumberSettingProperties ? } settings
     *
     * @return { CustomNumber }
     **/
    constructor(domElement, settings = {})
    {
        CustomNumber.instances.push(this);
        
        this.customEvents = new CustomEvents();
        
        this.settings = new CustomNumberSettings(settings);
        
        this.domElement = domElement || this._createElement();
        
        this.domInput = querySelector(`[data-custom-number-element="${ this.settings.inputAttribute }"]`, { root: this.domElement });
        
        this.settings.fromAttribute(this.domInput);
        
        this.domMinusButton = querySelector(`[data-custom-number-element="${ this.settings.minusButtonAttribute }"]`, { root: this.domElement });
        
        this.domAddButton = querySelector(`[data-custom-number-element="${ this.settings.addButtonAttribute }"]`, { root: this.domElement });
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
        this.domInput.readOnly = this.settings.readonly;
        
        if (!isUndefined(this.settings.min))
        {
            this.domInput.min = this.settings.min.toString();
        }
        
        if (!isUndefined(this.settings.max))
        {
            this.domInput.max = this.settings.max.toString();
        }
        
        this.domElement.addEventListener('click', this._elementClickHandler.bind(this));
        
        this.domInput.addEventListener('input', this._domInputClickHandler.bind(this));
        
        this.value = this.domInput.value;
    }

    /**
     * @private
     *
     * @description Creates html node of the element.
     *
     * @return { HTMLElement }
     **/
    _createElement()
    {
        const minusButtonSvg = createSvgElement(this.settings.minusButtonSvgId, { class: this.settings.minusButtonSvgClass });
        
        const minusButton = createElement('button', { type: 'button', class: this.settings.minusButtonClass, [ this.settings.componentAttribute ]: this.settings.minusButtonAttribute }, [ minusButtonSvg ]);
        
        const input = createElement('input', { type: 'text', class: this.settings.inputClass, [ this.settings.componentAttribute ]: this.settings.inputAttribute });
        
        const addButtonSvg = createSvgElement(this.settings.addButtonSvgId, { class: this.settings.addButtonSvgClass });
        
        const addButton = createElement('button', { type: 'button', class: this.settings.addButtonClass, [ this.settings.componentAttribute ]: this.settings.addButtonAttribute }, [ addButtonSvg ]);
        
        return createElement('div', { class: this.settings.elementClass, [ this.settings.elementAttribute ]: '' }, [ minusButton, input, addButton ]);
    }
    
    /**
     * @private
     *
     * @description Implements handler for element click event.
     *
     * @param { Element } target
     *
     * @return { void }
     **/
    _elementClickHandler({ target })
    {
        const button = target.closest(`button`);
        
        if (!button)
        {
            return ;
        }
        
        const attribute = button.attributes.getNamedItem(this.settings.componentAttribute);
        
        if (!attribute)
        {
            return ;
        }
        
        switch (attribute.value)
        {
            case this.settings.addButtonAttribute:
            {
                this.increase();
                
                break ;
            }
            case this.settings.minusButtonAttribute:
            {
                this.decrease();
                
                break ;
            }
        }
    }
    
    /**
     * @private
     *
     * @description Implements handler for input element input event.
     *
     * @param { KeyboardEvent } event
     *
     * @return { void }
     **/
    _domInputClickHandler(event)
    {
        const value = this.domInput.value.replace(/\D|^0/g, '');
        
        this.domInput.value = value;
        
        this.value = value;
    }
    
    /**
     * @public
     *
     * @description Decreases the current value.
     **/
    decrease()
    {
        this.value -= this.settings.step;
        
        this.customEvents.execute(CustomNumberEventsClassifier.CHANGE, this.value, this);
    }
    
    /**
     * @public
     *
     * @description Increases the current value.
     **/
    increase()
    {
        this.value += this.settings.step;
        
        this.customEvents.execute(CustomNumberEventsClassifier.CHANGE, this.value, this);
    }
    
    /**
     * @public
     *
     * @description Implements process of min / max value.
     *
     * @return { number }
     **/
    minMaxProcessing(value)
    {
        if (!isUndefined(this.settings.min) && value < this.settings.min)
        {
            value = this.settings.min;
        }
        
        if (!isUndefined(this.settings.max) && value > this.settings.max)
        {
            value = this.settings.max;
        }
        
        return value;
    }
    
    /**
     * @public
     *
     * @return { number }
     **/
    get value()
    {
        return this._value;
    }
    
    /**
     * @public
     *
     * @param { number | string } value
     **/
    set value(value)
    {
        if (isEmpty(value))
        {
            value = 0;
        }
        
        value = parseFloat(value);
        
        value = this.minMaxProcessing(value);
        
        this._value = value;
        
        this.domInput.value = this.value.toFixed(this.settings.fractionDigits);
    }
    
    /**
     * @public
     *
     * @description Sets the given modifier to class list of the element by the given force.
     *
     * @param { CustomNumberModifiersClassifier } modifier
     *
     * @param { boolean } force
     *
     * @return { void }
     **/
    setModifier(modifier, force)
    {
        this.domElement.classList.toggle(modifier, force);
    }
    
    /**
     * @public
     *
     * @description Checks if the given modifier contained in the element`s class list.
     *
     * @param { CustomNumberModifiersClassifier } modifier
     *
     * @return { boolean }
     **/
    hasModifier(modifier)
    {
        return this.domElement.classList.contains(modifier);
    }
    
    /**
     * @static
     *
     * @public
     *
     * @description Returns instance by the given dom element.
     *
     * @param { Element } domElement
     *
     * @return { CustomNumber | null }
     **/
    static getInstanceByDomElement(domElement)
    {
        return this.instances.find(a => a.domElement === domElement);
    }
    
    /**
     * @static
     *
     * @public
     *
     * @description Returns instance by the given input element.
     *
     * @param { Element } input
     *
     * @return { CustomNumber | null }
     **/
    static getInstanceByInputElement(input)
    {
        return this.instances.find(a => a.domInput === input);
    }
}