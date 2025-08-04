import { TablePositionsClassifier } from '../Standards/TablePositionsClassifier.js';
import { structureMerge }           from '../../../tea-modules/Functions/Structures/structureMerge.js';
import { CluePositionsClassifier }  from '../../Clue/CluePositionsClassifier.js';
import { TableSessionNamesClassifier } from '../Standards/TableSessionNamesClassifier.js';
import { TableStatusTypesClassifier } from '../Standards/TableStatusTypesClassifier.js';


export class TableToggleColumnsSettings
{
    /**
     * @typedef { Object } TableToggleColumnsSetting
     *
     * @property { TablePositionsClassifier ? } tablePosition
     *
     * @property { TableSessionNamesClassifier ? } sessionName
     *
     * @property { Object<string> ? } buttonAttributes
     *
     * @property { string ? } buttonIconClass
     *
     * @property { string ? } buttonIconId
     *
     * @property { ClueSettingProperties ? } buttonClueSettings
     *
     * @property { string ? } contentClass
     *
     * @property { string ? } contentId
     *
     * @property { string ? } contentInnerClass
     *
     * @property { string ? } contentPosition
     **/
    
    /**
     * @public
     *
     * @type { TablePositionsClassifier }
     **/
    tablePosition = TablePositionsClassifier.TOP_LEFT;
    
    /**
     * @public
     *
     * @type { TableSessionNamesClassifier }
     **/
    sessionName = TableSessionNamesClassifier.TOGGLE_COLUMNS;
    
    /**
     * @public
     *
     * @type { Object<string> }
     **/
    buttonAttributes =
        {
            'data-toggle-columns-dropdown': '',
            'data-content-id': 'table-toggle-columns',
            'data-dropdown-toggle': '',
        };
    
    /**
     * @public
     *
     * @type { Array<string> }
     **/
    buttonClass = [ 'table-button', TableStatusTypesClassifier.DEFAULT ];
    
    /**
     * @public
     *
     * @type { string }
     **/
    buttonIconClass = 'icon icon-size-18';
    
    /**
     * @public
     *
     * @type { string }
     **/
    buttonIconId = 'system-table-cog';
    
    /**
     * @public
     *
     * @type { ClueSettingProperties }
     **/
    buttonClueSettings =
        {
            text: 'Showing and hiding columns',
            position: CluePositionsClassifier.TOP,
        };
    
    /**
     * @public
     *
     * @type { string }
     **/
    contentClass = 'dropdown-content dropdown-content--theme-white';
    
    /**
     * @public
     *
     * @type { string }
     **/
    contentId = 'table-toggle-columns';
    
    /**
     * @public
     *
     * @type { string }
     **/
    contentInnerClass = 'dropdown-content__inner dropdown-content__inner--size-small';
    
    /**
     * @public
     *
     * @type { string }
     **/
    contentPosition = 'left';
    
    /**
     * @constructor
     *
     * @param { TableToggleColumnsSetting } settings
     **/
    constructor(settings)
    {
        structureMerge(this, settings);
    }
}
