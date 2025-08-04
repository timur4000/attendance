import { OrdersAccountSettings } from './OrdersAccount/OrdersAccountSettings.js';
import { OrderItemsSettings }    from './OrderItems/OrderItemsSettings.js';
import { OrderConfirmationSettings } from './OrderConfirmation/OrderConfirmationSettings.js';


/**
 * @class
 **/
export class OrdersSettings
{
    /**
     * @public
     *
     * @type { string }
     **/
    confirmationUrl = '';
    
    /**
     * @public
     *
     * @type { string }
     **/
    columnClass = 'orders__column';
    
    /**
     * @public
     *
     * @type { string }
     **/
    columnGridClass = 'grid-column';
    
    /**
     * @public
     *
     * @type { string }
     **/
    systemWrapperClass = 'orders__system-wrapper';
    
    /**
     * @public
     *
     * @type { string }
     **/
    systemWrapperTextClass = 'orders__system-wrapper-text';
    
    /**
     * @public
     *
     * @type { string }
     **/
    systemWrapperTextValue = 'Please read the food-card...';
    
    /**
     * @public
     *
     * @type { string }
     **/
    systemWrapperIconClass = 'orders__system-wrapper-icon icon';
    
    /**
     * @public
     *
     * @type { string }
     **/
    systemWrapperIconId = 'arrows-refresh-2';
    
    /**
     * @public
     *
     * @type { number }
     **/
    fractionDigits = 2;
    
    /**
     * @public
     *
     * @type { string }
     **/
    currency = 'TMT';
    
    /**
     * @public
     *
     * @type { number }
     **/
    leftColumnSize = 3;
    
    /**
     * @public
     *
     * @type { number }
     **/
    rightColumnSize = 9;
    
    /**
     * @public
     *
     * @type { OrdersAccountSettings }
     **/
    ordersAccountSettings = new OrdersAccountSettings();
    
    /**
     * @public
     *
     * @type { OrderItemsSettings }
     **/
    orderItemsSettings = new OrderItemsSettings();
    
    /**
     * @public
     *
     * @type { OrderConfirmationSettings }
     **/
    orderConfirmationSettings = new OrderConfirmationSettings();
}
