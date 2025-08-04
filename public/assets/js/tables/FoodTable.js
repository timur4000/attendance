import { querySelector } from '../tea-modules/Functions/DOM/Queries/querySelector.js';
import { getAttribute }  from '../tea-modules/Functions/DOM/Attributes/getAttribute.js';
import { HttpRequestMethodsClassifier } from '../tea-modules/Classes/Requests/Standards/HttpRequestMethodsClassifier.js';
import { TableCellTypesClassifier } from '../components/Table/Standards/TableCellTypesClassifier.js';
import { Table } from '../components/Table/Table.js';
import { TableActionTypesClassifier } from '../components/Table/Standards/TableActionTypesClassifier.js';


/**
 * @class
 *
 * @description Implements help work with the food table.
 **/
export class FoodTable
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
            isServerSide: false,
            httpRequestSettings:
                {
                    url: this.url,
                    method: HttpRequestMethodsClassifier.POST,
                },
            tableElementSettings:
                {
                    columns:
                        [
                            { name: 'id_object', label: 'Id object', type: TableCellTypesClassifier.NUMBER, isSortable: false },
                            { name: 'name_object', label: 'NameObject', type: TableCellTypesClassifier.STRING, isSortable: false },
                            { name: 'price_object', label: 'Price object', type: TableCellTypesClassifier.COINS, isSortable: false },
                            { name: 'code_currency', label: 'Currency', type: TableCellTypesClassifier.STRING, isSortable: false },
                            { name: 'name_currency', label: 'Name currency', type: TableCellTypesClassifier.STRING, isSortable: false },
                        ],
                    actions:
                        [
                            {
                                type: TableActionTypesClassifier.DEFAULT,
                                buttonSettings:
                                    {
                                        iconId: 'content-edit',
                                        clueSettings: { text: 'Edit', },
                                        attributes: { 'data-modal-id': 'edit-modal', 'data-id': '{id_object}' },
                                    },
                            },
                        ],
                },
        }
    }
}
