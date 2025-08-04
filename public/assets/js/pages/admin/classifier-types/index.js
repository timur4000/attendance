import { App }             from '../../../app.js';
import { ClassifierTypesTable } from '../../../tables/ClassifierTypesTable.js';


const app = new App();

const table = new ClassifierTypesTable('#classifier-types-table');

table.initialization();
