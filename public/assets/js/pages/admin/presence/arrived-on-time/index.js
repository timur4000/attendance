import { App }                from '../../../../app.js';
import { ArrivedOnTimeTable } from '../../../../tables/ArrivedOnTimeTable.js';


const app = new App();

const latecomersTable = new ArrivedOnTimeTable('#main-table');

latecomersTable.initialization();