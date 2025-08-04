import { querySelector } from '../tea-modules/Functions/DOM/Queries/querySelector.js';
import { HttpRequestMethodsClassifier } from '../tea-modules/Classes/Requests/Standards/HttpRequestMethodsClassifier.js';
import { TableCellTypesClassifier } from '../components/Table/Standards/TableCellTypesClassifier.js';
import { TableActionTypesClassifier } from '../components/Table/Standards/TableActionTypesClassifier.js';
import { getAttribute } from '../tea-modules/Functions/DOM/Attributes/getAttribute.js';
import { Table } from '../components/Table/Table.js';


/**
 * @class
 *
 * @description Implements initialize table component for all classifiers.
 **/
export class ClassifierTable
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
     * @param { string | HTMLElement } selector
     *
     * @return { ClassifierTable }
     **/
    constructor(selector)
    {
        this.element = querySelector(selector);
        
        this.url = getAttribute(this.element, 'url', { isDataAttribute: true, isAfterRemove: true });
        
        this.detailUrl = getAttribute(this.element, 'detail-url', { isDataAttribute: true, isAfterRemove: true });
        
        this.detailUrl = this.detailUrl.replace(/%s/, '{id_object}');
        
        this.table = new Table(this.element, this.getSettings());
        
        this.table.initialization();
    }
    
    getSettings()
    {
        return {
            httpRequestSettings:
                {
                    url: this.url,
                    method: HttpRequestMethodsClassifier.POST,
                },
            isServerSide: false,
            tableElementSettings:
                {
                    columns:
                        [
                            { name: 'id_object', label: 'Id object', type: TableCellTypesClassifier.NUMBER, isSortable: true },
                            { name: 'name_object', label: 'Name object', type: TableCellTypesClassifier.STRING, isSortable: true, isTree: true },
                            { name: 'name_short', label: 'Name short', type: TableCellTypesClassifier.STRING, isSortable: true },
                            { name: 'note_object', label: 'Notes', type: TableCellTypesClassifier.STRING, isSortable: true },
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
            isTree: true,
            treeIdKey: 'id_object',
            treeParentIdKey: 'id_parent',
            withPagination: false,
        }
    }
}
