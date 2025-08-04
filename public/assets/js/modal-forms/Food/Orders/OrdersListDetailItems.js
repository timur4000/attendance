import { getAttribute } from '../../../tea-modules/Functions/DOM/Attributes/getAttribute.js';
import { HttpRequest } from '../../../tea-modules/Classes/Requests/HttpRequest.js';
import { HttpRequestMethodsClassifier } from '../../../tea-modules/Classes/Requests/Standards/HttpRequestMethodsClassifier.js';
import { OrdersListDetailItem } from './OrdersListDetailItem.js';
import { createFragment } from '../../../tea-modules/Functions/DOM/Elements/createFragment.js';


/**
 * @class
 *
 * @description Implements logic for the orders list detail items component.
 **/
export class OrdersListDetailItems
{
    /**
     * @public
     *
     * @type { HTMLUListElement }
     **/
    domElement;
    
    /**
     * @public
     *
     * @type { OrdersListDetailModalForm }
     **/
    parentInstance;
    
    /**
     * @public
     *
     * @type { string }
     **/
    itemsUrl;
    
    /**
     * @public
     *
     * @type { string }
     **/
    changeUrl;
    
    /**
     * @public
     *
     * @type { ResponseStandard }
     **/
    response;
    
    /**
     * @public
     *
     * @type { Map<number, OrdersListDetailItem> }
     **/
    detailItems = new Map();
    
    /**
     * @public
     *
     * @type { ResponseStandard }
     **/
    orderItems;
    
    /**
     * @public
     *
     * @type { Array<OrderStandard> }
     **/
    defaultOrderStandards;
    
    /**
     * @constructor
     *
     * @param { HTMLUListElement } element
     *
     * @param { OrdersListDetailModalForm } parentInstance
     *
     * @return { OrdersListDetailItem }
     **/
    constructor(element, parentInstance)
    {
        this.domElement = element;
        
        this.parentInstance = parentInstance;
        
        this.itemsUrl = getAttribute(this.domElement, 'url', { isDataAttribute: true, isAfterRemove: true });
        
        this.changeUrl = getAttribute(this.domElement, 'change-url', { isDataAttribute: true, isAfterRemove: true });
    }
    
    /**
     * @public
     *
     * @description Implements initialize base logic of component.
     *
     * @return { void }
     **/
    async initialization()
    {
        await this._itemsProcessing();
    }
    
    /**
     * @private
     *
     * @description Implements process of the items.
     *
     * @return { void }
     **/
    async _itemsProcessing()
    {
        this.response = await this.getItems();
        
        const fragment = createFragment();
        
        for (let i = 0, n = this.response.data.length; i < n; i++)
        {
            const record = this.response.data[ i ];
            
            const instance = new OrdersListDetailItem(record, this);
            
            instance.initialization();
            
            this.detailItems.set(record.id_object, instance);
            
            fragment.append(instance.domElement);
        }
        
        this.domElement.append(fragment);
    }
    
    /**
     * @public
     *
     * @description Implements process of the order items.
     *
     * @return { void }
     **/
    async orderItemsProcessing()
    {
        this.orderItems = await this.getOrderItems();
        
        for (let i = 0, n = this.orderItems.data.length; i < n; i++)
        {
            const record = this.orderItems.data[ i ];
            
            const item = this.detailItems.get(record.id_item);
            
            item.setQuantity(record.quantity);
            
            item.inactive(record.quantity <= 0);
        }
        
        this.defaultOrderStandards = this.getOrderStandards();
    }
    
    /**
     * @public
     *
     * @description Clears the component.
     *
     * @return { void }
     **/
    clear()
    {
        this.disable(true);
        
        for (const [ key, item] of this.detailItems)
        {
            item.setQuantity(0);
            
            item.inactive(true);
        }
    }
    
    /**
     * @public
     *
     * @description Returns price.
     *
     * @return { number }
     **/
    getPrice()
    {
        return [ ...this.detailItems.values() ].reduce((previousValue, currentValue) => previousValue + currentValue.getCalculatingPrice(), 0);
    }
    
    /**
     * @public
     *
     * @description Returns code currency.
     *
     * @return { string }
     **/
    getCodeCurrency()
    {
        return [ ...this.detailItems.values() ][ 0 ].record.code_currency;
    }
    
    /**
     * @public
     *
     * @description Sets disable state by the given force.
     *
     * @param { boolean } force
     *
     * @return { void }
     **/
    disable(force)
    {
        this.detailItems.forEach(value => value.disable(force));
        
        this.domElement.classList.toggle('disable', force);
    }
    
    /**
     * @public
     *
     * @description Returns json of order.
     *
     * @return { Array<OrderStandard> }
     **/
    getOrderStandards()
    {
        return [ ...this.detailItems.values() ].reduce(this.getOrderReduceHandler.bind(this), []);
    }
    
    /**
     * @public
     *
     * @description Implements handler for the getOrder reduce method.
     *
     * @param { Array<OrderStandard> } previousValue
     *
     * @param { OrdersListDetailItem } currentValue
     *
     * @return { Array<OrderStandard> }
     **/
    getOrderReduceHandler(previousValue, currentValue)
    {
        if (!currentValue.isInactive())
        {
            previousValue.push(currentValue.getOrderStandard());
        }
        
        return previousValue;
    }
    
    /**
     * @public
     *
     * @description Checks whether the component has been edited.
     *
     * @return { boolean }
     **/
    hasEdited()
    {
        return JSON.stringify(this.getOrderStandards()) !== JSON.stringify(this.defaultOrderStandards);
    }
    
    /**
     * @public
     *
     * @description Returns all food items.
     *
     * @return { Promise<ResponseStandard> }
     **/
    getItems()
    {
        const httpRequest = new HttpRequest(
            {
                url: this.itemsUrl,
                method: HttpRequestMethodsClassifier.POST,
            });
        
        return httpRequest.execute();
    }
    
    /**
     * @public
     *
     * @description Returns items of order.
     *
     * @return { Promise<ResponseStandard> }
     **/
    getOrderItems()
    {
        const httpRequest = new HttpRequest(
            {
                url: 'admin/orders-list/records-json',
                method: HttpRequestMethodsClassifier.POST,
                data:
                    {
                        id_order: this.parentInstance.tableRow.record.id_order,
                        summary_data: 0,
                    }
            });
        
        return httpRequest.execute();
    }
}
