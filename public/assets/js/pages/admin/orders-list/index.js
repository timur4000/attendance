import { App } from '../../../app.js';
import { OrdersListTable } from '../../../tables/OrdersList/OrdersListTable.js';


const app = new App();

const ordersListTable = new OrdersListTable();

ordersListTable.initialization();
