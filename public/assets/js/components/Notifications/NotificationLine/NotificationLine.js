import { NotificationLineSettings } from './NotificationLineSettings.js';
import { createElement }            from '../../../tea-modules/Functions/DOM/Elements/createElement.js';


/**
 * @class
 *
 * @description Implements logic of the notification line component.
 **/
export class NotificationLine
{
    /**
     * @public
     *
     * @type { NotificationLineSettings }
     **/
    settings;
    
    /**
     * @public
     *
     * @type { HTMLDivElement }
     **/
    element;
    
    /**
     * @constructor
     *
     * @param { NotificationLineSettingProperties } settings
     *
     * @return { NotificationLine }
     **/
    constructor(settings)
    {
        this.settings = new NotificationLineSettings(settings);
        
        this.element = this._createElement();
        
        this.setState(this.settings.type, true);
    }
    
    /**
     * @private
     *
     * @description Implements creates html node of the element.
     *
     * @return { HTMLElement }
     **/
    _createElement()
    {
        return createElement('div', { class: this.settings.elementClass }, []);
    }
    
    /**
     * @public
     *
     * @description Sets the given state value to the element by the given force.
     *
     * @param { string } value
     *
     * @param { boolean } force
     *
     * @return { void }
     **/
    setState(value, force)
    {
        this.element.classList.toggle(value, force);
    }
    
    /**
     * @public
     *
     * @description Checks if the element contain a given state value.
     *
     * @param { string } value
     *
     * @return { void }
     **/
    checkState(value)
    {
        this.element.classList.contains(value);
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
     * @description Appends the given element to the current element.
     *
     * @param { Element } element
     *
     * @return { void }
     **/
    append(element)
    {
        this.element.append(element);
    }
}
