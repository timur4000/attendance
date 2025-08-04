import { querySelector } from '../tea-modules/Functions/DOM/Queries/querySelector.js';
import { getAttribute }  from '../tea-modules/Functions/DOM/Attributes/getAttribute.js';
import { HttpRequestMethodsClassifier } from '../tea-modules/Classes/Requests/Standards/HttpRequestMethodsClassifier.js';
import { TableCellTypesClassifier } from '../components/Table/Standards/TableCellTypesClassifier.js';
import { Table } from '../components/Table/Table.js';
import { TablePositionsClassifier } from '../components/Table/Standards/TablePositionsClassifier.js';


/**
 * @class
 *
 * @description Implements help work with the users table.
 **/
export class UsersTable
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
                            { name: 'sur_name', label: 'Surname', type: TableCellTypesClassifier.STRING, isSortable: false },
                            { name: 'first_name', label: 'First name', type: TableCellTypesClassifier.STRING, isSortable: false },
                            { name: 'patronymic', label: 'Patronymic', type: TableCellTypesClassifier.STRING, isSortable: false },
                            { name: 'date_birth', label: 'Date of birth', type: TableCellTypesClassifier.STRING, isSortable: false },
                            { name: 'user_login', label: 'User login', type: TableCellTypesClassifier.STRING, isSortable: false },
                            { name: 'user_barcode', label: 'User barcode', type: TableCellTypesClassifier.STRING, isSortable: false },
                            { name: 'user_rfid', label: 'User rfid', type: TableCellTypesClassifier.STRING, isSortable: false },
                        ],
                },
        }
    }
}
