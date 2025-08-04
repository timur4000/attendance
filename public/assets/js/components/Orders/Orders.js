import { querySelector } from '../../tea-modules/Functions/DOM/Queries/querySelector.js';
import { OrdersSettings } from './OrdersSettings.js';
import { createElement } from '../../tea-modules/Functions/DOM/Elements/createElement.js';
import { OrdersAccount } from './OrdersAccount/OrdersAccount.js';
import { getAttribute } from '../../tea-modules/Functions/DOM/Attributes/getAttribute.js';
import { OrderItems } from './OrderItems/OrderItems.js';
import { OrderConfirmation } from './OrderConfirmation/OrderConfirmation.js';
import { OrderItemsEventsClassifier } from './OrderItems/OrderItemsEventsClassifier.js';
import { OrdersAccountEventsClassifier } from './OrdersAccount/OrdersAccountEventsClassifier.js';
import { createSvgElement } from '../../tea-modules/Functions/DOM/Elements/createSvgElement.js';
import { OrdersModifiersClassifier } from './OrdersModifiersClassifier.js';
import { OrderConfirmationEventsClassifier } from './OrderConfirmation/OrderConfirmationEventsClassifier.js';
import { HttpRequest } from '../../tea-modules/Classes/Requests/HttpRequest.js';
import { HttpRequestMethodsClassifier } from '../../tea-modules/Classes/Requests/Standards/HttpRequestMethodsClassifier.js';
import { HttpStatusesClassifier } from '../../tea-modules/Classes/Requests/Standards/HttpStatusesClassifier.js';


/**
 * @class
 *
 * @description Implements logic for orders component.
 **/
export class Orders
{
    /**
     * @typedef { Object } OrderStandard
     *
     * @property { number } id_food
     *
     * @property { number } price
     *
     * @property { number } quantity
     **/
    
    /**
     * @public
     *
     * @type { HTMLElement }
     **/
    domElement;
    
    /**
     * @public
     *
     * @type { OrdersSettings }
     **/
    settings;
    
    /**
     * @public
     *
     * @type { HTMLElement }
     **/
    domLeftColumn;
    
    /**
     * @public
     *
     * @type { HTMLElement }
     **/
    domRightColumn;
    
    /**
     * @public
     *
     * @type { HTMLElement }
     **/
    domSystemWrapper;
    
    /**
     * @public
     *
     * @type { HTMLParagraphElement }
     **/
    domSystemWrapperText;
    
    /**
     * @public
     *
     * @type { SVGElement }
     **/
    domSystemWrapperIcon;
    
    /**
     * @public
     *
     * @type { OrdersAccount }
     **/
    ordersAccount;
    
    /**
     * @public
     *
     * @type { OrderItems }
     **/
    orderItems;
    
    /**
     * @public
     *
     * @type { OrderConfirmation }
     **/
    orderConfirmation;
    
    /**
     * @constructor
     *
     * @param { string | HTMLElement } selectors
     *
     * @param { OrdersSettings ? } settings
     *
     * @return { Orders }
     **/
    constructor(selectors, settings)
    {
        !settings && (settings = new OrdersSettings());
        
        this.settings = settings;
        
        this.domElement = querySelector(selectors);
        
        this.domLeftColumn = this._createDomColumn(this.settings.leftColumnSize);
        
        this.domSystemWrapperText = this._createSystemWrapperText();
        
        this.domSystemWrapperIcon = this._createSystemWrapperIcon();
        
        this.domSystemWrapper = this._createSystemWrapper();
        
        this.ordersAccount = new OrdersAccount(this, this.settings.ordersAccountSettings);
        
        this.domRightColumn = this._createDomColumn(this.settings.rightColumnSize);
        
        this.settings.ordersAccountSettings.url = getAttribute(this.domElement, 'account-url', { isAfterRemove: true, isDataAttribute: true });
        
        this.settings.orderItemsSettings.url = getAttribute(this.domElement, 'items-url', { isAfterRemove: true, isDataAttribute: true });
        
        this.settings.confirmationUrl = getAttribute(this.domElement, 'confirmation-url', { isAfterRemove: true, isDataAttribute: true });
        
        this.orderItems = new OrderItems(this, this.settings.orderItemsSettings);
        
        this.orderConfirmation = new OrderConfirmation(this, this.settings.orderConfirmationSettings);
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
        this.setModifier(OrdersModifiersClassifier.EMPTY, true);
        
        this.systemWrapperSwapProcessing(true);
        
        this.domLeftColumn.append(this.ordersAccount.domElement);
        
        this.domRightColumn.append(this.orderItems.domElement);
        
        this.domElement.append(this.domLeftColumn, this.domRightColumn, this.orderConfirmation.domElement, this.domSystemWrapper);
        
        this.orderConfirmation.initialization();
        
        await this.ordersAccount.initialization();
        
        await this.orderItems.initialization();
        
        this.orderItems.customEvents.subscribe(OrderItemsEventsClassifier.CHANGE, this._orderItemsChangeHandler.bind(this));
        
        this.orderItems.customEvents.subscribe(OrderItemsEventsClassifier.CLEAR, this._orderItemsClearHandler.bind(this));
        
        this.ordersAccount.customEvents.subscribe(OrdersAccountEventsClassifier.ENTER, this._ordersAccountEnterHandler.bind(this));
        
        this.ordersAccount.customEvents.subscribe(OrdersAccountEventsClassifier.CHANGE, this._ordersAccountChangeHandler.bind(this));
        
        this.ordersAccount.customEvents.subscribe(OrdersAccountEventsClassifier.REQUEST_SUCCESS, this._ordersAccountRequestSuccessHandler.bind(this));
        
        this.ordersAccount.customEvents.subscribe(OrdersAccountEventsClassifier.REQUEST_ERROR, this._ordersAccountRequestErrorHandler.bind(this));
        
        this.orderConfirmation.customEvents.subscribe(OrderConfirmationEventsClassifier.CONFIRM, this._orderConfirmationConfirmClickHandler.bind(this));
        
        this.systemWrapperSwapProcessing(false);
    }
    
    /**
     * @private
     *
     * @description Implements handler for the orders account enter event.
     *
     * @param { string } value
     *
     * @param { KeyboardEvent } event
     *
     * @param { OrdersAccount } instance
     *
     * @return { void }
     **/
    async _ordersAccountEnterHandler(value, event, instance)
    {
        this.activeElementBlur();
        
        if (!this.isEmpty() || this.isLoading() || !value)
        {
            instance.clearInput();
            
            return ;
        }
        
        this.requestProcessing();
    }
    
    /**
     * @private
     *
     * @description Implements handler for the orders account change event.
     *
     * @param { OrdersAccount } instance
     *
     * @return { void }
     **/
    _ordersAccountChangeHandler(instance)
    {
        if (this.isEmpty())
        {
            return ;
        }
        
        this.clear();
    }
    
    /**
     * @public
     *
     * @description Implements process of the request.
     *
     * @return { void }
     **/
    async requestProcessing()
    {
        this.setModifier(OrdersModifiersClassifier.LOADING, true);
        
        this.systemWrapperSwapProcessing(true);
        
        this.ordersAccount.requestProcessing();
    }
    
    /**
     * @private
     *
     * @description Implements handler for the orders account request error event.
     *
     * @param { ResponseStandard } response
     *
     * @param { XMLHttpRequest } xhr
     *
     * @return { void }
     **/
    _ordersAccountRequestErrorHandler(response, xhr)
    {
        this.clear();
        
        app.notifications.error('Error', [ response.message ]);
    }
    
    /**
     * @private
     *
     * @description Implements handler for the orders account request success event.
     *
     * @param { ResponseStandard } response
     *
     * @param { XMLHttpRequest } xhr
     *
     * @return { void }
     **/
    _ordersAccountRequestSuccessHandler(response, xhr)
    {
        this.show();
        
        app.notifications.clearItems();
    }
    
    /**
     * @public
     *
     * @description Shows the component.
     *
     * @return { void }
     **/
    async show()
    {
        this.setModifier(OrdersModifiersClassifier.LOADING, false);
        
        this.setModifier(OrdersModifiersClassifier.EMPTY, false);
        
        this.setModifier(OrdersModifiersClassifier.FILLED, true);
        
        this.setModifier(OrdersModifiersClassifier.LOADED, true);
        
        this.orderItems.notEnoughMoneyProcessing();
        
        this.systemWrapperSwapProcessing(false);
        
        this.activeElementBlur();
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
        this.activeElementBlur();
        
        this.orderItems.clear();
        
        this.ordersAccount.clearInput();
        
        if (!this.isFilled())
        {
            this.systemWrapperSwapProcessing(false);
        }
        
        this.setModifier(OrdersModifiersClassifier.EMPTY, true);
        
        this.setModifier(OrdersModifiersClassifier.FILLED, false);
        
        this.setModifier(OrdersModifiersClassifier.LOADED, false);
        
        this.setModifier(OrdersModifiersClassifier.LOADING, false);
    }
    
    
    /**
     * @private
     *
     * @description Implements handler for the order items change event.
     *
     * @param { number } value
     *
     * @param { CustomNumber } customNumber
     *
     * @param { OrderItem } orderItem
     *
     * @return { void }
     **/
    _orderItemsChangeHandler(value, customNumber, orderItem)
    {
        this._orderConfirmationProcessing();
        
        this.orderItems.sizesProcessing();
        
        this.orderItems.notEnoughMoneyProcessing();
        
        orderItem.scrollIntoProcessing();
        
        this.activeElementBlur();
    }
    
    /**
     * @private
     *
     * @description Implements handler for the order items clear event.
     *
     * @param { OrderItems } orderItems
     *
     * @return { void }
     **/
    _orderItemsClearHandler(orderItems)
    {
        this._orderConfirmationProcessing();
        
        this.orderItems.sizesProcessing();
    }

    /**
     * @private
     *
     * @description Implements process of the order confirmation component.
     *
     * @return { void }
     **/
    _orderConfirmationProcessing()
    {
        const price = this.orderItems.getTotalPrice();
        
        this.orderConfirmation.setValue(price, this.settings.currency);
        
        this.orderConfirmation.toggle(!!price);
        
        this.orderConfirmation.disabled(price > this.ordersAccount.getBalance());
    }
    
    /**
     * @private
     *
     * @description Implements handler for the order confirmation confirm click event.
     *
     * @param { PointerEvent } event
     *
     * @param { Button } instance
     *
     * @return { void }
     **/
    async _orderConfirmationConfirmClickHandler(event, instance)
    {
        this.setModifier(OrdersModifiersClassifier.CONFIRMATION, true);
        
        this.orderConfirmation.loading(true);
        
        this.systemWrapperSwapProcessing(true);
        
        const response = await this.orderConfirmationRequest();
        
        if (response.status !== HttpStatusesClassifier.SUCCESS)
        {
            app.notifications.error('Error', [ response.message ]);
        }
        else
        {
            app.notifications.success('Success', [ response.message ]);
        }
        
        this.activeElementBlur();
        
        this.clear();
        
        this.orderConfirmation.loading(false);
        
        this.systemWrapperSwapProcessing(false);
        
        this.setModifier(OrdersModifiersClassifier.CONFIRMATION, false);
    }
    
    /**
     * @public
     *
     * @description Blurs focus from active element.
     *
     * @return { void }
     **/
    activeElementBlur()
    {
        document.activeElement && document.activeElement.blur();
    }
    
    /**
     * @public
     *
     * @description Implements request to order confirmation.
     *
     * @return { Promise<ResponseStandard> }
     **/
    async orderConfirmationRequest()
    {
        const request = new HttpRequest(
            {
                url: this.settings.confirmationUrl,
                method: HttpRequestMethodsClassifier.PUT,
                data: this.getOrderConfirmationRequestData(),
            }
        );
        
        return await request.execute();
    }
    
    /**
     * @typedef { Object } OrderConfirmationRequestData
     *
     * @property { number } id_user
     *
     * @property { OrderStandard[] } items
     *
     * @property { boolean ? } on_credit
     **/
    
    /**
     * @public
     *
     * @description Returns data for the order confirmation request.
     *
     * @return { OrderConfirmationRequestData }
     **/
    getOrderConfirmationRequestData()
    {
        return { id_user: this.ordersAccount.getIdUser(), items: this.getOrder() };
    }
    
    /**
     * @public
     *
     * @description Returns json of order.
     *
     * @return { Array<OrderStandard> }
     **/
    getOrder()
    {
        return this.orderItems.orderItems.reduce(this.getOrderReduceHandler.bind(this), []);
    }
    
    /**
     * @public
     *
     * @description Implements handler for the getOrder reduce method.
     *
     * @param { Array<OrderStandard> } previousValue
     *
     * @param { OrderItem } currentValue
     *
     * @return { Array<OrderStandard> }
     **/
    getOrderReduceHandler(previousValue, currentValue)
    {
        if (currentValue.isActive())
        {
            previousValue.push(currentValue.getOrder());
        }
        
        return previousValue;
    }
    
    /**
     * @private
     *
     * @description Creates html node of the column element.
     *
     * @param { number } size
     *
     * @return { HTMLElement }
     **/
    _createDomColumn(size)
    {
        const className = `${ this.settings.columnClass } ${ this.settings.columnGridClass } ${ this.settings.columnGridClass }-${ size }`;
        
        return createElement('div', { class: className });
    }
    
    /**
     * @private
     *
     * @description Creates html node of the system wrapper element.
     *
     * @return { HTMLElement }
     **/
    _createSystemWrapper()
    {
        return createElement('div', { class: this.settings.systemWrapperClass }, [ this.domSystemWrapperText ]);
    }
    
    /**
     * @private
     *
     * @description Creates html node of the system wrapper text element.
     *
     * @return { HTMLParagraphElement }
     **/
    _createSystemWrapperText()
    {
        return createElement('p', { class: this.settings.systemWrapperTextClass }, [ this.settings.systemWrapperTextValue ]);
    }
    
    /**
     * @private
     *
     * @description Creates html node of the system wrapper icon element.
     *
     * @return { SVGElement }
     **/
    _createSystemWrapperIcon()
    {
        return createSvgElement(this.settings.systemWrapperIconId, { class: this.settings.systemWrapperIconClass });
    }
    
    /**
     * @public
     *
     * @description Sets the given modifier to class list of the element by the given force.
     *
     * @param { OrdersModifiersClassifier } modifier
     *
     * @param { boolean } force
     *
     * @return { void }
     **/
    setModifier(modifier, force)
    {
        this.domElement.classList.toggle(modifier, force);
    }
    
    /**
     * @public
     *
     * @description Checks if the given modifier contained in the element`s class list.
     *
     * @param { OrdersModifiersClassifier } modifier
     *
     * @return { boolean }
     **/
    hasModifier(modifier)
    {
        return this.domElement.classList.contains(modifier);
    }
    
    /**
     * @public
     *
     * @description Swaps elements in the system wrapper.
     *
     * @return { void }
     **/
    systemWrapperSwapProcessing(force)
    {
        const a = (force) => force ? this.domSystemWrapperIcon : this.domSystemWrapperText;
        
        this.domSystemWrapper.replaceChild(a(force), a(!force));
    }
    
    /**
     * @public
     *
     * @description Checks if the component contained empty modifier.
     *
     * @return { boolean }
     **/
    isEmpty()
    {
        return this.hasModifier(OrdersModifiersClassifier.EMPTY);
    }
    
    /**
     * @public
     *
     * @description Checks if the component contained loading modifier.
     *
     * @return { boolean }
     **/
    isLoading()
    {
        return this.hasModifier(OrdersModifiersClassifier.LOADING);
    }
    
    /**
     * @public
     *
     * @description Checks if the component contained filled modifier.
     *
     * @return { boolean }
     **/
    isFilled()
    {
        return this.hasModifier(OrdersModifiersClassifier.FILLED);
    }
}
