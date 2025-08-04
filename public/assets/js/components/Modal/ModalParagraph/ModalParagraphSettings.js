import { structureMerge } from '../../../tea-modules/Functions/Structures/structureMerge.js';


/**
 * @class
 *
 * @description Contains all possible settings of the ModalParagraph class.
 **/
export class ModalParagraphSettings
{
    /**
     * @typedef { Object } ModalParagraphSettingProperties
     *
     * @property { string ? } elementClass - The class name of the element.
     **/
    
    /**
     * @public
     *
     * @type { string }
     **/
    elementClass = 'modal-paragraph';
    
    /**
     * @constructor
     *
     * @param { ModalParagraphSettingProperties } settings
     *
     * @return { ModalParagraphSettings }
     **/
    constructor(settings)
    {
        structureMerge(this, settings);
    }
}
