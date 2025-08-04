import { querySelector } from '../tea-modules/Functions/DOM/Queries/querySelector.js';
import { getAttribute }  from '../tea-modules/Functions/DOM/Attributes/getAttribute.js';
import { HttpRequestMethodsClassifier } from '../tea-modules/Classes/Requests/Standards/HttpRequestMethodsClassifier.js';
import { TableCellTypesClassifier } from '../components/Table/Standards/TableCellTypesClassifier.js';
import { Table } from '../components/Table/Table.js';
import { TablePositionsClassifier } from '../components/Table/Standards/TablePositionsClassifier.js';
import { en } from '../lib/air-datepicker/locale/en.js';


/**
 * @class
 *
 * @description Implements help work with the absent table.
 **/
export class AbsentTable
{
    /**
     * @public
     *
     * @type { HTMLElement }
     **/
    element;
    
    /**
     * @public
     *
     * @type { Table }
     **/
    table;
    
    /**
     * @public
     *
     * @type { string }
     **/
    url;
    
    /**
     * @constructor
     *
     * @param { HTMLElement | string } selectors
     *
     * @return { UsersTable }
     **/
    constructor(selectors)
    {
        this.element = querySelector(selectors);
        
        this.url = getAttribute(this.element, 'url', { isAfterRemove: true, isDataAttribute: true });
        
        this.table = new Table(this.element, this._getSettings());
    }
    
    /**
     * @public
     *
     * @description Implements initialize base logic.
     *
     * @return { void }
     **/
    initialization()
    {
        this.table.initialization();
    }
    
    /**
     * @private
     *
     * @description Returns all settings for the table component.
     *
     * @return { TableSettingProperties }
     **/
    _getSettings()
    {
        return {
            selects:
            [
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
                                }
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
                                },
                            contentSettings:
                                {
                                    keyValue: 'id_object',
                                    keyText: 'name_object',
                                }
                        },
                },
            ],
            isServerSide: true,
            httpRequestSettings:
                {
                    url: this.url,
                    method: HttpRequestMethodsClassifier.POST,
                },
            tableElementSettings:
                {
                    columns:
                        [
                            { name: 'id_user', label: 'Id user', type: TableCellTypesClassifier.NUMBER, isSortable: false },
                            { name: 'sur_name', label: 'Surname', type: TableCellTypesClassifier.STRING, isSortable: false, isFilter: true },
                            { name: 'first_name', label: 'First name', type: TableCellTypesClassifier.STRING, isSortable: false, isFilter: true },
                            { name: 'patronymic', label: 'Patronymic', type: TableCellTypesClassifier.NUMBER, isSortable: false },
                            { name: 'first_enter', label: 'First enter', type: TableCellTypesClassifier.STRING, isSortable: false },
                            { name: 'last_enter', label: 'Last enter', type: TableCellTypesClassifier.STRING, isSortable: false },
                            { name: 'last_exit', label: 'Last exit', type: TableCellTypesClassifier.STRING, isSortable: false },
                            { name: 'count_enter', label: 'Count enter', type: TableCellTypesClassifier.STRING, isSortable: false },
                            { name: 'count_exit', label: 'Count exit', type: TableCellTypesClassifier.STRING, isSortable: false },
                            { name: 'location_at_work', label: 'Location at work', type: TableCellTypesClassifier.BOOLEAN, isSortable: false },
                            { name: 'is_registered', label: 'Is registered', type: TableCellTypesClassifier.BOOLEAN, isSortable: false },
                            { name: 'date_start', label: 'Date start', type: TableCellTypesClassifier.STRING, isSortable: false },
                            { name: 'date_end', label: 'Date end', type: TableCellTypesClassifier.STRING, isSortable: false },
                            { name: 'name_absence', label: 'Name absence', type: TableCellTypesClassifier.STRING, isSortable: false },
                        ],
                },
            inputs:
                [
                    {
                        position: TablePositionsClassifier.TOP_RIGHT,
                        inputName: 'date',
                        inputId: 'date-search',
                        inputPlaceholder: 'Date',
                        iconId: 'time-calendar-search',
                        isDatepicker: true,
                        datepickerSettings:
                            {
                                locale: en,
                                selectedDates: [new Date()],
                                position: 'bottom center',
                                autoClose: true,
                                dateFormat: 'yyyy-MM-dd',
                                maxDate: new Date(),
                            },
                    },
                ]
        }
    }
}
