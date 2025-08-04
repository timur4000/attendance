import { ModalForm } from '../../../standards/ModalForm/ModalForm.js';
import { Modal } from '../../../components/Modal/Modal.js';
import { OrdersListDetailItems } from './OrdersListDetailItems.js';
import { querySelector } from '../../../tea-modules/Functions/DOM/Queries/querySelector.js';
import { HttpRequest } from '../../../tea-modules/Classes/Requests/HttpRequest.js';
import { HttpRequestMethodsClassifier } from '../../../tea-modules/Classes/Requests/Standards/HttpRequestMethodsClassifier.js';
import { HttpStatusesClassifier } from '../../../tea-modules/Classes/Requests/Standards/HttpStatusesClassifier.js';


export class OrdersListDetailModalForm extends ModalForm
{
    /**
     * @inheritDoc
     **/
    withFormReset = false;
    
    /**
     * @public
     *
     * @type { OrdersListDetailItems }
     **/
    detailItems;
    
    /**
     * @public
     *
     * @type { TableRow }
     **/
    _tableRow;
    
    /**
     * @public
     *
     * @type { boolean }
     **/
    isInitialize = false;
    
    /**
     * @inheritDoc
     **/
    initialization()
    {
        super.initialization();
        
        this.detailItems = new OrdersListDetailItems(querySelector('[data-orders-list-items]', { root: this.modal.getElement() }), this);
    }
    
    /**
     * @inheritDoc
     **/
    async _modalOpenHandler()
    {
        this.modal.freeze(true);
        
        if (!this.isInitialize)
        {
            await this.detailItems.initialization();
            
            this.isInitialize = true;
        }
        
        await this.detailItems.orderItemsProcessing();
        
        this.detailItems.disable(!!this.tableRow.record.is_paid);
        
        this.modal.card.confirm.disable(!!this.tableRow.record.is_paid || !this.detailItems.hasEdited());
        
        this.modal.card.setHeading(`${ this.tableRow.record.sur_name } ${ this.tableRow.record.first_name } ${ this.tableRow.record.patronymic }. #${ this.tableRow.record.id_order }`);
        
        this.modal.card.setParagraph(`${ this.detailItems.getPrice() } ${ this.detailItems.getCodeCurrency() }`);
        
        this.modal.freeze(false);
    }
    
    /**
     * @inheritDoc
     **/
    async _modalConfirmHandler()
    {
        this.modal.freeze(true);
        
        const response = await this._changeRequestProcessing();
        
        if (response.status !== HttpStatusesClassifier.SUCCESS)
        {
            app.notifications.error('Error', [ response.message ]);
            
            this.modal.freeze(false);
            
            return ;
        }
        
        this.modal.freeze(false);
        
        app.notifications.success('Success', [ response.message ]);
        
        this.baseTable.table.removeRecordByIdentifier(this.tableRow.record.id_order);
        
        this.baseTable.table.tableElement.removeTableRowByIdentifier(this.tableRow.record.id_order);
        
        this.modal.close();
    }
    
    /**
     * @private
     *
     * @description Implements process of the change request processing.
     *
     * @return { Promise<ResponseStandard>}
     **/
    async _changeRequestProcessing()
    {
        const request = new HttpRequest(
            {
                url: this.detailItems.changeUrl,
                method: HttpRequestMethodsClassifier.PATCH,
                data: { id_user: this.tableRow.record.id_user, data: this.detailItems.getOrderStandards(), id_order: this.tableRow.record.id_order },
            }
        );
        
        return await request.execute();
    }
    
    /**
     * @inheritDoc
     **/
    _modalCloseHandler()
    {
        this.modal.card.setHeading('--');

        this.modal.card.setParagraph('--');

        this.detailItems.clear();
    }
    
    /**
     * @inheritDoc
     **/
    getModalHeading()
    {
        return '--';
    }
    
    /**
     * @inheritDoc
     **/
    getModalParagraph()
    {
        return '--';
    }
    
    /**
     * @inheritDoc
     **/
    getModalId()
    {
        return 'orders-list-detail-modal';
    }
    
    _getModal()
    {
        return new Modal(
            {
                id: this.getModalId(),
                elementClass: 'modal modal--theme-mercury modal--size-large',
                cardSettings:
                    {
                        heading: this.getModalHeading(),
                        paragraph: this.getModalParagraph(),
                        cancelButtonSettings: { text: 'Cancel', elementClass: [ 'button--size-middle', 'button--type-default', 'button--theme-white-azure-bittersweet', ] },
                        confirmButtonSettings: { text: 'Change', isConfirm: false, elementClass: [ 'button--size-middle', 'button--type-default', 'button--theme-white-azure-wild-sand' ] },
                        upperSettings:
                            {
                                isSingle: false,
                            },
                    },
            });
    }
    
    /**
     * @public
     *
     * @return { TableRow }
     **/
    get tableRow()
    {
        return this._tableRow;
    }
    
    /**
     * @public
     *
     * @param { TableRow } value
     **/
    set tableRow(value)
    {
        this._tableRow = value;
    }
}
