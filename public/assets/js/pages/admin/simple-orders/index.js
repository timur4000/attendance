import { App } from '../../../app.js';
import { SimpleOrders } from '../../../components/Orders/SimpleOrders/SimpleOrders.js';
import { SimpleOrdersSettings } from '../../../components/Orders/SimpleOrders/SimpleOrdersSettings.js';
import { TapPressing } from '../../../tea-modules/Functions/Events/TapPressing.js';


const app = new App();

const simpleOrdersSettings = new SimpleOrdersSettings();

simpleOrdersSettings.ordersAccountSettings.inputName = 'user_barcode';

const simpleOrders = new SimpleOrders('#simple-orders', simpleOrdersSettings);

simpleOrders.initialization();

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
