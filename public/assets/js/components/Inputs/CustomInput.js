import { querySelector } from '../../tea-modules/Functions/DOM/Queries/querySelector.js';
import { createElement } from '../../tea-modules/Functions/DOM/Elements/createElement.js';
import { InputOuter }    from './InputOuter.js';
import { CustomEvents }  from '../../tea-modules/Classes/CustomEvents/CustomEvents.js';
import { InputEventsClassifier } from './Standards/InputEventsClassifier.js';
import { InputStatesClassifier } from './Standards/InputStatesClassifier.js';
import { setAttribute } from '../../tea-modules/Functions/DOM/Attributes/setAttribute.js';
import { InputOuterSettings } from './InputOuterSettings.js';
import { AirDatepickerOuter } from '../AirDatepickerOuter/AirDatepickerOuter.js';


export class CustomInput
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
     * @type { CustomInputSettings }
     **/
    settings;
    
    /**
     * @public
     *
     * @type { HTMLDivElement }
     **/
    element;
    
    /**
     * @public
     *
     * @type { HTMLInputElement }
     **/
    input;
    
    /**
     * @public
     *
     * @type { HTMLLabelElement }
     **/
    label;
    
    /**
     * @public
     *
     * @type { FormGroup }
     **/
    formGroup;
    
    /**
     * @public
     *
     * @type { InputOuter }
     **/
    inputOuter;
    
    /**
     * @public
     *
     * @type { boolean }
     **/
    isFocus = false;
    
    /**
     * @public
     *
     * @type { number }
     **/
    keyupTimeout = 0;
    
    /**
     * @public
     *
     * @type { number }
     **/
    inputTimeout = 0;
    
    /**
     * @public
     *
     * @type { Array<HTMLLabelElement> }
     **/
    iconLabels = [];
    
    /**
     * @public
     *
     * @type { AirDatepickerOuter }
     **/
    datepicker;
    
    /**
     * @constructor
     *
     * @param { CustomInputSettings } settings
     *
     * @param { HTMLDivElement | string ? } element
     **/
    constructor(settings, element)
    {
        this.customEvents = new CustomEvents();
        
        this.settings = settings;
        
        this.input = this._createInput();
        
        this.label = this._createLabel();
        
        this.element = element ? querySelector(element) : this._createElement();
        
        this.withInputOuter() && this._inputOuterProcessing();
    }
    
    /**
     * @public
     *
     * @description Implements initialize base methods and logic.
     *
     * @return { void }
     **/
    async initialization()
    {
        this.input.addEventListener('click', this._clickHandler.bind(this));
        
        this.input.addEventListener('focus', this._focusHandler.bind(this));
        
        this.input.addEventListener('blur', this._blurHandler.bind(this));
        
        this.input.addEventListener('keyup', this._keyupHandler.bind(this));
        
        this.input.addEventListener('input', this._inputHandler.bind(this));
        
        if (this.settings.isDatepicker)
        {
            await AirDatepickerOuter.load();
            
            this.datepicker = new AirDatepickerOuter(this.input, this.settings.datepickerSettings);
            
            await this.datepicker.initialization();
        }
        
        [ this.element, ...this.input.labels, ...this.iconLabels ].forEach(this._setEventsEachProcessing.bind(this));
    }
    
    /**
     * @private
     *
     * @description Implements a process of InputOuter component.
     *
     * @return { void }
     **/
    _inputOuterProcessing()
    {
        const settings = new InputOuterSettings(this.settings.inputOuterSettings);
        
        this.inputOuter = InputOuter.getInstanceByIdentifier(settings.identifier) || new InputOuter(settings);
        
        this.inputOuter.addCustomInput(this);
        
        !this.inputOuter.isInit && this.inputOuter.initialization();
    }
    
    /**
     * @private
     *
     * @description Implements a process to set events for each element.
     *
     * @param { HTMLElement } element
     *
     * @return { void }
     **/
    _setEventsEachProcessing(element)
    {
        element.addEventListener('mouseenter', this._mouseEnterHandler.bind(this));
        
        element.addEventListener('mouseleave', this._mouseLeaveHandler.bind(this));
    }
    
    /**
     * @private
     *
     * @description Handler for input click event.
     *
     * @return { void }
     **/
    _clickHandler()
    {
        this.input.focus();
    }
    
    /**
     * @private
     *
     * @description Handler for input focus event.
     *
     * @return { void }
     **/
    _focusHandler()
    {
        this.isFocus = true;
        
        this._hoverProcessing(true);
    }
    
    /**
     * @private
     *
     * @description Handler for input blur event.
     *
     * @return { void }
     **/
    _blurHandler()
    {
        this.isFocus = false;
        
        this._hoverProcessing(false);
    }
    
    /**
     * @private
     *
     * @description Handler for input keyup event.
     *
     * @return { void }
     **/
    _keyupHandler()
    {
        clearTimeout(this.keyupTimeout);
        
        this.keyupTimeout = setTimeout(this._keyupTimeoutHandler.bind(this), 300);
    }
    
    /**
     * @public
     *
     * @description Implements handler for the input keyup timeout.
     *
     * @param { KeyboardEvent } event
     *
     * @return { void }
     **/
    _keyupTimeoutHandler(event)
    {
        this.customEvents.execute(InputEventsClassifier.KEY_UP, this.input, this);
    }
    
    /**
     * @private
     *
     * @description Handler for input input event.
     *
     * @return { void }
     **/
    _inputHandler()
    {
        clearTimeout(this.inputTimeout);
        
        this.inputTimeout = setTimeout(this._inputTimeoutHandler.bind(this), 300);
    }
    
    /**
     * @public
     *
     * @description Implements handler for the input input timeout.
     *
     * @param { KeyboardEvent } event
     *
     * @return { void }
     **/
    _inputTimeoutHandler(event)
    {
        this.customEvents.execute(InputEventsClassifier.INPUT, this.input, this);
    }
    
    /**
     * @private
     *
     * @description Handler for input and labels mouse-enter event.
     *
     * @return { void }
     **/
    _mouseEnterHandler()
    {
        if (this.isFocus)
        {
            return ;
        }
        
        this._hoverProcessing(true);
    }
    
    /**
     * @private
     *
     * @description Handler for input and labels mouse-leave event.
     *
     * @return { void }
     **/
    _mouseLeaveHandler(event)
    {
        if (this.isFocus)
        {
            return ;
        }
        
        this._hoverProcessing(false);
    }
    
    /**
     * @private
     *
     * @description Implements process of hover.
     *
     * @param { boolean } force
     *
     * @return { void }
     **/
    _hoverProcessing(force)
    {
        if (!this.withInputOuter())
        {
            return ;
        }
        
        this.setState(InputStatesClassifier.HOVER, force);
    }

    /**
     * @private
     *
     * @description Creates html node of the element.
     *
     * @return { HTMLDivElement }
     **/
    _createElement()
    {
        return createElement('div', { class: this.settings.elementClassName, }, [ this.input, this.label ]);
    }
    
    /**
     * @private
     *
     * @description Creates html node of the input.
     *
     * @return { HTMLInputElement }
     **/
    _createInput()
    {
        return createElement('input',
            {
                name: this.settings.inputName,
                type: this.settings.inputType,
                id: this.settings.inputId,
                class: this.settings.inputClassName,
                placeholder: this.settings.inputPlaceholder,
                value: this.settings.inputValue,
            });
    }
    
    /**
     * @private
     *
     * @description Creates html node of the label.
     *
     * @return { HTMLLabelElement }
     **/
    _createLabel()
    {
        return createElement('label', { class: this.settings.labelClassName, for: this.settings.inputId }, [ this.settings.title ]);
    }
    
    /**
     * @public
     *
     * @description Sets the specified state to the element.
     *
     * @param { InputStatesClassifier } state
     *
     * @param { boolean } force
     *
     * @return { void }
     **/
    setState(state, force)
    {
        this.element.classList.toggle(state, force);
    }
    
    /**
     * @public
     *
     * @description Sets the given attribute to the current element.
     *
     * @param { string } qualifiedName
     *
     * @param { string ? } value
     *
     * @return { void }
     **/
    setAttribute(qualifiedName, value = '')
    {
        setAttribute(this.element, qualifiedName, value);
    }
    
    /**
     * @public
     *
     * @description Returns element.
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
     * @description Returns input outer element.
     *
     * @return { HTMLDivElement }
     **/
    getInputOuter()
    {
        return this.inputOuter.getElement();
    }
    
    /**
     * @public
     *
     * @description Determines whether InputOuter component is needed.
     *
     * @return { boolean }
     **/
    withInputOuter()
    {
        return this.settings.withInputOuter;
    }
    
    /**
     * @public
     *
     * @description Returns name of the input.
     *
     * @return { string }
     **/
    getName()
    {
        return this.input.name;
    }
    
    /**
     * @public
     *
     * @description Returns value of the input.
     *
     * @return { string }
     **/
    getValue()
    {
        return this.input.value;
    }
}
