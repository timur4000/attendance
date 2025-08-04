import { App }                from '../../../app.js';
import { AdminPermissionGroupsTable } from '../../../tables/AdminPermissionGroups/AdminPermissionGroupsTable.js';


const app = new App();

const table = new AdminPermissionGroupsTable();

table.initialization();