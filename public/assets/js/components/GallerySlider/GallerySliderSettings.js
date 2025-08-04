import { structureMerge } from '../../tea-modules/Functions/Structures/structureMerge.js';
import { GallerySliderSidesClassifier } from './Classifiers/GallerySliderSidesClassifier.js';


/**
 * @description Contains all possible settings of the GallerySlider class.
 **/
export class GallerySliderSettings
{
    /**
     * @typedef { Object } GallerySliderSetting
     *
     * @property { string } id
     *
     * @property { string } groupId
     *
     * @property { string } [domElementClassName]
     *
     * @property { GallerySliderSidesClassifier } [side]
     *
     * @property { number } [height]
     *
     * @property { string } [domUpperClassName]
     *
     * @property { string } [domColumnClassName]
     *
     * @property { string } [domHeadingClassName]
     *
     * @property { string } [domWrapperClassName]
     *
     * @property { string } [domArrowIconClassName]
     *
     * @property { string } [domArrowIconSvgClassName]
     *
     * @property { string } [arrowIconSvgId]
     *
     * @property { string } [heading]
     *
     * @property { number } [headingFontSize]
     *
     * @property { Array<ButtonSettingProperties> } [buttonSettings]
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
    groupId;
    
    /**
     * @public
     *
     * @type { string }
     **/
    domElementClassName = 'gallery-slider gallery-slider--size-default gallery-slider--theme-default gallery-slider--type-default';
    
    /**
     * @public
     *
     * @type { GallerySliderSidesClassifier }
     **/
    side = GallerySliderSidesClassifier.RIGHT;
    
    /**
     * @public
     *
     * @type { number }
     **/
    height;
    
    /**
     * @public
     *
     * @type { string }
     **/
    domUpperClassName = 'gallery-slider__upper';
    
    /**
     * @public
     *
     * @type { string }
     **/
    domColumnClassName = 'gallery-slider__column';
    
    /**
     * @public
     *
     * @type { string }
     **/
    domHeadingClassName = 'gallery-slider__heading';
    
    /**
     * @public
     *
     * @type { string }
     **/
    domArrowIconClassName = 'gallery-slider__arrow-icon';
    
    /**
     * @public
     *
     * @type { string }
     **/
    domArrowIconSvgClassName = 'icon icon-size-30';
    
    /**
     * @public
     *
     * @type { string }
     **/
    arrowIconSvgId = 'arrows-left-thin';
    
    /**
     * @public
     *
     * @type { GallerySliderWrapperSetting | GallerySliderWrapperSettings }
     **/
    wrapperSettings = {};
    
    /**
     * @public
     *
     * @type { string }
     **/
    heading = 'Entrances';
    
    /**
     * @public
     *
     * @type { number }
     **/
    headingFontSize = 20;
    
    /**
     * @public
     *
     * @type { Array }
     **/
    buttonSettings = [];
    
    /**
     * @constructor
     *
     * @param { GallerySliderSetting | GallerySliderSettings } settings
     **/
    constructor(settings)
    {
        structureMerge(this, settings);
    }
}
