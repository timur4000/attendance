import { querySelector } from '../../tea-modules/Functions/DOM/Queries/querySelector.js';
import { getAttribute }  from '../../tea-modules/Functions/DOM/Attributes/getAttribute.js';


export class PasswordToggle
{
    /**
     * @public
     *
     * @type { HTMLButtonElement }
     **/
    element;
    
    /**
     * @public
     *
     * @type { HTMLInputElement }
     **/
    input;
    
    /**
     * @constructor
     *
     * @param { string | Element } selector
     *
     * @return { PasswordToggle }
     **/
    constructor(selector)
    {
        this.element = querySelector(selector);
        
        const inputId = getAttribute(this.element, 'password-toggle', { isDataAttribute: true, isAfterRemove: true });
        
        this.input = querySelector('#' + inputId);
        
        this.initialization();
    }
    
    initialization()
    {
        this.element.addEventListener('click', this._clickHandler.bind(this));
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
        this.element.classList.toggle('active');
        
        this._changeInputType();
    }
    
    /**
     * @private
     *
     * @description Changes input type by isActive property.
     *
     * @return { void }
     **/
    _changeInputType()
    {
        if (this.isActive())
        {
            this.input.type = 'text';
            
            return ;
        }
        
        this.input.type = 'password';
    }
    
    /**
     * @private
     *
     * @description Checks if the current state is active.
     *
     * @return { boolean }
     **/
    isActive()
    {
        return this.element.classList.contains('active');
    }
}
