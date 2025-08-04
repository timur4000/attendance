import { ModalForm } from '../../standards/ModalForm/ModalForm.js';


export class AbsencesCreateModalForm extends ModalForm
{
    /**
     * @inheritDoc
     **/
    async _modalConfirmHandler()
    {
        this.modal.freeze(true);
        
        const response = await this.form.send();
        
        this.form.errorLabelsProcessing(response.errors || {});
        
        if (response.record && response.record.number !== 0)
        {
            this.form.setError(response.record.message);
        }
        else if (response.record && response.record.number === 0)
        {
            this.baseTable.table.update();
            
            this.successNotificationProcessing();
            
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
        return 'Absence creating';
    }
    
    /**
     * @inheritDoc
     **/
    getModalId()
    {
        return 'absence-create-modal';
    }
}
