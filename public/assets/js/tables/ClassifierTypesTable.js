import { querySelector } from '../tea-modules/Functions/DOM/Queries/querySelector.js';
import { getAttribute }  from '../tea-modules/Functions/DOM/Attributes/getAttribute.js';
import { HttpRequestMethodsClassifier } from '../tea-modules/Classes/Requests/Standards/HttpRequestMethodsClassifier.js';
import { TableCellTypesClassifier } from '../components/Table/Standards/TableCellTypesClassifier.js';
import { Table } from '../components/Table/Table.js';
import { TableActionTypesClassifier } from '../components/Table/Standards/TableActionTypesClassifier.js';


/**
 * @class
 *
 * @description Implements help work with the classifier types table.
 **/
export class ClassifierTypesTable
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
     * @return { ClassifierTypesTable }
     **/
    constructor(selectors)
    {
        this.element = querySelector(selectors);
        
        this.url = getAttribute(this.element, 'url', { isAfterRemove: true, isDataAttribute: true });
        
        this.detailUrl = getAttribute(this.element, 'detail-url', { isDataAttribute: true, isAfterRemove: true });
        
        this.detailUrl = this.detailUrl.replace(/%s/, '{id_object}');
        
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
            httpRequestSettings:
                {
                    url: this.url,
                    method: HttpRequestMethodsClassifier.POST,
                },
            tableElementSettings:
                {
                    columns:
                        [
                            { name: 'id_object', label: 'Id object', type: TableCellTypesClassifier.NUMBER, isSortable: true },
                            { name: 'name_entity', label: 'Name entity', type: TableCellTypesClassifier.STRING, isSortable: true },
                            { name: 'name_table', label: 'Name table', type: TableCellTypesClassifier.STRING, isSortable: true },
                            { name: 'note_entity', label: 'Note entity', type: TableCellTypesClassifier.STRING, isSortable: true },
                        ],
                    actions:
                        [
                            {
                                type: TableActionTypesClassifier.DEFAULT,
                                buttonSettings:
                                    {
                                        href: this.detailUrl,
                                        iconId: 'content-document-forward',
                                        clueSettings: { text: 'View', },
                                    },
                            },
                        ],
                },
        }
    }
}
