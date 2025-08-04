import { BaseTable } from '../BaseTable.js';
import { TableCellTypesClassifier } from '../../components/Table/Standards/TableCellTypesClassifier.js';
import { querySelector } from '../../tea-modules/Functions/DOM/Queries/querySelector.js';
import { TablePositionsClassifier } from '../../components/Table/Standards/TablePositionsClassifier.js';
import { HttpRequestMethodsClassifier } from '../../tea-modules/Classes/Requests/Standards/HttpRequestMethodsClassifier.js';
import { en } from '../../lib/air-datepicker/locale/en.js';
import { DateManager } from '../../tea-modules/Classes/Dates/DateManager.js';

/**
 * @class
 *
 * @description Implements logic for the accounting table.
 **/
export class AccountingTable extends BaseTable
{
    /**
     * @inheritDoc
     **/
    selectors = '#accounting-table';
    
    /**
     * @inheritDoc
     **/
    url = 'admin/accounting/records-json';
    
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
                    url: 'admin/accounting/export/excel',
                    isAdvanced: true,
                    dataVariables: [ 'date_start', 'date_end', 'id_unit', 'id_position', 'id_category' ],
                },
        };
    };
    
    getInputs()
    {
        return [
            {
                position: TablePositionsClassifier.TOP_RIGHT,
                inputName: 'date_start',
                inputId: 'date-start',
                inputPlaceholder: 'Date start',
                iconId: 'arrows-long-right',
                iconClassName: 'icon icon-size-12',
                isDatepicker: true,
                datepickerSettings:
                    {
                        locale: en,
                        selectedDates: [ new Date() ],
                        autoClose: true,
                        dateFormat: 'yyyy-MM-dd',
                        maxDate: new Date(),
                    },
            },
            {
                position: TablePositionsClassifier.TOP_RIGHT,
                inputName: 'date_end',
                inputId: 'date-end',
                inputPlaceholder: 'Date end',
                iconId: 'time-calendar-search',
                isDatepicker: true,
                datepickerSettings:
                    {
                        locale: en,
                        selectedDates: [ DateManager.tomorrow(new Date()) ],
                        autoClose: true,
                        dateFormat: 'yyyy-MM-dd',
                        maxDate: DateManager.tomorrow(new Date()),
                    },
            }
        ];
    }
    
    /**
     * @inheritDoc
     **/
    getSelects()
    {
        return [
            {
                options: [],
                position: TablePositionsClassifier.TOP_LEFT,
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
                position: TablePositionsClassifier.TOP_LEFT,
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
                position: TablePositionsClassifier.TOP_LEFT,
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
        ];
    }
    
    /**
     * @inheritDoc
     **/
    getActions()
    {
        return [];
    }
    
    /**
     * @inheritDoc
     **/
    getColumns()
    {
        return [
            { name: 'id_user', label: 'Id', type: TableCellTypesClassifier.NUMBER, isSortable: false },
            { name: 'sur_name', label: 'Surname', type: TableCellTypesClassifier.STRING, isSortable: false },
            { name: 'first_name', label: 'First name', type: TableCellTypesClassifier.STRING, isSortable: false },
            { name: 'patronymic', label: 'Patronymic', type: TableCellTypesClassifier.STRING, isSortable: false },
            { name: 'mx_start', label: 'Start', type: TableCellTypesClassifier.COINS, isSortable: false },
            { name: 'mx_plus', label: 'Plus', type: TableCellTypesClassifier.COINS, isSortable: false },
            { name: 'mx_minus', label: 'Minus', type: TableCellTypesClassifier.COINS, isSortable: false },
            { name: 'mx_purchase', label: 'Purchase', type: TableCellTypesClassifier.COINS, isSortable: false },
            { name: 'mx_withdraw', label: 'Withdraw', type: TableCellTypesClassifier.COINS, isSortable: false },
            { name: 'mx_diff', label: 'Diff', type: TableCellTypesClassifier.COINS, isSortable: false },
            { name: 'mx_end', label: 'End', type: TableCellTypesClassifier.COINS, isSortable: false },
            { name: 'name_unit', label: 'Unit', type: TableCellTypesClassifier.STRING, isSortable: false },
            { name: 'name_position', label: 'Position', type: TableCellTypesClassifier.STRING, isSortable: false },
            { name: 'name_category', label: 'Category', type: TableCellTypesClassifier.STRING, isSortable: false },
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
