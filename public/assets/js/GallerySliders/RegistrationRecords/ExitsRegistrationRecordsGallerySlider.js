import { RegistrationRecordsGallerySlider } from './RegistrationRecordsGallerySlider.js';
import { ConfigurationCodesClassifier }     from '../../standards/Classifiers/Configurations/ConfigurationCodesClassifier.js';
import { DetectedRfidTagsIdActionsClassifier } from './DetectedRfidTagsIdActionsClassifier.js';


/**
 * @description Implements exits of the registration records gallery slider.
 *
 * @extends RegistrationRecordsGallerySlider
 **/
export class ExitsRegistrationRecordsGallerySlider extends RegistrationRecordsGallerySlider
{
    /**
     * @inheritDoc
     **/
    configurationSide = ConfigurationCodesClassifier.EXITS_GALLERY_RIGHT_DIRECTION;
    
    /**
     * @inheritDoc
     **/
    idAction = DetectedRfidTagsIdActionsClassifier.EXIT;
}
