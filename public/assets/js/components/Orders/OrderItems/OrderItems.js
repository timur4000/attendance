import { createElement } from '../../../tea-modules/Functions/DOM/Elements/createElement.js';
import { OrderItemsSettings } from './OrderItemsSettings.js';
import { HttpRequest } from '../../../tea-modules/Classes/Requests/HttpRequest.js';
import { HttpRequestMethodsClassifier } from '../../../tea-modules/Classes/Requests/Standards/HttpRequestMethodsClassifier.js';
import { OrderItem } from '../OrderItem/OrderItem.js';
import { createFragment } from '../../../tea-modules/Functions/DOM/Elements/createFragment.js';
import { getPaddings } from '../../../tea-modules/Functions/DOM/Styles/getPaddings.js';
import { CustomEvents } from '../../../tea-modules/Classes/CustomEvents/CustomEvents.js';
import { OrderItemsEventsClassifier } from './OrderItemsEventsClassifier.js';
import { OrderItemEventsClassifier } from '../OrderItem/OrderItemEventsClassifier.js';


/**
 * @class
 *
 * @description Implements logic for the order items component.
 **/
export class OrderItems
{
    /**
     * @public
     *
     * @type { CustomEvents }
     **/
    customEvents;
    
    /**
     * @public
     *
     * @type { Orders }
     **/
    orders;
    
    /**
     * @public
     *
     * @type { HTMLElement }
     **/
    domElement;
    
    /**
     * @public
     *
     * @type { OrderItemsSettings }
     **/
    settings;
    
    /**
     * @public
     *
     * @type { OrderItem[] }
     **/
    orderItems = [];
    
    /**
     * @public
     *
     * @type { Object[] }
     **/
    records = [];
    
    /**
     * @constructor
     *
     * @param { Orders } orders
     *
     * @param { OrderItemsSettings ? } settings
     *
     * @return { OrderItems }
     **/
    constructor(orders, settings)
    {
        this.customEvents = new CustomEvents();
        
        this.orders = orders;
        
        this.settings = settings;
        
        this.domElement = this._createElement();
    }
    
    /**
     * @public
     *
     * @description Implements initialize base logic.
     *
     * @return { void }
     **/
    async initialization()
    {
        this.records = await this.getRecords();
        
        this._itemsProcessing();
        
        this.domElement.append(this.getFragment());
        
        this.sizesProcessing();
        
        window.addEventListener('resize', this._resizeHandler.bind(this));
    }
    
    /**
     * @private
     *
     * @description Implements handler for the window resize event.
     *
     * @param { Event } event
     *
     * @return { void }
     **/
    _resizeHandler(event)
    {
        this.sizesProcessing();
    }
    
    /**
     * @private
     *
     * @description Implements process of initializing item components.
     *
     * @return { void }
     **/
    _itemsProcessing()
    {
        for (let i = 0, n = this.records.length; i < n; i++)
        {
            const record = this.records[ i ];
            
            const orderItem = new OrderItem(this.orders, record, this.settings.orderItemSettings);
            
            orderItem.customEvents.subscribe(OrderItemEventsClassifier.CHANGE, this._itemChangeHandler.bind(this));
            
            orderItem.initialization();
            
            this.orderItems.push(orderItem);
        }
    }
    
    /**
     * @public
     *
     * @description Implements process of the not enough money.
     *
     * @return { void }
     **/
    notEnoughMoneyProcessing()
    {
        for (let i = 0, n = this.orderItems.length; i < n; i++)
        {
            const orderItem = this.orderItems[ i ];
    
            orderItem.notEnoughMoney(!orderItem.isActive() && this.orders.ordersAccount.getBalanceRemainder() < orderItem.getPrice());
        }
    }
    
    /**
     * @private
     *
     * @description Implements handler for the item change event.
     *
     * @param { number } value
     *
     * @param { CustomNumber } customNumber
     *
     * @param { OrderItem } instance
     *
     * @return { void }
     **/
    _itemChangeHandler(value, customNumber, instance)
    {
        this.customEvents.execute(OrderItemsEventsClassifier.CHANGE, value, customNumber, instance);
    }
    
    /**
     * @public
     *
     * @description Returns fragment of the item elements.
     *
     * @return { DocumentFragment }
     **/
    getFragment()
    {
        const fragment = createFragment();
        
        this.orderItems.forEach(a => fragment.append(a.domElement));
        
        return fragment;
    }
    
    /**
     * @private
     *
     * @description Creates html node of the element.
     *
     * @return { HTMLElement }
     **/
    _createElement()
    {
        return createElement('section', { class: this.settings.elementClass });
    }
    
    /**
     * @public
     *
     * @description Implements process of the element sizes.
     *
     * @return { void }
     **/
    sizesProcessing()
    {
        const height = window.innerHeight - getPaddings(this.orders.domElement).y;
        
        const orderConfirmationHeight = this.orders.orderConfirmation.isDisplaying() ? this.orders.orderConfirmation.getOffsetHeight() : 0;
        
        this.domElement.style.height = (height - orderConfirmationHeight) + 'px';
    }
    
    /**
     * @public
     *
     * @description Implements request to server and returns items.
     *
     * @return { Promise<Object[]> }
     **/
    async getRecords()
    {
        const request = new HttpRequest(
            {
                url: this.settings.url,
                method: HttpRequestMethodsClassifier.POST,
            }
        );
        
        return (await request.execute()).data;
    }
    
    /**
     * @public
     *
     * @description Calculating and returns total price of all select items.
     *
     * @return { number }
     **/
    getTotalPrice()
    {
        return this.orderItems.reduce((previousValue, currentValue) => previousValue + parseFloat(currentValue.record.price_object) * currentValue.customNumber.value, 0);
    }
    
    /**
     * @public
     *
     * @description Clears all item components.
     *
     * @return { void }
     **/
    clear()
    {
        this.orderItems.forEach(a => a.clear());
        
        this.customEvents.execute(OrderItemsEventsClassifier.CLEAR, this);
    }
}
