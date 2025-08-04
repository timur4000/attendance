import { CustomSelectMultipleInputSettings } from './CustomSelectMultipleInputSettings.js';
import { createElement }                     from '../../tea-modules/Functions/DOM/Elements/createElement.js';
import { createSvgElement }                  from '../../tea-modules/Functions/DOM/Elements/createSvgElement.js';
import { querySelector }                     from '../../tea-modules/Functions/DOM/Queries/querySelector.js';


/**
 * @class
 *
 * @description Implements work with multiple input component of the custom select.
 **/
export class CustomSelectMultipleInput
{
    /**
     * @public
     *
     * @type { HTMLElement }
     **/
    element;
    
    /**
     * @public
     *
     * @type { HTMLElement }
     **/
    values;
    
    /**
     * @public
     *
     * @type { CustomSelectMultipleInputSettings }
     **/
    settings;
    
    /**
     * @constructor
     *
     * @param { CustomSelectMultipleInputSettingProperties } settings
     *
     * @return { CustomSelectMultipleInput }
     **/
    constructor(settings)
    {
        this.settings = new CustomSelectMultipleInputSettings(settings);
        
        this.values = this._createValues();
        
        this.element = this._createElement();
    }
    
    /**
     * @private
     *
     * @description Creates base html node of element.
     *
     * @return { HTMLElement }
     **/
    _createElement()
    {
        return createElement('div', { class: this.settings.elementClass }, [ this.values ]);
    }
    
    /**
     * @private
     *
     * @description Creates base html node of values element.
     *
     * @return { HTMLElement }
     **/
    _createValues()
    {
        return createElement('div', { class: this.settings.valuesClass }, [  ]);
    }
    
    /**
     * @private
     *
     * @description Creates base html node of value element.
     *
     * @param { string } text
     *
     * @param { string } value
     *
     * @return { HTMLDivElement }
     **/
    _createValue(text, value)
    {
        return createElement('div', { class: this.settings.valueClass, 'data-value': value }, [ this._createValueText(text), this._createValueClose() ]);
    }
    
    /**
     * @private
     *
     * @description Creates base html node of value text element.
     *
     * @param { string } text
     *
     * @return { HTMLDivElement }
     **/
    _createValueText(text)
    {
        return createElement('div', { class: this.settings.valueTextClass }, [ text ]);
    }
    
    /**
     * @private
     *
     * @description Creates base html node of value close element.
     *
     * @return { HTMLDivElement }
     **/
    _createValueClose()
    {
        const svg = createSvgElement(this.settings.valueCloseSvg, { class: this.settings.valueCloseSvgClass });
        
        return createElement('div', { class: this.settings.valueCloseClass }, [ svg ]);
    }
    
    /**
     * @public
     *
     * @description Creates value and appends to values.
     *
     * @param { string } text
     *
     * @param { string } value
     *
     * @return { void }
     **/
    setValue(text, value)
    {
        this.values.append(this._createValue(text, value));
    }
    
    /**
     * @public
     *
     * @description Removes value by the given value.
     *
     * @param { string } value
     *
     * @return { void }
     **/
    removeValue(value)
    {
        querySelector(`.${ this.settings.valueClass }[data-value="${ value }"]`).remove();
    }
    
    /**
     *
     **/
    loadProcessing(force) {}
}
