import { structureMerge } from '../../../tea-modules/Functions/Structures/structureMerge.js';


export class CustomCheckboxSettings
{
    /**
     * @typedef { Object } CustomCheckboxSetting
     *
     * @property { string ? } elementClass
     *
     * @property { string ? } inputClass
     *
     * @property { string } inputId
     *
     * @property { string } inputName
     *
     * @property { string ? } inputValue
     *
     * @property { string ? } labelClass
     *
     * @property { string ? } labelIconOuterClass
     *
     * @property { string ? } labelIconClass
     *
     * @property { string ? } labelIconOnSvgClass
     *
     * @property { string ? } labelIconOnSvgId
     *
     * @property { string ? } labelIconOffSvgClass
     *
     * @property { string ? } labelIconOffSvgId
     *
     * @property { string ? } labelTextClass
     *
     * @property { string } text
     *
     * @property { boolean } checked
     **/
    
    /**
     * @public
     *
     * @type { string }
     **/
    elementClass = 'custom-checkbox custom-checkbox--type-bubble';
    
    /**
     * @public
     *
     * @type { string }
     **/
    inputClass = 'custom-checkbox__input';
    
    /**
     * @public
     *
     * @type { string }
     **/
    inputId = '';
    
    /**
     * @public
     *
     * @type { string }
     **/
    inputName = '';
    
    /**
     * @public
     *
     * @type { string }
     **/
    inputValue = '';
    
    /**
     * @public
     *
     * @type { string }
     **/
    labelClass = 'custom-checkbox__label custom-checkbox__label--size-middle';
    
    /**
     * @public
     *
     * @type { string }
     **/
    labelIconOuterClass = 'custom-checkbox__icon-outer custom-checkbox__icon-outer--size-middle custom-checkbox__icon-outer--theme-white';
    
    /**
     * @public
     *
     * @type { string }
     **/
    labelIconClass = 'custom-checkbox__icon custom-checkbox__icon--type-';
    
    /**
     * @public
     *
     * @type { string }
     **/
    labelIconOnSvgClass = 'icon icon-size-10';
    
    /**
     * @public
     *
     * @type { string }
     **/
    labelIconOnSvgId = 'essential-check';
    
    /**
     * @public
     *
     * @type { string }
     **/
    labelIconOffSvgClass = 'icon icon-size-10';
    
    /**
     * @public
     *
     * @type { string }
     **/
    labelIconOffSvgId = 'essential-close';
    
    /**
     * @public
     *
     * @type { string }
     **/
    labelTextClass = 'custom-checkbox__text';
    
    /**
     * @public
     *
     * @type { string }
     **/
    text = '';
    
    /**
     * @public
     *
     * @type { boolean }
     **/
    checked = false;
    
    /**
     * @constructor
     *
     * @param { CustomCheckboxSetting ? } settings
     **/
    constructor(settings = {})
    {
        structureMerge(this, settings);
    }
}
