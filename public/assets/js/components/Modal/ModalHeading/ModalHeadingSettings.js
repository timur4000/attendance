import { structureMerge } from '../../../tea-modules/Functions/Structures/structureMerge.js';


/**
 * @class
 *
 * @description Contains all possible settings of the ModalHeading class
 **/
export class ModalHeadingSettings
{
    /**
     * @typedef { Object } ModalHeadingSettingProperties
     *
     * @property { string ? } elementClass - The class name of the element.
     **/
    
    /**
     * @public
     *
     * @type { string }
     **/
    elementClass = 'modal-heading';
    
    /**
     * @constructor
     *
     * @param { ModalHeadingSettingProperties } settings
     *
     * @return { ModalLineSettings }
     **/
    constructor(settings)
    {
        structureMerge(this, settings);
    }
}
