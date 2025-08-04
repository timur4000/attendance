import { structureMerge } from '../../tea-modules/Functions/Structures/structureMerge.js';


export class CustomInputSettings
{
    /**
     * @typedef { Object } CustomInputSetting
     *
     * @property { string } title
     *
     * @property { ? string } [elementClassName]
     *
     * @property { ? string } [inputClassName]
     *
     * @property { string } inputId
     *
     * @property { string } inputName
     *
     * @property { ? string } [inputType]
     *
     * @property { ? string } [inputPlaceholder]
     *
     * @property { ? string } [inputValue]
     *
     * @property { ? string } [labelClassName]
     *
     * @property { ? Array<InputOuterIconLabelOption> } [iconLabelOptions]
     *
     * @property { ? string } [iconLabelClassName]
     *
     * @property { ? string } [iconLabelSvgClassName]
     *
     * @property { ? boolean } [withInputOuter]
     *
     * @property { ? InputOuterSetting } [inputOuterSettings]
     *
     * @property { ? boolean } [isDatepicker]
     *
     * @property { ? Object } [datepickerSettings]
     **/
    
    /**
     * @typedef { Object } InputOuterIconLabelOption
     *
     * @property { string } iconId
     *
     * @property { ? string } [iconClassName]
     *
     * @property { InputOuterPositionsClassifier } position
     *
     * @property { string } forAttribute
     **/
    
    /**
     * @public
     *
     * @type { string }
     **/
    title = '';
    
    /**
     * @public
     *
     * @type { string }
     **/
    elementClassName = 'custom-input custom-input-size-middle';
    
    /**
     * @public
     *
     * @type { string }
     **/
    inputClassName = 'input input--size-middle input-outer__input custom-input__input';
    
    /**
     * @public
     *
     * @type { string }
     **/
    labelClassName = 'custom-input__float-label custom-input__float-label--type-hide custom-input__float-label--theme-jumbo';
    
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
    inputType = 'text';
    
    /**
     * @public
     *
     * @type { string }
     **/
    inputPlaceholder = ' ';
    
    /**
     * @public
     *
     * @type { string }
     **/
    inputValue = '';
    
    /**
     * @public
     *
     * @type { Array<InputOuterIconLabelOption> }
     **/
    iconLabelOptions = [];
    
    /**
     * @public
     *
     * @type { string }
     **/
    iconLabelClassName = 'input-outer__label input-outer__label--size-middle input-outer__label--theme';
    
    /**
     * @public
     *
     * @type { string }
     **/
    iconLabelSvgClassName = 'icon icon-size-12';
    
    /**
     * @public
     *
     * @type { boolean }
     **/
    withInputOuter = true;
    
    /**
     * @public
     *
     * @type { InputOuterSetting }
     **/
    inputOuterSettings = {};
    
    /**
     * @public
     *
     * @type { boolean }
     **/
    isDatepicker = false;
    
    /**
     * @public
     *
     * @type { Object }
     **/
    datepickerSettings = {};
    
    /**
     * @constructor
     *
     * @param { CustomInputSetting } settings
     **/
    constructor(settings = {})
    {
        structureMerge(this, settings);
    }
}
