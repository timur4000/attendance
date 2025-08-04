import { TableElementTypesClassifier } from '../Standards/TableElementTypesClassifier.js';
import { structureMerge }              from '../../../tea-modules/Functions/Structures/structureMerge.js';


/**
 * @class
 *
 * @description Contains all possible settings of the TableElement class.
 **/
export class TableElementSettings
{
    /**
     * @typedef { Object } TableElementColumn
     *
     * @property { string } name - The name of the data key.
     *
     * @property { string } label - The label of the cell.
     *
     * @property { TableCellTypesClassifier } type - The type of the cell.
     *
     * @property { boolean } isSortable - Determines whether sort is needed.
     *
     * @property { boolean ? } isTree - Determines whether column is tree column.
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
     * @property { boolean ? } isFilter - Checks whether a column should have a filter.
     *
     * @property { TableCellWhiteSpaceTypesClassifier ? } whiteSpaceType - The type of the white-space property.
     *
     * @property { Object<string, string | number> ? } styles - The styles of the column element.
     **/
    
    /**
     * @typedef { Object } TableElementSettingProperties
     *
     * @property { TableElementTypesClassifier ? } type - The type of the element.
     *
     * @property { string[] ? } elementClass - The class of the element.
     *
     * @property { string[] ? } tableClass - The class of the table element.
     *
     * @property { string[] ? } headClass - The class of the head element.
     *
     * @property { string[] ? } bodyClass - The class of the body element.
     *
     * @property { string[] ? } footClass - The class of the foot element.
     *
     * @property { TableRowSettingProperties ? } rowSettings - The settings of the all rows element.
     *
     * @property { TableElementColumn[] ? } columns - The columns for the thead.
     *
     * @property { TableButtonSettingProperties[] ? } actions - The actions for the rows.
     *
     * @property { string ? } levelInitial - The initial number of the level.
     *
     * @property { boolean ? } isDefaultCollapse - Determines whether default state is collapse.
     *
     * @property { string ? } idDataAttribute - The name of the id data attribute.
     *
     * @property { string ? } parentIdDataAttribute - The name of the parent id data attribute.
     *
     * @property { string ? } levelDataAttributeName - The name of the level data attribute.
     *
     * @property { string ? } levelStyleVariableName - The name of the style variable.
     *
     * @property { string ? } rowIdentifierColumnName - The column name for the data of the row identifier attribute.
     **/
    
    /**
     * @public
     *
     * @type { TableElementTypesClassifier }
     **/
    type = TableElementTypesClassifier.COLLAPSE;
    
    /**
     * @public
     *
     * @type { string[] }
     **/
    elementClass = [ 'table-element' ];
    
    /**
     * @public
     *
     * @type { string[] }
     **/
    tableClass = [ 'table-element__table' ];
    
    /**
     * @public
     *
     * @type { string[] }
     **/
    headClass = [ 'table-element__head' ];
    
    /**
     * @public
     *
     * @type { string[] }
     **/
    bodyClass = [ 'table-element__body' ];
    
    /**
     * @public
     *
     * @type { string[] }
     **/
    footClass = [ 'table-element__foot' ];
    
    /**
     * @public
     *
     * @type { TableRowSettingProperties }
     **/
    rowSettings = {};
    
    /**
     * @public
     *
     * @type { TableElementColumn[] }
     **/
    columns = [];
    
    /**
     * @public
     *
     * @type { TableButtonSettingProperties[] }
     **/
    actions = [];
    
    /**
     * @public
     *
     * @type { number }
     **/
    levelInitial = 1;
    
    /**
     * @public
     *
     * @type { boolean }
     **/
    isDefaultCollapse = false;
    
    /**
     * @public
     *
     * @type { string }
     **/
    idDataAttribute = 'data-id';
    
    /**
     * @public
     *
     * @type { string }
     **/
    parentIdDataAttribute = 'data-parent-id';
    
    /**
     * @public
     *
     * @type { string }
     **/
    levelDataAttributeName = 'data-level';
    
    /**
     * @public
     *
     * @type { string }
     **/
    levelStyleVariableName = '--table-element-level';
    
    /**
     * @public
     *
     * @type { string }
     **/
    rowIdentifierColumnName;
    
    /**
     * @constructor
     *
     * @param { TableElementSettingProperties } settings
     *
     * @return { TableElementSettings }
     **/
    constructor(settings)
    {
        structureMerge(this, settings);
        
        this.elementClass.push(this.type);
    }
}
