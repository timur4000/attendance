import { ModalTable } from './ModalTable.js';
import { TableCellTypesClassifier } from '../../Table/Standards/TableCellTypesClassifier.js';


/**
 * @class
 *
 * @extends { ModalTable }
 *
 * @description Implements logic for the absent modal table.
 **/
export class AbsentModalTable extends ModalTable
{
    /**
     * @inheritDoc
     **/
    modalHeading = 'Absent table';
    
    /**
     * @inheritDoc
     **/
    modalId = 'absent-modal';
    
    /**
     * @inheritDoc
     **/
    tableSelectors = '#absent-modal-table';
    
    /**
     * @inheritDoc
     **/
    tableUrl = '/admin/presence/absent/list_json';
    
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
            { name: 'id_user', label: 'Id user', type: TableCellTypesClassifier.NUMBER, isSortable: false },
            { name: 'sur_name', label: 'Surname', type: TableCellTypesClassifier.STRING, isSortable: false, isFilter: true },
            { name: 'first_name', label: 'First name', type: TableCellTypesClassifier.STRING, isSortable: false, isFilter: true },
            { name: 'patronymic', label: 'Patronymic', type: TableCellTypesClassifier.STRING, isSortable: false },
            { name: 'name_absence', label: 'Name absence', type: TableCellTypesClassifier.STRING, isSortable: false },
        ];
    }
}
