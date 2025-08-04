import { structureMerge } from '../../../tea-modules/Functions/Structures/structureMerge.js';
import { TableStatusTypesClassifier } from '../Standards/TableStatusTypesClassifier.js';
import { TableCellWhiteSpaceTypesClassifier } from '../Standards/TableCellWhiteSpaceTypesClassifier.js';


/**
 * @class
 *
 * @description Contains all possible settings of the TableCell class.
 **/
export class TableCellSettings
{
    /**
     * @typedef { Object } TableCellSettingProperties
     *
     * @property { string[] ? } elementClass - The class of the element.
     *
     * @property { string[] ? } elementAttribute - The attribute of the element.
     *
     * @property { string[] ? } innerClass - The class of the inner element.
     *
     * @property { string[] ? } valueClass - The class of the value element.
     *
     * @property { string[] ? } iconClass - The class of the icon element.
     *
     * @property { string ? } actionSvgClass - The class of the action svg element.
     *
     * @property { string ? } checkSvgClass - The class of the check svg element.
     *
     * @property { string ? } closeSvgClass - The class of the close svg element.
     *
     * @property { string ? } arrowSvgClass - The class of the arrow svg element.
     *
     * @property { string ? } actionSvgId - The id of the action svg element.
     *
     * @property { string ? } checkSvgId - The id of the check svg element.
     *
     * @property { string ? } closeSvgId - The id of the close svg element.
     *
     * @property { string ? } arrowSvgId - The id of the arrow svg element.
     *
     * @property { string ? } sortSvgString - The svg string of the sort svg element.
     *
     * @property { string } label - The label of the element.
     *
     * @property { string ? } columnName - The key of the label in object.
     *
     * @property { boolean ? } isSortable - Determines whether is sort is needed.
     *
     * @property { boolean ? } isTreeOption - Determines whether is tree option.
     *
     * @property { boolean ? } isTreeColumn - Determines whether is tree column.
     *
     * @property { Object ? } datum - The datum of the element.
     *
     * @property { TableButtonSettingProperties[] ? } actions - The actions of the row.
     *
     * @property { Object<string> ? } attributes - The attributes of the cell.
     *
     * @property { number ? } rowspan - The rowspan attribute of the element.
     *
     * @property { number ? } colspan - The colspan attribute of the element.
     *
     * @property { string ? } labelsKey - The key of column for displaying if the cell is labels type.
     *
     * @property { TableStatusTypesClassifier ? } labelsStatusType - The status type for displaying if the cell is labels type.
     *
     * @property { boolean ? } isTotal - Determines whether total value is needed for this column.
     *
     * @property { DateFormatsClassifier ? } dateFormat - The format for the date displaying.
     *
     * @property { boolean ? } isReverse - Checks whether "reverse" should be done for type boolean.
     *
     * @property { TableCellWhiteSpaceTypesClassifier ? } whiteSpaceType - The type of the white-space property.
     *
     * @property { Object<string, string | number> ? } styles - The css styles of the cell element.
     **/
    
    /**
     * @public
     *
     * @type { string[] }
     **/
    elementClass = [ 'table-element__cell' ];
    
    /**
     * @public
     *
     * @type { string[] }
     **/
    elementAttribute = [ 'data-cell' ];
    
    /**
     * @public
     *
     * @type { string[] }
     **/
    innerClass = [ 'table-element__cell-inner' ];
    
    /**
     * @public
     *
     * @type { string[] }
     **/
    valueClass = [ 'table-element__cell-value' ];
    
    /**
     * @public
     *
     * @type { string[] }
     **/
    iconClass = [ 'table-element__cell-icon' ];
    
    /**
     * @public
     *
     * @type { string[] }
     **/
    actionSvgClass = [ 'icon', 'icon-size-16' ];
    
    /**
     * @public
     *
     * @type { string[] }
     **/
    checkSvgClass = [ 'icon', 'icon-size-10' ];
    
    /**
     * @public
     *
     * @type { string[] }
     **/
    closeSvgClass = [ 'icon', 'icon-size-10' ];
    
    /**
     * @public
     *
     * @type { string[] }
     **/
    arrowSvgClass = [ 'icon', 'icon-size-10' ];
    
    /**
     * @public
     *
     * @type { string }
     **/
    actionSvgId = 'settings-gear';
    
    /**
     * @public
     *
     * @type { string }
     **/
    checkSvgId = 'essential-check';
    
    /**
     * @public
     *
     * @type { string }
     **/
    closeSvgId = 'essential-close';
    
    /**
     * @public
     *
     * @type { string }
     **/
    arrowSvgId = 'arrows-right';
    
    /**
     * TODO: Need refactoring.
     *
     * @public
     *
     * @type { string }
     **/
    sortSvgString = `<svg viewBox="0 0 24 24" class="icon icon-size-16"><path data-aside-left d="M10.4502 7.46997C10.2602 7.46997 10.0702 7.4 9.9202 7.25L6.7302 4.06L3.54019 7.25C3.25019 7.54 2.7702 7.54 2.4802 7.25C2.1902 6.96 2.1902 6.48 2.4802 6.19L6.20023 2.46997C6.34023 2.32997 6.5302 2.25 6.7302 2.25C6.9302 2.25 7.12022 2.32997 7.26022 2.46997L10.9802 6.19C11.2702 6.48 11.2702 6.96 10.9802 7.25C10.8302 7.4 10.6402 7.46997 10.4502 7.46997Z" /><path data-aside-left d="M6.72998 21.75C6.31998 21.75 5.97998 21.41 5.97998 21V3C5.97998 2.59 6.31998 2.25 6.72998 2.25C7.13998 2.25 7.47998 2.59 7.47998 3V21C7.47998 21.41 7.13998 21.75 6.72998 21.75Z" /><path data-aside-right d="M17.28 21.75C17.08 21.75 16.89 21.67 16.75 21.53L13.03 17.81C12.74 17.52 12.74 17.04 13.03 16.75C13.32 16.46 13.8 16.46 14.09 16.75L17.28 19.94L20.4699 16.75C20.7599 16.46 21.24 16.46 21.53 16.75C21.82 17.04 21.82 17.52 21.53 17.81L17.81 21.53C17.67 21.67 17.47 21.75 17.28 21.75Z" /><path data-aside-right d="M17.27 21.75C16.86 21.75 16.52 21.41 16.52 21V3C16.52 2.59 16.86 2.25 17.27 2.25C17.68 2.25 18.02 2.59 18.02 3V21C18.02 21.41 17.69 21.75 17.27 21.75Z" /></svg>`;
    
    /**
     * @public
     *
     * @type { string }
     **/
    label;
    
    /**
     * @public
     *
     * @type { string }
     **/
    columnName;
    
    /**
     * @public
     *
     * @type { boolean }
     **/
    isSortable = false;
    
    /**
     * @public
     *
     * @type { boolean }
     **/
    isTreeOption = false;
    
    /**
     * @public
     *
     * @type { boolean }
     **/
    isTreeColumn = false;
    
    /**
     * @public
     *
     * @type { Object }
     **/
    datum;
    
    /**
     * @public
     *
     * @type { TableButtonSettingProperties[] }
     **/
    actions = [];
    
    /**
     * @public
     *
     * @type { Object<string> }
     **/
    attributes = {};
    
    /**
     * @public
     *
     * @type { number }
     **/
    rowspan;
    
    /**
     * @public
     *
     * @type { number }
     **/
    colspan;
    
    /**
     * @public
     *
     * @type { string }
     **/
    labelsKey;
    
    /**
     * @public
     *
     * @type { TableStatusTypesClassifier }
     **/
    labelsStatusType;
    
    /**
     * @public
     *
     * @type { boolean }
     **/
    isTotal = false;
    
    /**
     * @public
     *
     * @type { DateFormatsClassifier }
     **/
    dateFormat;
    
    /**
     * @public
     *
     * @type { boolean }
     **/
    isReverse;
    
    /**
     * @public
     *
     * @type { TableCellWhiteSpaceTypesClassifier }
     **/
    whiteSpaceType;
    
    /**
     * @public
     *
     * @type { Object<string, string | number> }
     **/
    styles = {};
    
    /**
     * @constructor
     *
     * @param { TableCellSettingProperties ? } settings
     **/
    constructor(settings = {})
    {
        structureMerge(this, settings);
    }
}
