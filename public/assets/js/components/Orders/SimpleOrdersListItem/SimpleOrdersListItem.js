import { createElement } from '../../../tea-modules/Functions/DOM/Elements/createElement.js';
import { SimpleOrdersListItemSettings } from './SimpleOrdersListItemSettings.js';
import { SimpleOrdersListItemList } from '../SimpleOrdersListItemList/SimpleOrdersListItemList.js';
import { DateManager } from '../../../tea-modules/Classes/Dates/DateManager.js';
import { SimpleOrdersListItemStatesClassifier } from './SimpleOrdersListItemStatesClassifier.js';
import { Button } from '../../Button/Button.js';
import { ButtonEventsClassifier } from '../../Button/ButtonEventsClassifier.js';


/**
 * @class
 *
 * @description Implements logic for the simple orders list item component.
 **/
export class SimpleOrdersListItem
{
    /**
     * @public
     *
     * @type { SimpleOrdersList }
     **/
    parentInstance;
    
    /**
     * @public
     *
     * @type { HTMLLIElement }
     **/
    domElement;
    
    /**
     * @public
     *
     * @type { Button }
     **/
    removeButton;
    
    /**
     * @public
     *
     * @type { Object }
     **/
    record;
    
    /**
     * @public
     *
     * @type { SimpleOrdersListItemSettings }
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
     * @type { HTMLParagraphElement }
     **/
    domTime;
    
    /**
     * @public
     *
     * @type { HTMLSpanElement }
     **/
    domTimeValue;
    
    /**
     * @public
     *
     * @type { HTMLSpanElement }
     **/
    domTimeUnit;
    
    /**
     * @public
     *
     * @type { HTMLHeadingElement }
     **/
    domHeading;
    
    /**
     * @public
     *
     * @type { HTMLParagraphElement }
     **/
    domPrice;
    
    /**
     * @public
     *
     * @type { SimpleOrdersListItemList }
     **/
    simpleOrdersListItemList;
    
    /**
     * @constructor
     *
     * @param { SimpleOrdersList } parentInstance
     *
     * @param { Object } record
     *
     * @param { SimpleOrdersListItemSettings } settings
     *
     * @return { SimpleOrdersListItem }
     **/
    constructor(parentInstance, record, settings)
    {
        !settings && (settings = new SimpleOrdersListItemSettings());
        
        this.parentInstance = parentInstance;
        
        this.record = record;
        
        this.settings = settings;
        
        this.domElement = this._createElement();
        
        this.domUpper = this._createUpper();
        
        this.domTimeValue = this._createTimeValue();
        
        this.domTimeUnit = this._createTimeUnit();
        
        this.domTime = this._createTime();
        
        this.domHeading = this._createHeading();
        
        this.domPrice = this._createPrice();
        
        /**
         * TODO: Needed refactoring with dynamic settings.
         **/
        this.removeButton = new Button({ elementClass: [ 'simple-orders-list-item__remove-button', 'button--size-large', 'button--type-default', 'button--theme-white-azure-bittersweet', ], iconClass: 'icon icon-size-20', iconId: 'essential-trash', isConfirm: true });
        
        this.domElement.append(this.removeButton.getElement());
        
        this.simpleOrdersListItemList = new SimpleOrdersListItemList(this, this.settings.simpleOrdersListItemListSettings);
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
        this.simpleOrdersListItemList.initialization();
        
        this.timeUpdateProcessing();
        
        this.domHeading.textContent = `${ this.record.sur_name } ${ this.record.first_name } ${ this.record.patronymic }`;
        
        this.domPrice.append(this.record.money_paid + ' ');
        
        this.domPrice.append(this._createCurrency(this.record.code_currency));
        
        this.removeButton.customEvents.subscribe(ButtonEventsClassifier.CLICK, this._removeButtonClickHandler.bind(this));
        
        this._insertProcessing();
    }
    
    /**
     * @public
     *
     * @description Implements process of the time update.
     *
     * @return { void }
     **/
    timeUpdateProcessing()
    {
        const milliseconds = DateManager.difference(new Date(), this.record.date_event);
        
        const seconds = DateManager.millisecondsToSeconds(milliseconds);
        
        const minutes = DateManager.secondsToMinutes(seconds);
        
        const minutesRemainder = Math.floor(DateManager.secondsToMinutesRemainder(seconds));
        
        minutes < 60 && this._timeStatesProcessing(minutesRemainder);
        
        if (minutesRemainder >= this.settings.oldStateTime || minutes >= 60)
        {
            this.domElement.classList.toggle(SimpleOrdersListItemStatesClassifier.OLD, true);
            
            this.setTime('--:--');
            
            return ;
        }
        
        this.setTime(`${ DateManager.pad(minutesRemainder) }:${ DateManager.pad(DateManager.secondsToRemainder(seconds)) }`);
    }
    
    /**
     * @private
     *
     * @description Implements a click handler for the remove button component.
     *
     * @param { PointerEvent } event
     *
     * @param { Button } instance
     *
     * @return { void }
     **/
    async _removeButtonClickHandler(event, instance)
    {
        instance.loading(true);
        
        await this.parentInstance.removeOrder(this.record.id_order);
        
        instance.loading(false);
    }
    
    /**
     * @public
     *
     * @description Removes node from document.
     *
     * @return { void }
     **/
    remove()
    {
        this.domElement.remove();
    }
    
    /**
     * @private
     *
     * @description Implements process of the time states.
     *
     * @param { number } minutes
     *
     * @return { void }
     **/
    _timeStatesProcessing(minutes)
    {
        this.domElement.classList.toggle(SimpleOrdersListItemStatesClassifier.NEW, minutes < this.settings.newStateTime);
        
        this.domElement.classList.toggle(SimpleOrdersListItemStatesClassifier.STALE, minutes >= this.settings.newStateTime && minutes < this.settings.staleStateTime);
    }
    
    /**
     * @private
     *
     * @description Implements process of the elements inserting.
     *
     * @return { void }
     **/
    _insertProcessing()
    {
        this.domUpper.append(this.domTime, this.domHeading, this.domPrice);
        
        this.domElement.append(this.domUpper, this.simpleOrdersListItemList.getElement());
    }
    
    /**
     * @private
     *
     * @description Creates html node of the element.
     *
     * @return { HTMLLIElement }
     **/
    _createElement()
    {
        return createElement('li', { class: this.settings.elementClass });
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
        return createElement('div', { class: this.settings.upperClass });
    }
    
    /**
     * @private
     *
     * @description Creates html node of the time element.
     *
     * @return { HTMLParagraphElement }
     **/
    _createTime()
    {
        return createElement('p', { class: this.settings.timeClass }, [ this.domTimeValue ]);
    }
    
    /**
     * @private
     *
     * @description Creates html node of the time-value element.
     *
     * @return { HTMLSpanElement }
     **/
    _createTimeValue()
    {
        return createElement('span', { class: this.settings.timeValueClass });
    }
    
    /**
     * @private
     *
     * @description Creates html node of the time-unit element.
     *
     * @return { HTMLSpanElement }
     **/
    _createTimeUnit()
    {
        return createElement('span', { class: this.settings.timeUnitClass }, [ 'min:sec' ]);
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
        return createElement('h2', { class: this.settings.headingClass });
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
        return createElement('p', { class: this.settings.priceClass });
    }
    
    /**
     * @private
     *
     * @description Creates base html node of the currency element.
     *
     * @param { string } value
     *
     * @return { HTMLDivElement }
     **/
    _createCurrency(value)
    {
        return createElement('span', { class: this.settings.currencyClass }, [ value ]);
    }
    
    /**
     * @public
     *
     * @description Returns dom element.
     *
     * @return { HTMLLIElement }
     **/
    getElement()
    {
        return this.domElement;
    }
    
    /**
     * @public
     *
     * @description Sets the given value to time value.
     *
     * @param { string } value
     *
     * @return { void }
     **/
    setTime(value)
    {
        this.domTimeValue.textContent = value;
    }
}
