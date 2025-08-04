import { App } from '../../../app.js';
import { SimpleOrdersList } from '../../../components/Orders/SimpleOrdersList/SimpleOrdersList.js';
import { SimpleOrdersListSettings } from '../../../components/Orders/SimpleOrdersList/SimpleOrdersListSettings.js';
import { TapPressing } from '../../../tea-modules/Functions/Events/TapPressing.js';


const app = new App();

const simpleOrdersListSettings = new SimpleOrdersListSettings();

const simpleOrdersList = new SimpleOrdersList('#simple-orders-list', simpleOrdersListSettings);

simpleOrdersList.initialization();

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
