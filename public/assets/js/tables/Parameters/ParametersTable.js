import { BaseTable } from '../BaseTable.js';
import { TableCellTypesClassifier } from '../../components/Table/Standards/TableCellTypesClassifier.js';
import { querySelector } from '../../tea-modules/Functions/DOM/Queries/querySelector.js';
import { TableCellWhiteSpaceTypesClassifier } from '../../components/Table/Standards/TableCellWhiteSpaceTypesClassifier.js';


/**
 * @class
 *
 * @description Implements logic for the parameters table.
 **/
export class ParametersTable extends BaseTable
{
    /**
     * @inheritDoc
     **/
    selectors = '#parameters-table';
    
    /**
     * @inheritDoc
     **/
    url = 'admin/parameters/records-json';
    
    /**
     * @inheritDoc
     **/
    isServerSide = false;
    
    /**
     * @inheritDoc
     **/
    withPagination = false;
    
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
            { name: 'id_parameter', label: 'Code', type: TableCellTypesClassifier.STRING, isSortable: true },
            { name: 'group_parameter', label: 'Group', type: TableCellTypesClassifier.STRING, isSortable: true },
            { name: 'id_type_parameter', label: 'Id type', type: TableCellTypesClassifier.NUMBER, isSortable: true },
            { name: 'is_editable', label: 'Is editable', type: TableCellTypesClassifier.BOOLEAN, isSortable: true },
            { name: 'note_parameter', label: 'Note', type: TableCellTypesClassifier.STRING, isSortable: true, styles: { 'min-width': '400px' }, whiteSpaceType: TableCellWhiteSpaceTypesClassifier.WRAP },
            { name: 'value_integer', label: 'Value integer', type: TableCellTypesClassifier.NUMBER, isSortable: true },
            { name: 'value_string', label: 'Value string', type: TableCellTypesClassifier.STRING, isSortable: true, styles: { 'min-width': '400px' }, whiteSpaceType: TableCellWhiteSpaceTypesClassifier.WRAP },
            { name: 'value_min', label: 'Value min', type: TableCellTypesClassifier.NUMBER, isSortable: true },
            { name: 'value_max', label: 'Value max', type: TableCellTypesClassifier.NUMBER, isSortable: true },
            { name: 'name_type_parameter', label: 'Name type', type: TableCellTypesClassifier.NUMBER, isSortable: true },
            { name: 'rank_object', label: 'Rank object', type: TableCellTypesClassifier.STRING, isSortable: true },
            { name: 'value_display', label: 'Value display', type: TableCellTypesClassifier.STRING, isSortable: true },
            { name: 'value_boolean', label: 'Value boolean', type: TableCellTypesClassifier.STRING, isSortable: true },
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
