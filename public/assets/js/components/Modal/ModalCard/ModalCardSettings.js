import { structureMerge } from '../../../tea-modules/Functions/Structures/structureMerge.js';
import { ModalLineTypesClassifier } from '../Classifiers/ModalLineTypesClassifier.js';
import { ModalLinePositionsClassifier } from '../Classifiers/ModalLinePositionsClassifier.js';

/**
 * @class
 *
 * @description Contains all possible settings of the ModalCard class
 **/
export class ModalCardSettings
{
    /**
     * @typedef { Object } ModalCardSettingProperties
     *
     * @property { string ? } elementClass - The class name of the element.
     *
     * @property { ModalLineSettingProperties ? } upperSettings - The settings of the upper line component.
     *
     * @property { ModalLineSettingProperties ? } middleSettings - The settings of the middle line component
     *
     * @property { ModalLineSettingProperties ? } lowerSettings - The settings of the lower line component.
     *
     * @property { string } heading - The text for the displaying in upper line.
     *
     * @property { string ? } paragraph - The text for the displaying in upper line.
     *
     * @property { ModalHeadingSettingProperties ? } headingSettings - The settings of the heading component.
     *
     * @property { ModalParagraphSettingProperties ? } paragraphSettings - The settings of the paragraph component.
     *
     * @property { string ? } cancelButtonAttribute - The name of the specified attribute of the cancel button element.
     *
     * @property { string ? } confirmButtonAttribute - The name of the specified attribute of the confirm button element.
     *
     * @property { ButtonSettingProperties ? } cancelButtonSettings - The settings of the cancel button component.
     *
     * @property { ButtonSettingProperties ? } confirmButtonSettings - The settings of the confirm button component.
     *
     * @property { boolean ? } withUpper - Determines whether upper element is needed.
     **/
    
    /**
     * @public
     *
     * @type { string }
     **/
    elementClass = 'modal-card';
    
    /**
     * @public
     *
     * @type { ModalLineSettingProperties }
     **/
    upperSettings = { type: ModalLineTypesClassifier.UPPER, position: ModalLinePositionsClassifier.START };
    
    /**
     * @public
     *
     * @type { ModalLineSettingProperties }
     **/
    middleSettings = { type: ModalLineTypesClassifier.MIDDLE, position: ModalLinePositionsClassifier.START };
    
    /**
     * @public
     *
     * @type { ModalLineSettingProperties }
     **/
    lowerSettings = { type: ModalLineTypesClassifier.LOWER, position: ModalLinePositionsClassifier.CORNERS };
    
    /**
     * @public
     *
     * @type { string }
     **/
    heading;
    
    /**
     * @public
     *
     * @type { string }
     **/
    paragraph;
    
    /**
     * @public
     *
     * @type { ModalHeadingSettingProperties }
     **/
    headingSettings;
    
    /**
     * @public
     *
     * @type { ModalParagraphSettingProperties }
     **/
    paragraphSettings;
    
    /**
     * @public
     *
     * @type { string }
     **/
    cancelButtonAttribute = 'data-modal-cancel-button';
    
    /**
     * @public
     *
     * @type { string }
     **/
    confirmButtonAttribute = 'data-modal-confirm-button';
    
    /**
     * @public
     *
     * @type { ButtonSettingProperties }
     **/
    cancelButtonSettings;
    
    /**
     * @public
     *
     * @type { ButtonSettingProperties }
     **/
    confirmButtonSettings;
    
    /**
     * @public
     *
     * @type { boolean }
     **/
    withUpper = true;
    
    /**
     * @constructor
     *
     * @param { ModalCardSettingProperties } settings
     *
     * @return { ModalCardSettings }
     **/
    constructor(settings)
    {
        structureMerge(this, settings);
    }
}
