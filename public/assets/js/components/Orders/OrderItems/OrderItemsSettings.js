import { OrderItemSettings } from '../OrderItem/OrderItemSettings.js';


/**
 * @class
 **/
export class OrderItemsSettings
{
    /**
     * @public
     *
     * @type { string }
     **/
    elementClass = 'order-items order-items--size-default order-items--theme-default grid-row';
    
    /**
     * @public
     *
     * @type { string }
     **/
    url;
    
    /**
     * @public
     *
     * @type { OrderItemSettings }
     **/
    orderItemSettings = new OrderItemSettings();
}
