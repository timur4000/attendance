import { ModalTable } from './ModalTable.js';
import { TableCellTypesClassifier } from '../../Table/Standards/TableCellTypesClassifier.js';


/**
 * @class
 *
 * @extends { ModalTable }
 *
 * @description Implements logic for the latecomers modal table.
 **/
export class LatecomersModalTable extends ModalTable
{
    /**
     * @inheritDoc
     **/
    modalHeading = 'Latecomers table';
    
    /**
     * @inheritDoc
     **/
    modalId = 'latecomers-modal';
    
    /**
     * @inheritDoc
     **/
    tableSelectors = '#latecomers-modal-table';
    
    /**
     * @inheritDoc
     **/
    tableUrl = '/admin/presence/latecomers/list_json';
    
    /**
     * @constructor
     *
     * @return { LatecomersModalTable }
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
            { name: 'first_enter', label: 'First enter', type: TableCellTypesClassifier.STRING, isSortable: false },
            { name: 'last_enter', label: 'Last enter', type: TableCellTypesClassifier.STRING, isSortable: false },
            { name: 'last_exit', label: 'Last exit', type: TableCellTypesClassifier.STRING, isSortable: false },
            { name: 'count_enter', label: 'Entries', type: TableCellTypesClassifier.NUMBER, isSortable: false },
            { name: 'count_exit', label: 'Exits', type: TableCellTypesClassifier.NUMBER, isSortable: false },
            { name: 'location_at_work', label: 'Location at work', type: TableCellTypesClassifier.BOOLEAN, isSortable: false },
            { name: 'is_registered', label: 'Is registered', type: TableCellTypesClassifier.BOOLEAN, isSortable: false },
            { name: 'date_start', label: 'Date start', type: TableCellTypesClassifier.STRING, isSortable: false },
            { name: 'date_end', label: 'Date end', type: TableCellTypesClassifier.STRING, isSortable: false },
            { name: 'name_absence', label: 'Name absence', type: TableCellTypesClassifier.STRING, isSortable: false },
        ];
    }
}
