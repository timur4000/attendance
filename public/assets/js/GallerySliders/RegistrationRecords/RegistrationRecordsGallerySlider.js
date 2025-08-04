import { DetectedRfidTagsIdActionsClassifier } from './DetectedRfidTagsIdActionsClassifier.js';
import { GallerySlider }                       from '../../components/GallerySlider/GallerySlider.js';
import { ConfigurationCodesClassifier }        from '../../standards/Classifiers/Configurations/ConfigurationCodesClassifier.js';


/**
 * @abstract
 *
 * @description Implements abstract logic of the registration records gallery slider.
 **/
export class RegistrationRecordsGallerySlider
{
    /**
     * @public
     *
     * @type { GallerySlider }
     **/
    gallerySlider;
    
    /**
     * @public
     *
     * @type { ConfigurationCodesClassifier }
     **/
    configurationSide;

    /**
     * @public
     *
     * @type { DetectedRfidTagsIdActionsClassifier }
     **/
    idAction;

    /**
     * @constructor
     *
     * @param { GallerySliderSetting | GallerySliderSettings } gallerySliderSettings
     **/
    constructor(gallerySliderSettings)
    {
        this.gallerySlider = new GallerySlider(gallerySliderSettings);
    }

    /**
     * @public
     *
     * @description Implements initialize base logic.
     *
     * @return { void }
     **/
    async initialization()
    {
        this.gallerySlider.initialization();
    }

    /**
     * @public
     *
     * @description Returns dom element of the gallery slider.
     *
     * @return { HTMLDivElement }
     **/
    getDomElement()
    {
        return this.gallerySlider.getDomElement();
    }
}
