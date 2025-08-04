import { ModalTable }               from '../../../../components/Dashboard/ModalTables/ModalTable.js';
import { TableCellTypesClassifier } from '../../../../components/Table/Standards/TableCellTypesClassifier.js';
import { DateFormatsClassifier }    from '../../../../tea-modules/Classes/Standards/Date/DateFormatsClassifier.js';


/**
 * @class
 *
 * @extends { ModalTable }
 *
 * @description Implements logic for the orders modal table.
 **/
export class CanteenOrdersModalTable extends ModalTable
{
    /**
     * @inheritDoc
     **/
    modalHeading = 'Orders table';
    
    /**
     * @inheritDoc
     **/
    modalId = 'orders-modal';
    
    /**
     * @inheritDoc
     **/
    tableSelectors = '#orders-modal-table';
    
    /**
     * @inheritDoc
     **/
    tableUrl = '/admin/canteen/orders-json';
    
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
            { name: 'id_order', label: 'Id', type: TableCellTypesClassifier.NUMBER, isSortable: false, isIdentifier: true, isFilter: true },
            { name: 'sur_name', label: 'Surname', type: TableCellTypesClassifier.STRING, isSortable: false, isFilter: true },
            { name: 'first_name', label: 'First name', type: TableCellTypesClassifier.STRING, isSortable: false, isFilter: true },
            { name: 'patronymic', label: 'Patronymic', type: TableCellTypesClassifier.STRING, isSortable: false },
            { name: 'money_to_pay', label: 'Paycheck', type: TableCellTypesClassifier.COINS, isSortable: false },
            // { name: 'money_paid', label: 'Money paid', type: TableCellTypesClassifier.COINS, isSortable: false },
            { name: 'is_paid', label: 'Payment status', type: TableCellTypesClassifier.BOOLEAN, isSortable: false },
            { name: 'date_event', label: 'Date', type: TableCellTypesClassifier.DATETIME, isSortable: false, dateFormat: DateFormatsClassifier.Y_m_d_H_i_s, },
            { name: 'note_object', label: 'Notes', type: TableCellTypesClassifier.STRING, isSortable: false },
            { name: 'user_barcode', label: 'User barcode', type: TableCellTypesClassifier.STRING, isSortable: false, isFilter: true },
        ];
    }
}
