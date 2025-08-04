import { createElement } from '../../tea-modules/Functions/DOM/Elements/createElement.js';
import { querySelector } from '../../tea-modules/Functions/DOM/Queries/querySelector.js';
import { createSvgElement } from '../../tea-modules/Functions/DOM/Elements/createSvgElement.js';


export class InputOuter
{
    /**
     * @public
     *
     * @type { array<InputOuter> }
     **/
    static instances = [];
    
    /**
     * @public
     *
     * @type { InputOuterSettings }
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
     * @type { Array<CustomInput> }
     **/
    customInputs = [];
    
    /**
     * @public
     *
     * @type { boolean }
     **/
    isInit = false;
    
    /**
     * @constructor
     *
     * @param { InputOuterSettings } settings
     *
     * @param { HTMLDivElement | string ? } element
     **/
    constructor(settings, element)
    {
        this.settings = settings;
        
        this.settings.identifier && InputOuter.instances.push(this);
        
        this.element = element ? querySelector(element) : this._createElement();
    }
    
    /**
     * @public
     *
     * @description Implements initialize base methods and logic.
     *
     * @return { void }
     **/
    initialization()
    {
        this.isInit = true;
    }
    
    /**
     * @private
     *
     * @description Creates html node of the element.
     *
     * @return { HTMLDivElement }
     **/
    _createElement()
    {
        return createElement('div', { class: this.settings.elementClassName });
    }
    
    /**
     * @private
     *
     * @description Creates html node of the icon label.
     *
     * @param { InputOuterIconLabelOption } iconLabelOption
     *
     * @param { CustomInput } customInput
     *
     * @return { HTMLLabelElement }
     **/
    _createIconLabel(iconLabelOption, customInput)
    {
        return createElement('label', { class: customInput.settings.iconLabelClassName, for: iconLabelOption.forAttribute }, [ this._createIconLabelSvg(iconLabelOption, customInput) ]);
    }
    
    /**
     * @private
     *
     * @description Creates html node of the icon label svg.
     *
     * @param { InputOuterIconLabelOption } iconLabelOption
     *
     * @param { CustomInput } customInput
     *
     * @return { SVGElement }
     **/
    _createIconLabelSvg(iconLabelOption, customInput)
    {
        return createSvgElement(iconLabelOption.iconId, { class: iconLabelOption.iconClassName || customInput.settings.iconLabelSvgClassName });
    }
    
    /**
     * @private
     *
     * @description Implements process of the icons.
     *
     * @param { Array<InputOuterIconLabelOption> } iconLabelOptions
     *
     * @param { CustomInput } customInput
     *
     * @return { void }
     **/
    _iconsProcessing(iconLabelOptions, customInput)
    {
        for (let i = 0, n = iconLabelOptions.length; i < n; i++)
        {
            const iconLabelOption = iconLabelOptions[ i ];
            
            const domIcon = this._createIconLabel(iconLabelOption, customInput);
            
            customInput.getElement()[ iconLabelOption.position ](domIcon);
            
            customInput.iconLabels.push(domIcon);
        }
    }
    
    /**
     * @public
     *
     * @description Sets the given state to the element.
     *
     * @return { void }
     **/
    setState(state, force)
    {
        this.element.classList.toggle(state, force);
    }
    
    /**
     * @public
     *
     * @description Adds
     *
     * @param { CustomInput } customInput
     *
     * @return { void }
     **/
    addCustomInput(customInput)
    {
        this.customInputs.push(customInput);
        
        this.element.append(customInput.getElement());
        
        this._iconsProcessing(customInput.settings.iconLabelOptions, customInput);
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
     * @description Returns instance by the specified identifier.
     *
     * @param { string } identifier
     *
     * @return { InputOuter }
     **/
    static getInstanceByIdentifier(identifier)
    {
        return this.instances.find(value => value.settings.identifier === identifier);
    }
}
