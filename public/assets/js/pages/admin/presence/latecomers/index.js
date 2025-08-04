import { App }             from '../../../../app.js';
import { LatecomersTable } from '../../../../tables/LatecomersTable.js';


const app = new App();

const latecomersTable = new LatecomersTable('#latecomers-table');

latecomersTable.initialization();