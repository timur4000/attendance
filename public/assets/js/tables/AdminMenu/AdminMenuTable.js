import { BaseTable } from '../BaseTable.js';
import { TableCellTypesClassifier } from '../../components/Table/Standards/TableCellTypesClassifier.js';
import { querySelector } from '../../tea-modules/Functions/DOM/Queries/querySelector.js';
import { TableActionTypesClassifier } from '../../components/Table/Standards/TableActionTypesClassifier.js';
import { TablePositionsClassifier } from '../../components/Table/Standards/TablePositionsClassifier.js';
import { TableStatusTypesClassifier } from '../../components/Table/Standards/TableStatusTypesClassifier.js';

/**
 * @class
 *
 * @description Implements logic for the admin menu table.
 **/
export class AdminMenuTable extends BaseTable
{
    /**
     * @inheritDoc
     **/
    selectors = '#admin-menu-table';
    
    /**
     * @inheritDoc
     **/
    url = 'admin/admin-menu/records-json';
    
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
    isTree = true;
    
    /**
     * @inheritDoc
     **/
    treeIdKey = 'id';
    
    /**
     * @inheritDoc
     **/
    treeParentIdKey = 'id_parent';
    
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
                        href: 'admin/admin-menu/put',
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
                        href: 'admin/admin-menu/detail/{id}',
                        iconId: 'content-document-forward',
                        clueSettings: { text: 'View', },
                    },
            },
            {
                type: TableActionTypesClassifier.DEFAULT,
                buttonSettings:
                    {
                        href: 'admin/admin-menu/put/{id}',
                        iconId: 'content-edit',
                        clueSettings: { text: 'Edit', },
                    },
            },
            {
                type: TableActionTypesClassifier.ALERT,
                buttonSettings:
                    {
                        href: 'admin/admin-menu/delete/{id}',
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
            { name: 'id_icon', label: 'Icon', type: TableCellTypesClassifier.CELL_ICON, isSortable: false },
            { name: 'title', label: 'Title', type: TableCellTypesClassifier.STRING, isSortable: true, isTree: true },
            { name: 'sort_order', label: 'Sort order', type: TableCellTypesClassifier.STRING, isSortable: true, isTree: true },
            { name: 'description', label: 'Description', type: TableCellTypesClassifier.STRING, isSortable: true },
            { name: 'route', label: 'Route', type: TableCellTypesClassifier.STRING, isSortable: true },
            { name: 'admin_permissions', label: 'Permissions', type: TableCellTypesClassifier.LABELS, isSortable: true, labelsKey: 'code', labelsStatusType: TableStatusTypesClassifier.SUCCESS },
            { name: 'admin_permission_groups', label: 'Permission Groups', type: TableCellTypesClassifier.LABELS, isSortable: true, labelsKey: 'code', labelsStatusType: TableStatusTypesClassifier.INFO },
            { name: 'is_active', label: 'Is active', type: TableCellTypesClassifier.BOOLEAN, isSortable: true },
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
