import { App }             from '../../../app.js';
import { Orders }          from '../../../components/Orders/Orders.js';
import { OrdersSettings }  from '../../../components/Orders/OrdersSettings.js';
import { TapPressing }     from '../../../tea-modules/Functions/Events/TapPressing.js';


const app = new App();


app.notifications.setStart(20);

const ordersSettings = new OrdersSettings();

ordersSettings.ordersAccountSettings.inputName = 'user_barcode';

const orders = new Orders('#orders', ordersSettings);

orders.initialization();

const tapPressing = new TapPressing();

tapPressing.initialization();

tapPressing.customEvents.subscribe('tap', async () =>
{
    // TODO: Fullscreen api needs separate function.
    
    const documentElement = document.documentElement;
    
    if (!document.fullscreenElement)
    {
        await documentElement.requestFullscreen();
        
        return ;
    }
    
    await document.exitFullscreen();
});
