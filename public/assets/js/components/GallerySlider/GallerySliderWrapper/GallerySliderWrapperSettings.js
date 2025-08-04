import { structureMerge } from '../../../tea-modules/Functions/Structures/structureMerge.js';


/**
 * @description Contains all possible settings of the GallerySliderWrapper class.
 **/
export class GallerySliderWrapperSettings
{
    /**
     * @typedef { Object } GallerySliderWrapperSetting
     *
     * @property { string } [domElementClassName]
     *
     * @property { number } [height]
     *
     * @property { number } [itemsCount]
     *
     * @property { number } [between]
     *
     * @property { number } [reverseBetween]
     *
     * @property { number } [creationDelay]
     **/
    
    /**
     * @public
     *
     * @type { string }
     **/
    domElementClassName = 'gallery-slider__wrapper';
    
    /**
     * @public
     *
     * @type { number }
     **/
    height = 450;
    
    /**
     * @public
     *
     * @type { number }
     **/
    itemsCount = 4;
    
    /**
     * @public
     *
     * @type { number }
     **/
    horizontalBetween = 30;
    
    /**
     * @public
     *
     * @type { number }
     **/
    verticalBetween = 10;
    
    /**
     * @public
     *
     * @type { number }
     **/
    creationDelay = 100;
    
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
