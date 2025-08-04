/**
 * @class
 *
 * @description Contains all settings for the content of custom select.
 **/
export class CustomSelectContentSettings
{
    /**
     * @typedef { Object } CustomSelectContentSettingsItems
     *
     * @property { string[] ? } elementClass - The css class of the element.
     *
     * @property { string ? } elementAttribute - The data attribute of the element.
     *
     * @property { boolean ? } withSearch - Determines whether a search is needed.
     *
     * @property { string[] ? } searchClass - The css class of the search tag.
     *
     * @property { string[] ? } searchInputClass - The css class of the search input tag.
     *
     * @property { string ? } searchInputPlaceholder - The placeholder for the search input tag.
     *
     * @property { string[] ? } listClass - The css class of the list tag.
     *
     * @property { string[] ? } listItemClass - The css class of the list item tag.
     *
     * @property { string[] ? } listItemValueClass - The css class of the list item value tag.
     *
     * @property { string ? } listItemValueAttribute - The name data attribute with value of the list item tag.
     *
     * @property { string ? } levelVariableName - The name of the level variable.
     *
     * @property { string ? } noResultsText - The text for display empty item.
     *
     * @property { number ? } sideMargin - The margin of the sides.
     *
     * @property { string ? } keyValue - The key for value of the response.
     *
     * @property { string ? } keyText - The key for text of the response.
     *
     * @property { boolean ? } isTree - Determines whether a data is tree.
     *
     * @property { string ? } treeIdKey - The key of the tree row.
     *
     * @property { string ? } treeParentIdKey - The key of the tree parent row.
     *
     * @property { number ? } treeMaxLevel - The max level for the displaying.
     **/
    
    /**
     * @public
     *
     * @type { string[] }
     **/
    elementClass = [ 'custom-select-content', 'custom-select-content--size-default', 'custom-select-content--theme-mercury' ];
    
    /**
     * @public
     *
     * @type { string }
     **/
    elementAttribute = 'data-custom-select-content';
    
    /**
     * @public
     *
     * @type { boolean }
     **/
    withSearch = true;
    
    /**
     * @public
     *
     * @type { string[] }
     **/
    searchClass = [ 'custom-select-content__search' ];
    
    /**
     * @public
     *
     * @type { string[] }
     **/
    searchInputClass = [ 'custom-select-content__search-input' ];
    
    /**
     * @public
     *
     * @type { string }
     **/
    searchInputPlaceholder = 'Type to search ..';
    
    /**
     * @public
     *
     * @type { string[] }
     **/
    listClass = [ 'custom-select-content__list' ];
    
    /**
     * @public
     *
     * @type { string[] }
     **/
    listItemClass = [ 'custom-select-content__list-item' ];
    
    /**
     * @public
     *
     * @type { string[] }
     **/
    listItemValueClass = [ 'custom-select-content__list-item-value' ];
    
    /**
     * @public
     *
     * @type { string }
     **/
    listItemValueAttribute = 'data-value';
    
    /**
     * @public
     *
     * @type { string }
     **/
    levelVariableName = 'custom-select-level';
    
    /**
     * @public
     *
     * @type { string }
     **/
    noResultsText = 'No results!';
    
    /**
     * @public
     *
     * @type { number }
     **/
    sideMargin = 10;
    
    /**
     * @public
     *
     * @type { string }
     **/
    keyValue;
    
    /**
     * @public
     *
     * @type { string }
     **/
    keyText;
    
    /**
     * @public
     *
     * @type { boolean }
     **/
    isTree = false;
    
    /**
     * @public
     *
     * @type { string }
     **/
    treeIdKey;
    
    /**
     * @public
     *
     * @type { string }
     **/
    treeParentIdKey;
    
    /**
     * @public
     *
     * @type { number }
     **/
    treeMaxLevel = 30;
}
