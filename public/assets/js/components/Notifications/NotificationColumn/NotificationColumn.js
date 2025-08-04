import { NotificationColumnSettings } from './NotificationColumnSettings.js';
import { createElement }              from '../../../tea-modules/Functions/DOM/Elements/createElement.js';


/**
 * @class
 *
 * @description Implements logic of the notification column component.
 **/
export class NotificationColumn
{
    /**
     * @public
     *
     * @type { NotificationColumnSettings }
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
     * @param { NotificationColumnSettingProperties } settings
     *
     * @return { NotificationColumn }
     **/
    constructor(settings)
    {
        this.settings = new NotificationColumnSettings(settings);
        
        this.element = this._createElement();
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
        return createElement('section', { class: this.settings.elementClass });
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
}
