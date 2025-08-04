import { TableElementSettings }        from './Settings/TableElementSettings.js';
import { createElement }               from '../../tea-modules/Functions/DOM/Elements/createElement.js';
import { TableRow }                    from './TableRow.js';
import { TableSectionTypesClassifier } from './Standards/TableSectionTypesClassifier.js';
import { isStructureEmpty }            from '../../tea-modules/Functions/Is/isStructureEmpty.js';
import { TableCell }                   from './TableCell.js';
import { TableCellTypesClassifier }    from './Standards/TableCellTypesClassifier.js';
import { CustomEvents }                from '../../tea-modules/Classes/CustomEvents/CustomEvents.js';
import { TableEventTypesClassifier }   from './Standards/TableEventTypesClassifier.js';
import { TableStateTypesClassifier }   from './Standards/TableStateTypesClassifier.js';
import { setAttribute }                from '../../tea-modules/Functions/DOM/Attributes/setAttribute.js';
import { querySelector }               from '../../tea-modules/Functions/DOM/Queries/querySelector.js';
import { clearArray }                  from '../../tea-modules/Functions/Arrays/clearArray.js';
import { isUndefined }                 from '../../tea-modules/Functions/Is/isUndefined.js';
import { getAttribute }                from '../../tea-modules/Functions/DOM/Attributes/getAttribute.js';
import { TableCellOptionClassesClassifier } from './Standards/TableCellOptionClassesClassifier.js';
import { structureValue } from '../../tea-modules/Functions/Structures/structureValue.js';
import { TableRowTypesClassifier } from './Standards/TableRowTypesClassifier.js';
import { InputEventsClassifier } from '../Inputs/Standards/InputEventsClassifier.js';


/**
 * @class
 *
 * @description Implements main logic of the table node.
 **/
export class TableElement
{
    /**
     * @public
     *
     * @type { Table<Object> }
     **/
    mainInstance;
    
    /**
     * @public
     *
     * @type { TableElementSettings }
     **/
    settings;
    
    /**
     * @public
     *
     * @type { CustomEvents }
     **/
    customEvents;
    
    /**
     * @public
     *
     * @type { HTMLDivElement }
     **/
    element;
    
    /**
     * @public
     *
     * @type { HTMLTableElement }
     **/
    table;
    
    /**
     * @public
     *
     * @type { HTMLTableSectionElement }
     **/
    head;
    
    /**
     * @public
     *
     * @type { HTMLTableSectionElement }
     **/
    body;
    
    /**
     * @public
     *
     * @type { HTMLTableSectionElement }
     **/
    foot;
    
    /**
     * @public
     *
     * @type { Array }
     **/
    headRows = [];
    
    /**
     * @public
     *
     * @type { TableCell[] }
     **/
    headCells = [];
    
    /**
     * @public
     *
     * @type { CustomInput[] }
     **/
    headFilters = [];
    
    /**
     * @public
     *
     * @type { TableRow[] }
     **/
    bodyRows = [];
    
    /**
     * @public
     *
     * @type { TableCell[] }
     **/
    bodyCells = [];
    
    /**
     * @public
     *
     * @type { TableRow[] }
     **/
    footRows = [];
    
    /**
     * @public
     *
     * @type { TableCell[] }
     **/
    footCells = [];
    
    /**
     * @public
     *
     * @type { Map<string, number> }
     **/
    totalValues = new Map();
    
    /**
     * @public
     *
     * @type { ResizeObserver }
     **/
    resizeObserver;
    
    /**
     * @public
     *
     * @type { number }
     **/
    resizeObserverTimeout;
    
    /**
     * @constructor
     *
     * @param { Table<Object> } mainInstance
     *
     * @param { TableElementSettingProperties } settings
     *
     * @return { TableElement }
     **/
    constructor(mainInstance, settings)
    {
        this.mainInstance = mainInstance;
        
        this.settings = new TableElementSettings(settings);
        
        this.customEvents = new CustomEvents();
        
        this.head = this._createHead();
        
        this.body = this._createBody();
        
        this.foot = this._createFoot();
        
        this.table = this._createTable();
        
        this.element = this._createElement();
        
        this.resizeObserver = new ResizeObserver(this._resizeObserverCallback.bind(this));
    }
    
    /**
     * @public
     *
     * @description Implements initialize base methods and logic.
     *
     * @return { void }
     **/
    initialization()
    {
        this._headRowsProcessing();
        
        this._headRowsInsertProcessing();
        
        this.element.addEventListener('click', this._clickHandler.bind(this));
        
        this.element.addEventListener('scroll', this._scrollHandler.bind(this));
        
        this.resizeObserver.observe(this.element);
    }
    
    /**
     * @protected
     *
     * @description Implements process of the head rows creating.
     *
     * @return { void }
     **/
    _headRowsProcessing()
    {
        this._headTitlesRowProcessing();
        
        this._headFiltersRowProcessing();
    }
    
    /**
     * @protected
     *
     * @description Implements process of the head rows inserting.
     *
     * @return { void }
     **/
    _headRowsInsertProcessing()
    {
        this.head.innerHTML = '';
        
        this.headRows.forEach(a => this.head.append(a.getElement()));
    }
    
    /**
     * @public
     *
     * @description Updates head rows.
     *
     * @return { void }
     **/
    headRowsUpdate()
    {
        clearArray(this.headRows);

        clearArray(this.headFilters);

        clearArray(this.headCells);
        
        this._headTitlesRowProcessing();
        
        this._headFiltersRowProcessing();
        
        this._headRowsInsertProcessing();
    }
    
    /**
     * @protected
     *
     * @description Implements process of the head titles rows creating.
     *
     * @return { void }
     **/
    _headTitlesRowProcessing()
    {
        const row = new TableRow(this.settings.rowSettings, TableSectionTypesClassifier.HEAD);
        
        for (let i = 0, n = this.settings.columns.length; i < n; i++)
        {
            const column = this.settings.columns[ i ];
            
            if (!this.isColumnRender(column))
            {
                continue;
            }
            
            const cell = new TableCell({ columnName: column.name, label: column.label, isSortable: column.isSortable, datum: column }, TableCellTypesClassifier.TITLE, TableSectionTypesClassifier.HEAD);
            
            row.appendCell(cell.getElement());
            
            this.headCells.push(cell);
        }
        
        if (this.hasActions())
        {
            const cell = new TableCell({ columnName: '', label: '' }, TableCellTypesClassifier.ACTION, TableSectionTypesClassifier.HEAD);
            
            row.appendCell(cell.getElement());
            
            this.headCells.push(cell);
        }
        
        this.headRows.push(row);
    }
    
    /**
     * @protected
     *
     * @description Implements process of the head filters rows creating.
     *
     * @return { void }
     **/
    _headFiltersRowProcessing()
    {
        if (!this.withFilters())
        {
            return ;
        }
        
        const row = new TableRow(this.settings.rowSettings, TableSectionTypesClassifier.FILTER);
        
        for (let i = 0, n = this.settings.columns.length; i < n; i++)
        {
            const column = this.settings.columns[ i ];
            
            if (!this.isColumnRender(column))
            {
                continue ;
            }
            
            const type = column.isFilter ? TableCellTypesClassifier.INPUT : TableCellTypesClassifier.EMPTY;
            
            const cell = new TableCell({ columnName: column.name, label: column.label, isSortable: column.isSortable, datum: column }, type, TableSectionTypesClassifier.FILTER);
            
            if (column.isFilter)
            {
                this.headFilters.push(cell.customInput);
                
                cell.customInput.customEvents.subscribe(InputEventsClassifier.KEY_UP, this._customInputKeyupHandler.bind(this));
            }
            
            row.appendCell(cell.getElement());
        }
        
        if (this.hasActions())
        {
            const cell = new TableCell({ columnName: '', label: '' }, TableCellTypesClassifier.EMPTY, TableSectionTypesClassifier.FILTER);
            
            row.appendCell(cell.getElement());
        }
        
        this.headRows.push(row);
    }
    
    /**
     * @private
     *
     * @description Implements a keyup handler of the CustomInput component.
     *
     * @param { HTMLInputElement } input
     *
     * @param { CustomInput } instance
     *
     * @return { void }
     **/
    _customInputKeyupHandler(input, instance)
    {
        this.customEvents.execute(TableEventTypesClassifier.FILTER_INPUTS_KEYUP, input, instance, this);
    }
    
    /**
     * @public
     *
     * @description Checks whether the at least one column should have a filter.
     *
     * @return { boolean }
     **/
    withFilters()
    {
        return this.settings.columns.some(a => a.isFilter && this.isColumnRender(a));
    }
    
    /**
     * @private
     *
     * @description Implements callback for the resize observer.
     *
     * @param { ResizeObserverEntry[] } entries
     *
     * @return { void }
     **/
    _resizeObserverCallback(entries)
    {
        clearTimeout(this.resizeObserverTimeout);
        
        this.resizeObserverTimeout = setTimeout(this._resizeObserverTimeoutHandler.bind(this), 50);
    }
    
    /**
     * @private
     *
     * @description Implements handler for the resize observer timeout.
     *
     * @param { ResizeObserverEntry[] } entries
     *
     * @return { void }
     **/
    _resizeObserverTimeoutHandler(entries)
    {
        this.customEvents.execute(TableEventTypesClassifier.TABLE_ELEMENT_RESIZE, entries, this);
    }
    
    /**
     * @private
     *
     * @description Implements handler for the element of the click event.
     *
     * @param { PointerEvent } event
     *
     * @return { void }
     **/
    _clickHandler(event)
    {
        const bodyCell = event.target.closest('[data-cell]');
        
        const bodyTableCell = this.getTableCell(bodyCell, TableSectionTypesClassifier.BODY);
        
        if (bodyTableCell && this.mainInstance.isTree() && bodyTableCell.checkState(TableCellOptionClassesClassifier.TREE_OPTION))
        {
            const bodyTableRow = this.getTableRowByCell(bodyCell, TableSectionTypesClassifier.BODY);
            
            this.rowOpenOrClose(bodyTableRow, bodyTableRow.isOpen() || event.altKey, !bodyTableRow.isOpen());
        }
        
        const headCell = this.getTableCell(bodyCell, TableSectionTypesClassifier.HEAD);
        
        if (headCell)
        {
            this.customEvents.execute(TableEventTypesClassifier.HEAD_CELL_CLICK, event, this, headCell);
        }
    }
    
    /**
     * @public
     *
     * @description Implements open or close by the given TableRow or row element.
     *
     * @param { TableRow | HTMLTableRowElement } row
     *
     * @param { boolean ? } isRecursive
     *
     * @param { boolean ? } isCollapse
     *
     * @return { void }
     **/
    rowOpenOrClose(row, isRecursive = false, isCollapse)
    {
        if (!(row instanceof TableRow))
        {
            row = this.getTableRow(row, TableSectionTypesClassifier.BODY);
        }
        
        if (!row)
        {
            return ;
        }
        
        const id = getAttribute(row.getElement(), this.settings.idDataAttribute);
        
        const rows = querySelector(`[${ this.settings.parentIdDataAttribute }="${ id }"]`, { isAll: true, root: this.getBody() });

        row.setState(TableStateTypesClassifier.OPEN, isCollapse && rows.length);

        row.setState(TableStateTypesClassifier.CLOSE, !isCollapse && rows.length);

        rows.forEach(row => this._rowOpenOrCloseEachHandler(row, isRecursive, isCollapse));
    }
    
    /**
     * @private
     *
     * @description Implements handler for each row of the open or close method.
     *
     * @param { HTMLTableRowElement } row
     *
     * @param { boolean } isRecursive
     *
     * @param { boolean } isOpen
     *
     * @return { void }
     **/
    _rowOpenOrCloseEachHandler(row, isRecursive, isOpen)
    {
        const tableRow = this.getTableRow(row, TableSectionTypesClassifier.BODY);
        
        tableRow.setState(TableStateTypesClassifier.COLLAPSE, !isOpen);

        tableRow.setState(TableStateTypesClassifier.EXPAND, isOpen);

        if (!isRecursive)
        {
            return ;
        }

        this.rowOpenOrClose(tableRow, isRecursive, isOpen);
    }
    
    /**
     * @private
     *
     * @description Implements handler for the scroll event.
     *
     * @return { void }
     **/
    _scrollHandler()
    {
        this.customEvents.execute(TableEventTypesClassifier.TABLE_ELEMENT_SCROLL, this);
    }
    
    /**
     * @public
     *
     * @description Creates body cells by the given data.
     *
     * @param { Object[] } data
     *
     * @return { void }
     **/
    createBodyCells(data)
    {
        this.clear();
        
        if (isStructureEmpty(data))
        {
            this.createSystemRow('No results!');
            
            this.customEvents.execute(TableEventTypesClassifier.CREATE_BODY_CELLS, this);
            
            return ;
        }
        
        const fragment = document.createDocumentFragment();
        
        this._recursiveCreateBodyCells(data, fragment);
        
        this.body.append(fragment);
        
        this.customEvents.execute(TableEventTypesClassifier.CREATE_BODY_CELLS, this);
    }
    
    /**
     * @public
     *
     * @description Creates body cells and prepends to body.
     *
     * @param { Object[] } data
     *
     * @return { void }
     **/
    prependBodyCells(data)
    {
        const fragment = document.createDocumentFragment();
        
        this._recursiveCreateBodyCells(data, fragment);
        
        this.body.prepend(fragment);
    }
    
    /**
     * @public
     *
     * @description Implements processing for the total row and cells.
     *
     * @param { Object[] } records
     *
     * @return { void }
     **/
    totalProcessing(records)
    {
        const row = new TableRow(this.settings.rowSettings, TableSectionTypesClassifier.FOOT, TableRowTypesClassifier.TOTAL);
        
        for (let i = 0, n = this.settings.columns.length; i < n; i++)
        {
            const column = this.settings.columns[ i ];
            
            if (!this.isColumnRender(column))
            {
                continue ;
            }
            
            let total = column.isTotal ? this.totalValues.get(column.name) || 0 : '';
            
            const cell = new TableCell({ label: total, datum: column }, column.type, TableSectionTypesClassifier.FOOT);
            
            row.appendCell(cell.getElement());
        }
        
        this.footRows.push(row);
        
        this.foot.append(row.getElement());
    }
    
    /**
     * TODO: Needs adding attributes processing to TableRow class.
     *
     * TODO: Needs removing additionally arguments for the TableRow and TableCell classes.
     *
     * @private
     *
     * @description Implements recursive create cells and append it to the given fragment.
     *
     * @param { Array } records
     *
     * @param { DocumentFragment } fragment
     *
     * @param { number ? } level
     *
     * @param { number ? } parent_id
     *
     * @return { void }
     **/
    _recursiveCreateBodyCells(records, fragment, level = this.settings.levelInitial, parent_id)
    {
        for (let i = 0, n = records.length; i < n; i++)
        {
            const record = records[ i ];
            
            const row = this._createRow(level, record[ this.mainInstance.settings.treeIdKey ], parent_id, record);
            
            for (let j = 0, n = this.settings.columns.length; j < n; j++)
            {
                const column = this.settings.columns[ j ];
                
                if (!this.isColumnRender(column))
                {
                    continue ;
                }
                
                const cell = this._createBodyCell(column, record, level);
                
                row.appendCell(cell.element);
                
                row.addTableCell(cell);
            }
            
            if (this.hasActions())
            {
                const actionCell = this._createBodyActionCell(record);
                
                row.appendCell(actionCell.element);
                
                row.addTableCell(actionCell);
            }
            
            fragment.append(row.element);
            
            if (this.mainInstance.isTree() && !isStructureEmpty(record.tree))
            {
                this._recursiveCreateBodyCells(record.tree, fragment, level + 1, record[ this.mainInstance.settings.treeIdKey ]);
            }
        }
    }
    
    /**
     * @private
     *
     * @description Implements create a TableRow in body.
     *
     * @param { number } level
     *
     * @param { number } id
     *
     * @param { number } parent_id
     *
     * @param { Object } record
     *
     * @return { TableRow }
     **/
    _createRow(level, id, parent_id, record)
    {
        const row = new TableRow(this.settings.rowSettings, TableSectionTypesClassifier.BODY);
        
        row.setRecord(record);
        
        this._tableRowProcessing(row, level);
        
        if (this.settings.rowIdentifierColumnName)
        {
            row.setIdentifier(record[ this.settings.rowIdentifierColumnName ]);
        }
        
        if (this.mainInstance.isTree())
        {
            this._tableBodyRowTreeProcessing(row, level, id, parent_id, !isStructureEmpty(record.tree));
        }
        
        return row;
    }
    
    /**
     * @private
     *
     * @description Implements processing for the TableRow in body.
     *
     * @param { TableRow } row
     *
     * @param { number } level
     *
     * @return { void }
     **/
    _tableRowProcessing(row, level)
    {
        this.bodyRows.push(row);
        
        setAttribute(row.getElement(), this.settings.levelDataAttributeName, level.toString());
    }
    
    /**
     * @private
     *
     * @description Implements tree processing for the TableRow in the body.
     *
     * @param { TableRow } row
     *
     * @param { number } level
     *
     * @param { number } id
     *
     * @param { number } parent_id
     *
     * @param { boolean } hasTree
     *
     * @return { void }
     **/
    _tableBodyRowTreeProcessing(row, level, id, parent_id, hasTree)
    {
        row.setState(TableStateTypesClassifier.CLOSE, this.isDefaultCollapse() && hasTree);
        
        row.setState(TableStateTypesClassifier.OPEN, !this.isDefaultCollapse() && hasTree);
        
        row.setState(TableStateTypesClassifier.COLLAPSE, this.isDefaultCollapse() && !this.isLevelInitial(level));
        
        row.setState(TableStateTypesClassifier.EXPAND, !this.isDefaultCollapse() && !this.isLevelInitial(level));
        
        setAttribute(row.getElement(), this.settings.idDataAttribute, id.toString());
        
        if (isUndefined(parent_id))
        {
            return ;
        }
        
        setAttribute(row.getElement(), this.settings.parentIdDataAttribute, parent_id.toString());
    }
    
    /**
     * @private
     *
     * @description Implements create a TableCell in body.
     *
     * @param { TableElementColumn } column
     *
     * @param { Object } record
     *
     * @param { number } level
     *
     * @return { TableCell }
     **/
    _createBodyCell(column, record, level)
    {
        const label = structureValue(record, column.name);
        
        if (column.isTotal)
        {
            this.setTotalValue(column.name, label);
        }
        
        const cell = new TableCell(
            {
                label: label,
                columnName: column.name,
                isTreeOption: column.isTree && !isStructureEmpty(record.tree),
                isTreeColumn: column.isTree,
                labelsKey: column.labelsKey,
                labelsStatusType: column.labelsStatusType,
                dateFormat: column.dateFormat,
                isReverse: column.isReverse,
                whiteSpaceType: column.whiteSpaceType,
                styles: column.styles,
            }, column.type, TableSectionTypesClassifier.BODY);
        
        this.bodyCells.push(cell);
        
        if (this.mainInstance.isTree() && column.isTree)
        {
            this._tableBodyCellTreeProcessing(cell, level);
        }
        
        return cell;
    }
    
    /**
     * @public
     *
     * @description Accumulates the given value to total values by the given key.
     *
     * @param { string } key
     *
     * @param { number | string } value
     *
     * @return { void }
     **/
    setTotalValue(key, value)
    {
        if (isUndefined(this.totalValues.get(key)))
        {
            this.totalValues.set(key, 0);
        }
        
        this.totalValues.set(key, this.totalValues.get(key) + parseFloat(value));
    }
    
    /**
     * @private
     *
     * @description Implements tree processing for the TableCell in body.
     *
     * @param { TableCell } cell
     *
     * @param { number } level
     *
     * @return { void }
     **/
    _tableBodyCellTreeProcessing(cell, level)
    {
        setAttribute(cell.getElement(), 'style', `${ this.settings.levelStyleVariableName }: ${ level }`);
    }
    
    /**
     * @public
     *
     * @description Creates system row.
     *
     * @param { string } label - The label to the display in to cell.
     *
     * @return { void }
     **/
    createSystemRow(label)
    {
        this.clear();
        
        const row = new TableRow(this.settings.rowSettings, TableSectionTypesClassifier.BODY);
        
        const cell = new TableCell({ label: label, colspan: this.getTotalColumns() }, TableCellTypesClassifier.STRING, TableSectionTypesClassifier.BODY);
        
        cell.setState(TableStateTypesClassifier.SYSTEM, true);
        
        row.appendCell(cell.element);
        
        this.body.append(row.element);
    }
    
    /**
     * @public
     *
     * @description Clears all body rows.
     *
     * @return { void }
     **/
    clear()
    {
        clearArray(this.bodyRows);
        
        clearArray(this.bodyCells);
        
        clearArray(this.footRows);
        
        clearArray(this.footCells);
        
        this.totalValues.clear();
        
        this.body.innerHTML = '';
        
        this.foot.innerHTML = '';
    }
    
    /**
     * @public
     *
     * @description Finds and returns TableCell by the given cell element.
     *
     * @param { HTMLTableCellElement } cell
     *
     * @param { TableSectionTypesClassifier } sectionType
     *
     * @return { TableCell | undefined }
     **/
    getTableCell(cell, sectionType)
    {
        switch (sectionType)
        {
            case TableSectionTypesClassifier.HEAD:
            {
                return this.headCells.find(a => a.getElement() === cell);
            }
            case TableSectionTypesClassifier.BODY:
            {
                return this.bodyCells.find(a => a.getElement() === cell);
            }
        }
    }
    
    /**
     * @public
     *
     * @description Finds and returns TableRow by the given row element.
     *
     * @param { HTMLTableRowElement } row
     *
     * @param { TableSectionTypesClassifier } sectionType
     *
     * @return { TableRow | undefined }
     **/
    getTableRow(row, sectionType)
    {
        switch (sectionType)
        {
            case TableSectionTypesClassifier.BODY:
            {
                return this.bodyRows.find(a => a.getElement() === row);
            }
        }
    }
    
    /**
     * @public
     *
     * @description Finds and returns TableRow by the given cell element.
     *
     * @param { HTMLTableCellElement } cell
     *
     * @param { TableSectionTypesClassifier } sectionType
     *
     * @return { TableRow | undefined }
     **/
    getTableRowByCell(cell, sectionType)
    {
        switch (sectionType)
        {
            case TableSectionTypesClassifier.BODY:
            {
                const tableCell = this.getTableCell(cell, sectionType);
                
                if (!tableCell)
                {
                    return ;
                }
                
                return this.bodyRows.find(a => a.getElement() === this.getTableCell(cell, sectionType).getRow());
            }
        }
    }
    
    /**
     * @public
     *
     * @description Returns TableRow instance by the given identifier.
     *
     * @param { number } identifier
     *
     * @return { TableRow | undefined }
     **/
    getTableRowByIdentifier(identifier)
    {
        return this.bodyRows.find(a => a.identifier === identifier);
    }
    
    /**
     * @public
     *
     * @description Removes TableRow instance by the given identifier.
     *
     * @param { number } identifier
     *
     * @return { TableRow | undefined }
     **/
    removeTableRowByIdentifier(identifier)
    {
        const tableRow = this.getTableRowByIdentifier(identifier);
        
        const index = this.bodyRows.indexOf(tableRow);
        
        if (index < 0)
        {
            return ;
        }
        
        this.bodyRows.splice(index, 1);
        
        tableRow.remove();
    }
    
    /**
     * @protected
     *
     * @description Creates html node of the action body cell element.
     *
     * @param { Object } datum
     *
     * @return { TableCell }
     **/
    _createBodyActionCell(datum)
    {
        const action = new TableCell({ label: '', datum: datum, actions: this.settings.actions }, TableCellTypesClassifier.ACTION, TableSectionTypesClassifier.BODY);
        
        action.customEvents.subscribe(TableEventTypesClassifier.ACTION_BUTTON_CLICK, this._bodyActionButtonClickHandler.bind(this));
        
        return action;
    }
    
    /**
     * @protected
     *
     * @description Implements a 'body action button click' handler for the 'create body action cell' method.
     *
     * @param { PointerEvent } event
     *
     * @param { Button } button
     *
     * @param { TableCell } instance
     *
     * @return { void }
     **/
    _bodyActionButtonClickHandler(event, button, instance)
    {
        this.customEvents.execute(TableEventTypesClassifier.ACTION_BUTTON_CLICK, event, button, instance, this);
    }
    
    /**
     * @protected
     *
     * @description Creates html node of the action head cell element.
     *
     * @return { void }
     **/
    _createHeadActionCell()
    {
        const cell = new TableCell({ label: '' }, TableCellTypesClassifier.ACTION, TableSectionTypesClassifier.HEAD);
        
        this.headCells.push(cell);
    }
    
    /**
     * @protected
     *
     * @description Creates html node of the table  element.
     *
     * @return { HTMLTableElement }
     **/
    _createTable()
    {
        const nodes = [ this.body ];
        
        if (!isStructureEmpty(this.settings.columns))
        {
            nodes.unshift(this.head);
        }
        
        if (this.mainInstance.withTotal())
        {
            nodes.push(this.foot);
        }
        
        return createElement('table', { class: this.settings.tableClass }, nodes);
    }
    
    /**
     * @protected
     *
     * @description Creates html node of the element.
     *
     * @return { HTMLDivElement }
     **/
    _createElement()
    {
        return createElement('div', { class: this.settings.elementClass }, [ this.table ]);
    }
    
    /**
     * @protected
     *
     * @description Creates html node of the head element.
     *
     * @return { HTMLTableSectionElement }
     **/
    _createHead()
    {
        return createElement('thead', { class: this.settings.headClass });
    }
    
    /**
     * @protected
     *
     * @description Creates html node of the head element.
     *
     * @return { HTMLTableSectionElement }
     **/
    _createBody()
    {
        return createElement('tbody', { class: this.settings.bodyClass });
    }
    
    /**
     * @protected
     *
     * @description Creates html node of the head element.
     *
     * @return { HTMLTableSectionElement }
     **/
    _createFoot()
    {
        return createElement('tfoot', { class: this.settings.footClass });
    }
    
    /**
     * @public
     *
     * @description Determines whether actions list is not an empty.
     *
     * @return { boolean }
     **/
    hasActions()
    {
        return !isStructureEmpty(this.settings.actions);
    }
    
    /**
     * @public
     *
     * @description Returns total of the columns.
     *
     * @return { number }
     **/
    getTotalColumns()
    {
        let total = this.settings.columns.length;
        
        if (this.hasActions())
        {
            total += 1;
        }
        
        return total;
    }
    
    /**
     * @public
     *
     * @description Returns element.
     *
     * @return { HTMLDivElement }
     **/
    getElement()
    {
        return this.element;
    }
    
    /**
     * @public
     *
     * @description Returns dom rect of the element.
     *
     * @return { DOMRect }
     **/
    getRect()
    {
        return this.element.getBoundingClientRect();
    }
    
    /**
     * @public
     *
     * @description Returns table element.
     *
     * @return { HTMLTableElement }
     **/
    getTable()
    {
        return this.table;
    }
    
    /**
     * @public
     *
     * @description Returns dom rect of the table element.
     *
     * @return { DOMRect }
     **/
    getTableRect()
    {
        return this.table.getBoundingClientRect();
    }
    
    /**
     * @public
     *
     * @description Returns head element.
     *
     * @return { HTMLTableSectionElement }
     **/
    getHead()
    {
        return this.head;
    }
    
    /**
     * @public
     *
     * @description Returns dom rect of the head element.
     *
     * @return { DOMRect }
     **/
    getHeadRect()
    {
        return this.head.getBoundingClientRect();
    }
    
    /**
     * @public
     *
     * @description Returns body element.
     *
     * @return { HTMLTableSectionElement }
     **/
    getBody()
    {
        return this.body;
    }
    
    /**
     * @public
     *
     * @description Returns dom rect of the body element.
     *
     * @return { DOMRect }
     **/
    getBodyRect()
    {
        return this.body.getBoundingClientRect();
    }
    
    /**
     * @public
     *
     * @description Determines whether is default state is collapse.
     *
     * @return { boolean }
     **/
    isDefaultCollapse()
    {
        return this.settings.isDefaultCollapse;
    }
    
    /**
     * @public
     *
     * @description Determines whether the given level is an initial.
     *
     * @param { number } level
     *
     * @return { boolean }
     **/
    isLevelInitial(level)
    {
        return level === this.settings.levelInitial;
    }
    
    /**
     * @public
     *
     * @description Checks whether a given column should be rendered.
     *
     * @param { TableElementColumn } column
     *
     * @return { boolean }
     **/
    isColumnRender(column)
    {
        return this.mainInstance.tableToggleColumns.getCheckbox(column.name).isChecked;
    }
    
    /**
     * @public
     *
     * @description Implements collapse for all rows.
     *
     * @return { boolean }
     **/
    collapseAll()
    {
        this.getAllInitialLevelRows().forEach(row => this.rowOpenOrClose(row, true, false));
    }
    
    /**
     * @public
     *
     * @description Implements expand for all rows.
     *
     * @return { boolean }
     **/
    expandAll()
    {
        this.getAllInitialLevelRows().forEach(row => this.rowOpenOrClose(row, true, true));
    }
    
    /**
     * @public
     *
     * @description Returns all rows of the initial level.
     *
     * @return { NodeListOf[HTMLTableRowElement] }
     **/
    getAllInitialLevelRows()
    {
        return querySelector(`tr[${ this.settings.levelDataAttributeName }="${ this.settings.levelInitial }"]`, { isAll: true, root: this.getBody() });
    }
    
    /**
     * @public
     *
     * @description Returns all settings of columns.
     *
     * @return { Array<TableElementColumn> }
     **/
    getColumnSettings()
    {
        return this.settings.columns;
    }
}
