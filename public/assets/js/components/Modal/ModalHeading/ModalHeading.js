import { ModalHeadingSettings } from './ModalHeadingSettings.js';
import { createElement }     from '../../../tea-modules/Functions/DOM/Elements/createElement.js';


/**
 * @class
 *
 * @description Implements logic with the modal heading component.
 **/
export class ModalHeading
{
    /**
     * @public
     *
     * @type { string }
     **/
    text;
    
    /**
     * @public
     *
     * @type {ModalHeadingSettings}
     **/
    settings;
    
    /**
     * @public
     *
     * @type { HTMLHeadingElement }
     **/
    element;
    
    /**
     * @constructor
     *
     * @param { string } text
     *
     * @param { ModalHeadingSettingProperties } settings
     *
     * @return { ModalLine }
     **/
    constructor(text, settings = {})
    {
        this.text = text;
        
        this.settings = new ModalHeadingSettings(settings);
        
        this.element = this._createElement();
    }
    
    /**
     * @private
     *
     * @description Creates and returns html node of the element.
     *
     * @return { HTMLHeadingElement }
     **/
    _createElement()
    {
        return createElement('h2', { class: this.settings.elementClass }, [ this.text ]);
    }
    
    /**
     * @public
     *
     * @description Sets the given value to textContent of element.
     *
     * @param { string } value
     *
     * @return { void }
     **/
    setText(value)
    {
        this.element.textContent = value;
    }
}
