import { ModalLineSettings } from './ModalLineSettings.js';
import { createElement }     from '../../../tea-modules/Functions/DOM/Elements/createElement.js';
import { ModalLineTypesClassifier } from '../Classifiers/ModalLineTypesClassifier.js';


/**
 * @class
 *
 * @description Implements logic with the modal line component.
 **/
export class ModalLine
{
    /**
     * @public
     *
     * @type { ModalLineSettings }
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
     * @param { ModalLineSettingProperties } settings
     *
     * @return { ModalLine }
     **/
    constructor(settings = {})
    {
        this.settings = new ModalLineSettings(settings);
        
        this.element = this._createElement();
        
        this.setType(this.settings.type, true);
        
        this.setPosition(this.settings.position, true);
        
        this.setType(ModalLineTypesClassifier.SINGLE, this.settings.isSingle);
        
        this.setType(ModalLineTypesClassifier.DOUBLE, !this.settings.isSingle);
    }
    
    /**
     * @private
     *
     * @description Creates and returns html node of the element.
     *
     * @return { HTMLDivElement }
     **/
    _createElement()
    {
        return createElement('div', { class: this.settings.elementClass }, []);
    }
    
    /**
     * @public
     *
     * @description Appends the given element to the element.
     *
     * @param { HTMLElement } element
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
     * @description Sets the given type to the element by the force.
     *
     * @param { ModalLineTypesClassifier } value
     *
     * @param { boolean } force
     *
     * @return { void }
     **/
    setType(value, force)
    {
        this.element.classList.toggle(value, force);
    }
    
    /**
     * @public
     *
     * @description Checks if the element contains the given type.
     *
     * @param { ModalLineTypesClassifier } value
     *
     * @return { boolean }
     **/
    checkType(value)
    {
        return this.element.classList.contains(value);
    }
    
    /**
     * @public
     *
     * @description Sets the given position to the element by the force.
     *
     * @param { ModalLinePositionsClassifier } value
     *
     * @param { boolean } force
     *
     * @return { void }
     **/
    setPosition(value, force)
    {
        this.element.classList.toggle(value, force);
    }
    
    /**
     * @public
     *
     * @description Checks if the element contains the given position.
     *
     * @param { ModalLinePositionsClassifier } value
     *
     * @return { boolean }
     **/
    checkPosition(value)
    {
        return this.element.classList.contains(value);
    }
}
