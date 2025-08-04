import { Modal } from '../../../../components/Modal/Modal.js';
import { ModalEventsClassifier } from '../../../../components/Modal/Classifiers/ModalEventsClassifier.js';
import { querySelector } from '../../../../tea-modules/Functions/DOM/Queries/querySelector.js';
import { Form } from '../../../../components/Form/Form.js';
import { HttpRequest } from '../../../../tea-modules/Classes/Requests/HttpRequest.js';
import { HttpRequestMethodsClassifier } from '../../../../tea-modules/Classes/Requests/Standards/HttpRequestMethodsClassifier.js';
import { getAttribute } from '../../../../tea-modules/Functions/DOM/Attributes/getAttribute.js';
import { isStructureEmpty } from '../../../../tea-modules/Functions/Is/isStructureEmpty.js';
import { NotificationItemTypesClassifier } from '../../../../components/Notifications/Classifiers/NotificationItemTypesClassifier.js';
import { NotificationItemThemesClassifier } from '../../../../components/Notifications/Classifiers/NotificationItemThemesClassifier.js';


export class InvoiceChange
{
    /**
     * @public
     *
     * @type { Form }
     **/
    form;
    
    /**
     * @public
     *
     * @type { InvoicesTable }
     **/
    table;
    
    /**
     * @public
     *
     * @type { Modal }
     **/
    modal;
    
    /**
     * @constructor
     *
     * @param { InvoicesTable } table
     *
     * @return { InvoiceChange }
     **/
    constructor(table)
    {
        this.modal = this._getModal();
        
        this.table = table;
    }
    
    /**
     * @public
     *
     * @description Implements initialize base methods and logic.
     *
     * @return { void }
     **/
    initialization()
    {
        this.modal.initialization();
        
        this.form = new Form(querySelector('form', { root: this.modal.getElement() }), {});
        
        this.modal.customEvents.subscribe(ModalEventsClassifier.OPEN, this._modalOpenHandler.bind(this));
        
        this.modal.customEvents.subscribe(ModalEventsClassifier.CLOSE, this._modalCloseHandler.bind(this));
        
        this.modal.customEvents.subscribe(ModalEventsClassifier.CONFIRM, this._modalConfirmHandler.bind(this));
    }
    
    /**
     * @private
     *
     * @description Implements handler for the modal open event.
     *
     * @param { Modal } instance
     *
     * @return { Modal }
     **/
   async  _modalOpenHandler(instance)
    {
        this.modal.freeze(true);
        
        const trigger = instance.getTrigger();
        
        const id_object = getAttribute(trigger, 'id', { isDataAttribute: true });
        
        const record = await this._getRecord(id_object);
        
        this.form.getElementByName('price').value = record.price_object;
        
        this.form.getElementByName('id_object').value = record.id_object;
        
        this.modal.freeze(false);
    }
    
    _modalCloseHandler()
    {
        this.form.reset();
    }
    
    async _modalConfirmHandler()
    {
        this.modal.freeze(true);
        
        const record = await this.form.send();
        
        this.table.table.response = null;
        
        this.table.table.update();
        
        this.modal.close();
        
        this.modal.freeze(false);
        
        setTimeout(() =>
        {
            app.notifications.create({  heading: 'Success', type: NotificationItemTypesClassifier.DEFAULT, theme: NotificationItemThemesClassifier.SUCCESS, withClose: true, svgId: 'essential-verify' });
        }, 30);
    }
    
    async _getRecord(id_object)
    {
        const request = new HttpRequest(
            {
                url: this.table.url,
                method: HttpRequestMethodsClassifier.POST,
                data:
                    {
                        id_object: id_object,
                    }
            });
        
        const response = await request.execute();
        
        if (!isStructureEmpty(response.data))
        {
            return response.data[0];
        }
    }
    
    /**
     * @private
     *
     * @description Creates and returns modal instance.
     *
     * @return { Modal }
     **/
    _getModal()
    {
        return new Modal(
            {
                id: 'edit-modal',
                cardSettings:
                    {
                        heading: 'Edit form',
                        cancelButtonSettings: { text: 'Cancel', elementClass: [ 'button--size-middle', 'button--type-default', 'button--theme-white-azure-bittersweet', ] },
                        confirmButtonSettings: { text: 'Confirm', elementClass: [ 'button--size-middle', 'button--type-default', 'button--theme-white-azure-wild-sand' ] },
                        lowerSettings:
                            {
                                isSingle: true
                            },
                    },
            });
    }
}
