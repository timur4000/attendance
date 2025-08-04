import { App } from '../../../app.js';
import { Terminal } from '../../../components/Terminal/Terminal.js';


const app = new App();

const terminal = new Terminal('#terminal',
    {
        insertInputId: 'terminal-input',
        insertInputPlaceholder: 'php artisan',
    });

terminal.initialization();
