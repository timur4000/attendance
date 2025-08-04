import { BaseTable } from '../BaseTable.js';
import { TableCellTypesClassifier } from '../../components/Table/Standards/TableCellTypesClassifier.js';
import { querySelector } from '../../tea-modules/Functions/DOM/Queries/querySelector.js';
import { TableActionTypesClassifier } from '../../components/Table/Standards/TableActionTypesClassifier.js';
import { TablePositionsClassifier } from '../../components/Table/Standards/TablePositionsClassifier.js';
import { TableStatusTypesClassifier } from '../../components/Table/Standards/TableStatusTypesClassifier.js';

/**
 * @class
 *
 * @description Implements logic for the permissions table.
 **/
export class PermissionsTable extends BaseTable
{
    /**
     * @inheritDoc
     **/
    selectors = '#admin-permissions-table';
    
    /**
     * @inheritDoc
     **/
    url = 'admin/admin-permissions/records-json';
    
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
                        href: 'admin/admin-permissions/put',
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
                        href: 'admin/admin-permissions/detail/{id}',
                        iconId: 'content-document-forward',
                        clueSettings: { text: 'View', },
                    },
            },
            {
                type: TableActionTypesClassifier.DEFAULT,
                buttonSettings:
                    {
                        href: 'admin/admin-permissions/put/{id}',
                        iconId: 'content-edit',
                        clueSettings: { text: 'Edit', },
                    },
            },
            {
                type: TableActionTypesClassifier.ALERT,
                buttonSettings:
                    {
                        href: 'admin/admin-permissions/delete/{id}',
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
            { name: 'id', label: 'Id', type: TableCellTypesClassifier.STRING, isSortable: true },
            { name: 'code', label: 'Code', type: TableCellTypesClassifier.STRING, isSortable: true },
            { name: 'description', label: 'Description', type: TableCellTypesClassifier.STRING, isSortable: true },
            { name: 'routes', label: 'Routes', type: TableCellTypesClassifier.LABELS, isSortable: true, labelsStatusType: TableStatusTypesClassifier.INFO },
            { name: 'http_methods', label: 'Http Methods', type: TableCellTypesClassifier.LABELS, isSortable: false, labelsKey: 'code', labelsStatusType: TableStatusTypesClassifier.SUCCESS },
            { name: 'custom_pattern', label: 'Custom pattern', type: TableCellTypesClassifier.STRING, isSortable: true },
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
