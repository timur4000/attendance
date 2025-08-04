import { createElement }                    from '../../../tea-modules/Functions/DOM/Elements/createElement.js';
import { OrdersAccountSettings }            from './OrdersAccountSettings.js';
import { Button }                           from '../../Button/Button.js';
import { HttpRequest }                      from '../../../tea-modules/Classes/Requests/HttpRequest.js';
import { HttpRequestMethodsClassifier }     from '../../../tea-modules/Classes/Requests/Standards/HttpRequestMethodsClassifier.js';
import { OrdersAccountModifiersClassifier } from './OrdersAccountModifiersClassifier.js';
import { ButtonEventsClassifier }           from '../../Button/ButtonEventsClassifier.js';
import { clearObject }                      from '../../../tea-modules/Functions/Objects/clearObject.js';
import { CustomEvents }                     from '../../../tea-modules/Classes/CustomEvents/CustomEvents.js';
import { OrdersAccountEventsClassifier }    from './OrdersAccountEventsClassifier.js';
import { HttpRequestEventsClassifier }      from '../../../tea-modules/Classes/Requests/Standards/HttpRequestEventsClassifier.js';
import { HttpStatusesClassifier }           from '../../../tea-modules/Classes/Requests/Standards/HttpStatusesClassifier.js';
import { createText }                       from '../../../tea-modules/Functions/DOM/Elements/createText.js';
import { LibraryChars }                     from '../../../tea-modules/Classes/Standards/Chars/LibraryChars.js';
import { Parameters }              from '../../../standards/Parameters/Parameters.js';
import { ParametersIdsClassifier } from '../../../standards/Classifiers/Parameters/ParametersIdsClassifier.js';


/**
 * @class
 *
 * @description Implements logic of the orders account component.
 **/
export class OrdersAccount
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
     * @type { HTMLElement }
     **/
    domElement;
    
    /**
     * @public
     *
     * @type { Orders }
     **/
    orders;
    
    /**
     * @public
     *
     * @type { OrdersAccountSettings }
     **/
    settings;
    
    /**
     * @public
     *
     * @type { string }
     **/
    value = '';
    
    /**
     * @public
     *
     * @type { HTMLElement }
     **/
    domUpper;
    
    /**
     * @public
     *
     * @type { HTMLElement }
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
     * @type { HTMLHeadingElement }
     **/
    domHeading;
    
    /**
     * @public
     *
     * @type { HTMLParagraphElement }
     **/
    domBalance;
    
    /**
     * @public
     *
     * @type { Text }
     **/
    domBalanceValue;
    
    /**
     * @public
     *
     * @type { HTMLElement }
     **/
    domLower;
    
    /**
     * @public
     *
     * @type { Button }
     **/
    cancelButton;
    
    /**
     * @public
     *
     * @type { Object }
     **/
    account;
    
    /**
     * @public
     *
     * @type { number }
     **/
    balance = 0;
    
    /**
     * @public
     *
     * @type { ResponseStandard | XMLHttpRequest }
     **/
    balanceMinimumParameter;
    
    /**
     * @constructor
     *
     * @param { Orders } orders
     *
     * @param { OrdersAccountSettings } settings
     *
     * @return { OrdersAccount }
     **/
    constructor(orders, settings)
    {
        this.customEvents = new CustomEvents();
        
        this.orders = orders;
        
        !settings && (settings = new OrdersAccountSettings());
        
        this.settings = settings;
        
        this.domImage = this._createImage();
        
        this.domImageElement = this._createImageElement();
        
        this.domHeading = this._createHeading();
        
        this.domBalanceValue = createText('');
        
        this.domBalance = this._createBalance();
        
        this.domUpper = this._createUpper();
        
        this.cancelButton = new Button(this.settings.cancelButtonSettings);
        
        this.domLower = this._createLower();
        
        this.domElement = this._createElement();
    }
    
    /**
     * @public
     *
     * @description Initializes base logic of component.
     *
     * @return { void }
     **/
    async initialization()
    {
        this.setModifier(OrdersAccountModifiersClassifier.EMPTY, true);
        
        this.balanceMinimumParameter = await Parameters.get(ParametersIdsClassifier.FOOD_CARD_BALANCE_MINIMUM);
        
        document.addEventListener('keypress', this._inputKeydownHandler.bind(this));
        
        this.domLower.append(this.cancelButton.getElement());
        
        this.cancelButton.customEvents.subscribe(ButtonEventsClassifier.CLICK, this._cancelButtonClickHandler.bind(this));
    }
    
    /**
     * @private
     *
     * @description Implements handler for the input keydown event.
     *
     * @param { KeyboardEvent } event
     *
     * @return { void }
     **/
    _inputKeydownHandler(event)
    {
        if (event.key !== 'Enter')
        {
            this.value += event.key;
            
            return ;
        }
        
        this.customEvents.execute(OrdersAccountEventsClassifier.ENTER, this.value, event, this);
    }
    
    /**
     * @private
     *
     * @description Implements handler for the cancel button click event.
     *
     * @return { void }
     **/
    _cancelButtonClickHandler()
    {
        this.customEvents.execute(OrdersAccountEventsClassifier.CHANGE, this);
    }
    
    /**
     * @public
     *
     * @description Shows account.
     *
     * @return { void }
     **/
    async show()
    {
        await this.requestProcessing();
    }
    
    /**
     * @public
     *
     * @description Implements request process of the component.
     *
     * @return { void }
     **/
    async requestProcessing()
    {
        await this.getAccount();
    }
    
    /**
     * @public
     *
     * @description Implements fill process of the component.
     *
     * @return { void }
     **/
    fillProcessing()
    {
        this.setHeading(`${ this.account.sur_name } ${ this.account.first_name } ${ this.account.patronymic }`);

        this.setImageElement(this.account.picture);
        
        this.setModifier(OrdersAccountModifiersClassifier.EMPTY, false);
        
        this.setBalance(this.account.food_card_money);
    }
    
    /**
     * @public
     *
     * @description Clears account.
     *
     * @return { void }
     **/
    clear()
    {
        this.setModifier(OrdersAccountModifiersClassifier.LOADED, false);
        
        this.setModifier(OrdersAccountModifiersClassifier.EMPTY, true);
        
        this.setHeading(`--`);

        this.domImageElement.remove();
        
        clearObject(this.account);
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
        return createElement('section', { class: this.settings.elementClass }, [ this.domUpper, this.domLower ]);
    }
    
    /**
     * @private
     *
     * @description Creates html node of the upper element.
     *
     * @return { HTMLElement }
     **/
    _createUpper()
    {
        return createElement('div', { class: this.settings.upperClass }, [ this.domImage, this.domHeading, this.domBalance ]);
    }
    
    /**
     * @private
     *
     * @description Creates html node of the image element.
     *
     * @return { HTMLElement }
     **/
    _createImage()
    {
        return createElement('div', { class: this.settings.imageClass });
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
        return createElement('img', { class: this.settings.imageElementClass });
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
        return createElement('h1', { class: this.settings.headingClass });
    }
    
    /**
     * @private
     *
     * @description Creates html node of the balance element.
     *
     * @return { HTMLParagraphElement }
     **/
    _createBalance()
    {
        const currency = this.settings.isCurrency ? this._createCurrency() : undefined;
        
        return createElement('p', { class: this.settings.balanceClass }, [ this.domBalanceValue, currency ]);
    }
    
    /**
     * @private
     *
     * @description Creates html node of the currency element.
     *
     * @return { HTMLSpanElement }
     **/
    _createCurrency()
    {
        return createElement('span', { class: this.settings.currencyClass }, [ this.settings.currency ]);
    }
    
    /**
     * @private
     *
     * @description Creates html node of the lower element.
     *
     * @return { HTMLElement }
     **/
    _createLower()
    {
        return createElement('div', { class: this.settings.lowerClass });
    }
    
    /**
     * @public
     *
     * @description Sets the given modifier to class list of the element by the given force.
     *
     * @param { string } modifier
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
     * @param { string } modifier
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
     * @description Returns object of account.
     *
     * @return { Promise<Object> }
     **/
    async getAccount()
    {
        const request = new HttpRequest(
            {
                url: this.settings.url,
                method: HttpRequestMethodsClassifier.POST,
                data: { [ this.settings.inputName ]: this.value }
            }
        );

        request.customEvents.subscribe(HttpRequestEventsClassifier.SUCCESS, this._requestSuccessHandler.bind(this));
        
        return await request.execute();
    }
    
    /**
     * @private
     *
     * @description Implements handler for the request success event.
     *
     * @param { ResponseStandard } response
     *
     * @param { XMLHttpRequest } xhr
     *
     * @return { void }
     **/
    _requestSuccessHandler(response, xhr)
    {
        if (response.status !== HttpStatusesClassifier.SUCCESS)
        {
            return this.customEvents.execute(OrdersAccountEventsClassifier.REQUEST_ERROR, response, xhr);
        }
        
        this.account = response.data;
        
        this.fillProcessing();
        
        this.customEvents.execute(OrdersAccountEventsClassifier.REQUEST_SUCCESS, response, xhr);
    }
    
    /**
     * @public
     *
     * @description Sets the given text to heading element.
     *
     * @param { string } text
     *
     * @return { void }
     **/
    setHeading(text)
    {
        this.domHeading.textContent = text;
    }
    
    /**
     * @public
     *
     * @description Sets the given value to balance property and element.
     *
     * @param { number } value
     *
     * @return { void }
     **/
    setBalance(value)
    {
        this.balance = value;
        
        this.domBalanceValue.textContent = this.settings.balanceText + LibraryChars.space + value.toFixed(this.orders.settings.fractionDigits);
    }
    
    /**
     * @public
     *
     * @description Returns the balance.
     *
     * @return { number }
     **/
    getBalance(withMinimumParameter = true)
    {
        return this.balance - (withMinimumParameter ? this.balanceMinimumParameter.record.value_integer : 0);
    }
    
    /**
     * @public
     *
     * @description Returns the remainder of the balance.
     *
     * @return { number }
     **/
    getBalanceRemainder(withMinimumParameter = true)
    {
        return this.getBalance(withMinimumParameter) - this.orders.orderItems.getTotalPrice();
    }
    
    /**
     * @public
     *
     * @description Sets image element by the given picture object.
     *
     * @param { Object } picture
     *
     * @return { void }
     **/
    setImageElement(picture)
    {
        this.domImageElement.src = `data:image/${ picture.comment };base64,${ picture.message }`;
        
        this.domImage.append(this.domImageElement);
    }
    
    /**
     * @public
     *
     * @description Clears the input.
     *
     * @return { void }
     **/
    clearInput()
    {
        this.value = '';
    }
    
    /**
     * @public
     *
     * @description Returns id user.
     *
     * @return { number }
     **/
    getIdUser()
    {
        return this.account.id_user;
    }
}
