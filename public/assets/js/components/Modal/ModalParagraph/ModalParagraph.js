import { createElement } from '../../../tea-modules/Functions/DOM/Elements/createElement.js';
import { ModalParagraphSettings } from './ModalParagraphSettings.js';


/**
 * @class
 *
 * @description Implements logic of ModalParagraph component.
 **/
export class ModalParagraph
{
    /**
     * @public
     *
     * @type { HTMLParagraphElement }
     **/
    element;
    
    /**
     * @public
     *
     * @type { ModalParagraphSettings }
     **/
    settings;
    
    /**
     * @public
     *
     * @type { string }
     **/
    text;
    
    /**
     * @constructor
     *
     * @return { ModalParagraph }
     **/
    constructor(text, settings)
    {
        this.settings = new ModalParagraphSettings(settings);
        
        this.text = text;
        
        this.element = this._createElement();
    }
    
    /**
     * @private
     *
     * @description Creates and returns html node of the element.
     *
     * @return { HTMLParagraphElement }
     **/
    _createElement()
    {
        return createElement('p', { class: this.settings.elementClass }, [ this.text ]);
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
