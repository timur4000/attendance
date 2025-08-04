import { App }                from '../../../../app.js';
import { InvoicesTable }      from '../../../../tables/InvoicesTable.js';
import { InvoiceChange } from './InvoiceChange.js';


const app = new App();

const table = new InvoicesTable('#main-table');

table.initialization();

const invoiceChange = new InvoiceChange(table);

invoiceChange.initialization();
