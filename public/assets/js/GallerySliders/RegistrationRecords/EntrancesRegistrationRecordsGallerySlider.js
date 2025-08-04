import { RegistrationRecordsGallerySlider } from './RegistrationRecordsGallerySlider.js';
import { ConfigurationCodesClassifier }     from '../../standards/Classifiers/Configurations/ConfigurationCodesClassifier.js';
import { DetectedRfidTagsIdActionsClassifier } from './DetectedRfidTagsIdActionsClassifier.js';


/**
 * @description Implements entrances of the registration records gallery slider.
 *
 * @extends RegistrationRecordsGallerySlider
 **/
export class EntrancesRegistrationRecordsGallerySlider extends RegistrationRecordsGallerySlider
{
    /**
     * @inheritDoc
     **/
    configurationSide = ConfigurationCodesClassifier.ENTRANCES_GALLERY_RIGHT_DIRECTION;
    
    /**
     * @inheritDoc
     **/
    idAction = DetectedRfidTagsIdActionsClassifier.ARRIVAL;
}
