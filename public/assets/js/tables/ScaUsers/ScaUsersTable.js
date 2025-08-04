import { BaseTable } from '../BaseTable.js';
import { TableCellTypesClassifier } from '../../components/Table/Standards/TableCellTypesClassifier.js';
import { querySelector } from '../../tea-modules/Functions/DOM/Queries/querySelector.js';
import { TableActionTypesClassifier } from '../../components/Table/Standards/TableActionTypesClassifier.js';
import { TablePositionsClassifier } from '../../components/Table/Standards/TablePositionsClassifier.js';
import { HttpRequestMethodsClassifier } from '../../tea-modules/Classes/Requests/Standards/HttpRequestMethodsClassifier.js';
import { DateFormatsClassifier } from '../../tea-modules/Classes/Standards/Date/DateFormatsClassifier.js';

/**
 * @class
 *
 * @description Implements logic for the sca users table.
 **/
export class ScaUsersTable extends BaseTable
{
    /**
     * @inheritDoc
     **/
    selectors = '#sca-users-table';
    
    /**
     * @inheritDoc
     **/
    url = 'admin/sca-users/records-json';
    
    /**
     * @inheritDoc
     **/
    withTableExport = true;
    
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
    getTableExportSettings()
    {
        return {
            tableExportExcelSettings:
                {
                    url: 'admin/sca-users/export/excel',
                    isAdvanced: true,
                },
        };
    };
    
    /**
     * @inheritDoc
     **/
    getSelects()
    {
        return [
            {
                options: [],
                position: TablePositionsClassifier.TOP_RIGHT,
                elementName: 'id_unit',
                withLabel: 1,
                placeholder: 'Unit',
                withSearch: 0,
                customSelectSettings:
                    {
                        httpRequestSettings:
                            {
                                method: HttpRequestMethodsClassifier.POST,
                                url: '/admin/classifiers/units/list/json',
                            },
                        contentSettings:
                            {
                                isTree: true,
                                treeIdKey: 'id_object',
                                treeParentIdKey: 'id_parent',
                                keyValue: 'id_object',
                                keyText: 'name_object',
                                treeMaxLevel: 3,
                            },
                    },
            },
            {
                options: [],
                position: TablePositionsClassifier.TOP_RIGHT,
                elementName: 'id_position',
                withLabel: 1,
                placeholder: 'Position',
                withSearch: 0,
                customSelectSettings:
                    {
                        httpRequestSettings:
                            {
                                method: HttpRequestMethodsClassifier.POST,
                                url: '/admin/classifiers/positions/list/json',
                            },
                        contentSettings:
                            {
                                keyValue: 'id_object',
                                keyText: 'name_object',
                            }
                    },
            },
            {
                options: [],
                position: TablePositionsClassifier.TOP_RIGHT,
                elementName: 'id_status',
                withLabel: 1,
                placeholder: 'Status',
                withSearch: 0,
                customSelectSettings:
                    {
                        httpRequestSettings:
                            {
                                method: HttpRequestMethodsClassifier.POST,
                                url: '/admin/classifiers/statuses/list/json',
                            },
                        contentSettings:
                            {
                                keyValue: 'id_object',
                                keyText: 'name_object',
                            }
                    },
            },
            {
                options: [],
                position: TablePositionsClassifier.TOP_RIGHT,
                elementName: 'id_category',
                withLabel: 1,
                placeholder: 'Category',
                withSearch: 0,
                customSelectSettings:
                    {
                        httpRequestSettings:
                            {
                                method: HttpRequestMethodsClassifier.POST,
                                url: '/admin/classifiers/person-categories/list/json',
                                data:
                                    {
                                        'test': 12,
                                    }
                            },
                        contentSettings:
                            {
                                keyValue: 'id_object',
                                keyText: 'name_object',
                            },
                        isSaveCache: false,
                    },
            },
            {
                options: [],
                position: TablePositionsClassifier.TOP_RIGHT,
                elementName: 'id_gender',
                withLabel: 1,
                placeholder: 'Gender',
                withSearch: 0,
                customSelectSettings:
                    {
                        httpRequestSettings:
                            {
                                method: HttpRequestMethodsClassifier.POST,
                                url: '/admin/classifiers/genders/list/json',
                            },
                        contentSettings:
                            {
                                keyValue: 'id_object',
                                keyText: 'name_object',
                            }
                    },
            }
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
                        href: 'admin/sca-users/detail/{id_user}',
                        iconId: 'content-document-forward',
                        clueSettings: { text: 'View', },
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
            { name: 'id_user', label: 'Id', type: TableCellTypesClassifier.NUMBER, isSortable: true },
            { name: 'sur_name', label: 'Surname', type: TableCellTypesClassifier.STRING, isSortable: true, isFilter: true, },
            { name: 'first_name', label: 'First name', type: TableCellTypesClassifier.STRING, isSortable: true, isFilter: true, },
            { name: 'patronymic', label: 'Patronymic', type: TableCellTypesClassifier.STRING, isSortable: true },
            { name: 'food_card_money', label: 'Card balance', type: TableCellTypesClassifier.COINS, isSortable: true },
            { name: 'code_currency', label: 'Currency', type: TableCellTypesClassifier.STRING, isSortable: true },
            { name: 'id_absence', label: 'Presence', type: TableCellTypesClassifier.BOOLEAN, isSortable: true, isReverse: true },
            { name: 'info_driver_1', label: 'Driver', type: TableCellTypesClassifier.STRING, isSortable: true },
            { name: 'info_parent_1', label: 'Parent 1', type: TableCellTypesClassifier.STRING, isSortable: true },
            { name: 'info_parent_2', label: 'Parent 2', type: TableCellTypesClassifier.STRING, isSortable: true },
            { name: 'name_category', label: 'Category', type: TableCellTypesClassifier.STRING, isSortable: true },
            { name: 'name_country', label: 'Country', type: TableCellTypesClassifier.STRING, isSortable: true },
            { name: 'name_gender', label: 'Gender', type: TableCellTypesClassifier.STRING, isSortable: true },
            { name: 'name_position', label: 'Position', type: TableCellTypesClassifier.STRING, isSortable: true },
            { name: 'name_unit', label: 'Unit', type: TableCellTypesClassifier.STRING, isSortable: true },
            { name: 'date_birth', label: 'Date of birth', type: TableCellTypesClassifier.DATETIME, dateFormat: DateFormatsClassifier.Y_m_d, isSortable: true },
            { name: 'name_status', label: 'Status', type: TableCellTypesClassifier.STRING, isSortable: true },
            { name: 'user_barcode', label: 'Barcode', type: TableCellTypesClassifier.STRING, isSortable: true },
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
