import { structureMerge } from '../../tea-modules/Functions/Structures/structureMerge.js';


/**
 * @class
 *
 * @description Contains all possible settings of the Form class.
 **/
export class FormSettings
{
    /**
     * @typedef { Object } FormSettingProperties
     *
     * @property { string ? } errorLabelInactiveClass - The class name of the inactive error label element.
     *
     * @property { string ? } errorAttribute - The attribute of the error element.
     *
     * @property { string ? } errorLabelAttribute - The attribute of the error label element.
     **/
    
    /**
     * @public
     *
     * @type { string }
     **/
    errorLabelInactiveClass = 'inactive';
    
    /**
     * @public
     *
     * @type { string }
     **/
    errorAttribute = 'data-form-error';
    
    /**
     * @public
     *
     * @type { string }
     **/
    errorLabelAttribute = 'data-error-label';
    
    /**
     * @constructor
     *
     * @param { FormSettingProperties } settings
     *
     * @return { FormSettings }
     **/
    constructor(settings = {})
    {
        structureMerge(this, settings);
    }
}
