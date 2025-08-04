import { App } from '../../../../app.js';
import { CanteenDashboard } from '../../../../components/Dashboards/Canteen/CanteenDashboard.js';
import { querySelector } from '../../../../tea-modules/Functions/DOM/Queries/querySelector.js';
import { DashboardTypesClassifier } from '../../../../components/Dashboards/Standards/DashboardTypesClassifier.js';


const app = new App();

console.log(app);

app.customEvents.subscribe('app:load', function ()
{
    const canteenDashboard = new CanteenDashboard({ type: DashboardTypesClassifier.CANTEEN });
    
    canteenDashboard.initialization();
    
    querySelector('.view__inner').append(canteenDashboard.getDomElement());
});
