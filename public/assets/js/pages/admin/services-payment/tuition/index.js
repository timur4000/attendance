import { App }                from '../../../../app.js';
import { TuitionTable }       from '../../../../tables/TuitionTable.js';


const app = new App();

const table = new TuitionTable('#main-table');

table.initialization();