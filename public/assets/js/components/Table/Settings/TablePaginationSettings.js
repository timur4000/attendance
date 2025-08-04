import { structureMerge } from '../../../tea-modules/Functions/Structures/structureMerge.js';
import { TablePositionsClassifier } from '../Standards/TablePositionsClassifier.js';


/**
 * @class
 *
 * @description Contains all possible settings of the TablePagination class.
 **/
export class TablePaginationSettings
{
    /**
     * @typedef { Object } TablePaginationSettingProperties
     *
     * @property { TablePositionsClassifier ? } position - The position of the table.
     *
     * @property { string[] ? } elementClass - The class of the element.
     *
     * @property { string[] ? } itemClass - The class of the item element.
     *
     * @property { string ? } itemAttribute - The data attribute of the item element.
     *
     * @property { string[] ? } linkClass - The class of the link element.
     *
     * @property { string ? } itemPageAttribute - The page data attribute of the item element.
     *
     * @property { string[] ? } iconClass - The class of the icon element.
     *
     * @property { string ? } rightIconId - The id of the right arrow icon element.
     *
     * @property { string ? } leftIconId - The id of the left arrow icon element.
     *
     * @property { number ? } page - The number of current page.
     *
     * @property { number ? } limit - The number of per page rows.
     *
     * @property { number ? } total - The number of total rows.
     *
     * @property { boolean ? } withCursorKeys - Determines whether the cursor keys should switch pages.
     **/
    
    /**
     * @public
     *
     * @type { TablePositionsClassifier }
     **/
    position = TablePositionsClassifier.BOTTOM_RIGHT;
    
    /**
     * @public
     *
     * @type { string[] }
     **/
    elementClass = [ 'table-pagination' ];
    
    /**
     * @public
     *
     * @type { string[] }
     **/
    itemClass = [ 'table-pagination__item' ];
    
    /**
     * @public
     *
     * @type { string }
     **/
    itemAttribute = 'data-pagination-item';
    
    /**
     * @public
     *
     * @type { string[] }
     **/
    linkClass = [ 'table-pagination__link' ];
    
    /**
     * @public
     *
     * @type { string }
     **/
    itemPageAttribute = 'data-page';
    
    /**
     * @public
     *
     * @type { string[] }
     **/
    iconClass = [ 'icon', 'icon-size-10' ];
    
    /**
     * @public
     *
     * @type { string }
     **/
    rightIconId = 'arrows-long-right';
    
    /**
     * @public
     *
     * @type { string }
     **/
    leftIconId = 'arrows-long-left';
    
    /**
     * @public
     *
     * @type { number }
     **/
    page;
    
    /**
     * @public
     *
     * @type { number }
     **/
    limit;
    
    /**
     * @public
     *
     * @type { number }
     **/
    total;
    
    /**
     * @public
     *
     * @type { boolean }
     **/
    withCursorKeys = true;
    
    /**
     * @constructor
     *
     * @param { TablePaginationSettingProperties } settings
     *
     * @return { TablePaginationSettings }
     **/
    constructor(settings)
    {
        structureMerge(this, settings);
    }
}
