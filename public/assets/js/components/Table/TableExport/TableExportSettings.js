import { structureMerge } from '../../../tea-modules/Functions/Structures/structureMerge.js';
import { TableStatusTypesClassifier } from '../Standards/TableStatusTypesClassifier.js';
import { CluePositionsClassifier } from '../../Clue/CluePositionsClassifier.js';
import { TablePositionsClassifier } from '../Standards/TablePositionsClassifier.js';
import { TableExportInnerButtonTypesClassifier } from './Standards/TableExportInnerButtonTypesClassifier.js';


/**
 * @description Contains all possible settings of the TableExport class.
 **/
export class TableExportSettings
{
    /**
     * @typedef { Object } TableExportSetting
     *
     * @property { TablePositionsClassifier } [tablePosition]
     *
     * @property { string } url
     *
     * @property { boolean } [isAdvanced]
     *
     * @property { Object<string> } [buttonAttributes]
     *
     * @property { Array<string> } [buttonClass]
     *
     * @property { string } [buttonIconClass]
     *
     * @property { string } [buttonIconId]
     *
     * @property { ClueSettingProperties } [buttonClueSettings]
     *
     * @property { string } [contentClass]
     *
     * @property { string } [contentId]
     *
     * @property { string } [contentInnerClass]
     *
     * @property { string } [contentPosition]
     *
     * @property { Array<string> } [innerButtonClass]
     *
     * @property { Array<{ text: string, type: TableExportInnerButtonTypesClassifier }> } [innerButtons]
     *
     * @property { Array<string> } [dataVariables]
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
     * @type { string }
     **/
    url;
    
    /**
     * @public
     *
     * @type { boolean }
     **/
    isAdvanced = false;
    
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
    buttonIconId = '';
    
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
     * @public
     *
     * @type { Array<string> }
     **/
    innerButtonClass = [ 'button button--type-default button--size-small button--theme-white-azure-wild-sand' ];
    
    /**
     * @public
     *
     * @type { Array<{ text: string, type: TableExportInnerButtonTypesClassifier }> }
     **/
    innerButtons =
        [
            { text: 'All properties', type: TableExportInnerButtonTypesClassifier.ALL_PROPERTIES },
            { text: 'All columns', type: TableExportInnerButtonTypesClassifier.ALL_COLUMNS },
            { text: 'Displayed columns', type: TableExportInnerButtonTypesClassifier.DISPLAYED_COLUMNS },
        ];
    
    /**
     * @public
     *
     * @type { Array<string> }
     **/
    dataVariables = [];
    
    /**
     * @constructor
     *
     * @param { TableExportSetting } settings
     **/
    constructor(settings)
    {
        structureMerge(this, settings)
    }
}
