import { querySelector } from '../../tea-modules/Functions/DOM/Queries/querySelector.js';
import { FormSettings }  from './FormSettings.js';
import { HttpRequest }   from '../../tea-modules/Classes/Requests/HttpRequest.js';
import { hasAttribute }  from '../../tea-modules/Functions/DOM/Attributes/hasAttribute.js';
import { CustomEvents }  from '../../tea-modules/Classes/CustomEvents/CustomEvents.js';
import { FormEventsClassifier } from './FormEventsClassifier.js';


/**
 * @class
 *
 * @description Implements work with form elements.
 **/
export class Form
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
     * @type { HTMLFormElement }
     **/
    element;
    
    /**
     * @public
     *
     * @type { HTMLHeadingElement }
     **/
    domError;
    
    /**
     * @public
     *
     * @type { FormSettings }
     **/
    settings;
    
    /**
     * @public
     *
     * @type { HttpRequest }
     **/
    request;
    
    /**
     * @public
     *
     * @type { boolean }
     **/
    isInit = false;
    
    /**
     * @constructor
     *
     * @param { string | HTMLFormElement } selectors
     *
     * @param { FormSettingProperties } settings
     *
     * @return { Form }
     **/
    constructor(selectors, settings)
    {
        this.customEvents = new CustomEvents();
        
        this.element = querySelector(selectors);
        
        this.settings = new FormSettings(settings);
        
        this.domError = querySelector(`[${ this.settings.errorAttribute }]`, { root: this.element });
    }
    
    /**
     * @public
     *
     * @description Implements initialize base logic.
     *
     * @return { void }
     **/
    async initialization()
    {
        if (this.isInit)
        {
            return ;
        }
        
        this.isInit = true;
        
        window.app.customInputsInitial(this.element);
        
        window.app.customNumbersInitial(this.element);
        
        window.app.airDatepickersInitial(this.element);
        
        window.app.singleCustomSelectsInitial(this.element);
        
        this.element.addEventListener('submit', this._submitHandler.bind(this));
    }
    
    /**
     * @private
     *
     * @description Implements handler for the submit event.
     *
     * @param { SubmitEvent } event
     *
     * @return { void }
     **/
    _submitHandler(event)
    {
        this.customEvents.execute(FormEventsClassifier.SUBMIT, event, this);
        
        event.preventDefault();
    }
    
    /**
     * @public
     *
     * @description Sends form data.
     *
     * @return { Promise<ResponseStandard> }
     **/
    async send()
    {
        this.request = new HttpRequest(
            {
                url: this.getAction(),
                method: this.getMethod(),
                data: this.toFormData(),
            }
        );
        
        return this.request.execute();
    }
    
    /**
     * @public
     *
     * @description Cancels request.
     *
     * @return { void }
     **/
    cancel()
    {
        if (!this.request || this.request && !this.request.isCompleted())
        {
            return ;
        }
        
        this.request.cancel();
    }
    
    /**
     * @public
     *
     * @description Implements process with error labels.
     *
     * @param { Object } errors
     *
     * @return { void }
     **/
    errorLabelsProcessing(errors)
    {
        for (let i = 0, n = this.getElements().length; i < n; i++)
        {
            const element = this.getElements()[ i ];
            
            const label = this.getErrorLabel(element);

            if (!label)
            {
                continue ;
            }
            
            const message = errors[ element.name ];
            
            if (message)
            {
                label.innerText = message.join(',');
            }
            
            label.classList.toggle(this.settings.errorLabelInactiveClass, !message);
        }
    }
    
    /**
     * @public
     *
     * @description Sets error to current form.
     *
     * @param { string } value
     *
     * @return { void }
     **/
    setError(value)
    {
        if (!this.domError)
        {
            return ;
        }
        
        this.domError.textContent = value;
        
        this.domError.classList.toggle('inactive', !value);
    }
    
    /**
     * @public
     *
     * @description Returns action of form element.
     *
     * @return { string }
     **/
    getAction()
    {
        return this.element.action;
    }
    
    /**
     * @public
     *
     * @description Returns method of form element.
     *
     * @return { string }
     **/
    getMethod()
    {
        return this.element.method.toUpperCase();
    }
    
    /**
     * @public
     *
     * @description Returns method of form element.
     *
     * @return { FormData }
     **/
    toFormData()
    {
        return new FormData(this.element);
    }
    
    /**
     * @public
     *
     * @description Reset the form.
     *
     * @return { void }
     **/
    reset()
    {
        this.element.reset();
    }
    
    /**
     * @public
     *
     * @description Returns element by the given name.
     *
     * @param { string } name
     *
     * @return { HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement }
     **/
    getElementByName(name)
    {
        return this.getElements()[name];
    }
    
    /**
     * @public
     *
     * @description Returns collection of elements.
     *
     * @return { HTMLFormControlsCollection }
     **/
    getElements()
    {
        return this.element.elements;
    }
    
    /**
     * @public
     *
     * @description Returns error label element by the given element.
     *
     * @param { HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement } element
     *
     * @return { HTMLLabelElement | null }
     **/
    getErrorLabel(element)
    {
        if (!element.labels)
        {
            return null;
        }
        
        for (let i = 0, n = element.labels.length; i < n; i++)
        {
            if (hasAttribute(element.labels[ i ], this.settings.errorLabelAttribute))
            {
                return element.labels[ i ];
            }
        }
        
        return null;
    }
}
