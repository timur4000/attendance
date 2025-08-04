import { BaseTable } from '../BaseTable.js';
import { TableCellTypesClassifier } from '../../components/Table/Standards/TableCellTypesClassifier.js';
import { querySelector } from '../../tea-modules/Functions/DOM/Queries/querySelector.js';
import { TableActionTypesClassifier } from '../../components/Table/Standards/TableActionTypesClassifier.js';
import { TablePositionsClassifier } from '../../components/Table/Standards/TablePositionsClassifier.js';

/**
 * @class
 *
 * @description Implements logic for the configuration groups table.
 **/
export class ConfigurationGroupsTable extends BaseTable
{
    /**
     * @inheritDoc
     **/
    selectors = '#configuration-groups-table';
    
    /**
     * @inheritDoc
     **/
    url = 'admin/configurations/groups/records-json';
    
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
                        href: 'admin/configurations/groups/put',
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
                        href: 'admin/configurations/groups/detail/{id}',
                        iconId: 'content-document-forward',
                        clueSettings: { text: 'View', },
                    },
            },
            {
                type: TableActionTypesClassifier.DEFAULT,
                buttonSettings:
                    {
                        href: 'admin/configurations/groups/put/{id}',
                        iconId: 'content-edit',
                        clueSettings: { text: 'Edit', },
                    },
            },
            {
                type: TableActionTypesClassifier.ALERT,
                buttonSettings:
                    {
                        href: 'admin/configurations/groups/delete/{id}',
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
