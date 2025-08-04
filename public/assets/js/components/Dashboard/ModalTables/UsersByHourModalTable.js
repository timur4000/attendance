import { ModalTable } from './ModalTable.js';
import { TableCellTypesClassifier } from '../../Table/Standards/TableCellTypesClassifier.js';


/**
 * @class
 *
 * @extends { ModalTable }
 *
 * @description Implements logic for the users by hour modal table.
 **/
export class UsersByHourModalTable extends ModalTable
{
    /**
     * @inheritDoc
     **/
    modalHeading = 'Users by hour table';
    
    /**
     * @inheritDoc
     **/
    modalId = 'users-by-hour-modal';
    
    /**
     * @inheritDoc
     **/
    tableSelectors = '#users-by-hour-modal-table';
    
    /**
     * @inheritDoc
     **/
    tableUrl = '/admin/dashboard/users-by-hour';
    
    /**
     * @inheritDoc
     **/
    tableWithPagination = false;
    
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
            { name: 'id_user', label: 'Id', type: TableCellTypesClassifier.NUMBER, isSortable: false },
            { name: 'date', label: 'Date', type: TableCellTypesClassifier.STRING, isSortable: false },
            { name: 'hour', label: 'Hour', type: TableCellTypesClassifier.NUMBER, isSortable: false },
            { name: 'count_enter', label: 'Entries', type: TableCellTypesClassifier.NUMBER, isSortable: false },
            { name: 'count_exit', label: 'Exits', type: TableCellTypesClassifier.NUMBER, isSortable: false },
            { name: 'count_seconds', label: 'Time', type: TableCellTypesClassifier.SECONDS_TO_HOURS, isSortable: false },
            { name: 'sur_name', label: 'Surname', type: TableCellTypesClassifier.STRING, isSortable: false },
            { name: 'first_name', label: 'First name', type: TableCellTypesClassifier.STRING, isSortable: false },
            { name: 'name_unit', label: 'Unit', type: TableCellTypesClassifier.STRING, isSortable: false },
            { name: 'name_category', label: 'Category', type: TableCellTypesClassifier.STRING, isSortable: false },
            { name: 'name_position', label: 'Position', type: TableCellTypesClassifier.STRING, isSortable: false },
        ];
    }
}
