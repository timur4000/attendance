import { createElement } from '../../../tea-modules/Functions/DOM/Elements/createElement.js';
import { CustomNumber }  from '../../CustomNumber/CustomNumber.js';
import { CustomNumberEventsClassifier } from '../../CustomNumber/CustomNumberEventsClassifier.js';
import { OrderItemModifiersClassifier } from './OrderItemModifiersClassifier.js';
import { CustomEvents } from '../../../tea-modules/Classes/CustomEvents/CustomEvents.js';
import { OrderItemEventsClassifier } from './OrderItemEventsClassifier.js';
import { getPaddings } from '../../../tea-modules/Functions/DOM/Styles/getPaddings.js';


/**
 * @class
 *
 * @description Implements logic for the order item component.
 **/
export class OrderItem
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
     * @type { HTMLDivElement }
     **/
    domElement;
    
    /**
     * @public
     *
     * @type { Object }
     **/
    record;
    
    /**
     * @public
     *
     * @type { OrderItemSettings }
     **/
    settings;
    
    /**
     * @public
     *
     * @type { HTMLDivElement }
     **/
    domUpper;
    
    /**
     * @public
     *
     * @type { HTMLDivElement }
     **/
    domImage;
    
    /**
     * @public
     *
     * @type { HTMLImageElement }
     **/
    domImageElement;
    
    /**
     * @public
     *
     * @type { HTMLDivElement }
     **/
    domLower;
    
    /**
     * @public
     *
     * @type { HTMLHeadingElement }
     **/
    domHeading;
    
    /**
     * @public
     *
     * @type { CustomNumber }
     **/
    customNumber;
    
    /**
     * @public
     *
     * @type { HTMLParagraphElement }
     **/
    domPrice;
    
    /**
     * @public
     *
     * @type { HTMLSpanElement }
     **/
    domPriceValue;
    
    /**
     * @public
     *
     * @type { HTMLSpanElement }
     **/
    domPriceCurrency;
    
    /**
     * @public
     *
     * @type { HTMLSpanElement }
     **/
    domSystemText;
    
    /**
     * @constructor
     *
     * @param { Orders } orders
     *
     * @param { Object } record
     *
     * @param { OrderItemSettings } settings
     *
     * @return { OrderItem }
     **/
    constructor(orders, record, settings)
    {
        this.customEvents = new CustomEvents();
        
        this.orders = orders;
        
        this.record = record;
        
        this.settings = settings;
        
        this.domImageElement = this._createImageElement();
        
        this.domImage = this._createImage();
        
        this.domUpper = this._createUpper();
        
        this.domHeading = this._createHeading();
        
        this.customNumber = new CustomNumber(null, this.settings.customNumberSettings);
        
        this.domLower = this._createLower();
        
        this.domPriceValue = this._createPriceValue();
        
        this.domPriceCurrency = this._createPriceCurrency();
        
        this.domPrice = this._createPrice();
        
        this.domSystemText = this._createSystemText();
        
        this.domElement = this._createElement();
    }
    
    /**
     * @public
     *
     * @description Implements initialize base logic.
     *
     * @return { void }
     **/
    initialization()
    {
        this.domElement.append(this.domPrice);
        
        this.domLower.append(this.domHeading);
        
        this.customNumber.customEvents.subscribe(CustomNumberEventsClassifier.CHANGE, this._customNumberChangeHandler.bind(this));
        
        this.domElement.addEventListener('click', this._elementClickHandler.bind(this));
        
        this.domElement.addEventListener('animationiteration', this._elementAnimationIterationHandler.bind(this));
        
        this.customNumber.initialization();
        
        this.setModifier(OrderItemModifiersClassifier.INACTIVE, true);
    }
    
    /**
     * @private
     *
     * @description Implements handler for the element click event.
     *
     * @param { PointerEvent } event
     *
     * @return { void }
     **/
    _elementClickHandler(event)
    {
        const target = event.target.closest('button');
        
        if (target)
        {
            return ;
        }
        
        if (this.hasModifier(OrderItemModifiersClassifier.SYSTEM))
        {
            this.setModifier(OrderItemModifiersClassifier.SHAKE, true);
            
            return ;
        }
        
        this.customNumber.value = this.customNumber.value ? 0 : 1;
        
        this.customNumber.customEvents.execute(CustomNumberEventsClassifier.CHANGE, this.customNumber.value, this.customNumber);
    }
    
    /**
     * @private
     *
     * @description Implements handler for the element animation iteration event.
     *
     * @param { AnimationEvent } event
     *
     * @return { void }
     **/
    _elementAnimationIterationHandler(event)
    {
        this.setModifier(OrderItemModifiersClassifier.SHAKE, false);
        
        this.customEvents.execute(OrderItemEventsClassifier.ANIMATION_ITERATION, event, this);
    }
    
    /**
     * @private
     *
     * @description Implements handler for the CustomNumber change event.
     *
     * @param { number } value
     *
     * @param { CustomNumber } instance
     *
     * @return { void }
     **/
    _customNumberChangeHandler(value, instance)
    {
        this.setModifier(OrderItemModifiersClassifier.ACTIVE, value > 0);
        
        this.setModifier(OrderItemModifiersClassifier.INACTIVE, value <= 0);
        
        this.customEvents.execute(OrderItemEventsClassifier.CHANGE, value, instance, this);
    }
    
    /**
     * @public
     *
     * @description Sets the not-enough-money state to the element by the specified force.
     *
     * @return { void }
     **/
    notEnoughMoney(force)
    {
        this.setSystemText(force ? 'Not enough money!' : '');
        
        this.setModifier(OrderItemModifiersClassifier.SYSTEM, force);
    }
    
    /**
     * @public
     *
     * @description Implements process of scroll into view.
     *
     * TODO: Needs separate function for the scroll into view.
     *
     * @return { void }
     **/
    scrollIntoProcessing()
    {
        const rect = this.domElement.getBoundingClientRect();
        
        const orderItemsRect = this.orders.orderItems.domElement.getBoundingClientRect();
        
        const ordersPaddings = getPaddings(this.orders.domElement);
        
        const scrollOffset = (orderItemsRect.height - rect.height) / 2;
        
        this.orders.orderItems.domElement.scrollTo(0, rect.top + this.orders.orderItems.domElement.scrollTop - ordersPaddings.top - scrollOffset);
    }
    
    /**
     * @private
     *
     * @description Creates html node of the element.
     *
     * @return { HTMLDivElement }
     **/
    _createElement()
    {
        return createElement('div', { class: this.settings.elementClass }, [ this.domSystemText, this.domUpper, this.domLower ]);
    }
    
    /**
     * @private
     *
     * @description Creates html node of the upper element.
     *
     * @return { HTMLDivElement }
     **/
    _createUpper()
    {
        return createElement('div', { class: this.settings.upperClass }, [ this.domImage ]);
    }
    
    /**
     * @private
     *
     * @description Creates html node of the image element.
     *
     * @return { HTMLDivElement }
     **/
    _createImage()
    {
        return createElement('div', { class: this.settings.imageClass }, [ this.domImageElement ]);
    }
    
    /**
     * @private
     *
     * @description Creates html node of the image-element element.
     *
     * @return { HTMLImageElement }
     **/
    _createImageElement()
    {
        return createElement('img', { class: this.settings.imageElementClass, alt: this.record.name_object, src: `data:image/${ this.record.picture.comment };base64,${ this.record.picture.message }` });
    }
    
    /**
     * @private
     *
     * @description Creates html node of the lower element.
     *
     * @return { HTMLDivElement }
     **/
    _createLower()
    {
        return createElement('div', { class: this.settings.lowerClass }, []);
    }
    
    /**
     * @private
     *
     * @description Creates html node of the heading element.
     *
     * @return { HTMLHeadingElement }
     **/
    _createHeading()
    {
        return createElement('h2', { class: this.settings.headingClass }, [ this.record.name_object ]);
    }
    
    /**
     * @private
     *
     * @description Creates html node of the price element.
     *
     * @return { HTMLParagraphElement }
     **/
    _createPrice()
    {
        return createElement('p', { class: this.settings.priceClass }, [ this.domPriceValue, this.domPriceCurrency ]);
    }
    
    /**
     * @private
     *
     * @description Creates html node of the price value element.
     *
     * @return { HTMLSpanElement }
     **/
    _createPriceValue()
    {
        return createElement('p', { class: this.settings.priceValueClass }, [ this.record.price_object ]);
    }
    
    /**
     * @private
     *
     * @description Creates html node of the price currency element.
     *
     * @return { HTMLSpanElement }
     **/
    _createPriceCurrency()
    {
        return createElement('p', { class: this.settings.priceCurrencyClass }, [ this.record.code_currency ]);
    }
    
    /**
     * @private
     *
     * @description Creates html node of the system text element.
     *
     * @return { HTMLSpanElement }
     **/
    _createSystemText()
    {
        return createElement('p', { class: this.settings.systemTextClass });
    }
    
    /**
     * @public
     *
     * @description Sets the specified text to the system text element.
     *
     * @param { string } text
     *
     * @return { void }
     **/
    setSystemText(text)
    {
        this.domSystemText.textContent = text;
    }
    
    /**
     * @public
     *
     * @description Sets the given modifier to class list of the element by the given force.
     *
     * @param { OrderItemModifiersClassifier } modifier
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
     * @param { OrderItemModifiersClassifier } modifier
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
     * @description Clears the component.
     *
     * @return { void }
     **/
    clear()
    {
        this.customNumber.value = 0;
        
        this.setModifier(OrderItemModifiersClassifier.ACTIVE, false);
        
        this.setModifier(OrderItemModifiersClassifier.INACTIVE, true);
    }
    
    /**
     * @public
     *
     * @description Checks if the component contained active modifier.
     *
     * @return { boolean }
     **/
    isActive()
    {
        return this.hasModifier(OrderItemModifiersClassifier.ACTIVE);
    }
    
    /**
     * @public
     *
     * @description Checks if the component contained inactive modifier.
     *
     * @return { boolean }
     **/
    isInactive()
    {
        return this.hasModifier(OrderItemModifiersClassifier.INACTIVE);
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
     * @description Returns calculating price.
     *
     * @return { number }
     **/
    getCalculatingPrice()
    {
        return this.getPrice() * this.getQuantity();
    }
    
    /**
     * @public
     *
     * @description Creates object of order item standard.
     *
     * @return { OrderStandard }
     **/
    getOrder()
    {
        return { id_food: this.record.id_object, price: this.getCalculatingPrice(), quantity: this.getQuantity() };
    }
}
