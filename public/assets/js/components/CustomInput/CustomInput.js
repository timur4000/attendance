import { querySelector } from '../../tea-modules/Functions/DOM/Queries/querySelector.js';


export class CustomInput
{
    /**
     * @public
     *
     * @type { HTMLElement }
     **/
    element;
    
    /**
     * @public
     *
     * @type { string }
     **/
    inputOuterSelector;
    
    /**
     * @public
     *
     * @type { HTMLElement }
     **/
    inputOuter;
    
    /**
     * @public
     *
     * @type { HTMLInputElement }
     **/
    input;
    
    /**
     * @public
     *
     * @type { NodeListOf<HTMLLabelElement> }
     **/
    inputLabels;
    
    /**
     * @public
     *
     * @type { boolean }
     **/
    isFocus = false;
    
    /**
     * @public
     *
     * @type { string }
     **/
    _classHover = 'hover';
    
    /**
     * @private
     *
     * @type { CustomInput[] }
     **/
    static _instances = [];
    
    /**
     *
     * @constructor
     *
     * @param { string | HTMLElement } selector
     *
     * @param { string } inputOuterSelector
     *
     * @return CustomInput
     **/
    constructor(selector, inputOuterSelector = '.input-outer')
    {
        CustomInput._instances.push(this);
        
        this.element = querySelector(selector);
        
        this.inputOuterSelector = inputOuterSelector;
        
        this.inputOuter = this.element.closest(this.inputOuterSelector);
        
        this.input = querySelector('.custom-input__input', { root: this.element });
        
        this.inputLabels = this.input.labels;
        
        this.initialization();
    }
    
    /**
     * @public
     *
     * @description Initialize basic methods and events.
     *
     * @return { void }
     **/
    initialization()
    {
        this.element.addEventListener('click', this._clickHandler.bind(this));
        
        this.input.addEventListener('focus', this._focusHandler.bind(this));
        
        this.input.addEventListener('blur', this._blurHandler.bind(this));
        
        [this.element, ...this.inputLabels].forEach(element =>
        {
            element.addEventListener('mouseenter', this._mouseEnterHandler.bind(this));
            
            element.addEventListener('mouseleave', this._mouseLeaveHandler.bind(this));
        })
    }
    
    /**
     * @private
     *
     * @description Handler for element click event.
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
        
        this._classToggle(true);
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
        
        this._classToggle(false);
    }
    
    /**
     * @private
     *
     * @description Handler for input and label mouse-leave event.
     *
     * @return { void }
     **/
    _mouseLeaveHandler(event)
    {
        if (this.isFocus)
        {
            return ;
        }
        
        this._classToggle(false);
    }
    
    /**
     * @private
     *
     * @description Handler for input and label mouse-enter event.
     *
     * @return { void }
     **/
    _mouseEnterHandler()
    {
        if (this.isFocus)
        {
            return ;
        }
        
        this._classToggle(true);
    }
    
    /**
     * @private
     *
     * @description Toggles class on element.
     *
     * @param { boolean } force
     *
     * @return { void }
     **/
    _classToggle(force)
    {
        this.inputOuter.classList.toggle(this._classHover, force);
    }
    
    /**
     * @public
     *
     * @description Finds and returns instance by the given element.
     *
     * @param { HTMLElement } element
     *
     * @return { CustomInput | undefined }
     **/
    static getInstanceByElement(element)
    {
        return CustomInput._instances.find(instance => instance.element === element);
    }
    
    /**
     * @public
     *
     * @description Finds and returns instance by the given input element.
     *
     * @param { HTMLInputElement } input
     *
     * @return { CustomInput | undefined }
     **/
    static getInstanceByInput(input)
    {
        return CustomInput._instances.find(instance => instance.input === input);
    }
    
    /**
     * @public
     *
     * @description Finds and returns instance by the given input outer element.
     *
     * @param { HTMLInputElement } inputOuter
     *
     * @return { CustomInput | undefined }
     **/
    static getInstanceByInputOuter(inputOuter)
    {
        return CustomInput._instances.find(instance => instance.inputOuter === inputOuter);
    }
}