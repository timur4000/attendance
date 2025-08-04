import { createElement } from '../../../tea-modules/Functions/DOM/Elements/createElement.js';
import { Button }        from '../../Button/Button.js';
import { OrderConfirmationModifiersClassifier } from './OrderConfirmationModifiersClassifier.js';
import { CustomEvents } from '../../../tea-modules/Classes/CustomEvents/CustomEvents.js';
import { ButtonEventsClassifier } from '../../Button/ButtonEventsClassifier.js';
import { OrderConfirmationEventsClassifier } from './OrderConfirmationEventsClassifier.js';


/**
 * @class
 *
 * @description Implements logic for the order confirmation component.
 **/
export class OrderConfirmation
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
     * @type { OrderConfirmationSettings }
     **/
    settings;
    
    /**
     * @public
     *
     * @type { HTMLElement }
     **/
    domElement;
    
    /**
     * @public
     *
     * @type { HTMLParagraphElement }
     **/
    domParagraph;
    
    /**
     * @public
     *
     * @type { HTMLSpanElement }
     **/
    domParagraphValue;
    
    /**
     * @public
     *
     * @type { HTMLSpanElement }
     **/
    domParagraphCurrency;
    
    /**
     * @public
     *
     * @type { Button }
     **/
    confirmButton;
    
    /**
     * @constructor
     *
     * @param { Orders } orders
     *
     * @param { OrderConfirmationSettings } settings
     *
     * @return { OrderConfirmation }
     **/
    constructor(orders, settings)
    {
        this.customEvents = new CustomEvents();
        
        this.orders = orders;
        
        this.settings = settings;
        
        this.confirmButton = new Button(this.settings.confirmButtonSettings);
        
        this.domParagraphValue = this._createParagraphValue();
        
        this.domParagraphCurrency = this._createParagraphCurrency();
        
        this.domParagraph = this._createParagraph();
        
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
        this.confirmButton.customEvents.subscribe(ButtonEventsClassifier.CLICK, this._confirmButtonClickHandler.bind(this));
        
        this.undisplayed();
    }
    
    /**
     * @private
     *
     * @description Implements handler for the confirm button click event.
     *
     * @param { PointerEvent } event
     *
     * @param { Button } instance
     *
     * @return { void }
     **/
    _confirmButtonClickHandler(event, instance)
    {
        this.customEvents.execute(OrderConfirmationEventsClassifier.CONFIRM, event, instance);
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
        return createElement('div', { class: this.settings.elementClass }, [ this.domParagraph, this.confirmButton.getElement() ]);
    }
    
    /**
     * @private
     *
     * @description Creates html node of the paragraph element.
     *
     * @return { HTMLParagraphElement }
     **/
    _createParagraph()
    {
        return createElement('div', { class: this.settings.paragraphClass }, [ this.domParagraphValue, this.domParagraphCurrency ]);
    }
    
    /**
     * @private
     *
     * @description Creates html node of the paragraph value element.
     *
     * @return { HTMLSpanElement }
     **/
    _createParagraphValue()
    {
        return createElement('span', { class: this.settings.paragraphValueClass });
    }
    
    /**
     * @private
     *
     * @description Creates html node of the paragraph currency element.
     *
     * @return { HTMLSpanElement }
     **/
    _createParagraphCurrency()
    {
        return createElement('span', { class: this.settings.paragraphCurrencyClass });
    }
    
    /**
     * @public
     *
     * @description Sets the given text to value.
     *
     * @param { number } value
     *
     * @param { string } currency
     *
     * @param { number } fractionDigits
     *
     * @return { void }
     **/
    setValue(value, currency, fractionDigits = this.orders.settings.fractionDigits)
    {
        this.domParagraphValue.textContent = value.toFixed(fractionDigits);
        
        this.domParagraphCurrency.textContent = currency;
    }
    
    /**
     * @public
     *
     * @description Sets the given modifier to class list of the element by the given force.
     *
     * @param { OrderConfirmationModifiersClassifier } modifier
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
     * @param { OrderConfirmationModifiersClassifier } modifier
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
     * @description Displayed the component.
     *
     * @return { void }
     **/
    displayed()
    {
        this.setModifier(OrderConfirmationModifiersClassifier.DISPLAYED, true);
        
        this.setModifier(OrderConfirmationModifiersClassifier.UNDISPLAYED, false);
    }
    
    /**
     * @public
     *
     * @description Undisplayed the component.
     *
     * @return { void }
     **/
    undisplayed()
    {
        this.setModifier(OrderConfirmationModifiersClassifier.DISPLAYED, false);
        
        this.setModifier(OrderConfirmationModifiersClassifier.UNDISPLAYED, true);
    }
    
    /**
     * @public
     *
     * @description Undisplayed or displayed the component by the given force.
     *
     * @param { boolean } force
     *
     * @return { void }
     **/
    toggle(force)
    {
        force ? this.displayed() : this.undisplayed();
    }
    
    /**
     * @public
     *
     * @description Disables or enables the component by the given force.
     *
     * @param { boolean } force
     *
     * @return { void }
     **/
    disabled(force)
    {
        this.setModifier(OrderConfirmationModifiersClassifier.DISABLED, force);
        
        this.confirmButton.disable(force);
    }
    
    /**
     * @public
     *
     * @description Returns offset height of the component.
     *
     * @return { number }
     **/
    getOffsetHeight()
    {
        return this.domElement.offsetHeight;
    }
    
    /**
     * @public
     *
     * @description Checks if the component contained displayed modifier in the class list.
     *
     * @return { boolean }
     **/
    isDisplaying()
    {
        return this.hasModifier(OrderConfirmationModifiersClassifier.DISPLAYED);
    }
    
    /**
     * @public
     *
     * @description Change loading state on the component by the given force.
     *
     * @return { void }
     **/
    loading(force)
    {
        this.confirmButton.loading(force);
    }
}
