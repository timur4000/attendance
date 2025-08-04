import { HttpRequestMethodsClassifier } from '../tea-modules/Classes/Requests/Standards/HttpRequestMethodsClassifier.js';
import { Table } from '../components/Table/Table.js';
import { TableEventTypesClassifier }    from '../components/Table/Standards/TableEventTypesClassifier.js';


/**
 * @class
 *
 * @abstract
 *
 * @description Implements abstract logic for all Table classes.
 **/
export class BaseTable
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
     * @abstract
     *
     * @public
     *
     * @type { string }
     **/
    selectors;
    
    /**
     * @abstract
     *
     * @public
     *
     * @type { string }
     **/
    url;
    
    /**
     * @abstract
     *
     * @public
     *
     * @type { HttpRequestMethodsClassifier }
     **/
    method = HttpRequestMethodsClassifier.POST;
    
    /**
     * @abstract
     *
     * @public
     *
     * @type { HttpRequestData }
     **/
    data = {};
    
    /**
     * @abstract
     *
     * @public
     *
     * @type { boolean }
     **/
    isServerSide = true;
    
    /**
     * @abstract
     *
     * @public
     *
     * @type { boolean }
     **/
    isTree = false;
    
    /**
     * @abstract
     *
     * @public
     *
     * @type { string }
     **/
    treeIdKey;
    
    /**
     * @abstract
     *
     * @public
     *
     * @type { string }
     **/
    treeParentIdKey;
    
    /**
     * @abstract
     *
     * @public
     *
     * @type { boolean }
     **/
    withPagination = true;
    
    /**
     * @abstract
     *
     * @public
     *
     * @type { boolean }
     **/
    withTopLine = true;
    
    /**
     * @abstract
     *
     * @public
     *
     * @type { boolean }
     **/
    withTotal = false;
    
    /**
     * @abstract
     *
     * @public
     *
     * @type { string }
     **/
    rowIdentifierColumnName;
    
    /**
     * @abstract
     *
     * @public
     *
     * @type { boolean }
     **/
    withPostLoading = false;
    
    /**
     * @abstract
     *
     * @public
     *
     * @type { boolean }
     **/
    withTableExport = false;
    
    /**
     * @abstract
     *
     * @public
     *
     * @type { string }
     **/
    postLoadingIdentifier;
    
    /**
     * @abstract
     *
     * @public
     *
     * @type { string }
     **/
    postLoadingServerKey;
    
    /**
     * @abstract
     *
     * @public
     *
     * @type { number }
     **/
    postLoadingTimeout = 4000;
    
    /**
     * @abstract
     *
     * @public
     *
     * @type { boolean }
     **/
    toggleColumns = true;
    
    /**
     * @constructor
     *
     * @return { BaseTable }
     **/
    constructor() {}
    
    /**
     * @private
     *
     * @description Returns settings of the table component.
     *
     * @return { TableSettingProperties }
     **/
    _getSettings()
    {
        return {
            withTopLine: this.withTopLine,
            withTotal: this.withTotal,
            buttons: this.getButtons(),
            selects: this.getSelects(),
            inputs: this.getInputs(),
            isServerSide: this.isServerSide,
            isTree: this.isTree,
            treeIdKey: this.treeIdKey,
            treeParentIdKey: this.treeParentIdKey,
            withPagination: this.withPagination,
            tableHeadingSettings: this.getTableHeadingSettings(),
            withPostLoading: this.withPostLoading,
            postLoadingIdentifier: this.postLoadingIdentifier,
            postLoadingServerKey: this.postLoadingServerKey,
            postLoadingTimeout: this.postLoadingTimeout,
            withTableExport: this.withTableExport,
            tableExportSettings: this.getTableExportSettings(),
            toggleColumns: this.toggleColumns,
            httpRequestSettings:
                {
                    url: this.url,
                    method: this.method,
                    data: this.data,
                },
            tableElementSettings:
                {
                    columns: this.getColumns(),
                    actions: this.getActions(),
                    rowIdentifierColumnName: this.rowIdentifierColumnName,
                }
        };
    }
    
    /**
     * @abstract
     *
     * @public
     *
     * @description Implements initialize base logic.
     *
     * @return { void }
     **/
    initialization() {};
    
    /**
     * @public
     *
     * @description Implements process for initialize of the table component.
     *
     * @return { void }
     **/
    tableInitializeProcessing()
    {
        this.table = new Table(this.element, this._getSettings());
        
        this.table.initialization();
        
        this.table.pagination.customEvents.subscribe(TableEventTypesClassifier.PAGINATION_ITEM_CLICK, this.paginationItemClickHandler.bind(this));
        
        this.table.customEvents.subscribe(TableEventTypesClassifier.ACTION_BUTTON_CLICK, this.actionButtonClickHandler.bind(this));
        
        this.table.customEvents.subscribe(TableEventTypesClassifier.BUTTON_CLICK, this.buttonClickHandler.bind(this));
        
        this.table.customEvents.subscribe(TableEventTypesClassifier.UPDATE, this.tableUpdateHandler.bind(this));
        
        this.table.customEvents.subscribe(TableEventTypesClassifier.INITIAL, this.tableInitialHandler.bind(this));
    }
    
    /**
     * @protected
     *
     * @description Implements handler for the table update event.
     *
     * @param { Table } instance
     *
     * @return { void }
     **/
    async tableUpdateHandler(instance) {}
    
    /**
     * @protected
     *
     * @description Implements handler for the table initial event.
     *
     * @param { Table } instance
     *
     * @return { void }
     **/
    async tableInitialHandler(instance) {}
    
    /**
     * @protected
     *
     * @description Implements handler for the button click event.
     *
     * @param { Button } instance
     *
     * @param { MouseEvent } event
     *
     * @param { Table } table
     *
     * @return { void }
     **/
    async buttonClickHandler(instance, event, table) {}
    
    /**
     * @protected
     *
     * @description Implements handler for the pagination item click event.
     *
     * @param { HTMLLIElement } item
     *
     * @param { number } page
     *
     * @param { PointerEvent } event
     *
     * @param { TablePagination } instance
     *
     * @return { void }
     **/
    paginationItemClickHandler(item, page, event, instance) {}
    
    /**
     * @protected
     *
     * @description Implements handler for the action button click event.
     *
     * @param { PointerEvent } event
     *
     * @param { Button } button
     *
     * @param { TableCell } tableCell
     *
     * @param { TableElement } tableElement
     *
     * @param { Table } instance
     *
     * @return { void }
     **/
    async actionButtonClickHandler(event, button, tableCell, tableElement, instance) {}
    
    /**
     * @protected
     *
     * @description Returns settings of the TableExport.
     *
     * @return { TableExportManagerSetting }
     **/
    getTableExportSettings()
    {
        return {};
    };
    
    /**
     * @protected
     *
     * @description Returns selects.
     *
     * @return { Array<TableSelectSettingProperties> }
     **/
    getSelects()
    {
        return [];
    };
    
    /**
     * @protected
     *
     * @description Returns settings of the TableHeading component.
     *
     * @return { TableHeadingSettingProperties | undefined }
     **/
    getTableHeadingSettings()
    {
        return ;
    };
    
    /**
     * @protected
     *
     * @description Returns buttons.
     *
     * @return { TableButtonSettingProperties[] }
     **/
    getButtons()
    {
        return [];
    };
    
    /**
     * @protected
     *
     * @description Returns inputs.
     *
     * @return { TableInputSettingProperties[] }
     **/
    getInputs()
    {
        return [];
    };
    
    /**
     * @abstract
     *
     * @protected
     *
     * @description Returns columns.
     *
     * @return { Array<TableElementColumn> }
     **/
    getColumns() {};
    
    /**
     * @abstract
     *
     * @protected
     *
     * @description Returns actions.
     *
     * @return { Array<TableButtonSettingProperties> }
     **/
    getActions() {};
}
