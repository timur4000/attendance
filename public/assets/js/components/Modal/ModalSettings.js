import { structureMerge } from '../../tea-modules/Functions/Structures/structureMerge.js';


/**
 * @class
 *
 * @description Contains all possible settings of the Modal class.
 **/
export class ModalSettings
{
    /**
     * @typedef { Object } ModalSettingProperties
     *
     * @property { string } id - The unique id of the current component.
     *
     * @property { string ? } idAttribute - The name of id attribute.
     *
     * @property { string ? } templateAttribute - The name of template attribute.
     *
     * @property { string ? } elementClass - The class name of the element.
     *
     * @property { string ? } wrapperClass - The class name of the wrapper element.
     *
     * @property { ModalCardSettingProperties ? } cardSettings - The settings of the ModalCard class.
     *
     * @property { boolean ? } withOuterCancel - Determines whether the modal should be closed when clicking on an external block.
     *
     * @property { boolean ? } template - The html node of the template.
     **/
    
    /**
     * @public
     *
     * @type { string }
     **/
    id;
    
    /**
     * @public
     *
     * @type { string }
     **/
    idAttribute = 'data-modal-id';
    
    /**
     * @public
     *
     * @type { string }
     **/
    templateAttribute = 'data-modal-template';
    
    /**
     * @public
     *
     * @type { string }
     **/
    elementClass = 'modal modal--theme-mercury modal--size-middle';
    
    /**
     * @public
     *
     * @type { string }
     **/
    wrapperClass = 'modal__wrapper';
    
    /**
     * @public
     *
     * @type { ModalCardSettingProperties }
     **/
    cardSettings;
    
    /**
     * @public
     *
     * @type { boolean }
     **/
    withOuterCancel = true;
    
    /**
     * @public
     *
     * @type { HTMLTemplateElement }
     **/
    template;
    
    /**
     * @constructor
     *
     * @param { ModalSettingProperties } settings
     *
     * @return { ModalSettings }
     **/
    constructor(settings = {})
    {
        structureMerge(this, settings);
    }
}
