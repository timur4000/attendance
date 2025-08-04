import { createElement }   from '../../tea-modules/Functions/DOM/Elements/createElement.js';
import { createSvgElement } from '../../tea-modules/Functions/DOM/Elements/createSvgElement.js';


/**
 * @class
 *
 * @description Implements work with input element of the custom select.
 **/
export class CustomSelectInput
{
    /**
     * @public
     *
     * @type { HTMLDivElement }
     **/
    element;
    
    /**
     * @public
     *
     * @type { HTMLDivElement }
     **/
    text;
    
    /**
     * @public
     *
     * @type { HTMLDivElement }
     **/
    label;
    
    /**
     * @public
     *
     * @type { HTMLDivElement }
     **/
    value;
    
    /**
     * @public
     *
     * @type { HTMLDivElement }
     **/
    icon;
    
    /**
     * @public
     *
     * @type { SVGElement }
     **/
    svg;
    
    /**
     * @public
     *
     * @type { SVGElement }
     **/
    loaderSvg;
    
    /**
     * @public
     *
     * @type { CustomSelectInputSettings }
     **/
    settings;
    
    /**
     * @constructor
     *
     * @param { CustomSelectInputSettings } settings
     *
     * @return { CustomSelectInput }
     **/
    constructor(settings)
    {
        this.settings = settings;
        
        this.label = this.createLabel();
        
        this.value = this.createValue();
        
        this.text = this.createText();
        
        this.svg = this.createSvg();
        
        this.loaderSvg = this.createLoaderSvg();
        
        this.icon = this.createIcon();
        
        this.element = this.createElement();
    }
    
    /**
     * @protected
     *
     * @description Returns html node of base element.
     *
     * @return { HTMLElement }
     **/
    createElement()
    {
        return createElement('div', { class: this.settings.elementClass }, [ this.text, this.icon ]);
    }
    
    /**
     * @protected
     *
     * @description Returns html node of text element.
     *
     * @return { HTMLDivElement }
     **/
    createText()
    {
        return createElement('div', { class: this.settings.textClass }, [ this.label, this.value ]);
    }
    
    /**
     * @protected
     *
     * @description Returns html node of label element.
     *
     * @return { HTMLDivElement }
     **/
    createLabel()
    {
        return createElement('div', { class: this.settings.labelClass }, [ this.settings.placeholder ]);
    }
    
    /**
     * @protected
     *
     * @description Returns html node of value element.
     *
     * @return { HTMLDivElement }
     **/
    createValue()
    {
        return createElement('div', { class: this.settings.valueClass });
    }
    
    /**
     * @protected
     *
     * @description Returns html node of icon element.
     *
     * @return { HTMLDivElement }
     **/
    createIcon()
    {
        return createElement('div', { class: this.settings.iconClass }, [ this.svg ]);
    }
    
    /**
     * @protected
     *
     * @description Returns html node of svg element.
     *
     * @return { SVGElement }
     **/
    createSvg()
    {
        return createSvgElement(this.settings.svgID, { class: this.settings.svgClass });
    }
    
    /**
     * @protected
     *
     * @description Returns html node of loader svg element.
     *
     * @return { SVGElement }
     **/
    createLoaderSvg()
    {
        return createSvgElement(this.settings.loaderSvgID, { class: this.settings.loaderSvgClass });
    }
    
    /**
     * @public
     *
     * @description Implements switches the svg icons for the loading state by the given force.
     *
     * @param { boolean } force
     *
     * @return { void }
     **/
    loadProcessing(force)
    {
        if (force)
        {
            this.svg.remove();
            
            this.icon.append(this.loaderSvg);
            
            return ;
        }
        
        this.loaderSvg.remove();
        
        this.icon.append(this.svg);
    }
    
    /**
     * @public
     *
     * @description Sets given value to the inner text of the value element.
     *
     * @param { string } value
     *
     * @return { void }
     **/
    setValue(value)
    {
        this.value.innerText = value;
    }
}
