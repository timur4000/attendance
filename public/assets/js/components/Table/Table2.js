// import { querySelector }                    from '../../tea-modules/Functions/DOM/Queries/querySelector.js';
// import { TableSettings }                    from './Settings/TableSettings.js';
// import { TableLine }                        from './TableLine.js';
// import { TableLineTypesClassifier }         from './Standards/TableLineTypesClassifier.js';
// import { TableElement }                     from './TableElement.js';
// import { TablePositionsClassifier }         from './Standards/TablePositionsClassifier.js';
// import { TableText }                        from './TableText.js';
// import { TableSelect }                      from './TableSelect.js';
// import { TableEventTypesClassifier }        from './Standards/TableEventTypesClassifier.js';
// import { TableStateTypesClassifier }        from './Standards/TableStateTypesClassifier.js';
// import { sort }                             from '../../tea-modules/Functions/Arrays/sort.js';
// import { TablePagination }                  from './tablePagination.js';
// import { getAttribute }                     from '../../tea-modules/Functions/DOM/Attributes/getAttribute.js';
// import { CustomSelectEventTypesClassifier } from '../CustomSelect/CustomSelectEventTypesClassifier.js';
// import { HttpRequest }                      from '../../tea-modules/Classes/Requests/HttpRequest.js';
// import { TableInput }                       from './TableInput.js';
//
//
// /**
//  * @class
//  *
//  * @description Implements table component.
//  **/
// export class Table
// {
//     /**
//      * @public
//      *
//      * @type { HTMLElement }
//      **/
//     element;
//
//     /**
//      * @public
//      *
//      * @type { TableSettings }
//      **/
//     settings;
//
//     /**
//      * @public
//      *
//      * @type { TableLine }
//      **/
//     topLine;
//
//     /**
//      * @public
//      *
//      * @type { TableLine }
//      **/
//     middleLine;
//
//     /**
//      * @public
//      *
//      * @type { TableLine }
//      **/
//     bottomLine;
//
//     /**
//      * @public
//      *
//      * @type { TableElement }
//      **/
//     tableElement;
//
//     /**
//      * @public
//      *
//      * @type { TablePagination }
//      **/
//     pagination;
//
//     /**
//      * @public
//      *
//      * @type { TableText }
//      **/
//     showingText;
//
//     /**
//      * @public
//      *
//      * @type { TableText }
//      **/
//     totalText;
//
//     /**
//      * @public
//      *
//      * @type { TableSelect[] }
//      **/
//     selects = [];
//
//     /**
//      * @public
//      *
//      * @type { TableInput[] }
//      **/
//     inputs = [];
//
//     /**
//      * @public
//      *
//      * @type { TableSelect }
//      **/
//     limit;
//
//     /**
//      * @public
//      *
//      * @type { number }
//      **/
//     offset;
//
//     /**
//      * @public
//      *
//      * @type { Object<cell<TableCell>, direction<string>> }
//      **/
//     sortable = { cell: null, direction: 'asc' };
//
//     /**
//      * @public
//      *
//      * @type { TableInput }
//      **/
//     search;
//
//     /**
//      * @public
//      *
//      * @type { Object[] }
//      **/
//     _data = [];
//
//     /**
//      * @public
//      *
//      * @type { number }
//      **/
//     page = 1;
//
//     /**
//      * @constructor
//      *
//      * @param { HTMLElement | string } selector
//      *
//      * @param { TableSettingProperties } settings
//      *
//      * @return { Table }
//      **/
//     constructor(selector, settings)
//     {
//         this.element = querySelector(selector);
//
//         this.settings = new TableSettings(settings);
//
//         if (this.settings.withTopLine)
//         {
//             this.topLine = new TableLine(this.settings.lineSettings);
//         }
//
//         this.middleLine = new TableLine(this.settings.lineSettings, TableLineTypesClassifier.TABLE);
//
//         this.bottomLine = new TableLine(this.settings.lineSettings);
//
//         this.tableElement = new TableElement(this.settings.tableElement);
//
//         this.showingText = new TableText(this._getShowingTextProcessing(0, 0), this.settings.tableTextSettings);
//
//         this.totalText = new TableText(this._getTotalTextProcessing(0), this.settings.tableTextSettings);
//
//         this.offset = this.settings.offset;
//
//         console.log(this);
//     }
//
//     /**
//      * @public
//      *
//      * @async
//      *
//      * @description Implements initialize base methods and logic of the element.
//      *
//      * @return { void }
//      **/
//     async initialization()
//     {
//         this.tableElement.initialization();
//
//         this.tableElement.createSystemRow('Loading..');
//
//         // if (this.withPagination())
//         // {
//         //     this._createLimitsSelect();
//         // }
//
//         // if (this.withSearch())
//         // {
//         //     this._createSearchInputSettings();
//         // }
//
//         this._appendSelects();
//
//         // this._appendInputs();
//
//         this._appendTableElement();
//
//         // this._appendShowingText();
//
//         // this._appendTotalText();
//
//         this._appendLines();
//
//         // await this._dataProcessing();
//
//         if (this.withPagination())
//         {
//             this._paginationInitialize();
//
//             this._appendPagination();
//         }
//
//         // this._setEvents();
//
//         // this.tableElement.createBodyCells(this.getSliceData());
//     }
//
//     /**
//      * @private
//      *
//      * @async
//      *
//      * @description Implements logic with data of the settings.
//      *
//      * @return { void }
//      **/
//     async _dataProcessing()
//     {
//         // console.log(this.getLimit());
//
//         // console.log(this.pagination);
//
//         // this.settings.httpRequestSettings.data =
//         //     {
//         //         'limit': this.getLimit(),
//         //         'offset': this.getOffset(),
//         //     };
//
//         if (this.settings.httpRequestSettings)
//         {
//             this.settings.data = await this.getData();
//         }
//
//         this._dataClone();
//     }
//
//     /**
//      * @private
//      *
//      * @description Implements render and append pagination to lines.
//      *
//      * @return { void }
//      **/
//     _appendPagination()
//     {
//         this.pagination.render();
//
//         this.appendToLines(this.pagination.element, this.pagination.getPosition());
//     }
//
//     /**
//      * @private
//      *
//      * @description Implements handler for select item of the limits.
//      *
//      * @param { HTMLLIElement } item
//      *
//      * @param { CustomSelect } instance
//      *
//      * @returns { void }
//      **/
//     _limitsSelectItemHandler(item, instance)
//     {
//         const value = parseInt(this.limit.customSelect.getSelected().value);
//
//         this.pagination.setLimit(value);
//
//         this.pagination.render();
//
//         this.tableElement.createBodyCells(this.getSliceData());
//     }
//
//     /**
//      * @private
//      *
//      * @description Implements handler for the search input keyup event.
//      *
//      * @param { HTMLInputElement } input
//      *
//      * @param { TableInput } instance
//      *
//      * @returns { void }
//      **/
//     _searchInputKeyupHandler(input, instance)
//     {
//         this.tableElement.createBodyCells(this.getSliceData());
//     }
//
//     /**
//      * @private
//      *
//      * @description Implements handler for the pagination item click event.
//      *
//      * @param { HTMLLIElement } item
//      *
//      * @param { PointerEvent } event
//      *
//      * @param { TableElement } instance
//      *
//      * @return { void }
//      **/
//     _paginationClickHandler(item, event, instance)
//     {
//         event.preventDefault();
//
//         if (this.pagination.checkState(item, TableStateTypesClassifier.ACTIVE))
//         {
//             return ;
//         }
//
//         const page = parseInt(getAttribute(item, 'page', { isDataAttribute: true }));
//
//         this.pagination.setPage(page);
//
//         this.pagination.render();
//
//         this.tableElement.createBodyCells(this.getSliceData());
//     }
//
//     /**
//      * @protected
//      *
//      * @description Clones data property from data settings.
//      *
//      * @return { void }
//      **/
//     _dataClone()
//     {
//         this._data = structuredClone(this.settings.data);
//     }
//
//     /**
//      * @private
//      *
//      * @description Sets all possible events.
//      *
//      * @return { void }
//      **/
//     _setEvents()
//     {
//         this.tableElement.customEvents.subscribe(TableEventTypesClassifier.HEAD_CELL_CLICK, this._headCellClickHandler.bind(this));
//
//         this.tableElement.customEvents.subscribe(TableEventTypesClassifier.CREATE_BODY_CELLS, this._createBodyCellsHandler.bind(this));
//
//         if (this.withPagination())
//         {
//             this.pagination.customEvents.subscribe(TableEventTypesClassifier.PAGINATION_ITEM_CLICK, this._paginationClickHandler.bind(this));
//
//             this.limit.customSelect.customEvents.subscribe(CustomSelectEventTypesClassifier.SELECT_ITEM, this._limitsSelectItemHandler.bind(this));
//         }
//
//         if (this.withSearch())
//         {
//             this.search.customEvents.subscribe(TableEventTypesClassifier.GLOBAL_SEARCH_KEYUP, this._searchInputKeyupHandler.bind(this));
//         }
//     }
//
//     /**
//      * @private
//      *
//      * @description Implements handler for the body cells creating event.
//      *
//      * @param { TableElement } instance
//      *
//      * @returns { void }
//      **/
//     _createBodyCellsHandler(instance)
//     {
//         this._setShowing();
//
//         this._setTotalText();
//
//         this.pagination.update({ total: this.getTotal() });
//
//         this.pagination.render();
//     }
//
//     /**
//      * @public
//      *
//      * @description Implements handler for the head cell click event.
//      *
//      * @param { TableElement } instance
//      *
//      * @param { TableCell } cell
//      *
//      * @return { void }
//      **/
//     _headCellClickHandler(instance, cell)
//     {
//         if (cell.checkState(TableStateTypesClassifier.SORTABLE))
//         {
//             this._sortProcessing(cell);
//
//             this.tableElement.createBodyCells(this.getSliceData());
//         }
//     }
//
//     /**
//      * @private
//      *
//      * @description Implements processing sort of the given cell.
//      *
//      * @param { TableCell } cell
//      *
//      * @return { void }
//      **/
//     _sortProcessing(cell)
//     {
//         this.sortable.cell = cell;
//
//         if (cell.checkState(TableStateTypesClassifier.SORT_DESC))
//         {
//             cell.setState(TableStateTypesClassifier.SORT_ASC, false);
//             cell.setState(TableStateTypesClassifier.SORT_DESC, false);
//
//             this.sortable = { cell: null, direction: '' };
//         }
//         else if (cell.checkState(TableStateTypesClassifier.SORT_ASC))
//         {
//             cell.setState(TableStateTypesClassifier.SORT_ASC, false);
//             cell.setState(TableStateTypesClassifier.SORT_DESC, true);
//
//             this.sortable.direction = 'desc';
//         }
//         else
//         {
//             cell.setState(TableStateTypesClassifier.SORT_ASC, true);
//
//             this.sortable.direction = 'asc';
//         }
//     }
//
//     /**
//      * @private
//      *
//      * @description Implements base initialize of pagination element.
//      *
//      * @return { void }
//      **/
//     _paginationInitialize()
//     {
//         this.pagination = new TablePagination({ ...this.settings.paginationSettings, page: this.page, total: this.getTotal(), limit: this.getLimit() });
//
//         this.pagination.initialization();
//     }
//
//     /**
//      * @private
//      *
//      * @description Appends selects and initialize them.
//      *
//      * @return { void }
//      **/
//     _appendSelects()
//     {
//         for (let i = 0, n = this.selects.length; i < n; i++)
//         {
//             const select = this.selects[i];
//
//             this.appendToLines(select.element, select.settings.position);
//
//             select.initialization();
//         }
//     }
//
//     /**
//      * @private
//      *
//      * @description Creates limits select by limits property.
//      *
//      * @return { void }
//      **/
//     _createLimitsSelect()
//     {
//         /**
//          * @type { TableSelectOption[] }
//          **/
//         const options = [];
//
//         for (let i = 0, n = this.settings.limits.length; i < n; i++)
//         {
//             const limit = this.settings.limits[i];
//
//             options.push({ value: limit.toString(), text: limit.toString(), isSelected: i === 0 });
//         }
//
//         const select = new TableSelect({ elementName: 'limit', position: TablePositionsClassifier.TOP_LEFT, options: options, placeholder: 'Per page limit' });
//
//         this.limit = select;
//
//         this.selects.push(select);
//     }
//
//     /**
//      * @private
//      *
//      * @description Creates settings of the search input and placed then in table settings.
//      *
//      * @return { void }
//      **/
//     _createSearchInputSettings()
//     {
//         this.settings.inputs.push({ inputName: 'search', inputPlaceholder: 'Search..' });
//     }
//
//     /**
//      * @private
//      *
//      * @description Appends inputs and initialize them.
//      *
//      * @return { void }
//      **/
//     _appendInputs()
//     {
//         for (let i = 0, n = this.settings.inputs.length; i < n; i++)
//         {
//             const input = new TableInput(this.settings.inputs[i]);
//
//             if (this.settings.inputs[i].inputName === 'search')
//             {
//                 this.search = input;
//             }
//
//             this.inputs.push(input);
//
//             this.appendToLines(input.element, input.settings.position);
//
//             input.initialization();
//         }
//     }
//
//     /**
//      * @private
//      *
//      * @description Returns the processing text of showing text.
//      *
//      * @param { number } start
//      *
//      * @param { number } finish
//      *
//      * @return { string }
//      **/
//     _getShowingTextProcessing(start, finish)
//     {
//         return `From ${ start } to ${ finish }`;
//     }
//
//     /**
//      * @private
//      *
//      * @description Sets value to the showing text.
//      *
//      * @return { void }
//      **/
//     _setShowing()
//     {
//         this.showingText.appendValue(this._getShowingTextProcessing((this.getDataIndexTo() ? this.getDataIndexFrom() + 1 : 0), this.getDataIndexTo()));
//     }
//
//     /**
//      * @private
//      *
//      * @description Returns the processing text of total text.
//      *
//      * @param { number } total
//      *
//      * @return { string }
//      **/
//     _getTotalTextProcessing(total)
//     {
//         return `Total records: ${ total }`;
//     }
//
//     /**
//      * @private
//      *
//      * @description Sets value to the total text.
//      *
//      * @return { void }
//      **/
//     _setTotalText()
//     {
//         this.totalText.appendValue(this._getTotalTextProcessing(this.getTotal()));
//     }
//
//     /**
//      * @private
//      *
//      * @description Appends all lines to the element.
//      *
//      * @return { void }
//      **/
//     _appendLines()
//     {
//         const nodes = [ this.middleLine.element, this.bottomLine.element ];
//
//         if (this.topLine)
//         {
//             nodes.unshift(this.topLine.element);
//         }
//
//         this.element.append(...nodes);
//     }
//
//     /**
//      * @private
//      *
//      * @description Appends showing text to the line.
//      *
//      * @return { void }
//      **/
//     _appendShowingText()
//     {
//         this.appendToLines(this.showingText.element, TablePositionsClassifier.BOTTOM_LEFT);
//     }
//
//     /**
//      * @private
//      *
//      * @description Appends total text to the line.
//      *
//      * @return { void }
//      **/
//     _appendTotalText()
//     {
//         this.appendToLines(this.totalText.element, TablePositionsClassifier.BOTTOM_LEFT);
//     }
//
//     /**
//      * @private
//      *
//      * @description Appends table element to the element.
//      *
//      * @return { void }
//      **/
//     _appendTableElement()
//     {
//         this.appendToLines(this.tableElement.element, TablePositionsClassifier.MIDDLE);
//     }
//
//     /**
//      * @public
//      *
//      * @async
//      *
//      * @description Execute request to the given url, returns response.
//      *
//      * @return { any }
//      **/
//     async getData()
//     {
//         const request = new HttpRequest(this.settings.httpRequestSettings);
//
//         return await request.execute();
//     }
//
//     /**
//      * @public
//      *
//      * @description Returns slice array from the data property.
//      *
//      * @return { Object[] }
//      **/
//     getSliceData()
//     {
//         this._dataClone();
//
//         if (this.sortable.cell)
//         {
//             this._data = sort(this._data, this.sortable.direction, this.sortable.cell.settings.datum.name);
//         }
//
//         if (this.withSearch() && this.search.getValue())
//         {
//             this._data = this._data.filter(datum => Object.values(datum).toString().toLowerCase().includes(this.search.getValue().toLowerCase()));
//         }
//
//         return this._data.slice(this.getDataIndexFrom(), this.getDataIndexTo());
//     }
//
//     /**
//      * @public
//      *
//      * @description Returns the data index from which the selection begins.
//      *
//      * @return { number }
//      **/
//     getDataIndexFrom()
//     {
//         if (!this.withPagination())
//         {
//             return 0;
//         }
//
//         return (this.pagination.getPage() - 1) * this.pagination.getLimit();
//     }
//
//     /**
//      * @public
//      *
//      * @description Returns the data index to which the selection end.
//      *
//      * @return { number }
//      **/
//     getDataIndexTo()
//     {
//         if (!this.withPagination())
//         {
//             return this.getTotal();
//         }
//
//         const index = this.getDataIndexFrom() + this.pagination.getLimit();
//
//         if (index > this.getTotal())
//         {
//             return this.getTotal();
//         }
//
//         return index;
//     }
//
//     /**
//      * @public
//      *
//      * @description Appends the given element to lines by the given position.
//      *
//      * @param { Element } element
//      *
//      * @param { TablePositionsClassifier ? } position
//      *
//      * @return { void }
//      **/
//     appendToLines(element, position)
//     {
//         switch (position)
//         {
//             case TablePositionsClassifier.TOP_RIGHT:
//             {
//                 this.topLine.appendToRightColumn(element);
//
//                 break;
//             }
//             case TablePositionsClassifier.MIDDLE:
//             {
//                 this.middleLine.appendInner(element);
//
//                 break;
//             }
//             case TablePositionsClassifier.BOTTOM_LEFT:
//             {
//                 this.bottomLine.appendToLeftColumn(element);
//
//                 break;
//             }
//             case TablePositionsClassifier.BOTTOM_RIGHT:
//             {
//                 this.bottomLine.appendToRightColumn(element);
//
//                 break;
//             }
//             default:
//             {
//                 this.topLine.appendToLeftColumn(element);
//             }
//         }
//     }
//
//     /**
//      * @public
//      *
//      * @description Returns total of the data.
//      *
//      * @return { number }
//      **/
//     getTotal()
//     {
//         return this._data.length;
//     }
//
//     /**
//      * @public
//      *
//      * @description Returns limit for the rows.
//      *
//      * @return { number }
//      **/
//     getLimit()
//     {
//         return parseInt(this.limit.customSelect.getSelected().value);
//     }
//
//     /**
//      * @public
//      *
//      * @description Returns offset for the rows.
//      *
//      * @return { number }
//      **/
//     getOffset()
//     {
//         return this.offset;
//     }
//
//     /**
//      * @public
//      *
//      * @description Determines whether pagination is needed.
//      *
//      * @return { boolean }
//      **/
//     withPagination()
//     {
//         return this.settings.withPagination;
//     }
//
//     /**
//      * @public
//      *
//      * @description Determines whether search is needed.
//      *
//      * @return { boolean }
//      **/
//     withSearch()
//     {
//         return this.settings.withSearch;
//     }
// }
