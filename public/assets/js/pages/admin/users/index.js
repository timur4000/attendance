import { App }             from '../../../app.js';
import { UsersTable }      from '../../../tables/UsersTable.js';


const app = new App();

const usersTable = new UsersTable('#users-table');

usersTable.initialization();