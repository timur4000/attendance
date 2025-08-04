import { structureMerge } from '../../../tea-modules/Functions/Structures/structureMerge.js';
import { TablePositionsClassifier } from '../Standards/TablePositionsClassifier.js';
import { TableActionTypesClassifier } from '../Standards/TableActionTypesClassifier.js';
import { TableSessionNamesClassifier } from '../Standards/TableSessionNamesClassifier.js';


/**
 * @class
 *
 * @description Contains all possible settings of Table class.
 **/
export class TableSettings
{
    /**
     * @typedef { Object } TableSettingProperties
     *
     * @property { boolean ? } isServerSide - Determines whether data is accepted from the server.
     *
     * @property { TableLineSettingProperties ? } lineSettings - The settings of the table line component.
     *
     * @property { TableElementSettingProperties ? } tableElementSettings - The settings of the table element component.
     *
     * @property { HttpRequestSettingProperties ? } httpRequestSettings - The settings of the http request.
     *
     * @property { TableSelectSettingProperties[] ? } selects - The settings of the table select components.
     *
     * @property { TableInputSettingProperties[] ? } inputs - The settings of the table input components.
     *
     * @property { TableButtonSettingProperties[] ? } buttons - The settings of the table button components.
     *
     * @property { boolean ? } withInputSearch - Determines whether input search is needed.
     *
     * @property { TableEarsSettingProperties ? } tableEarsSettings - The settings of the TableEars component.
     *
     * @property { boolean ? } isTree - Determines whether a data is tree.
     *
     * @property { string ? } treeIdKey - The key of the tree row.
     *
     * @property { string ? } treeParentIdKey - The key of the tree parent row.
     *
     * @property { boolean ? } withPagination - Determines whether pagination is needed.
     *
     * @property { boolean ? } withTopLine - Determines whether top line is needed.
     *
     * @property { boolean ? } withExpandCollapseButtons - Determines whether expand/collapse buttons is needed.
     *
     * @property { boolean ? } withTotal - Determines whether total row is needed.
     *
     * @property { TableHeadingSettingProperties ? } tableHeadingSettings - The settings of the TableHeading component.
     *
     * @property { boolean ? } withPostLoading - Determines whether post-loading is needed.
     *
     * @property { string ? } postLoadingIdentifier - The key for column of data.
     *
     * @property { string ? } postLoadingServerKey - The key for the post-loading request.
     *
     * @property { number ? } postLoadingTimeout - The timeout for post-loading requests.
     *
     * @property { boolean ? } toggleColumns - Checks whether the table should have the ability to hide and show columns.
     *
     * @property { TableToggleColumnsSetting ? } toggleColumnsSettings - The settings of the ToggleColumns component.
     *
     * @property { boolean ? } withTableExport - Checks whether the table should have an export.
     *
     * @property { TableToggleColumnsSetting ? } tableExportSettings - The settings of the TableExport component.
     *
     * @property { string ? } id - Identifier of the current table.
     **/
    
    /**
     * @public
     *
     * @type { boolean }
     **/
    isServerSide = false;
    
    /**
     * @public
     *
     * @type { TableLineSettingProperties }
     **/
    lineSettings;
    
    /**
     * @public
     *
     * @type { TableElementSettingProperties }
     **/
    tableElementSettings;
    
    /**
     * @public
     *
     * @type { HttpRequestSettingProperties }
     **/
    httpRequestSettings;
    
    /**
     * @public
     *
     * @type { TableSelectSettingProperties[] }
     **/
    selects =
        [
            {
                elementName: 'limit',
                options:
                    [
                        { value: '10', text: '10', isSelected: true },
                        { value: '15', text: '15', isSelected: false },
                        { value: '20', text: '20', isSelected: false },
                        { value: '30', text: '30', isSelected: false },
                        { value: '40', text: '40', isSelected: false },
                        { value: '50', text: '50', isSelected: false },
                    ],
                placeholder: 'Per page',
                position: TablePositionsClassifier.TOP_LEFT,
                withLabel: 1,
                withSearch: 0,
                customSelectSettings:
                    {
                        id: TableSessionNamesClassifier.PER_PAGE,
                    }
            },
        ];
    
    /**
     * @public
     *
     * @type { TableInputSettingProperties[] }
     **/
    inputs =
        [
            {
                position: TablePositionsClassifier.TOP_RIGHT,
                inputName: 'global-search',
                inputPlaceholder: 'Search',
            },
        ];
    
    /**
     * @public
     *
     * @type { TableButtonSettingProperties[] }
     **/
    buttons =
        [
            {
                position: TablePositionsClassifier.TOP_LEFT,
                type: TableActionTypesClassifier.DEFAULT,
                buttonSettings:
                    {
                        elementName: 'table-collapse',
                        iconId: 'arrows-collapse-all',
                        type: TableActionTypesClassifier.DEFAULT,
                        clueSettings: { text: 'Collapse all', },
                    },
            },
            {
                position: TablePositionsClassifier.TOP_LEFT,
                type: TableActionTypesClassifier.DEFAULT,
                buttonSettings:
                    {
                        elementName: 'table-expand',
                        iconId: 'arrows-expand-all',
                        type: TableActionTypesClassifier.DEFAULT,
                        clueSettings: { text: 'Expand all', },
                    },
            },
        ];
    
    /**
     * @public
     *
     * @type { boolean }
     **/
    withInputSearch = false;
    
    /**
     * @public
     *
     * @type { TableEarsSettingProperties }
     **/
    tableEarsSettings = {};
    
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
     * @type { boolean }
     **/
    withPagination = true;
    
    /**
     * @public
     *
     * @type { boolean }
     **/
    withTopLine = true;
    
    /**
     * @public
     *
     * @type { boolean }
     **/
    withExpandCollapseButtons = true;
    
    /**
     * @public
     *
     * @type { boolean }
     **/
    withTotal = false;
    
    /**
     * @public
     *
     * @type { TableHeadingSettingProperties }
     **/
    tableHeadingSettings;
    
    /**
     * @public
     *
     * @type { boolean }
     **/
    withPostLoading = false;
    
    /**
     * @public
     *
     * @type { string }
     **/
    postLoadingIdentifier;
    
    /**
     * @public
     *
     * @type { string }
     **/
    postLoadingServerKey;
    
    /**
     * @public
     *
     * @type { number }
     **/
    postLoadingTimeout = 3000;
    
    /**
     * @public
     *
     * @type { boolean }
     **/
    toggleColumns = true;
    
    /**
     * @public
     *
     * @type { TableToggleColumnsSetting }
     **/
    toggleColumnsSettings = {};
    
    /**
     * @public
     *
     * @type { boolean }
     **/
    withTableExport = false;
    
    /**
     * @public
     *
     * @type { TableExportManagerSetting }
     **/
    tableExportSettings = {};
    
    /**
     * @public
     *
     * @type { string }
     **/
    id = '';
    
    /**
     * @constructor
     *
     * @param { TableSettingProperties } settings
     *
     * @return { TableSettings }
     **/
    constructor(settings)
    {
        structureMerge(this, settings);
    }
}
