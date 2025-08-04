import { structureMerge } from '../../tea-modules/Functions/Structures/structureMerge.js';


/**
 * @description Contains all possible variables of the RegistrationRecordsGallerySliders log method.
 *
 * @see RegistrationRecordsGallerySliders._log
 **/
export class RegistrationRecordsGallerySlidersLogVariables
{
    /**
     * @typedef { Object } RegistrationRecordsGallerySlidersLogVars
     *
     * @property { RegistrationRecordsGallerySlidersLogTypesClassifier } type
     *
     * @property { Object } [record]
     *
     * @property { Array<Object> } [records]
     *
     * @property { GallerySlider } [gallerySlider]
     *
     * @property { HttpRequest } [pictureHttpRequest]
     *
     * @property { GallerySliderItem } [item]
     *
     * @property { Object } [databasePicture]
     *
     * @property { boolean } [isSuccess]
     *
     * @property { ResponseStandard } [pictureResponse]
     *
     * @property { string } [error]
     **/
    
    /**
     * @public
     *
     * @type { RegistrationRecordsGallerySlidersLogTypesClassifier }
     **/
    type;
    
    /**
     * @public
     *
     * @type { Object }
     **/
    record;
    
    /**
     * @public
     *
     * @type { Array<Object> }
     **/
    records;
    
    /**
     * @public
     *
     * @type { GallerySlider }
     **/
    gallerySlider;
    
    /**
     * @public
     *
     * @type { HttpRequest | XMLHttpRequest }
     **/
    pictureHttpRequest;
    
    /**
     * @public
     *
     * @type { GallerySliderItem }
     **/
    item;
    
    /**
     * @public
     *
     * @type { Object }
     **/
    databasePicture;
    
    /**
     * @public
     *
     * @type { boolean }
     **/
    isSuccess;
    
    /**
     * @public
     *
     * @type { Object }
     **/
    pictureResponse;
    
    /**
     * @public
     *
     * @type { string }
     **/
    error;
    
    /**
     * @constructor
     *
     * @param { RegistrationRecordsGallerySlidersLogVars } variables
     **/
    constructor(variables)
    {
        structureMerge(this, variables, true);
    }
}
