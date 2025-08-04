import { structureMerge } from '../../../tea-modules/Functions/Structures/structureMerge.js';


/**
 * @class
 *
 * @description Contains all possible settings of the SimpleOrdersListItem class.
 **/
export class SimpleOrdersListItemSettings
{
    /**
     * @public
     *
     * @type { string }
     **/
    elementClass = 'simple-orders-list-item simple-orders-list-item--size-default simple-orders-list-item--theme-default grid-column grid-column-4';
    
    /**
     * @public
     *
     * @type { string }
     **/
    upperClass = 'simple-orders-list-item__upper';
    
    /**
     * @public
     *
     * @type { string }
     **/
    timeClass = 'simple-orders-list-item__time';
    
    /**
     * @public
     *
     * @type { string }
     **/
    timeValueClass = 'simple-orders-list-item__time-value';
    
    /**
     * @public
     *
     * @type { string }
     **/
    timeUnitClass = 'simple-orders-list-item__time-unit';
    
    /**
     * @public
     *
     * @type { string }
     **/
    headingClass = 'simple-orders-list-item__heading';
    
    /**
     * @public
     *
     * @type { string }
     **/
    priceClass = 'simple-orders-list-item__price';
    
    /**
     * @public
     *
     * @type { string }
     **/
    currencyClass = 'currency currency--size-small';
    
    /**
     * @public
     *
     * @type { simpleOrdersListItemListSettings }
     **/
    simpleOrdersListItemListSettings;
    
    /**
     * @public
     *
     * @type { number }
     **/
    newStateTime = 3;
    
    /**
     * @public
     *
     * @type { number }
     **/
    staleStateTime = 5;
    
    /**
     * @public
     *
     * @type { number }
     **/
    oldStateTime = 10;
    
    /**
     * @public
     *
     * @type { ButtonSettingProperties }
     **/
    removeButtonSettings = {};
    
    /**
     * @constructor
     *
     * @param { Object } settings
     **/
    constructor(settings)
    {
        structureMerge(this, settings);
    }
}
