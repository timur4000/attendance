import { BaseTable } from '../BaseTable.js';
import { TableCellTypesClassifier } from '../../components/Table/Standards/TableCellTypesClassifier.js';
import { querySelector } from '../../tea-modules/Functions/DOM/Queries/querySelector.js';
import { TableActionTypesClassifier } from '../../components/Table/Standards/TableActionTypesClassifier.js';
import { TablePositionsClassifier } from '../../components/Table/Standards/TablePositionsClassifier.js';
import { TableCellWhiteSpaceTypesClassifier } from '../../components/Table/Standards/TableCellWhiteSpaceTypesClassifier.js';

/**
 * @class
 *
 * @description Implements logic for the configuration values table.
 **/
export class ConfigurationValuesTable extends BaseTable
{
    /**
     * @inheritDoc
     **/
    selectors = '#configuration-values-table';
    
    /**
     * @inheritDoc
     **/
    url = 'admin/configurations/values/records-json';
    
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
    getButtons()
    {
        return [
            {
                position: TablePositionsClassifier.TOP_RIGHT,
                type: TableActionTypesClassifier.DEFAULT,
                buttonSettings:
                    {
                        href: 'admin/configurations/values/put',
                        elementName: 'table-record-add',
                        iconId: 'essential-add-square',
                        type: TableActionTypesClassifier.DEFAULT,
                        clueSettings: { text: 'New record', },
                    },
            },
        ];
    }
    
    /**
     * @inheritDoc
     **/
    getActions()
    {
        return [
            {
                type: TableActionTypesClassifier.DEFAULT,
                buttonSettings:
                    {
                        href: 'admin/configurations/values/detail/{id}',
                        iconId: 'content-document-forward',
                        clueSettings: { text: 'View', },
                    },
            },
            {
                type: TableActionTypesClassifier.DEFAULT,
                conditionByColumn: 'is_editable',
                buttonSettings:
                    {
                        href: 'admin/configurations/values/put/{id}',
                        iconId: 'content-edit',
                        clueSettings: { text: 'Edit', },
                    },
            },
            {
                type: TableActionTypesClassifier.ALERT,
                conditionByColumn: 'is_editable',
                buttonSettings:
                    {
                        href: 'admin/configurations/values/delete/{id}',
                        iconId: 'essential-trash',
                        clueSettings: { text: 'Delete', },
                        isConfirm: true,
                    },
            },
        ];
    }
    
    /**
     * @inheritDoc
     **/
    getColumns()
    {
        return [
            { name: 'id', label: 'Id', type: TableCellTypesClassifier.NUMBER, isSortable: true },
            { name: 'group.code', label: 'Group', type: TableCellTypesClassifier.STRING, isSortable: false },
            { name: 'type.code', label: 'Type', type: TableCellTypesClassifier.STRING, isSortable: false },
            { name: 'code', label: 'Code', type: TableCellTypesClassifier.STRING, isSortable: true },
            { name: 'value_integer', label: 'Value integer', type: TableCellTypesClassifier.NUMBER, isSortable: false },
            { name: 'value_min', label: 'Value min', type: TableCellTypesClassifier.NUMBER, isSortable: false },
            { name: 'value_max', label: 'Value max', type: TableCellTypesClassifier.NUMBER, isSortable: false },
            { name: 'value_string', label: 'Value string ', type: TableCellTypesClassifier.STRING, isSortable: false, styles: { 'max-width': '400px' }, whiteSpaceType: TableCellWhiteSpaceTypesClassifier.WRAP },
            { name: 'description', label: 'Description', type: TableCellTypesClassifier.STRING, isSortable: true, styles: { 'max-width': '400px' }, whiteSpaceType: TableCellWhiteSpaceTypesClassifier.WRAP },
            { name: 'sort_order', label: 'Sort order', type: TableCellTypesClassifier.NUMBER, isSortable: true },
            { name: 'is_editable', label: 'is_editable', type: TableCellTypesClassifier.BOOLEAN, isSortable: false },
            { name: 'is_hidden', label: 'Is hidden', type: TableCellTypesClassifier.BOOLEAN, isSortable: false },
        ];
    }
    
    /**
     * @inheritDoc
     **/
    initialization()
    {
        this.tableInitializeProcessing();
    }
}
