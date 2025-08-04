/**
 * @const
 *
 * @enum { string }
 *
 * @description Contains all possible event types of the Table class.
 **/
export const TableEventTypesClassifier =
    {
        INITIAL: 'table:initial',
        
        UPDATE: 'table:update',
        
        BEFORE_UPDATE: 'table:before-update',
        
        HEAD_CELL_CLICK: 'table:head-cell-click',
        
        PAGINATION_ITEM_CLICK: 'table:pagination-item-click',
        
        CREATE_BODY_CELLS: 'table:create-body-cells',
        
        INPUT_KEYUP: 'table:input-keyup',
        
        FILTER_INPUTS_KEYUP: 'table:filter-inputs-keyup',
        
        BEFORE_REQUEST_EXECUTE: 'table:before-request-execute',
        
        REQUEST_EXECUTE: 'table:request-execute',
        
        AFTER_REQUEST_PROCESSING: 'table:after-request-processing',
        
        REQUEST_PROCESSING: 'table:request-processing',
        
        SELECT_CHANGE: 'table:select-change',
        
        PAGINATION_ITEM_CHANGE: 'table:pagination-item-change',
        
        EARS_SCROLL: 'table:ears-scroll',
        
        EARS_RESIZE: 'table:ears-resize',
        
        TABLE_ELEMENT_SCROLL: 'table:table-element-scroll',
        
        TABLE_ELEMENT_RESIZE: 'table:table-element-resize',
        
        EAR_MOUSEENTER: 'table:table-ear-mouseenter',
        
        EAR_MOUSELEAVE: 'table:table-ear-mouseleave',
        
        BUTTON_CLICK: 'table:table-button-click',
        
        ACTION_BUTTON_CLICK: 'table:action-button-click',
        
        TOGGLE_COLUMNS_TOGGLE: 'table:toggle-columns-toggle',
        
        TOGGLE_COLUMNS_CHANGE: 'table:toggle-columns-change',
    };
