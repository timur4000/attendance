import { App }                from '../../../app.js';
import { OperationLogsTable } from '../../../tables/OperationLogs/OperationLogsTable.js';


const app = new App();

const table = new OperationLogsTable();

table.initialization();
