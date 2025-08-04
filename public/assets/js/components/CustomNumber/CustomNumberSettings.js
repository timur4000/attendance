import { structureMerge } from '../../tea-modules/Functions/Structures/structureMerge.js';


/**
 * @class
 *
 * @description Contains all possible settings of CustomNumber class.
 **/
export class CustomNumberSettings
{
    /**
     * @typedef { Object } CustomNumberSettingProperties
     *
     * @property { string ? } elementClass - The class name of the element.
     *
     * @property { string ? } elementAttribute - The data attribute name of the element.
     *
     * @property { string ? } minusButtonClass - The class name of the minus button element.
     *
     * @property { string ? } minusButtonSvgClass - The class name of the minus button svg element.
     *
     * @property { string ? } minusButtonSvgId - The id of the minus button svg element.
     *
     * @property { string ? } inputClass - The class name of the input element.
     *
     * @property { string ? } addButtonClass - The class name of the add button element.
     *
     * @property { string ? } addButtonSvgClass - The class name of the add button svg element.
     *
     * @property { string ? } addButtonSvgId - The id of the add button svg element.
     *
     * @property { string ? } componentAttribute - The data attribute of the component.
     *
     * @property { string ? } inputAttribute - The data attribute of the input button element.
     *
     * @property { string ? } minusButtonAttribute - The data attribute of the minus button element.
     *
     * @property { string ? } addButtonAttribute - The data attribute of the add button element.
     *
     * @property { number ? } step - The value for each step.
     *
     * @property { number ? } fractionDigits - Number of digits after dot.
     *
     * @property { number ? } min - The min value.
     *
     * @property { number ? } max - The max value.
     *
     * @property { boolean ? } readonly - Determines whether is input readonly.
     **/
    
    /**
     * @public
     *
     * @type { string }
     **/
    elementClass = 'custom-number custom-number--size-default';
    
    /**
     * @public
     *
     * @type { string }
     **/
    elementAttribute = 'data-custom-number';
    
    /**
     * @public
     *
     * @type { string }
     **/
    minusButtonClass = 'custom-number__button button button--bubble button--size-middle button--type-square button--theme-white-azure-bittersweet';
    
    /**
     * @public
     *
     * @type { string }
     **/
    minusButtonSvgClass = 'icon icon-size-14';
    
    /**
     * @public
     *
     * @type { string }
     **/
    minusButtonSvgId = 'essential-minus-square';
    
    /**
     * @public
     *
     * @type { string }
     **/
    inputClass = 'custom-number__input input input-type-number input--theme-mercury input--size-middle';
    
    /**
     * @public
     *
     * @type { string }
     **/
    addButtonClass = 'custom-number__button button button--bubble button--size-middle button--type-square button--theme-white-azure-wild-sand';
    
    /**
     * @public
     *
     * @type { string }
     **/
    addButtonSvgClass = 'icon icon-size-14';
    
    /**
     * @public
     *
     * @type { string }
     **/
    addButtonSvgId = 'essential-add-square';
    
    /**
     * @public
     *
     * @type { string }
     **/
    componentAttribute = 'data-custom-number-element';
    
    /**
     * @public
     *
     * @type { string }
     **/
    inputAttribute = 'input';
    
    /**
     * @public
     *
     * @type { string }
     **/
    minusButtonAttribute = 'minus';
    
    /**
     * @public
     *
     * @type { string }
     **/
    addButtonAttribute = 'add';
    
    /**
     * @public
     *
     * @type { number }
     **/
    _step = 1;
    
    /**
     * @public
     *
     * @type { number }
     **/
    _fractionDigits = 0;
    
    /**
     * @public
     *
     * @type { number }
     **/
    _min;
    
    /**
     * @public
     *
     * @type { number }
     **/
    _max;
    
    /**
     * @public
     *
     * @type { boolean }
     **/
    _readonly = false;
    
    /**
     * @constructor
     *
     * @param { CustomNumberSettingProperties } settings
     *
     * @return { CustomNumberSettings }
     **/
    constructor(settings)
    {
        structureMerge(this, settings);
    }
    
    /**
     * @public
     *
     * @return { number }
     **/
    get step()
    {
        return this._step;
    }
    
    /**
     * @public
     *
     * @return { void }
     **/
    set step(value)
    {
        this._step = parseFloat(value);
    }
    
    /**
     * @public
     *
     * @return { number }
     **/
    get fractionDigits()
    {
        return this._fractionDigits;
    }
    
    /**
     * @public
     *
     * @return { void }
     **/
    set fractionDigits(value)
    {
        this._fractionDigits = value;
    }
    
    /**
     * @public
     *
     * @return { number }
     **/
    get min()
    {
        return this._min;
    }
    
    /**
     * @public
     *
     * @return { void }
     **/
    set min(value)
    {
        this._min = parseFloat(value);
    }
    
    /**
     * @public
     *
     * @return { number }
     **/
    get max()
    {
        return this._max;
    }
    
    /**
     * @public
     *
     * @return { void }
     **/
    set max(value)
    {
        this._max = parseFloat(value);
    }
    
    /**
     * @public
     *
     * @return { boolean }
     **/
    get readonly()
    {
        return this._readonly;
    }
    
    /**
     * @public
     *
     * @return { void }
     **/
    set readonly(value)
    {
        this._readonly = Boolean(value);
    }
    
    /**
     * @public
     *
     * @description Implements edit properties of the attribute by the given element.
     *
     * @param { Element } domElement
     *
     * @return { void }
     **/
    fromAttribute(domElement)
    {
        for (let i = 0, n = domElement.attributes.length; i < n; i++)
        {
            const attribute = domElement.attributes.item(i);
            
            if (!attribute.name.includes('data-'))
            {
                continue ;
            }
            
            let key = attribute.name.replace('data-', '');
            
            if (!this.hasOwnProperty(key))
            {
                continue ;
            }
            
            key = key.replace(/^_/, '');
            
            this[ key ] = attribute.value;
        }
    }
}
