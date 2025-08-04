import { BaseTable } from '../BaseTable.js';
import { TableCellTypesClassifier } from '../../components/Table/Standards/TableCellTypesClassifier.js';
import { querySelector } from '../../tea-modules/Functions/DOM/Queries/querySelector.js';
import { DateFormatsClassifier } from '../../tea-modules/Classes/Standards/Date/DateFormatsClassifier.js';


/**
 * @class
 *
 * @description Implements logic for the operation logs table.
 **/
export class OperationLogsTable extends BaseTable
{
    /**
     * @inheritDoc
     **/
    selectors = '#operation-logs-table';
    
    /**
     * @inheritDoc
     **/
    url = 'admin/operation-logs/records-json';
    
    /**
     * @inheritDoc
     **/
    constructor()
    {
        super();
        
        this.element = querySelector(this.selectors);
    }
    
    /**
     * @inheritDoc
     **/
    getColumns()
    {
        return [
            { name: 'id', label: 'Id', type: TableCellTypesClassifier.NUMBER, isSortable: true },
            { name: 'user.sur_name', label: 'Surname', type: TableCellTypesClassifier.STRING, isSortable: false },
            { name: 'user.first_name', label: 'First name', type: TableCellTypesClassifier.STRING, isSortable: false },
            { name: 'user.patronymic', label: 'Patronymic', type: TableCellTypesClassifier.STRING, isSortable: false },
            { name: 'created_at', label: 'Date', type: TableCellTypesClassifier.DATETIME, isSortable: true, dateFormat: DateFormatsClassifier.Y_m_d_H_i_s },
            { name: 'method', label: 'Method', type: TableCellTypesClassifier.STRING, isSortable: true },
            { name: 'path', label: 'Path', type: TableCellTypesClassifier.STRING, isSortable: true },
            { name: 'route', label: 'Route', type: TableCellTypesClassifier.STRING, isSortable: true },
            { name: 'description', label: 'Description', type: TableCellTypesClassifier.STRING, isSortable: true },
            { name: 'query', label: 'Query', type: TableCellTypesClassifier.JSON, isSortable: true },
            { name: 'data', label: 'data', type: TableCellTypesClassifier.JSON, isSortable: true },
            { name: 'ip_address', label: 'Id address', type: TableCellTypesClassifier.STRING, isSortable: true },
            { name: 'user_agent', label: 'User agent', type: TableCellTypesClassifier.STRING, isSortable: true },
        ];
    }
    
    /**
     * @inheritDoc
     **/
    initialization()
    {
        this.tableInitializeProcessing();
    }
    
    /**
     * @inheritDoc
     **/
    getActions()
    {
        return [];
    }
}
