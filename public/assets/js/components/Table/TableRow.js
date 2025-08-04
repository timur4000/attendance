import { TableSectionTypesClassifier } from './Standards/TableSectionTypesClassifier.js';
import { TableRowSettings }            from './Settings/TableRowSettings.js';
import { createElement }           from '../../tea-modules/Functions/DOM/Elements/createElement.js';
import { TableStateTypesClassifier }   from './Standards/TableStateTypesClassifier.js';
import { TableRowTypesClassifier }     from './Standards/TableRowTypesClassifier.js';
import { setAttribute }                from '../../tea-modules/Functions/DOM/Attributes/setAttribute.js';


/**
 * @class
 *
 * @description Implements logic of the table row element.
 **/
export class TableRow
{
    /**
     * @public
     *
     * @type { TableRowSettings }
     **/
    settings;
    
    /**
     * @public
     *
     * @type { TableSectionTypesClassifier }
     **/
    type;
    
    /**
     * @public
     *
     * @type { TableRowTypesClassifier }
     **/
    rowType;
    
    /**
     * @public
     *
     * @type { HTMLTableRowElement }
     **/
    element;
    
    /**
     * @public
     *
     * @type { number }
     **/
    identifier;
    
    /**
     * @public
     *
     * @type { Object }
     **/
    record;
    
    /**
     * @public
     *
     * @type { TableCell[] }
     **/
    tableCells = [];
    
    /**
     * @constructor
     *
     * @param { TableRowSettingProperties ? } settings
     *
     * @param { TableSectionTypesClassifier } sectionType
     *
     * @param { TableRowTypesClassifier } rowType
     *
     * @return { TableRow }
     **/
    constructor(settings, sectionType, rowType = TableRowTypesClassifier.DEFAULT)
    {
        this.settings = new TableRowSettings(settings);
        
        this.type = sectionType;
        
        this.rowType = rowType;
        
        this.element = this._createElement();
        
        this.setState(this.type, true);
        
        this.setState(this.rowType, true);
    }
    
    /**
     * @private
     *
     * @description Creates html node of the element.
     *
     * @return { HTMLTableRowElement }
     **/
    _createElement()
    {
        return createElement('tr', { class: this.settings.elementClass });
    }
    
    /**
     * @public
     *
     * @description Sets the given state to the element by force.
     *
     * @param { string } value
     *
     * @param { boolean } force
     *
     * @return { void }
     **/
    setState(value, force)
    {
        this.element.classList.toggle(value, force);
    }
    
    /**
     * @public
     *
     * @description Checks if the given state is an exist.
     *
     * @param { string } value
     *
     * @return { boolean }
     **/
    checkState(value)
    {
        return this.element.classList.contains(value);
    }
    
    /**
     * @public
     *
     * @description Appends the given cells in to the element.
     *
     * @param { HTMLTableCellElement[] } cells
     *
     * @return { void }
     **/
    appendCells(cells)
    {
        this.element.append(...cells);
    }
    
    /**
     * @public
     *
     * @description Appends the given cell in to the element.
     *
     * @param { HTMLTableCellElement } cell
     *
     * @return { void }
     **/
    appendCell(cell)
    {
        this.appendCells([ cell ]);
    }
    
    /**
     * @public
     *
     * @description Returns element.
     *
     * @return { HTMLTableRowElement }
     **/
    getElement()
    {
        return this.element;
    }
    
    /**
     * @public
     *
     * @description Checks if the row is open.
     *
     * @return { boolean }
     **/
    isOpen()
    {
        return this.checkState(TableStateTypesClassifier.OPEN);
    }
    
    /**
     * @public
     *
     * @description Sets the given value of an attribute to the element.
     *
     * @param { string } qualifiedName
     *
     * @param { string } value
     *
     * @return { void }
     **/
    setAttribute(qualifiedName, value)
    {
        setAttribute(this.element, qualifiedName, value);
    }
    
    /**
     * @public
     *
     * @description Sets the given value to identifier.
     *
     * @param { number } value
     *
     * @return { void }
     **/
    setIdentifier(value)
    {
        this.identifier = value;
        
        setAttribute(this.element, this.settings.identifierAttribute, value.toString());
    }
    
    /**
     * @public
     *
     * @description Sets the given record to the instance.
     *
     * @param { Object } record
     *
     * @return { void }
     **/
    setRecord(record)
    {
        this.record = record;
    }
    
    /**
     * @public
     *
     * @description Checks if the row is collapse.
     *
     * @return { boolean }
     **/
    isCollapse()
    {
        return this.checkState(TableStateTypesClassifier.COLLAPSE);
    }
    
    /**
     * @public
     *
     * @description Removes element from dom.
     *
     * @return { void }
     **/
    remove()
    {
        this.element.remove();
    }
    
    /**
     * @public
     *
     * @description Adds the given TableCell instance.
     *
     * @param { TableCell } tableCell
     *
     * @return { void }
     **/
    addTableCell(tableCell)
    {
        this.tableCells.push(tableCell);
    }
    
    /**
     * @public
     *
     * @description Updates component.
     *
     * @param { Object } record
     *
     * @return { void }
     **/
    update(record)
    {
        this.record = record;
        
        this.tableCells.forEach(a => a.update(record[ a.settings.columnName ]));
    }
}
