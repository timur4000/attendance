import { ModalTable }               from '../../../../components/Dashboard/ModalTables/ModalTable.js';
import { TableCellTypesClassifier } from '../../../../components/Table/Standards/TableCellTypesClassifier.js';


/**
 * @class
 *
 * @extends { ModalTable }
 *
 * @description Implements logic for the clients modal table.
 **/
export class CanteenClientsModalTable extends ModalTable
{
    /**
     * @inheritDoc
     **/
    modalHeading = 'Clients table';
    
    /**
     * @inheritDoc
     **/
    modalId = 'clients-modal';
    
    /**
     * @inheritDoc
     **/
    tableSelectors = '#clients-modal-table';
    
    /**
     * @inheritDoc
     **/
    tableUrl = '/admin/canteen/clients-json';
    
    /**
     * @constructor
     *
     * @return { AbsentModalTable }
     **/
    constructor()
    {
        super();
    }
    
    /**
     * @inheritDoc
     **/
    async initialization()
    {
        this.modalCreateProcessing();
        
        this.tableCreateProcessing();
    }
    
    /**
     * @inheritDoc
     **/
    _getTableColumns()
    {
        return [
            { name: 'id_user', label: 'Id', type: TableCellTypesClassifier.NUMBER, isSortable: false, isIdentifier: true, isFilter: true },
            { name: 'sur_name', label: 'Surname', type: TableCellTypesClassifier.STRING, isSortable: false, isFilter: true },
            { name: 'first_name', label: 'First name', type: TableCellTypesClassifier.STRING, isSortable: false, isFilter: true },
            { name: 'patronymic', label: 'Patronymic', type: TableCellTypesClassifier.STRING, isSortable: false },
            { name: 'money_to_pay', label: 'Paycheck', type: TableCellTypesClassifier.COINS, isSortable: false },
            { name: 'money_paid', label: 'Money paid', type: TableCellTypesClassifier.COINS, isSortable: false },
        ];
    }
}
