import { TableSettings }                    from './Settings/TableSettings.js';
import { querySelector }                    from '../../tea-modules/Functions/DOM/Queries/querySelector.js';
import { TableLine }                        from './TableLine.js';
import { TableLineTypesClassifier }         from './Standards/TableLineTypesClassifier.js';
import { TablePositionsClassifier }         from './Standards/TablePositionsClassifier.js';
import { TableSelect }                      from './TableSelect.js';
import { TableInput }                       from './TableInput.js';
import { TableElement }                     from './TableElement.js';
import { HttpRequest }                      from '../../tea-modules/Classes/Requests/HttpRequest.js';
import { TablePagination }                  from './tablePagination.js';
import { TableEventTypesClassifier }        from './Standards/TableEventTypesClassifier.js';
import { CustomEvents }                     from '../../tea-modules/Classes/CustomEvents/CustomEvents.js';
import { CustomSelectEventTypesClassifier } from '../CustomSelect/CustomSelectEventTypesClassifier.js';
import { TableStateTypesClassifier }        from './Standards/TableStateTypesClassifier.js';
import { isStructureEmpty }                 from '../../tea-modules/Functions/Is/isStructureEmpty.js';
import { structureClone }                   from '../../tea-modules/Functions/Structures/structureClone.js';
import { TableText }                        from './TableText.js';
import { AirDatepickerOuter }               from '../AirDatepickerOuter/AirDatepickerOuter.js';
import { TableEars }                        from './TableEars/TableEars.js';
import { toTree }                           from '../../tea-modules/Functions/Arrays/toTree.js';
import { TableButton }                      from './TableButton.js';
import { ButtonEventsClassifier }           from '../Button/ButtonEventsClassifier.js';
import { TableHeading }                     from './TableHeading/TableHeading.js';
import { Button }                           from '../Button/Button.js';
import { structureMerge }                   from '../../tea-modules/Functions/Structures/structureMerge.js';
import { structureAssign }                  from '../../tea-modules/Functions/Structures/structureAssign.js';
import { playAudio }                        from '../../tea-modules/Functions/Audios/playAudio.js';
import { TableSessionNamesClassifier }      from './Standards/TableSessionNamesClassifier.js';
import { TableToggleColumns }               from './TableToggleColumns/TableToggleColumns.js';
import { multiSort }                        from '../../tea-modules/Functions/Arrays/multiSort.js';
import { TableExportManagerSettings }       from './TableExport/TableExportManager/TableExportManagerSettings.js';
import { TableExportManager }               from './TableExport/TableExportManager/TableExportManager.js';
import { LibraryChars }                     from '../../tea-modules/Classes/Standards/Chars/LibraryChars.js';
import { isUndefined }                      from '../../tea-modules/Functions/Is/isUndefined.js';
import { HttpRequestReadyStatesClassifier } from '../../tea-modules/Classes/Requests/Standards/HttpRequestReadyStatesClassifier.js';


export class Table
{
    /**
     * @typedef { Object } TableResponse
     *
     * @property { Object[] } data
     *
     * @property { Object } json
     *
     * @property { number } total
     **/
    
    /**
     * @public
     *
     * @type { CustomEvents }
     **/
    customEvents;
    
    /**
     * @public
     *
     * @type { TableSettings }
     **/
    settings;
    
    /**
     * @public
     *
     * @type { HTMLElement }
     **/
    element;
    
    /**
     * @public
     *
     * @type { TableLine }
     **/
    topLine;
    
    /**
     * @public
     *
     * @type { TableLine }
     **/
    middleLine;
    
    /**
     * @public
     *
     * @type { TableLine }
     **/
    bottomLine;
    
    /**
     * @public
     *
     * @type { TableSelect[] }
     **/
    selects = [];
    
    /**
     * @public
     *
     * @type { TableInput[] }
     **/
    inputs = [];
    
    /**
     * @public
     *
     * @type { TableButton[] }
     **/
    buttons = [];
    
    /**
     * @public
     *
     * @type { TableElement }
     **/
    tableElement;
    
    /**
     * @public
     *
     * @type { TablePagination }
     **/
    pagination;
    
    /**
     * @public
     *
     * @type { Object[] }
     **/
    records = [];
    
    /**
     * @public
     *
     * @type { Object[] }
     **/
    temporaryRecords = [];
    
    /**
     * @public
     *
     * @type { TableResponse }
     **/
    response;
    
    /**
     * @public
     *
     * @type { TableCell }
     **/
    sortableCell;
    
    /**
     * @public
     *
     * @type { Array<TableCell> }
     **/
    sortableCells = [];
    
    /**
     * @public
     *
     * @type { TableText }
     **/
    totalRecordsText;
    
    /**
     * @public
     *
     * @type { TableText }
     **/
    recordsSegmentText;
    
    /**
     * @public
     *
     * @type { boolean }
     **/
    toLoad = false;
    
    /**
     * @public
     *
     * @type { TableEars }
     **/
    tableEars;
    
    /**
     * @public
     *
     * @type { TableHeading }
     **/
    tableHeading;
    
    /**
     * @public
     *
     * @type { TableToggleColumns }
     **/
    tableToggleColumns;
    
    /**
     * @public
     *
     * @type { TableExportManager }
     **/
    tableExport;
    
    /**
     * @private
     *
     * @type { number }
     **/
    _postLoadingTimeout;
    
    /**
     * @private
     *
     * @type { HttpRequest }
     **/
    _mainHttpRequest;
    
    /**
     * @private
     *
     * @type { HttpRequest }
     **/
    _postLoadingHttpRequest;
    
    /**
     * @constructor
     *
     * @param { HTMLElement | string } selectors
     *
     * @param { TableSettingProperties } settings
     *
     * @return { Table }
     **/
    constructor(selectors, settings)
    {
        this.customEvents = new CustomEvents();
        
        this.settings = new TableSettings(settings);
        
        this.element = querySelector(selectors);
        
        this.topLine = new TableLine(this.settings.lineSettings);
        
        this.middleLine = new TableLine(this.settings.lineSettings, TableLineTypesClassifier.TABLE);
        
        this.bottomLine = new TableLine(this.settings.lineSettings);
        
        this.tableElement = new TableElement(this, this.settings.tableElementSettings);
        
        this.totalRecordsText = new TableText();
        
        this.recordsSegmentText = new TableText();
        
        this.tableEars = new TableEars(this, this.settings.tableEarsSettings);
        
        this._paginationInitialization();
    }
    
    /**
     * @public
     *
     * @description Implements initialize base logic.
     *
     * @return { void }
     **/
    async initialization()
    {
        this.setState(TableStateTypesClassifier.INIT, true);
        
        this._tableToggleColumnsInitializing();
        
        this._tableExportInitializing();
        
        this._selectsInitialization();
        
        await AirDatepickerOuter.load();
        
        this._setEventsToTableInputs();
        
        await this._inputsInitialization();
        
        this._buttonsInitialization();
        
        this._tableElementInitializing();
        
        this._tableEarsInitializing();
        
        this._tableHeadingInitializing();
        
        this._insertProcessing();
        
        this._setEvents();
        
        this.update();
        
        this.customEvents.execute(TableEventTypesClassifier.INITIAL, this);
    }
    
    /**
     * @private
     *
     * @description Implements inserts processing for the element.
     *
     * @return { void }
     **/
    _insertProcessing()
    {
        this.appendToLines(this.tableElement.element, TablePositionsClassifier.MIDDLE);
        
        if (this.withPagination())
        {
            this.appendToLines(this.pagination.element, this.pagination.getPosition());
        }
        
        this.appendToLines(this.recordsSegmentText.getElement(), this.totalRecordsText.getPosition());
        
        this.appendToLines(this.totalRecordsText.getElement(), this.totalRecordsText.getPosition());
        
        this._linesAppend();
    }
    
    /**
     * @private
     *
     * @description Implements append lines to the element.
     *
     * @return { void }
     **/
    _linesAppend()
    {
        if (this.settings.withTopLine)
        {
            this._append(this.topLine.element);
        }
        
        this._append(this.middleLine.element);
        
        this._append(this.bottomLine.element);
    }
    
    /**
     * @private
     *
     * @description Implements handler for the pagination item click event.
     *
     * @param { HTMLLIElement } item
     *
     * @param { number } page
     *
     * @param { PointerEvent } event
     *
     * @param { TablePagination } instance
     *
     * @return { void }
     **/
    _paginationItemClickHandler(item, page, event, instance)
    {
        this.update();
    }
    
    /**
     * @private
     *
     * @description Implements handler for the pagination item change event.
     *
     * @param { TablePagination } instance
     *
     * @return { void }
     **/
    _paginationItemChangeHandler(instance)
    {
        this.update();
    }
    
    /**
     * @private
     *
     * @description Implements handler for the request execute event.
     *
     * @return { void }
     **/
    _requestExecuteHandler()
    {
        this.toLoad = false;
    }
    
    /**
     * @private
     *
     * @description Sets all possible events.
     *
     * @return { void }
     **/
    _setEvents()
    {
        document.addEventListener('click', this._documentClickHandler.bind(this));
        
        this.pagination.customEvents.subscribe(TableEventTypesClassifier.PAGINATION_ITEM_CLICK, this._paginationItemClickHandler.bind(this));
        
        this.pagination.customEvents.subscribe(TableEventTypesClassifier.PAGINATION_ITEM_CHANGE, this._paginationItemChangeHandler.bind(this));
        
        this.customEvents.subscribe(TableEventTypesClassifier.REQUEST_EXECUTE, this._requestExecuteHandler.bind(this));
        
        this.tableElement.customEvents.subscribe(TableEventTypesClassifier.HEAD_CELL_CLICK, this._headCellClickHandler.bind(this));
        
        this.selects.forEach(select =>
        {
            select.customSelect.customEvents.subscribe(CustomSelectEventTypesClassifier.SELECT_ITEM, this._customSelectsChangeHandler.bind(this));
        });
        
        this.inputs.forEach(instance =>
        {
            instance.customEvents.subscribe(TableEventTypesClassifier.INPUT_KEYUP, this._inputKeyupHandler.bind(this));
        });
        
        this.tableElement.customEvents.subscribe(TableEventTypesClassifier.FILTER_INPUTS_KEYUP, this._tableElementFiltersKeyupHandler.bind(this));
        
        this.buttons.forEach(instance =>
        {
            instance.button.customEvents.subscribe(ButtonEventsClassifier.CLICK, this._buttonClickHandler.bind(this));
        });
        
        this.tableEars.customEvents.subscribe(TableEventTypesClassifier.EARS_SCROLL, this._tableEarsScrollHandler.bind(this));
        
        this.tableEars.customEvents.subscribe(TableEventTypesClassifier.EARS_RESIZE, this._tableEarsResizeHandler.bind(this));
        
        this.tableElement.customEvents.subscribe(TableEventTypesClassifier.TABLE_ELEMENT_SCROLL, this._tableElementScrollHandler.bind(this));
        
        this.tableElement.customEvents.subscribe(TableEventTypesClassifier.TABLE_ELEMENT_RESIZE, this._tableElementResizeHandler.bind(this));
        
        this.tableElement.customEvents.subscribe(TableEventTypesClassifier.ACTION_BUTTON_CLICK, this._tableElementActionButtonClickHandler.bind(this));
        
        this.tableToggleColumns.customEvents.subscribe(TableEventTypesClassifier.TOGGLE_COLUMNS_TOGGLE, this._tableToggleColumnsToggleHandler.bind(this));
        
        this.tableToggleColumns.customEvents.subscribe(TableEventTypesClassifier.TOGGLE_COLUMNS_CHANGE, this._tableToggleColumnsChangeHandler.bind(this));
        
        this.customEvents.subscribe(TableEventTypesClassifier.BEFORE_UPDATE, this._beforeUpdateHandler.bind(this));
        
        this.customEvents.subscribe(TableEventTypesClassifier.UPDATE, this._updateHandler.bind(this));
    }
    
    /**
     * @private
     *
     * @description Implements handler for the document click event.
     *
     * @param { MouseEvent } event
     *
     * @return { void }
     **/
    _documentClickHandler(event) {}
    
    /**
     * @private
     *
     * @description Implements handler for the action button click event.
     *
     * @param { PointerEvent } event
     *
     * @param { Button } button
     *
     * @param { TableCell } tableCell
     *
     * @param { TableElement } instance
     *
     * @return { void }
     **/
    _tableElementActionButtonClickHandler(event, button, tableCell, instance)
    {
        this.customEvents.execute(TableEventTypesClassifier.ACTION_BUTTON_CLICK, event, button, tableCell, instance, this);
    }
    
    /**
     * @private
     *
     * @description Implements a keyup handler for the CustomInput components of the TableElement component.
     *
     * @param { HTMLInputElement } input
     *
     * @param { CustomInput } customInput
     *
     * @param { TableElement } instance
     *
     * @return { void }
     **/
    _tableElementFiltersKeyupHandler(input, customInput, instance)
    {
        this.update();
    }
    
    /**
     * @private
     *
     * @description Implements handler for the table ears scroll event.
     *
     * @param { TableEars } instance
     *
     * @return { void }
     **/
    _tableEarsScrollHandler(instance)
    {
        this.tableEars.drawEars();
    }
    
    /**
     * @private
     *
     * @description Implements handler for the table ears resize event.
     *
     * @param { TableEars } instance
     *
     * @return { void }
     **/
    _tableEarsResizeHandler(instance)
    {
        // this.tableEars.drawEars();
    }
    
    /**
     * @private
     *
     * @description Implements handler for the table element scroll event.
     *
     * @param { TableElement } instance
     *
     * @return { void }
     **/
    _tableElementScrollHandler(instance)
    {
        this.tableEars.drawEars();
    }
    
    /**
     * @private
     *
     * @description Implements handler for the table element resize event.
     *
     * @param { ResizeObserverEntry[] } entries
     *
     * @param { TableElement } instance
     *
     * @return { void }
     **/
    _tableElementResizeHandler(entries, instance)
    {
        this.tableEars.drawEars();
    }
    
    /**
     * @private
     *
     * @description Implements handler for the table toggle columns toggle event.
     *
     * @param { HTMLInputElement } input
     *
     * @param { CustomCheckbox } customCheckbox
     *
     * @param { TableToggleColumns } instance
     *
     * @return { void }
     **/
    _tableToggleColumnsToggleHandler(input, customCheckbox, instance) {}
    
    /**
     * @private
     *
     * @description Implements handler for the table toggle columns change event.
     *
     * @param { Dropdown } dropdown
     *
     * @param { TableToggleColumns } instance
     *
     * @return { void }
     **/
    _tableToggleColumnsChangeHandler(dropdown, instance)
    {
        this.tableElement.headRowsUpdate();

        this.update();
    }
    
    /**
     * @private
     *
     * @description Implements setting events for the table inputs.
     *
     * @return { void }
     **/
    _setEventsToTableInputs()
    {
        // this.element.addEventListener('keyup', this._inputKeyupHandler.bind(this));
    }

    /**
     * @private
     *
     * @description Implements handler for the input keyup events.
     *
     * @param { HTMLInputElement } input
     *
     * @param { TableInput } instance
     *
     * @return { void }
     **/
    _inputKeyupHandler(input, instance)
    {
        this.update();
    }
    
    /**
     * @private
     *
     * @description Implements handler for the input input events.
     *
     * @param { HTMLInputElement } input
     *
     * @param { TableInput } instance
     *
     * @return { void }
     **/
    _inputInputHandler(input, instance)
    {
        this.update();
    }
    
    /**
     * @private
     *
     * @description Implements handler for the input keyup events.
     *
     * @param { PointerEvent } event
     *
     * @param { Button } instance
     *
     * @return { void }
     **/
    _buttonClickHandler(event, instance)
    {
        if (instance.getName() === 'table-collapse')
        {
            this.tableElement.collapseAll();
        }
        
        if (instance.getName() === 'table-expand')
        {
            this.tableElement.expandAll();
        }
        
        this.customEvents.execute(TableEventTypesClassifier.BUTTON_CLICK, instance, event, this);
    }
    
    /**
     * @private
     *
     * @description Implements handler for the head cells click event.
     *
     * @param { PointerEvent } event
     *
     * @param { TableElement } instance
     *
     * @param { TableCell } cell
     *
     * @return { void }
     **/
    _headCellClickHandler(event, instance, cell)
    {
        if (!cell.isSortable())
        {
            return ;
        }
        
        this._cellSortProcessing(cell, event.shiftKey);
    }
    
    /**
     * @private
     *
     * @description Implements the sorting process for a cell.
     *
     * @param { TableCell } cell
     *
     * @param { boolean ? } isMultiple
     *
     * @return { void }
     **/
    _cellSortProcessing(cell, isMultiple = false)
    {
        if (!isMultiple)
        {
            this._sortClearProcessing(cell);
        }
        
        if (!cell.isSort())
        {
            this.sortableCells.push(cell);
        }
        else if (cell.isSortDesc())
        {
            this._cellSortRemove(cell);
        }
        
        cell.sortStatesProcessing();
        
        this.update();
    }
    
    /**
     * @private
     *
     * @description Returns index of the given sortable cell.
     *
     * @param { TableCell } cell
     *
     * @return { number }
     **/
    _cellSortIndex(cell)
    {
        return this.sortableCells.findIndex(a => a === cell);
    }
    
    /**
     * @private
     *
     * @description Removes the given cell from the sortable cells.
     *
     * @param { TableCell } cell
     *
     * @return { number }
     **/
    _cellSortRemove(cell)
    {
        this.sortableCells.splice(this._cellSortIndex(cell), 1);
    }
    
    /**
     * @private
     *
     * @description Implements the sorting process for a records.
     *
     * @return { void }
     **/
    _sortProcessing()
    {
        if (this.isServerSide())
        {
            return ;
        }
        
        if (!isStructureEmpty(this.sortableCells))
        {
            if (isStructureEmpty(this.temporaryRecords))
            {
                this.temporaryRecords = structureClone(this.records);
            }
            
            this.records = multiSort(this.records, this.getSortableCells());
        }
        else if (!isStructureEmpty(this.temporaryRecords))
        {
            this.records = structureClone(this.temporaryRecords);
            
            this.temporaryRecords = undefined;
        }
    }
    
    /**
     * @private
     *
     * @description Implements clearing process of sorting cells.
     *
     * @param { TableCell } ignoreCell
     *
     * @return { void }
     **/
    _sortClearProcessing(ignoreCell)
    {
        if (isStructureEmpty(this.sortableCells))
        {
            return ;
        }
        
        for (let i = this.sortableCells.length - 1, n =  - 0; i >= n; i--)
        {
            const sortableCell = this.sortableCells[ i ];

            if (sortableCell === ignoreCell)
            {
                continue ;
            }

            sortableCell.sortStatesProcessing(false);
            
            this._cellSortRemove(sortableCell);
        }
    }
    
    /**
     * @private
     *
     * @description Implements handler for the custom selects change event.
     *
     * @param { HTMLLIElement } item
     *
     * @param { CustomSelect } instance
     **/
    _customSelectsChangeHandler(item, instance)
    {
        this.update();
    }
    
    /**
     * @public
     *
     * @async
     *
     * @description Updates component.
     *
     * @return { void }
     **/
    async update()
    {
        this.customEvents.execute(TableEventTypesClassifier.BEFORE_UPDATE, this);
        
        this.setState(TableStateTypesClassifier.LOADED, false);
        
        this.setState(TableStateTypesClassifier.LOADING, true);
        
        this.pagination.setState(TableStateTypesClassifier.DISABLED, true);
        
        this.tableElement.createSystemRow('Loading..');
        
        if (this.isLoadNeeded())
        {
            await this._requestProcessing();
        }
        
        if (this._mainHttpRequest.getReadyState() !== HttpRequestReadyStatesClassifier.DONE)
        {
            return ;
        }
        
        this._sortProcessing();
        
        this._paginationProcessing();
        
        this._textsProcessing();
        
        this.tableElement.createBodyCells(this.getRecords());
        
        if (this.withTotal())
        {
            this.tableElement.totalProcessing(this.getRecords());
        }
        
        this.tableEars.drawEars();
        
        this.pagination.setState(TableStateTypesClassifier.DISABLED, false);
        
        this.setState(TableStateTypesClassifier.LOADED, true);
        
        this.setState(TableStateTypesClassifier.LOADING, false);
        
        this.customEvents.execute(TableEventTypesClassifier.UPDATE, this);
    }
    
    /**
     * @private
     *
     * @description Launch timeout for post-loading.
     *
     * @return { void }
     **/
    _postLoadingLaunch()
    {
        clearTimeout(this._postLoadingTimeout);
        
        this._postLoadingTimeout = setTimeout(this._postLoadingIntervalHandler.bind(this), this.settings.postLoadingTimeout);
    }
    
    /**
     * @private
     *
     * @description Implements handler for the post-loading timeout callback.
     *
     * @return { void }
     **/
    _postLoadingIntervalHandler()
    {
        this._postLoadingProcessing();
    }
    
    /**
     * @private
     *
     * @description Clears the timeout and cancels the post-loading request.
     *
     * @return { void }
     **/
    _postLoadingClear()
    {
        clearTimeout(this._postLoadingTimeout);

        this._postLoadingHttpRequest && this._postLoadingHttpRequest.cancel();
    }
    
    /**
     * @private
     *
     * @description Implements process of the post-loading.
     *
     * @return { void }
     **/
    async _postLoadingProcessing()
    {
        const records = await this._postLoadingRequest();
        
        if (this._postLoadingHttpRequest.getReadyState() !== HttpRequestReadyStatesClassifier.DONE)
        {
            return ;
        }
        
        if (records && !isStructureEmpty(records.data))
        {
            if (this.isServerSide())
            {
                this.response.total += records.total;
            }
            
            if (this.isRecordsEmpty())
            {
                this.tableElement.clear();
            }
            
            this.tableElement.prependBodyCells(records.data);
            
            this.records.unshift(...records.data);
            
            this.updateTools();
            
            app.notifications.info('', [ 'New orders have arrived!' ]);
            
            playAudio('/assets/audios/pop-window-low-tone.mp3');
        }
        
        this._postLoadingLaunch();
    }
    
    /**
     * @private
     *
     * @description Returns new records.
     *
     * @return { Promise<Object> }
     **/
    async _postLoadingRequest()
    {
        const httpRequestSettings = structureAssign({}, this.settings.httpRequestSettings);

        httpRequestSettings.data[ this.settings.postLoadingServerKey ] = this.getMaxValueFromRecordsByColumnName(this.settings.postLoadingIdentifier);
        
        this._postLoadingHttpRequest = new HttpRequest(httpRequestSettings);
        
        return this._postLoadingHttpRequest.execute();
    }
    
    /**
     * @private
     *
     * @description Implements handler for the table before update event.
     *
     * @param { Table } instance
     *
     * @return { void }
     **/
    _beforeUpdateHandler(instance)
    {
        this.withPostLoading() && this._postLoadingClear();
    }
    
    /**
     * @private
     *
     * @description Implements handler for the table update event.
     *
     * @param { Table } instance
     *
     * @return { void }
     **/
    _updateHandler(instance)
    {
        this.withPostLoading() && this._postLoadingLaunch();
    }
    
    /**
     * @public
     *
     * @description Updates tools of component.
     *
     * @return { void }
     **/
    updateTools()
    {
        this._textsProcessing();
        
        this._paginationProcessing();
        
        this.tableEars.drawEars();
    }
    
    /**
     * @private
     *
     * @description Implements initialize of the pagination component.
     *
     * @return { void }
     **/
    _paginationInitialization()
    {
        this.pagination = new TablePagination({ total: 0, limit: 0, page: 1 }, this);
        
        this.pagination.initialization();
    }
    
    /**
     * @private
     *
     * @description Implements processing for the pagination.
     *
     * @return { void }
     **/
    _paginationProcessing()
    {
        this.pagination.update({ total: this.getTotal(), limit: this.getLimit() });
        
        this.pagination.render();
    }
    
    /**
     * @private
     *
     * @description Implements processing for the text components.
     *
     * @return { void }
     **/
    _textsProcessing()
    {
        this.totalRecordsText.appendValue(this._getTotalRecordsText());
        
        this.recordsSegmentText.appendValue(this._getRecordsSegmentText());
    }
    
    /**
     * @private
     *
     * @description Implements initializing for the table element.
     *
     * @return { void }
     **/
    _tableElementInitializing()
    {
        this.tableElement.initialization();
    }
    
    /**
     * @private
     *
     * @description Implements initializing for the table ears element.
     *
     * @return { void }
     **/
    _tableEarsInitializing()
    {
        this.tableEars.initialization();
        
        this.appendToLines(this.tableEars.getEars(), TablePositionsClassifier.MIDDLE);
    }
    
    /**
     * @private
     *
     * @description Implements initializing for the table toggle columns element.
     *
     * @return { void }
     **/
    _tableToggleColumnsInitializing()
    {
        if (!this.settings.toggleColumns)
        {
            return ;
        }
        
        this.tableToggleColumns = new TableToggleColumns(this.settings.toggleColumnsSettings);
        
        this.tableToggleColumns.tableInstance = this;
        
        this.appendToLines(this.tableToggleColumns.button.getElement(), this.tableToggleColumns.settings.tablePosition);
        
        this.tableToggleColumns.initialization();
    }
    
    /**
     * @private
     *
     * @description Implements initializing for the table export.
     *
     * @return { void }
     **/
    _tableExportInitializing()
    {
        if (!this.settings.withTableExport)
        {
            return ;
        }
     
        const tableExportManagerSettings = new TableExportManagerSettings(this.settings.tableExportSettings);
        
        this.tableExport = new TableExportManager(tableExportManagerSettings);
        
        this.tableExport.setTable(this);
        
        this.tableExport.initialization();
    }
    
    /**
     * @private
     *
     * @description Implements initializing for the table heading element.
     *
     * @return { void }
     **/
    _tableHeadingInitializing()
    {
        if (!this.settings.tableHeadingSettings)
        {
            return ;
        }
        
        this.tableHeading = new TableHeading(this.settings.tableHeadingSettings);
        
        this.appendToLines(this.tableHeading.getDomElement(), this.settings.tableHeadingSettings.position);
    }
    
    /**
     * @private
     *
     * @async
     *
     * @description Implements request to the server and saves response.
     *
     * @return { void }
     **/
    async _requestProcessing()
    {
        if (this._mainHttpRequest && this._mainHttpRequest.getReadyState() !== HttpRequestReadyStatesClassifier.DONE)
        {
            this._mainHttpRequest.cancel();
        }
        
        this._httpRequestProcessing();
        
        this._mainHttpRequest = new HttpRequest(this.settings.httpRequestSettings);
        
        this.customEvents.execute(TableEventTypesClassifier.BEFORE_REQUEST_EXECUTE);
        
        this.response = await this._mainHttpRequest.execute();
        
        this.records = this.response.data;
        
        this.customEvents.execute(TableEventTypesClassifier.REQUEST_EXECUTE);
    }
    
    /**
     * @private
     *
     * @description Implements processing for the http request.
     *
     * @return { void }
     **/
    _httpRequestProcessing()
    {
        if (isUndefined(this.settings.httpRequestSettings.data))
        {
            this.settings.httpRequestSettings.data = {};
        }
        
        this.customEvents.execute(TableEventTypesClassifier.REQUEST_PROCESSING, this.settings.httpRequestSettings, this);
        
        if (this.isServerSide())
        {
            this._selectsProcessing();
            
            this._inputsProcessing();
            
            this._filtersProcessing();
            
            if (this.withPagination())
            {
                this.settings.httpRequestSettings.data.limit = this.getLimit();
                
                this.settings.httpRequestSettings.data.offset = this.getOffset();
            }
            
            this.settings.httpRequestSettings.data.order_by = this.getSortableCells();
        }
        
        this.customEvents.execute(TableEventTypesClassifier.AFTER_REQUEST_PROCESSING, this.settings.httpRequestSettings, this);
    }
    
    /**
     * @private
     *
     * @description Implements process with the custom selects.
     *
     * @return { void }
     **/
    _selectsProcessing()
    {
        for (let i = 0, n = this.getSelects().length; i < n; i++)
        {
            const select = this.getSelects()[ i ];
            
            if (!select.customSelect.getSelected() || select.customSelect.getName() === 'limit')
            {
                continue ;
            }
            
            this.settings.httpRequestSettings.data[ select.customSelect.getName() ] = select.customSelect.getSelected().value;
        }
    }
    
    /**
     * @private
     *
     * @description Implements process with the inputs.
     *
     * @return { void }
     **/
    _inputsProcessing()
    {
        for (let i = 0, n = this.getInputs().length; i < n; i++)
        {
            const instance = this.getInputs()[ i ];
            
            if (instance.hasEditing)
            {
                this.settings.httpRequestSettings.data[ instance.getName() ] = instance.getValue();
                
                continue ;
            }
            
            delete this.settings.httpRequestSettings.data[ instance.getName() ];
        }
    }
    
    /**
     * @private
     *
     * @description Implements process with the filters.
     *
     * @return { void }
     **/
    _filtersProcessing()
    {
        for (let i = 0, n = this.tableElement.getColumnSettings().length; i < n; i++)
        {
            const columnSetting = this.tableElement.getColumnSettings()[ i ];
            
            if (!columnSetting.isFilter)
            {
                continue ;
            }
            
            const instance = this.getFilterByName(columnSetting.name);
            
            if (!isUndefined(instance) && instance.getValue())
            {
                this.settings.httpRequestSettings.data[ columnSetting.name ] = instance.getValue();
                
                continue ;
            }
            
            delete this.settings.httpRequestSettings.data[ columnSetting.name ];
        }
    }
    
    /**
     * @private
     *
     * @description Implements initialize for the selects.
     *
     * @return { void }
     **/
    _selectsInitialization()
    {
        for (let i = 0, n = this.settings.selects.length; i < n; i++)
        {
            const value = this.settings.selects[i];
            
            if (!value.customSelectSettings)
            {
                value.customSelectSettings = {};
            }
            
            value.customSelectSettings.isStorage = true;
            
            if (!value.customSelectSettings.id)
            {
                value.customSelectSettings.id = TableSessionNamesClassifier.PER_PAGE;
            }
            
            if (value.customSelectSettings.id)
            {
                value.customSelectSettings.id = value.customSelectSettings.id.replace(/%TABLE_NAME%/, this.settings.httpRequestSettings.url);
            }
            
            const instance = new TableSelect(value);
            
            this.selects.push(instance);
            
            if (value.elementName !== 'limit' || value.elementName === 'limit' && this.withLimitSelect())
            {
                this.appendToLines(instance.element, value.position);
            }
            
            instance.initialization();
        }
    }
    
    /**
     * @private
     *
     * @description Implements initialize for the inputs.
     *
     * @return { void }
     **/
    async _inputsInitialization()
    {
        for (let i = 0, n = this.settings.inputs.length; i < n; i++)
        {
            const value = this.settings.inputs[i];
            
            if (!this.withInputSearch() && value.inputName === 'global-search')
            {
                continue ;
            }
            
            const instance = new TableInput(value);
            
            this.inputs.push(instance);
            
            this.appendToLines(instance.element, value.position);
            
            await instance.initialization();
        }
    }
    
    /**
     * @private
     *
     * @description Implements initialize for the buttons.
     *
     * @return { void }
     **/
    _buttonsInitialization()
    {
        for (let i = 0, n = this.settings.buttons.length; i < n; i++)
        {
            const value = this.settings.buttons[ i ];
            
            if ((!this.isTree() || !this.withExpandCollapseButtons()) && [ 'table-collapse', 'table-expand' ].includes(value.buttonSettings.elementName))
            {
                continue ;
            }

            const button = new TableButton(value);

            this.buttons.push(button);
            
            this.appendToLines(button.getElement(), button.getPosition());
        }
    }
    
    /**
     * @private
     *
     * @description Implements appends the given element to the element.
     *
     * @param { Element } element
     *
     * @return { void }
     **/
    _append(element)
    {
        this.element.append(element);
    }
    
    /**
     * @private
     *
     * @description Returns text for the total records text.
     *
     * @return { string }
     **/
    _getTotalRecordsText()
    {
        return `Records: ${ this.getTotal() }`;
    }
    
    /**
     * @private
     *
     * @description Returns text for the records segment text.
     *
     * @return { string }
     **/
    _getRecordsSegmentText()
    {
        return `From ${ this._getOffsetOfRecordsSegment() } to ${ this._getLimitOfRecordsSegment() }`;
    }
    
    /**
     * @private
     *
     * @description Returns segment text of the limit value.
     *
     * @return { number }
     **/
    _getLimitOfRecordsSegment()
    {
        let value = this.getLimit() * this.pagination.getPage();
        
        if (!this.withPagination() || value > this.getTotal())
        {
            value = this.getTotal();
        }
        
        if (this.isRecordsEmpty())
        {
            value = 0;
        }
        
        return value;
    }
    
    /**
     * @private
     *
     * @description Returns segment text of the offset value.
     *
     * @return { number }
     **/
    _getOffsetOfRecordsSegment()
    {
        let value = this.getOffset();
        
        if (value === 0)
        {
            value = 1;
        }
        
        return value;
    }
    
    /**
     * @public
     *
     * @description Returns object of the sortable cells.
     *
     * @return { Array<{ name: string, direction: ('asc' | 'desc') }> }
     **/
    getSortableCells()
    {
        return this.sortableCells.map(a => ({ name: a.settings.datum.name, direction: a.sortDirection }));
    }
    
    /**
     * @public
     *
     * @description Appends the given element to lines by the given position.
     *
     * @param { Element | DocumentFragment } element
     *
     * @param { TablePositionsClassifier ? } position
     *
     * @return { void }
     **/
    appendToLines(element, position)
    {
        switch (position)
        {
            case TablePositionsClassifier.TOP_RIGHT:
            {
                this.topLine.appendToRightColumn(element);
                
                break;
            }
            case TablePositionsClassifier.MIDDLE:
            {
                this.middleLine.appendInner(element);
                
                break;
            }
            case TablePositionsClassifier.BOTTOM_LEFT:
            {
                this.bottomLine.appendToLeftColumn(element);
                
                break;
            }
            case TablePositionsClassifier.BOTTOM_RIGHT:
            {
                this.bottomLine.appendToRightColumn(element);
                
                break;
            }
            default:
            {
                this.topLine.appendToLeftColumn(element);
            }
        }
    }
    
    /**
     * @public
     *
     * @description Returns select instance by the given name.
     *
     * @param { string } name
     *
     * @return { TableSelect }
     **/
    getSelect(name)
    {
        return this.selects.find(a => a.settings.elementName === name);
    }
    
    /**
     * @public
     *
     * @description Returns all select instances.
     *
     * @return { TableSelect[] }
     **/
    getSelects()
    {
        return this.selects;
    }
    
    /**
     * @public
     *
     * @description Returns input instance by the given name.
     *
     * @param { string } name
     *
     * @return { TableInput }
     **/
    getInput(name)
    {
        return this.inputs.find(a => a.settings.inputName === name);
    }
    
    /**
     * @public
     *
     * @description Returns all input instances.
     *
     * @return { TableInput[] }
     **/
    getInputs()
    {
        return this.inputs;
    }
    
    /**
     * @public
     *
     * @description Returns all filter instances.
     *
     * @return { CustomInput[] }
     **/
    getFilters()
    {
        return this.tableElement.headFilters;
    }
    
    /**
     * @public
     *
     * @description Returns filter instance by the specified name.
     *
     * @param { string } name
     *
     * @return { CustomInput }
     **/
    getFilterByName(name)
    {
        return this.tableElement.headFilters.find(headFilter => headFilter.getName() === name);
    }
    
    /**
     * @public
     *
     * @description Returns button instance by the given name.
     *
     * @param { string } name
     *
     * @return { TableButton }
     **/
    getButton(name)
    {
        return this.buttons.find(a => a.getName() === name);
    }
    
    /**
     * @public
     *
     * @description Returns all button instances.
     *
     * @return { TableButton[] }
     **/
    getButtons()
    {
        return this.buttons;
    }
    
    /**
     * @public
     *
     * @description Returns all records to displaying.
     *
     * @return { Array<Object> }
     **/
    getRecords()
    {
        let records;
        
        if (this.isServerSide())
        {
            records = this.records;
        }
        else
        {
            records = this.records.slice(this.getStart(), this.getEnd());
        }
        
        if (this.isTree())
        {
            return toTree(records, this.settings.treeIdKey, this.settings.treeParentIdKey);
        }
        
        return records;
    }
    
    /**
     * @public
     *
     * @description Returns first record. If isDisplaying equal true - returns first record from records to displaying.
     *
     * @return { Object | null }
     **/
    getFirstRecord(isDisplaying = false)
    {
        const records = isDisplaying ? this.getRecords() : this.records;
        
        return records[ 0 ] ?? null;
    }
    
    /**
     * @public
     *
     * @description Returns record by the given identifier.
     *
     * @return { Object | undefined }
     **/
    getRecordByIdentifier(identifier)
    {
        return this.records.find(a => a[ this.tableElement.settings.rowIdentifierColumnName ] === identifier);
    }
    
    /**
     * @public
     *
     * @description Returns record index by the given identifier.
     *
     * @return { Object | undefined }
     **/
    getRecordIndexByIdentifier(identifier)
    {
        return this.records.findIndex(a => a[ this.tableElement.settings.rowIdentifierColumnName ] === identifier);
    }
    
    /**
     * @public
     *
     * @description Removes record by the given identifier.
     *
     * @param { number } identifier
     *
     * @return { Object[] | null }
     **/
    removeRecordByIdentifier(identifier)
    {
        const index = this.getRecordIndexByIdentifier(identifier);
        
        if (index < 0)
        {
            return null;
        }
        
        if (this.isServerSide())
        {
            this.response.total -= 1;
        }
        
        const record = this.records.splice(index, 1);
        
        if (this.isRecordsEmpty())
        {
            this.update();
        }
        
        return record;
    }
    
    /**
     * @public
     *
     * @description Updates record by the given identifier.
     *
     * @param { number } identifier
     *
     * @param { Object } record
     *
     * @return { void }
     **/
    updateRecordByIdentifier(identifier, record)
    {
        const tableRow = this.tableElement.getTableRowByIdentifier(identifier);
        
        if (!tableRow)
        {
            return ;
        }
        
        structureMerge(this.getRecordByIdentifier(identifier), record);
        
        tableRow.update(record);
    }
    
    /**
     * @public
     *
     * @description Returns max value from records by the given column name.
     *
     * @param { string } columnName
     *
     * @return { number }
     **/
    getMaxValueFromRecordsByColumnName(columnName)
    {
        if (this.isRecordsEmpty())
        {
            return 0;
        }
        
        return this.records.reduce((previousValue, currentValue) => currentValue[ columnName ] > previousValue ? currentValue[ columnName ] : previousValue, 0);
    }
    
    /**
     * @public
     *
     * @description Returns start position of slice.
     *
     * @return { number }
     **/
    getStart()
    {
        return this.getOffset();
    }
    
    /**
     * @public
     *
     * @description Returns end position of slice.
     *
     * @return { number }
     **/
    getEnd()
    {
        let value = this.getLimit();

        if (!this.withPagination())
        {
            value = this.getTotal();
        }
        
        if (this.pagination.getPage() > 1)
        {
            value += this.getStart();
        }
        
        return value;
    }
    
    /**
     * @public
     *
     * @description Returns total records.
     *
     * @return { number }
     **/
    getTotal()
    {
        if (this.isDataLoaded())
        {
            if (!this.isServerSide())
            {
                return this.records.length;
            }
            
            return this.response.total ?? this.getRecords().length;
        }
        
        return 0;
    }
    
    /**
     * @public
     *
     * @description Returns offset.
     *
     * @return { number }
     **/
    getOffset()
    {
        return (this.pagination.getPage() - 1) * this.getLimit();
    }
    
    /**
     * @public
     *
     * @description Returns limit.
     *
     * @return { number }
     **/
    getLimit()
    {
        return parseInt(this.getSelect('limit').customSelect.getSelected().value);
    }
    
    /**
     * @public
     *
     * @description Checks whether data is accepted from the server.
     *
     * @return { boolean }
     **/
    isServerSide()
    {
        return this.settings.isServerSide;
    }
    
    /**
     * @public
     *
     * @description Checks whether the data has been loaded;
     *
     * @return { boolean }
     **/
    isDataLoaded()
    {
        return !isStructureEmpty(this.response);
    }
    
    /**
     * @public
     *
     * @description Checks if the records is an empty;
     *
     * @return { boolean }
     **/
    isRecordsEmpty()
    {
        return isStructureEmpty(this.records);
    }
    
    /**
     * @public
     *
     * @description Checks whether load is needed;
     *
     * @return { boolean }
     **/
    isLoadNeeded()
    {
        return !this.isServerSide() && !this.isDataLoaded() || this.isServerSide();
    }
    
    /**
     * @public
     *
     * @description Determines whether input search is needed.
     *
     * @return { boolean }
     **/
    withInputSearch()
    {
        return this.settings.withInputSearch;
    }
    
    /**
     * @public
     *
     * @description Determines whether limit select is needed.
     *
     * @return { boolean }
     **/
    withLimitSelect()
    {
        return this.withPagination();
    }
    
    /**
     * @public
     *
     * @description Determines whether pagination is needed.
     *
     * @return { boolean }
     **/
    withPagination()
    {
        return this.settings.withPagination;
    }
    
    /**
     * @public
     *
     * @description Checks if the data is tree.
     *
     * @return { boolean }
     **/
    isTree()
    {
        return this.settings.isTree;
    }
    
    /**
     * @public
     *
     * @description Sets the given state to the element by the given force.
     *
     * @param { TableStateTypesClassifier } state
     *
     * @param { boolean } force
     *
     * @return { void }
     **/
    setState(state, force)
    {
        this.element.classList.toggle(state, force);
    }
    
    /**
     * @public
     *
     * @description Checks if the element contains a given state.
     *
     * @param { TableStateTypesClassifier } state
     *
     * @return { boolean }
     **/
    checkState(state)
    {
        return this.element.classList.contains(state);
    }
    
    /**
     * @public
     *
     * @description Determines whether expand/collapse buttons is needed.
     *
     * @return { boolean }
     **/
    withExpandCollapseButtons()
    {
        return this.settings.withExpandCollapseButtons;
    }
    
    /**
     * @public
     *
     * @description Determines whether total row is needed.
     *
     * @return { boolean }
     **/
    withTotal()
    {
        return this.settings.withTotal;
    }
    
    /**
     * @public
     *
     * @description Determines whether post-loading is needed.
     *
     * @return { boolean }
     **/
    withPostLoading()
    {
        return this.settings.withPostLoading;
    }
    
    /**
     * @public
     *
     * @description Checks if the component is init.
     *
     * @return { boolean }
     **/
    isInit()
    {
        return this.checkState(TableStateTypesClassifier.INIT);
    }
    
    /**
     * @public
     *
     * @description Returns the id of the current table if it exists, otherwise returns url.
     *
     * @return { string }
     **/
    getId()
    {
        return this.settings.id || this.settings.httpRequestSettings.url;
    }
    
    /**
     * @public
     *
     * @description Converts columns names to a string and then returns.
     *
     * @param { boolean } onlyDisplayed
     *
     * @return { string }
     **/
    getColumnNamesAsString(onlyDisplayed = false)
    {
        return this.tableElement.getColumnSettings().reduce((previousValue, currentValue) =>
        {
            if (onlyDisplayed && !this.tableToggleColumns.getCheckbox(currentValue.name).isChecked)
            {
                return previousValue;
            }
            
            return previousValue ? previousValue + LibraryChars.stringSeparator + currentValue.name : currentValue.name;
        }, '');
    }
    
    /**
     * @public
     *
     * @description Returns settings of the http request.
     *
     * @return { HttpRequestSettingProperties }
     **/
    getHttpRequestSettings()
    {
        return this.settings.httpRequestSettings;
    }
    
    /**
     * @public
     *
     * @description Resets pagination.
     *
     * @return { void }
     **/
    resetPagination()
    {
        if (!this.withPagination())
        {
            return ;
        }
        
        this.pagination.setPage(1);
    }
}
