/**
 * @class
 *
 * @description Contains all possible settings of the SimpleOrdersList class.
 **/
export class SimpleOrdersListSettings
{
    /**
     * @public
     *
     * @type { string }
     **/
    ordersUrl;
    
    /**
     * @public
     *
     * @type { string }
     **/
    foodUrl;
    
    /**
     * @public
     *
     * @type { string }
     **/
    removeUrl;
    
    /**
     * @public
     *
     * @type { string }
     **/
    existUrl;
    
    /**
     * @public
     *
     * @type { SimpleOrdersListItemSettings }
     **/
    simpleOrdersListItemSettings;
    
    /**
     * @public
     *
     * @type { number }
     **/
    quantityFractionDigit = 1;
    
    /**
     * @public
     *
     * @type { string }
     **/
    systemClass = 'simple-orders-list__empty simple-orders-list__system--size-default simple-orders-list__system--theme-default';
    
    /**
     * @public
     *
     * @type { string }
     **/
    emptyText = 'No results!';
    
    /**
     * @public
     *
     * @type { string }
     **/
    loadingText = 'Loading..';
}
