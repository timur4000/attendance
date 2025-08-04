import { structureMerge } from '../../tea-modules/Functions/Structures/structureMerge.js';


/**
 * @class
 *
 * @description Contains all possible settings of the MultipleInput class.
 **/
export class CustomSelectMultipleInputSettings
{
    /**
     * @typedef { Object } CustomSelectMultipleInputSettingProperties
     *
     * @property { string ? } elementClass - The class name of the element.
     **/
    
    /**
     * @public
     *
     * @type { string }
     **/
    elementClass = 'custom-select-multiple-input';
    
    /**
     * @public
     *
     * @type { string }
     **/
    valuesClass = 'custom-select-multiple-input__values';
    
    /**
     * @public
     *
     * @type { string }
     **/
    valueClass = 'custom-select-multiple-input__value';
    
    /**
     * @public
     *
     * @type { string }
     **/
    valueTextClass = 'custom-select-multiple-input__value-text';
    
    /**
     * @public
     *
     * @type { string }
     **/
    valueCloseClass = 'custom-select-multiple-input__value-close';
    
    /**
     * @public
     *
     * @type { string }
     **/
    valueCloseSvgClass = 'icon icon-size-8';
    
    /**
     * @public
     *
     * @type { string }
     **/
    valueCloseSvg = 'essential-close';
    
    /**
     * @constructor
     *
     * @param { CustomSelectMultipleInputSettingProperties } settings
     *
     * @return { CustomSelectMultipleInputSettings }
     **/
    constructor(settings)
    {
        structureMerge(this, settings);
    }
}
