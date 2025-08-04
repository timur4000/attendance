import { Modal } from '../../components/Modal/Modal.js';
import { Form }  from '../../components/Form/Form.js';
import { querySelector } from '../../tea-modules/Functions/DOM/Queries/querySelector.js';
import { ModalEventsClassifier } from '../../components/Modal/Classifiers/ModalEventsClassifier.js';
import { NotificationItemTypesClassifier } from '../../components/Notifications/Classifiers/NotificationItemTypesClassifier.js';
import { NotificationItemThemesClassifier } from '../../components/Notifications/Classifiers/NotificationItemThemesClassifier.js';
import { FormEventsClassifier } from '../../components/Form/FormEventsClassifier.js';


/**
 * @abstract
 *
 * @class
 *
 * @description Implements abstract logic for all modal form components.
 **/
export class ModalForm
{
    /**
     * @public
     *
     * @type { BaseTable }
     **/
    baseTable;
    
    /**
     * @public
     *
     * @type { Modal }
     **/
    modal;
    
    /**
     * @public
     *
     * @type { Form }
     **/
    form;
    
    /**
     * @public
     *
     * @type { boolean }
     **/
    withFormReset = true;
    
    /**
     * @constructor
     *
     * @param { BaseTable ? } baseTable
     *
     * @return { ModalForm }
     **/
    constructor(baseTable)
    {
        this.modal = this._getModal();
        
        this.baseTable = baseTable;
    }
    
    /**
     * @public
     *
     * @description Implements initialize base logic.
     **/
    initialization()
    {
        this.modal.initialization();
        
        this.form = new Form(querySelector('form', { root: this.modal.getElement() }), {});
        
        this.modal.customEvents.subscribe(ModalEventsClassifier.DISPLAY, this._modalDisplayHandler.bind(this));
        
        this.modal.customEvents.subscribe(ModalEventsClassifier.OPEN, this._modalOpenHandler.bind(this));
        
        this.modal.customEvents.subscribe(ModalEventsClassifier.CLOSE, this._modalCloseHandler.bind(this));
        
        this.modal.customEvents.subscribe(ModalEventsClassifier.CONFIRM, this._modalConfirmHandler.bind(this));
        
        this.form.customEvents.subscribe(FormEventsClassifier.SUBMIT, this._formSubmitHandler.bind(this));
    }
    
    /**
     * @protected
     *
     * @description Implements handler for the modal display event.
     *
     * @return { void }
     **/
    _modalDisplayHandler()
    {
        this.form.initialization();
    }
    
    /**
     * @abstract
     *
     * @protected
     *
     * @description Implements handler for the modal open event.
     *
     * @return { void }
     **/
    _modalOpenHandler(){}
    
    /**
     * @protected
     *
     * @description Implements handler for the modal close event.
     *
     * @return { void }
     **/
    _modalCloseHandler()
    {
        if (this.form)
        {
            this.withFormReset && this.form.reset();
            
            this.form.cancel();
            
            this.form.setError('');
        }
        
        this.modal.freeze(false);
    }
    
    /**
     * @abstract
     *
     * @protected
     *
     * @description Implements handler for the modal confirm event.
     *
     * @return { void }
     **/
    _modalConfirmHandler(){}
    
    /**
     * @protected
     *
     * @description Implements handler for the form submit event.
     *
     * @return { void }
     **/
    _formSubmitHandler()
    {
        this._modalConfirmHandler();
    }
    
    /**
     * @abstract
     *
     * @protected
     *
     * @description Returns id for the modal component.
     *
     * @return { string }
     **/
    getModalId(){}
    
    /**
     * @abstract
     *
     * @protected
     *
     * @description Returns heading for the modal component.
     *
     * @return { string }
     **/
    getModalHeading(){}
    
    /**
     * @abstract
     *
     * @protected
     *
     * @description Returns paragraph for the modal component.
     *
     * @return { string }
     **/
    getModalParagraph(){}
    
    /**
     * @protected
     *
     * @description Implements process of success notification.
     *
     * @param { string ? } heading
     *
     * @param { string[] ? } paragraphs
     *
     * @return { void }
     **/
    successNotificationProcessing(heading = 'Success', paragraphs)
    {
        app.notifications.create({  heading: heading, type: NotificationItemTypesClassifier.DEFAULT, theme: NotificationItemThemesClassifier.SUCCESS, withClose: true, svgId: 'essential-verify', paragraphs: paragraphs });
    }
    
    /**
     * @protected
     *
     * @description Implements process of error notification.
     *
     * @param { string ? } heading
     *
     * @param { string[] ? } paragraphs
     *
     * @return { void }
     **/
    errorNotificationProcessing(heading = 'Error', paragraphs)
    {
        app.notifications.create({  heading: heading, type: NotificationItemTypesClassifier.DEFAULT, theme: NotificationItemThemesClassifier.ERROR, withClose: true, svgId: 'essential-notification', paragraphs: paragraphs });
    }
    
    /**
     * @protected
     *
     * @description Creates and returns modal instance.
     *
     * @return { Modal }
     **/
    _getModal()
    {
        return new Modal(
            {
                id: this.getModalId(),
                cardSettings:
                    {
                        heading: this.getModalHeading(),
                        paragraph: this.getModalParagraph(),
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
