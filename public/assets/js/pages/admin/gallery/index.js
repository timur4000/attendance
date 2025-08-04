import { App } from '../../../app.js';
import { RegistrationRecordsGallerySliders } from '../../../GallerySliders/RegistrationRecords/RegistrationRecordsGallerySliders.js';


const app = new App();

const registrationRecordsGallerySliders = new RegistrationRecordsGallerySliders();

await registrationRecordsGallerySliders.initialization();
