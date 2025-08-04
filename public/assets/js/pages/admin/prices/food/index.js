import { App }                from '../../../../app.js';
import { FoodChange }                from './FoodChange.js';
import { FoodTable } from '../../../../tables/FoodTable.js';


const app = new App();

const table = new FoodTable('#main-table');

table.initialization();

const invoiceChange = new FoodChange(table);

invoiceChange.initialization();
