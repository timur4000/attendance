import { Orders } from '../Orders.js';
import { OrdersModifiersClassifier } from '../OrdersModifiersClassifier.js';
import { Modal } from '../../Modal/Modal.js';
import { ModalEventsClassifier } from '../../Modal/Classifiers/ModalEventsClassifier.js';
import { querySelector } from '../../../tea-modules/Functions/DOM/Queries/querySelector.js';
import { getAttribute } from '../../../tea-modules/Functions/DOM/Attributes/getAttribute.js';
import { SimpleOrdersSettings } from './SimpleOrdersSettings.js';
import { HttpRequest } from '../../../tea-modules/Classes/Requests/HttpRequest.js';
import { HttpRequestMethodsClassifier } from '../../../tea-modules/Classes/Requests/Standards/HttpRequestMethodsClassifier.js';


/**
 * @class
 *
 * @description Implements manager logic for simple orders.
 **/
export class SimpleOrders extends Orders
{
    /**
     * @public
     *
     * @type { Modal }
     **/
    deficitModal;
    
    /**
     * @public
     *
     * @type { Modal }
     **/
    completeModal;
    
    /**
     * @public
     *
     * @type { Modal }
     **/
    notificationModal;
    
    /**
     * @public
     *
     * @type { HTMLSpanElement }
     **/
    domNotificationModalText;
    
    /**
     * @public
     *
     * @type { boolean }
     **/
    onCredit = false;
    
    /**
     * @public
     *
     * @type { ResponseStandard }
     **/
    deficitResponse;
    
    /**
     * @constructor
     *
     * @param { string | HTMLElement } selectors
     *
     * @param { SimpleOrdersSettings ? } settings
     *
     * @return { Orders }
     *
     * @todo Settings needs refactoring.
     **/
    constructor(selectors, settings)
    {
        super(selectors, settings);
        
        this.settings.balanceUrl = getAttribute(this.domElement, 'balance-url', { isAfterRemove: true, isDataAttribute: true });
        
        this.deficitModal = this._getDeficitModal();
    
        this.deficitModal.customEvents.subscribe(ModalEventsClassifier.CONFIRM, this._deficitModalConfirmClickHandler.bind(this));
        
        this.deficitModal.customEvents.subscribe(ModalEventsClassifier.CANCEL, this._deficitModalCancelClickHandler.bind(this));
        
        this.deficitModal.initialization();
        
        this.completeModal = this._getCompleteModal();
        
        this.completeModal.customEvents.subscribe(ModalEventsClassifier.OPEN, this._completeModalOpenHandler.bind(this));
        
        this.completeModal.customEvents.subscribe(ModalEventsClassifier.CONFIRM, this._completeModalConfirmClickHandler.bind(this));
        
        this.completeModal.customEvents.subscribe(ModalEventsClassifier.CANCEL, this._completeModalCancelClickHandler.bind(this));
        
        this.completeModal.initialization();
        
        this.notificationModal = this._getNotificationModal();
        
        this.notificationModal.customEvents.subscribe(ModalEventsClassifier.CANCEL, this._notificationModalCancelClickHandler.bind(this));
        
        this.notificationModal.initialization();
        
        this.domNotificationModalText = querySelector('#notification-modal-prepend-text', { root: this.notificationModal.card.element });
    }
    
    /**
     * @public
     *
     * @description Implements request to food card balance.
     *
     * @return { ResponseStandard }
     **/
    async balanceRequest()
    {
        const response = new HttpRequest(
            {
                url: this.settings.balanceUrl,
                method: HttpRequestMethodsClassifier.POST,
                data: { id_user: this.ordersAccount.getIdUser() }
            }
        );
        
        return await response.execute();
    }
    
    /**
     * @inheritDoc
     **/
    async _orderConfirmationConfirmClickHandler(event, instance)
    {
        this.setModifier(OrdersModifiersClassifier.CONFIRMATION, true);
        
        this.orderConfirmation.loading(true);
        
        this.systemWrapperSwapProcessing(true);
        
        const request = await this.orderConfirmationRequest();
        
        if (request.data.is_deficit)
        {
            this.deficitModal.open();
            
            this.deficitModal.card.confirm.disable(this._getPossibleAmount(request) < this.orderItems.getTotalPrice());
            
            this.deficitResponse = request;
        }
        
        if (request.data.success)
        {
            this.completeModal.open();
        }
        
        this.activeElementBlur();
        
        this.setModifier(OrdersModifiersClassifier.CONFIRMATION, false);
        
        this.orderConfirmation.loading(false);
        
        this.systemWrapperSwapProcessing(false);
    }
    
    /**
     * @inheritDoc
     **/
    getOrderConfirmationRequestData()
    {
        return { ...super.getOrderConfirmationRequestData(), on_credit: this.onCredit };
    }
    
    /**
     * @protected
     *
     * @description Implements handler for the deficit modal confirm click event.
     *
     * @returns { void }
     **/
    async _deficitModalConfirmClickHandler()
    {
        this.setModifier(OrdersModifiersClassifier.CONFIRMATION, true);
        
        this.orderConfirmation.loading(true);
        
        this.systemWrapperSwapProcessing(true);
        
        this.deficitModal.close();
        
        this.onCredit = true;
        
        const request = await this.orderConfirmationRequest();
        
        if (request.data.success)
        {
            this.completeModal.open();
        }
        
        this.activeElementBlur();
        
        this.setModifier(OrdersModifiersClassifier.CONFIRMATION, false);
        
        this.orderConfirmation.loading(false);
        
        this.systemWrapperSwapProcessing(false);
    }
    
    /**
     * @protected
     *
     * @description Implements handler for the deficit modal cancel click event.
     *
     * @returns { void }
     **/
    _deficitModalCancelClickHandler()
    {
        this.clear();
    }
    
    /**
     * @inheritDoc
     **/
    clear()
    {
        super.clear();
        
        this.onCredit = false;
        
        this.deficitResponse = undefined;
    }
    
    /**
     * @protected
     *
     * @description Calculates and returns the possible amount for which you can order.
     *
     * @param { ResponseStandard } response
     *
     * @return { number }
     **/
    _getPossibleAmount(response)
    {
        return response.record.money_amount - response.data.balance_minimum;
    }
    
    /**
     * @protected
     *
     * @description Creates and returns instance of deficit modal component.
     *
     * @return { Modal }
     **/
    _getDeficitModal()
    {
        return new Modal(
            {
                id: 'deficit-modal',
                withOuterCancel: false,
                cardSettings:
                    {
                        withUpper: false,
                        confirmButtonSettings: { text: 'On credit', elementClass: [ 'button--size-high', 'button--type-default', 'button--theme-white-azure-wild-sand' ] },
                        cancelButtonSettings: { text: 'Cancel', elementClass: [ 'button--size-high', 'button--type-default', 'button--theme-white-azure-bittersweet', ] },
                    }
            }
        );
    }
    
    /**
     * @protected
     *
     * @description Implements handler for the complete modal open event.
     *
     * @returns { void }
     **/
    _completeModalOpenHandler()
    {
        this.onCredit = false;
    }
    
    /**
     * @protected
     *
     * @description Implements handler for the complete modal confirm click event.
     *
     * @returns { void }
     **/
    _completeModalConfirmClickHandler()
    {
        this.orderItems.clear();
        
        this.completeModal.close();
    }
    
    /**
     * @protected
     *
     * @description Implements handler for the complete modal cancel click event.
     *
     * @returns { void }
     **/
    async _completeModalCancelClickHandler()
    {
        const balance = await this.balanceRequest();
        
        this.setNotificationModalText(`Your current balance: ${ balance.record.money_amount } ${ balance.record.code_currency }`);
        
        this.notificationModal.open();
        
        this.clear();
    }
    
    /**
     * @protected
     *
     * @description Creates and returns instance of complete modal component.
     *
     * @return { Modal }
     **/
    _getCompleteModal()
    {
        return new Modal(
            {
                id: 'complete-modal',
                withOuterCancel: false,
                cardSettings:
                    {
                        withUpper: false,
                        confirmButtonSettings: { text: 'Yes', elementClass: [ 'button--size-high', 'button--type-default', 'button--theme-white-azure-wild-sand' ] },
                        cancelButtonSettings: { text: 'No', elementClass: [ 'button--size-high', 'button--type-default', 'button--theme-white-azure-bittersweet', ] },
                    }
            }
        );
    }
    
    /**
     * @protected
     *
     * @description Implements handler for the notification modal cancel click event.
     *
     * @returns { void }
     **/
    _notificationModalCancelClickHandler()
    {
        this.notificationModal.close();
    }
    
    /**
     * @protected
     *
     * @description Creates and returns instance of notification modal component.
     *
     * @return { Modal }
     **/
    _getNotificationModal()
    {
        return new Modal(
            {
                id: 'notification-modal',
                cardSettings:
                    {
                        withUpper: false,
                        cancelButtonSettings: { text: 'OK', elementClass: [ 'button--size-high', 'button--type-default', 'button--theme-white-azure-wild-sand', ] },
                    }
            }
        );
    }
    
    /**
     * @public
     *
     * @description Sets the given value to the notification modal text element.
     *
     * @param { string } value
     *
     * @return { void }
     **/
    setNotificationModalText(value)
    {
        this.domNotificationModalText.innerText = value;
    }
}
