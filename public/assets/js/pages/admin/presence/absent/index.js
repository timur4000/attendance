import { App }             from '../../../../app.js';
import { AbsentTable } from '../../../../tables/AbsentTable.js';


const app = new App();

const latecomersTable = new AbsentTable('#absent-table');

latecomersTable.initialization();