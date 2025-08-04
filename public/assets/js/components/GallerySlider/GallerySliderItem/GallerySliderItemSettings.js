import { structureMerge } from '../../../tea-modules/Functions/Structures/structureMerge.js';


/**
 * @description Contains all possible settings of the GallerySliderItem class.
 **/
export class GallerySliderItemSettings
{
    /**
     * @typedef { Object } GallerySliderItemSetting
     *
     * @property { string } id
     *
     * @property { string } groupId
     *
     * @property { string | HTMLElement | DocumentFragment } time
     *
     * @property { string | HTMLElement | DocumentFragment } title
     *
     * @property { string } src
     *
     * @property { string } [domElementClassName]
     *
     * @property { string } [domTimeClassName]
     *
     * @property { string } [domImageClassName]
     *
     * @property { string } [domImageElementClassName]
     *
     * @property { string } [domTitleClassName]
     *
     * @property { number } [timeFontSize]
     *
     * @property { number } [titleFontSize]
     *
     * @property { Object } [record]
     **/
    
    /**
     * @public
     *
     * @type { string | number }
     **/
    id;
    
    /**
     * @public
     *
     * @type { string | number }
     **/
    groupId;
    
    /**
     * @public
     *
     * @type { string }
     **/
    time;
    
    /**
     * @public
     *
     * @type { string | HTMLElement | DocumentFragment }
     **/
    title;
    
    /**
     * @public
     *
     * @type { string }
     **/
    src;
    
    /**
     * @public
     *
     * @type { string }
     **/
    domElementClassName = 'gallery-slider__item';
    
    /**
     * @public
     *
     * @type { string }
     **/
    domTimeClassName = 'gallery-slider__item-time';
    
    /**
     * @public
     *
     * @type { string }
     **/
    domImageClassName = 'gallery-slider__item-image image';
    
    /**
     * @public
     *
     * @type { string }
     **/
    domImageElementClassName = 'gallery-slider__item-image-element image-element';
    
    /**
     * @public
     *
     * @type { string }
     **/
    domTitleClassName = 'gallery-slider__item-title';
    
    /**
     * @public
     *
     * @type { number }
     **/
    timeFontSize = 14;
    
    /**
     * @public
     *
     * @type { number }
     **/
    titleFontSize = 16;
    
    /**
     * @public
     *
     * @type { Object }
     **/
    record;
    
    /**
     * @constructor
     *
     * @param { GallerySliderItemSetting | GallerySliderItemSettings } settings
     **/
    constructor(settings)
    {
        structureMerge(this, settings);
    }
}
