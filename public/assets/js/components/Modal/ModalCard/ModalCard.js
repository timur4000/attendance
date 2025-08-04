import { ModalCardSettings } from './ModalCardSettings.js';
import { createElement }     from '../../../tea-modules/Functions/DOM/Elements/createElement.js';
import { ModalLine }         from '../ModalLine/ModalLine.js';
import { ModalHeading } from '../ModalHeading/ModalHeading.js';
import { Button } from '../../Button/Button.js';
import { isEmpty } from '../../../tea-modules/Functions/Is/isEmpty.js';
import { ModalParagraph }    from '../ModalParagraph/ModalParagraph.js';


/**
 * @class
 *
 * @description Implements logic with the modal card component.
 **/
export class ModalCard
{
    /**
     * @public
     *
     * @type { ModalCardSettings }
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
     * @type { ModalHeading }
     **/
    heading;
    
    /**
     * @public
     *
     * @type { ModalParagraph }
     **/
    paragraph;
    
    /**
     * @public
     *
     * @type { ModalLine }
     **/
    upper;
    
    /**
     * @public
     *
     * @type { ModalLine }
     **/
    middle;
    
    /**
     * @public
     *
     * @type { ModalLine }
     **/
    lower;
    
    /**
     * @public
     *
     * @type { Button }
     **/
    cancel;
    
    /**
     * @public
     *
     * @type { Button }
     **/
    confirm;
    
    /**
     * @constructor
     *
     * @param { ModalCardSettingProperties } settings
     *
     * @return { ModalCard }
     **/
    constructor(settings = {})
    {
        this.settings = new ModalCardSettings(settings);
        
        if (this.settings.withUpper)
        {
            this.upper = new ModalLine(this.settings.upperSettings);
        }
        
        this.middle = new ModalLine(this.settings.middleSettings);
        
        this.lower = new ModalLine(this.settings.lowerSettings);
        
        if (this.hasHeading())
        {
            this.heading = new ModalHeading(this.getHeading(), this.settings.headingSettings);
        }
        
        if (this.hasParagraph())
        {
            this.paragraph = new ModalParagraph(this.getParagraph(), this.settings.paragraphSettings);
        }
        
        this.element = this._createElement();
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
        if (this.settings.withUpper && this.hasHeading())
        {
            this.upper.append(this.heading.element);
        }
        
        if (this.settings.withUpper && this.hasParagraph())
        {
            this.upper.append(this.paragraph.element);
        }
        
        if (this.hasCancelButton())
        {
            this.cancel = new Button(this.settings.cancelButtonSettings);
            
            this.cancel.setAttribute(this.settings.cancelButtonAttribute, '');
            
            this.lower.append(this.cancel.element);
        }
        
        if (this.hasConfirmButton())
        {
            this.confirm = new Button(this.settings.confirmButtonSettings);
            
            this.confirm.setAttribute(this.settings.confirmButtonAttribute, '');
            
            this.lower.append(this.confirm.element);
        }
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
        const nodes = [ this.middle.element, this.lower.element ];
        
        if (this.settings.withUpper)
        {
            nodes.unshift(this.upper.element);
        }
        
        return createElement('div', { class: this.settings.elementClass }, nodes);
    }
    
    /**
     * @public
     *
     * @description Returns heading value from the settings.
     *
     * @return { string }
     **/
    getHeading()
    {
        return this.settings.heading;
    }
    
    /**
     * @public
     *
     * @description Sets the given value to the heading.
     *
     * @param { string } value
     *
     * @return { void }
     **/
    setHeading(value)
    {
        this.heading.setText(value);
    }
    
    /**
     * @public
     *
     * @description Checks if the heading property of the settings is not empty.
     *
     * @return { boolean }
     **/
    hasHeading()
    {
        return !isEmpty(this.settings.heading);
    }
    
    /**
     * @public
     *
     * @description Returns paragraph value from the settings.
     *
     * @return { string }
     **/
    getParagraph()
    {
        return this.settings.paragraph;
    }
    
    /**
     * @public
     *
     * @description Sets the given value to the paragraph.
     *
     * @param { string } value
     *
     * @return { void }
     **/
    setParagraph(value)
    {
        this.paragraph.setText(value);
    }
    
    /**
     * @public
     *
     * @description Checks if the paragraph property of the settings is not empty.
     *
     * @return { boolean }
     **/
    hasParagraph()
    {
        return !isEmpty(this.settings.paragraph);
    }
    
    /**
     * @public
     *
     * @description Checks if the cancel button settings property of the settings is not empty.
     *
     * @return { boolean }
     **/
    hasCancelButton()
    {
        return !isEmpty(this.settings.cancelButtonSettings);
    }
    
    /**
     * @public
     *
     * @description Checks if the confirm button settings property of the settings is not empty.
     *
     * @return { boolean }
     **/
    hasConfirmButton()
    {
        return !isEmpty(this.settings.confirmButtonSettings);
    }
}
