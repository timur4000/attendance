import { convertToHtml } from '../../../tea-modules/Functions/Convertations/convertToHtml.js';
import { CustomNumber }  from '../../../components/CustomNumber/CustomNumber.js';
import { querySelector } from '../../../tea-modules/Functions/DOM/Queries/querySelector.js';
import { CustomNumberEventsClassifier } from '../../../components/CustomNumber/CustomNumberEventsClassifier.js';
import { CustomNumberModifiersClassifier } from '../../../components/CustomNumber/CustomNumberModifiersClassifier.js';


/**
 * @class
 *
 * @description Implements logic for the orders list detail item component.
 **/
export class OrdersListDetailItem
{
    /**
     * @public
     *
     * @type { Object }
     **/
    record;
    
    /**
     * @public
     *
     * @type { OrdersListDetailItems }
     **/
    parentInstance;
    
    /**
     * @public
     *
     * @type { HTMLDivElement }
     **/
    domElement;
    
    /**
     * @public
     *
     * @type { HTMLImageElement }
     **/
    domImageElement;
    
    /**
     * @public
     *
     * @type { HTMLHeadingElement }
     **/
    domName;
    
    /**
     * @public
     *
     * @type { HTMLParagraphElement }
     **/
    domPrice;
    
    /**
     * @public
     *
     * @type { HTMLDivElement }
     **/
    domQuantity;
    
    /**
     * @public
     *
     * @type { CustomNumber }
     **/
    customNumber;
    
    /**
     * @constructor
     *
     * @param { Object } record
     *
     * @param { OrdersListDetailItems } parentInstance
     *
     * @return { OrdersListDetailItem }
     **/
    constructor(record, parentInstance)
    {
        this.record = record;
        
        this.parentInstance = parentInstance;
        
        this.domElement = convertToHtml(this._html());
        
        this.domImageElement = querySelector('[data-orders-detail-items-item="image-element"]', { root: this.domElement });
        
        this.domName = querySelector('[data-orders-detail-items-item="name"]', { root: this.domElement });
        
        this.domPrice = querySelector('[data-orders-detail-items-item="price"]', { root: this.domElement });
        
        this.customNumber = new CustomNumber(null, { readonly: true, min: 0, max: 10, step: 0.5, fractionDigits: 1, });
        
        this.domQuantity = querySelector('[data-orders-detail-items-item="quantity"]', { root: this.domElement });
        
        this.domQuantity.append(this.customNumber.domElement);
        
        this.customNumber.customEvents.subscribe(CustomNumberEventsClassifier.CHANGE, this._customNumberChangeHandler.bind(this));
    }
    
    /**
     * @public
     *
     * @description Implements initialize base logic of component.
     *
     * @return { void }
     **/
    initialization()
    {
        this.customNumber.initialization();
    }
    
    /**
     * @private
     *
     * @description Implements handler for the custom number change event.
     *
     * @param { number } value
     *
     * @param { CustomNumber } instance
     *
     * @return { void }
     **/
    _customNumberChangeHandler(value, instance)
    {
        this.parentInstance.parentInstance.modal.card.setParagraph(`${ this.parentInstance.getPrice() } ${ this.record.code_currency }`);
        
        this.inactive(value <= 0);
        
        this.parentInstance.parentInstance.modal.card.confirm.disable(!this.parentInstance.getPrice() || !this.parentInstance.hasEdited());
    }
    
    /**
     * @public
     *
     * @description Sets the given value to custom number component.
     *
     * @param { number } value
     *
     * @return { void }
     **/
    setQuantity(value)
    {
        this.customNumber.value = value;
    }
    
    /**
     * @public
     *
     * @description Toggles inactive state by the given force.
     *
     * @param { boolean } force
     *
     * @return { void }
     **/
    inactive(force)
    {
        this.domElement.classList.toggle('inactive', force);
    }
    
    /**
     * @public
     *
     * @description Checks whether the class list of element contained inactive token.
     *
     * @return { boolean }
     **/
    isInactive()
    {
        return this.domElement.classList.contains('inactive');
    }
    
    /**
     * @public
     *
     * @description Toggles disable state by the given force.
     *
     * @param { boolean } force
     *
     * @return { void }
     **/
    disable(force)
    {
        this.domElement.classList.toggle('disable', force);
        
        this.customNumber.setModifier(CustomNumberModifiersClassifier.DISABLE, force);
    }
    
    /**
     * @public
     *
     * @description Returns quantity.
     *
     * @return { number }
     **/
    getQuantity()
    {
        return this.customNumber.value;
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
        return parseFloat(this.record.price_object);
    }
    
    /**
     * @public
     *
     * @description Returns calculating price.
     *
     * @return { number }
     **/
    getCalculatingPrice()
    {
        return this.getQuantity() * this.getPrice();
    }
    
    /**
     * @public
     *
     * @description Creates object of order item standard.
     *
     * @return { OrderStandard }
     **/
    getOrderStandard()
    {
        return { id_food: this.record.id_object, price: this.getCalculatingPrice(), quantity: this.getQuantity() };
    }
    
    /**
     * @private
     *
     * @description Returns html of the element.
     *
     * @return { string }
     **/
    _html()
    {
        return (
            `<li class="orders-detail-items-item orders-detail-items-item--size-default orders-detail-items-item--theme-default inactive">

                <div class="orders-detail-items-item__column orders-detail-items-item__column--type-left">

                    <div class="orders-detail-items-item__section orders-detail-items-item__image image">
                        <img src="data:image/${ this.record.picture.comment };base64,${ this.record.picture.message }" alt="" class="orders-detail-items-item__image-element image__element" data-orders-detail-items-item="image-element">
                    </div>

                    <h3 class="orders-detail-items-item__section orders-detail-items-item__name" data-orders-detail-items-item="name">${ this.record.name_object }</h3>

                    <p class="orders-detail-items-item__section orders-detail-items-item__price" data-orders-detail-items-item="price">${ this.record.price_object } <span class="currency currency--size-small">${ this.record.code_currency }</span></p>

                </div>

                <div class="orders-detail-items-item__column orders-detail-items-item__column--type-right">

                    <div class="orders-detail-items-item__section orders-detail-items-item__quantity" data-orders-detail-items-item="quantity"></div>

                </div>

            </li>
            `);
    }
}
