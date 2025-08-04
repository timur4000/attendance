import { structureMerge } from '../../../tea-modules/Functions/Structures/structureMerge.js';

/**
 * @class
 *
 * @description Contains all possible settings of the ModalLine class
 **/
export class ModalLineSettings
{
    /**
     * @typedef { Object } ModalLineSettingProperties
     *
     * @property { string ? } elementClass - The class name of the element.
     *
     * @property { ModalLineTypesClassifier } type - The type of the line.
     *
     * @property { ModalLinePositionsClassifier } position - The position type for the displayed elements.
     *
     * @property { boolean } isSingle - Determines whether is component is single.
     **/
    
    /**
     * @public
     *
     * @type { string }
     **/
    elementClass = 'modal-line';
    
    /**
     * @public
     *
     * @type { ModalLineTypesClassifier }
     **/
    type;
    
    /**
     * @public
     *
     * @type { ModalLinePositionsClassifier }
     **/
    position;
    
    /**
     * @public
     *
     * @type { boolean }
     **/
    isSingle = false;
    
    /**
     * @constructor
     *
     * @param { ModalLineSettingProperties } settings
     *
     * @return { ModalLineSettings }
     **/
    constructor(settings)
    {
        structureMerge(this, settings);
    }
}
