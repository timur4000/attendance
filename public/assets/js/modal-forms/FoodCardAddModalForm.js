import { ModalForm } from '../standards/ModalForm/ModalForm.js';


export class FoodCardAddModalForm extends ModalForm
{
    /**
     * @inheritDoc
     **/
    async _modalConfirmHandler()
    {
        this.modal.freeze(true);
        
        const request = await this.form.send();
        
        this.form.errorLabelsProcessing(request.errors || {});
        
        if (request.errors || request.data.number !== 0)
        {
            request.data && this.errorNotificationProcessing('Error', [ request.data.message ]);
        }
        else
        {
            this.successNotificationProcessing('Success', [ request.data.message ]);
            
            this.baseTable.table.update();
            
            this.modal.close();
        }
        
        this.modal.freeze(false);
    }
    
    /**
     * @inheritDoc
     **/
    _modalOpenHandler() {}
    
    /**
     * @inheritDoc
     **/
    getModalHeading()
    {
        return 'Money replenishment';
    }
    
    /**
     * @inheritDoc
     **/
    getModalId()
    {
        return 'food-card-add-modal';
    }
}
