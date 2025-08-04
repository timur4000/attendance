import { BaseTable } from '../BaseTable.js';
import { TableCellTypesClassifier } from '../../components/Table/Standards/TableCellTypesClassifier.js';
import { querySelector } from '../../tea-modules/Functions/DOM/Queries/querySelector.js';
import { TableActionTypesClassifier } from '../../components/Table/Standards/TableActionTypesClassifier.js';
import { TablePositionsClassifier } from '../../components/Table/Standards/TablePositionsClassifier.js';

/**
 * @class
 *
 * @description Implements logic for the admin roles table.
 **/
export class AdminRolesTable extends BaseTable
{
    /**
     * @inheritDoc
     **/
    selectors = '#admin-roles-table';
    
    /**
     * @inheritDoc
     **/
    url = 'admin/admin-roles/records-json';
    
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
                        href: 'admin/admin-roles/put',
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
                        href: 'admin/admin-roles/detail/{id}',
                        iconId: 'content-document-forward',
                        clueSettings: { text: 'View', },
                    },
            },
            {
                type: TableActionTypesClassifier.DEFAULT,
                buttonSettings:
                    {
                        href: 'admin/admin-roles/put/{id}',
                        iconId: 'content-edit',
                        clueSettings: { text: 'Edit', },
                    },
            },
            {
                type: TableActionTypesClassifier.ALERT,
                buttonSettings:
                    {
                        href: 'admin/admin-roles/delete/{id}',
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
            { name: 'role.code_object', label: 'Role code', type: TableCellTypesClassifier.STRING, isSortable: false },
            { name: 'role.name_object', label: 'Role name', type: TableCellTypesClassifier.STRING, isSortable: false },
            { name: 'admin_permission_group.code', label: 'Permission group', type: TableCellTypesClassifier.STRING, isSortable: false },
            { name: 'description', label: 'Description', type: TableCellTypesClassifier.STRING, isSortable: true },
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
