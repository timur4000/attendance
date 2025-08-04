import { querySelector } from '../tea-modules/Functions/DOM/Queries/querySelector.js';
import { getAttribute }  from '../tea-modules/Functions/DOM/Attributes/getAttribute.js';
import { HttpRequestMethodsClassifier } from '../tea-modules/Classes/Requests/Standards/HttpRequestMethodsClassifier.js';
import { TableCellTypesClassifier } from '../components/Table/Standards/TableCellTypesClassifier.js';
import { Table } from '../components/Table/Table.js';


/**
 * @class
 *
 * @description Implements help work with the users table.
 **/
export class TuitionTable
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
     * @public
     *
     * @type { string }
     **/
    detailUrl;
    
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
        
        this.detailUrl = getAttribute(this.element, 'detail-url', { isAfterRemove: true, isDataAttribute: true });
        
        this.detailUrl = this.detailUrl.replace(/%s/, '{id_user}');
        
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
                            { name: 'id_user', label: 'Id', type: TableCellTypesClassifier.NUMBER, isSortable: false },
                            { name: 'sur_name', label: 'Surname', type: TableCellTypesClassifier.STRING, isSortable: false },
                            { name: 'first_name', label: 'First name', type: TableCellTypesClassifier.STRING, isSortable: false },
                            { name: 'patronymic', label: 'Patronymic', type: TableCellTypesClassifier.STRING, isSortable: false },
                            { name: 'year', label: 'Year', type: TableCellTypesClassifier.NUMBER, isSortable: false },
                            { name: 'must_pay', label: 'Must pay', type: TableCellTypesClassifier.NUMBER, isSortable: false },
                            { name: 'money_paid', label: 'Money paid', type: TableCellTypesClassifier.NUMBER, isSortable: false },
                            { name: 'code_currency', label: 'Currency', type: TableCellTypesClassifier.STRING, isSortable: false },
                            { name: 'name_currency', label: 'Name currency', type: TableCellTypesClassifier.STRING, isSortable: false },
                        ],
                },
        }
    }
}
