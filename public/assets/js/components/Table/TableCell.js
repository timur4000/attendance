import { TableCellSettings } from './Settings/TableCellSettings.js';
import { createElement }     from '../../tea-modules/Functions/DOM/Elements/createElement.js';
import { TableSectionTypesClassifier } from './Standards/TableSectionTypesClassifier.js';
import { TableCellTypesClassifier } from './Standards/TableCellTypesClassifier.js';
import { convertToHtml } from '../../tea-modules/Functions/Convertations/convertToHtml.js';
import { createSvgElement } from '../../tea-modules/Functions/DOM/Elements/createSvgElement.js';
import { TableStateTypesClassifier } from './Standards/TableStateTypesClassifier.js';
import { TableButton } from './TableButton.js';
import { TableStatusTypesClassifier } from './Standards/TableStatusTypesClassifier.js';
import { TableLabel } from './TableLabel.js';
import { isEmpty } from '../../tea-modules/Functions/Is/isEmpty.js';
import { TableCellOptionClassesClassifier } from './Standards/TableCellOptionClassesClassifier.js';
import { isArray } from '../../tea-modules/Functions/Is/isArray.js';
import { TableLabelTypesClassifier } from './Standards/TableLabelTypesClassifier.js';
import { DateManager }   from '../../tea-modules/Classes/Dates/DateManager.js';
import { CustomInput }         from '../Inputs/CustomInput.js';
import { CustomInputSettings } from '../Inputs/CustomInputSettings.js';
import { ButtonEventsClassifier } from '../Button/ButtonEventsClassifier.js';
import { CustomEvents } from '../../tea-modules/Classes/CustomEvents/CustomEvents.js';
import { TableEventTypesClassifier } from './Standards/TableEventTypesClassifier.js';
import { TableCellWhiteSpaceTypesClassifier } from './Standards/TableCellWhiteSpaceTypesClassifier.js';


/**
 * @class
 *
 * @description Implements logic of the table cell element.
 **/
export class TableCell
{
    /**
     * @public
     *
     * @type { CustomEvents }
     **/
    customEvents;
    
    /**
     * @public
     *
     * @type { TableCellSettings }
     **/
    settings;
    
    /**
     * @public
     *
     * @type { TableCellTypesClassifier }
     **/
    type;
    
    /**
     * @public
     *
     * @type { TableSectionTypesClassifier }
     **/
    sectionType;
    
    /**
     * @public
     *
     * @type { HTMLTableCellElement }
     **/
    element;
    
    /**
     * @public
     *
     * @type { 'asc' | 'desc' }
     **/
    sortDirection;
    
    /**
     * @public
     *
     * @type { boolean }
     **/
    isInitialized = false;
    
    /**
     * @public
     *
     * @type { CustomInput }
     **/
    customInput;
    
    /**
     * @constructor
     *
     * @param { TableCellSettingProperties ? } settings
     *
     * @param { TableCellTypesClassifier } type
     *
     * @param { TableSectionTypesClassifier } sectionType
     **/
    constructor(settings, type, sectionType)
    {
        this.customEvents = new CustomEvents();
        
        this.settings = new TableCellSettings(settings);
        
        this.type = type;
        
        this.sectionType = sectionType;
        
        this.element = this._createElement();
        
        this.setState(type, true);
        
        this.setState(sectionType, true);
        
        this.setState(TableCellOptionClassesClassifier.TREE_COLUMN, !!this.settings.isTreeColumn);
        
        this.setState(this.settings.whiteSpaceType || TableCellWhiteSpaceTypesClassifier.NO_WRAP, true);
        
        this._elementProcessing();
        
        this.isInitialized = true;
    }
    
    /**
     * @private
     *
     * @description Creates html node of the element.
     *
     * @return { HTMLTableCellElement }
     **/
    _createElement()
    {
        const attributes =
                  {
                      class: this.settings.elementClass,
                      [ this.settings.elementAttribute ]: '',
                      ...this.settings.attributes,
                  };
        
        if (this.settings.rowspan)
        {
            attributes.rowspan = this.settings.rowspan;
        }
        
        if (this.settings.colspan)
        {
            attributes.colspan = this.settings.colspan;
        }
        
        return createElement(this.getTag(), attributes);
    }
    
    /**
     * @private
     *
     * @description Implements process of the styles.
     *
     * @return { void }
     **/
    _stylesProcessing()
    {
        for (const key in this.settings.styles)
        {
            this.element.style[ key ] = this.settings.styles[ key ];
        }
    }
    
    /**
     * @private
     *
     * @description Implements processing for the element.
     *
     * @return { HTMLTableCellElement }
     **/
    _elementProcessing()
    {
        if (this.isInitialized)
        {
            this.clear();
        }
        
        this._stylesProcessing();
        
        this._bodyProcessing();
    }
    
    /**
     * @private
     *
     * @description Implements processing with the body element.
     *
     * @return { void }
     **/
    _bodyProcessing()
    {
        switch (this.type)
        {
            case TableCellTypesClassifier.BOOLEAN:
            {
                this._bodyBooleanProcessing();
                
                break ;
            }
            case TableCellTypesClassifier.STATUS:
            {
                this._bodyStatusProcessing();
                
                break ;
            }
            case TableCellTypesClassifier.ACTION:
            {
                this.isHeadSection() ? this._headActionProcessing() : this._bodyActionProcessing();
                
                break ;
            }
            case TableCellTypesClassifier.JSON:
            {
                this._bodyJsonProcessing();
                
                break ;
            }
            case TableCellTypesClassifier.LABELS:
            {
                this._bodyLabelsProcessing();
                
                break ;
            }
            case TableCellTypesClassifier.CELL_ICON:
            {
                this._bodyIconProcessing();
                
                break ;
            }
            case TableCellTypesClassifier.SECONDS_TO_HOURS:
            {
                this._bodySecondsToHoursProcessing();
                
                break ;
            }
            case TableCellTypesClassifier.COINS:
            {
                this._bodyCoinsProcessing();
                
                break ;
            }
            case TableCellTypesClassifier.DATETIME:
            {
                this._bodyDatetimeProcessing();
                
                break ;
            }
            case TableCellTypesClassifier.EMPTY:
            {
                this._bodyEmptyProcessing();
                
                break ;
            }
            case TableCellTypesClassifier.INPUT:
            {
                this._bodyInputProcessing();
                
                break ;
            }
            case TableCellTypesClassifier.TITLE:
            {
                this._bodyTitleProcessing();
                
                break ;
            }
            default:
            {
                this._bodyPrimitiveProcessing();
            }
        }
        
        this._treeOptionProcessing();
    }
    
    /**
     * @private
     *
     * @description Implements processing if cell type is a primitive.
     *
     * @return { void }
     **/
    _bodyPrimitiveProcessing()
    {
        let label = this.settings.label;
        
        if (isEmpty(label))
        {
            label = '--';
        }
        
        this.element.append(label);
    }
    
    /**
     * @private
     *
     * @description Implements processing if cell type is an action.
     *
     * @return { void }
     **/
    _bodyActionProcessing()
    {
        let value = this._createValue(this.settings.label);
        
        const inner = this._createInner();
        
        for (let i = 0, n = this.settings.actions.length; i < n; i++)
        {
            const action = this.settings.actions[i];
            
            if (action.conditionByColumn && !this.settings.datum[action.conditionByColumn])
            {
                continue ;
            }
            
            if (action.buttonSettings.href)
            {
                action.buttonSettings.href = action.buttonSettings.href.replace(/\{([^}]*)}/, this._urlReplaceHandler.bind(this));
            }
            
            for (const key in action.buttonSettings.attributes)
            {
                action.buttonSettings.attributes[key] = action.buttonSettings.attributes[key].replace(/\{([^}]*)}/, this._urlReplaceHandler.bind(this));
            }
            
            const button = new TableButton({ type: action.type, buttonSettings: action.buttonSettings });

            button.button.customEvents.subscribe(ButtonEventsClassifier.CLICK, this._actionClickHandler.bind(this));
            
            inner.append(button.getElement());

            value = false;
        }
        
        this.element.append(inner);
    }
    
    /**
     * @private
     *
     * @description Implements a click handler for the action buttons.
     *
     * @param { PointerEvent } event
     *
     * @param { Button } instance
     *
     * @return { void }
     **/
    _actionClickHandler(event, instance)
    {
        this.customEvents.execute(TableEventTypesClassifier.ACTION_BUTTON_CLICK, event, instance, this);
    }
    
    /**
     * @private
     *
     * @description Implements processing if cell type is an action.
     *
     * @return { void }
     **/
    _headActionProcessing()
    {
        const icon = this._createIcon(this._createActionSvg());
        
        const inner = this._createInner(icon);
        
        this.element.append(inner);
    }
    
    /**
     * @private
     *
     * @description Implements processing if cell type is a json.
     *
     * @return { void }
     **/
    _bodyJsonProcessing()
    {
        const inner = this._createInner();
        
        const pre = createElement('pre');
        
        pre.textContent = JSON.stringify(this.settings.label, undefined, 4);
        
        inner.append(pre);
        
        this.element.append(inner);
    }
    
    /**
     * @private
     *
     * @description Implements processing if cell type is a labels.
     *
     * @return { void }
     **/
    _bodyLabelsProcessing()
    {
        if (!isArray(this.settings.label))
        {
            return ;
        }
        
        const inner = this._createInner();
        
        for (let i = 0, n = this.settings.label.length; i < n; i++)
        {
            const value = this.settings.labelsKey ? this.settings.label[i][this.settings.labelsKey] : this.settings.label[i];
            
            const label = new TableLabel({ value: value, statusType: this.settings.labelsStatusType });
            
            inner.append(label.element);
        }
        
        this.element.append(inner);
    }
    
    /**
     * @private
     *
     * @description Implements processing if cell type is an icon.
     *
     * @return { void }
     **/
    _bodyIconProcessing()
    {
        const inner = this._createInner();
        
        const label = new TableLabel({ value: createSvgElement(this.settings.label), statusType: TableStatusTypesClassifier.INFO, type: TableLabelTypesClassifier.ICON });
        
        inner.append(label.element);
        
        this.element.append(inner);
    }
    
    /**
     * @private
     *
     * @description Implements processing if cell type is a seconds to hours.
     *
     * @return { void }
     **/
    _bodySecondsToHoursProcessing()
    {
        const value = DateManager.secondsToTime(parseInt(this.settings.label));
        
        const inner = this._createInner();
        
        const label = new TableLabel({ value: value, statusType: TableStatusTypesClassifier.INFO, type: TableLabelTypesClassifier.TIME });
        
        label.element.prepend(createSvgElement('time-start', { class: 'icon' }));
        
        inner.append(label.element);
        
        this.element.append(inner);
    }
    
    /**
     * @private
     *
     * @description Implements processing if cell type is a coins.
     *
     * @return { void }
     **/
    _bodyCoinsProcessing()
    {
        const inner = this._createInner();

        const label = new TableLabel({ value: this.settings.label, statusType: TableStatusTypesClassifier.INFO, type: TableLabelTypesClassifier.COINS });

        label.element.append(createSvgElement('money-coin', { class: 'icon' }));

        inner.append(label.element);
        
        this.element.append(inner);
    }
    
    /**
     * @private
     *
     * @description Implements processing if cell type is a datetime.
     *
     * @return { void }
     **/
    _bodyDatetimeProcessing()
    {
        this.element.append(DateManager.date(this.settings.dateFormat, this.settings.label));
    }
    
    /**
     * @private
     *
     * @description Implements processing if cell type is an empty.
     *
     * @return { void }
     **/
    _bodyEmptyProcessing() {}
    
    /**
     * @private
     *
     * @description Implements processing if cell type is an input.
     *
     * @return { void }
     **/
    _bodyInputProcessing()
    {
        const customInputSettings = new CustomInputSettings({ inputId: this.settings.datum.name, inputName: this.settings.datum.name, title: '...' });
        
        const customInput = this.customInput = new CustomInput(customInputSettings);
        
        customInput.initialization();

        const inner = this._createInner(customInput.inputOuter.getElement());

        this.element.append(inner);
    }
    
    /**
     * @private
     *
     * @description Implements processing if cell type is a title.
     *
     * @return { void }
     **/
    _bodyTitleProcessing()
    {
        let icon;
        
        let value = this._createValue(this.settings.label);
        
        if (this.settings.isSortable)
        {
            icon = this._createIcon(this._createSortSvg());
            
            this.setState(TableStateTypesClassifier.SORTABLE, true);
        }
        
        const inner = this._createInner(value, icon);
        
        this.element.append(inner);
    }
    
    /**
     * @private
     *
     * @description Implements processing if cell type is a boolean.
     *
     * @return { void }
     **/
    _bodyBooleanProcessing()
    {
        const statusType = (this.settings.isReverse ^ Boolean(this.settings.label)) ? TableStatusTypesClassifier.SUCCESS : TableStatusTypesClassifier.ALERT;
        
        const value = (this.settings.isReverse ^ Boolean(this.settings.label)) ? this._createCheckSvg() : this._createCloseSvg();
        
        const label = new TableLabel({ value: value, statusType: statusType, type: TableLabelTypesClassifier.BOOLEAN });
        
        this.element.append(label.element);
    }
    
    /**
     * @private
     *
     * @description Implements processing if cell type is a status.
     *
     * @return { void }
     **/
    _bodyStatusProcessing()
    {
        /**
         * @type { [ string, TableStatusTypesClassifier ] }
         **/
        const value = this.settings.label.split('|');
        
        const label = new TableLabel({ value: value[0], statusType: value[1] });
        
        this.element.append(label.element);
    }
    
    /**
     * @private
     *
     * @description Finds label from element, creates icon element, after creates inner appends everything to it and appends it to the element.
     *
     * @return { void }
     **/
    _treeOptionProcessing()
    {
        if (!this.settings.isTreeOption)
        {
            return ;
        }
        
        const node = this.element.childNodes[0];
        
        node.remove();
        
        const icon = this._createArrowIcon();
        
        const inner = this._createInner(icon, node);
        
        this.setState(TableCellOptionClassesClassifier.TREE_OPTION, !!this.settings.isTreeOption);
        
        this.element.append(inner);
    }
    
    /**
     * @private
     *
     * @description Implements logic for the action url replace.
     *
     * @param { string } a
     *
     * @param { string } b
     *
     * @return { any }
     **/
    _urlReplaceHandler(a, b)
    {
        return this.settings.datum[b];
    }
    
    /**
     * @private
     *
     * @description Implements processing of the head cell.
     *
     * @return { void }
     **/
    _headProcessing() {}
    
    /**
     * @private
     *
     * @description Creates html node of the inner element and appends the given nodes.
     *
     * @param { ...( Element | string | ChildNode ) } nodes
     *
     * @return { HTMLDivElement }
     **/
    _createInner(...nodes)
    {
        return createElement('div', { class: this.settings.innerClass }, nodes);
    }
    
    /**
     * @private
     *
     * @description Creates html node of the value element and appends the given nodes.
     *
     * @param { ...( Element | string ) } nodes
     *
     * @return { HTMLDivElement }
     **/
    _createValue(...nodes)
    {
        return createElement('div', { class: this.settings.valueClass }, nodes);
    }
    
    /**
     * @private
     *
     * @description Creates html node of the icon element and appends the given nodes.
     *
     * @param { ...( Element | string ) } nodes
     *
     * @return { HTMLDivElement }
     **/
    _createIcon(...nodes)
    {
        return createElement('div', { class: this.settings.iconClass }, nodes);
    }
    
    /**
     * @private
     *
     * @description Creates html node of the action svg element.
     *
     * @return { SVGElement }
     **/
    _createActionSvg()
    {
        return this._createSvg(this.settings.actionSvgId, this.settings.actionSvgClass);
    }
    
    /**
     * @private
     *
     * @description Creates html node of the check svg element.
     *
     * @return { SVGElement }
     **/
    _createCheckSvg()
    {
        return this._createSvg(this.settings.checkSvgId, this.settings.checkSvgClass);
    }
    
    /**
     * @private
     *
     * @description Creates html node of the close svg element.
     *
     * @return { SVGElement }
     **/
    _createCloseSvg()
    {
        return this._createSvg(this.settings.closeSvgId, this.settings.closeSvgClass);
    }
    
    /**
     * @private
     *
     * @description Creates html node of the arrow svg element.
     *
     * @return { SVGElement }
     **/
    _createArrowIcon()
    {
        return createSvgElement(this.settings.arrowSvgId, { class: this.settings.arrowSvgClass });
    }
    
    /**
     * @private
     *
     * @description Creates html node of the sort svg element.
     *
     * @return { SVGElement }
     **/
    _createSortSvg()
    {
        return convertToHtml(this.settings.sortSvgString);
    }
    
    /**
     * @private
     *
     * @description Create svg element by the given arguments.
     *
     * @param { string } id
     *
     * @param { string[] | string } className
     *
     * @return { SVGElement }
     **/
    _createSvg(id, className)
    {
        return createSvgElement(id, { class: className });
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
     * @description Returns the needed tag for the element.
     *
     * @return { ('th' | 'td') }
     **/
    getTag()
    {
        return this.isHeadSection() ? 'th' : 'td';
    }
    
    /**
     * @public
     *
     * @description Checks if the cell is in the head section.
     *
     * @return { boolean }
     **/
    isHeadSection()
    {
        return this.sectionType === TableSectionTypesClassifier.HEAD;
    }
    
    /**
     * @public
     *
     * @description Checks if the cell type is an action.
     *
     * @return { boolean }
     **/
    isAction()
    {
        return this.type === TableCellTypesClassifier.ACTION;
    }
    
    /**
     * @public
     *
     * @description Checks if the cell type is a string.
     *
     * @return { boolean }
     **/
    isString()
    {
        return this.type === TableCellTypesClassifier.STRING;
    }
    
    /**
     * @public
     *
     * @description Checks if the cell type is a number.
     *
     * @return { boolean }
     **/
    isNumber()
    {
        return this.type === TableCellTypesClassifier.NUMBER;
    }
    
    /**
     * @public
     *
     * @description Checks if the cell type is a boolean.
     *
     * @return { boolean }
     **/
    isBoolean()
    {
        return this.type === TableCellTypesClassifier.BOOLEAN;
    }
    
    /**
     * @public
     *
     * @description Checks if the cell type is a status.
     *
     * @return { boolean }
     **/
    isStatus()
    {
        return this.type === TableCellTypesClassifier.STATUS;
    }
    
    /**
     * @public
     *
     * @description Checks if the cell is a sortable.
     *
     * @return { boolean }
     **/
    isSortable()
    {
        return this.settings.isSortable;
    }
    
    /**
     * @public
     *
     * @description Sets state sort asc.
     *
     * @return { void }
     **/
    setStateSortAsc()
    {
        this.setState(TableStateTypesClassifier.SORT_ASC, true);
        this.setState(TableStateTypesClassifier.SORT_DESC, false);
        
        this.sortDirection = 'asc';
    }
    
    /**
     * @public
     *
     * @description Sets state sort desc.
     *
     * @return { void }
     **/
    setStateSortDesc()
    {
        this.setState(TableStateTypesClassifier.SORT_ASC, false);
        this.setState(TableStateTypesClassifier.SORT_DESC, true);
        
        this.sortDirection = 'desc';
    }
    
    /**
     * @public
     *
     * @description Removes all sort states.
     *
     * @return { void }
     **/
    removeStatesSort()
    {
        this.setState(TableStateTypesClassifier.SORT_ASC, false);
        this.setState(TableStateTypesClassifier.SORT_DESC, false);
        
        this.sortDirection = undefined;
    }
    
    /**
     * @public
     *
     * @description Returns direction of sort.
     *
     * @return { 'asc' | 'desc' }
     **/
    getSortDirection()
    {
        return this.sortDirection;
    }
    
    /**
     * @public
     *
     * @description Implements process of the sorting.
     *
     * @return { void }
     **/
    sortProcessing(cell) {}
    
    /**
     * @public
     *
     * @description Implements process of the sorting states.
     *
     * @return { void }
     **/
    sortStatesProcessing(force = true)
    {
        const direction = !this.isSort() ? 'asc' : this.isSortAsc() && force ? 'desc' : undefined;
        
        this.setState(TableStateTypesClassifier.SORT_ASC, direction === 'asc' && force);
        
        this.setState(TableStateTypesClassifier.SORT_DESC, direction === 'desc' && force);

        this.sortDirection = direction;
    }
    
    /**
     * @public
     *
     * @description Checks if the current direction is an asc or desc.
     *
     * @return { boolean }
     **/
    isSort()
    {
        return this.isSortAsc() || this.isSortDesc();
    }
    
    /**
     * @public
     *
     * @description Checks if the current direction is an asc.
     *
     * @return { boolean }
     **/
    isSortAsc()
    {
        return this.checkState(TableStateTypesClassifier.SORT_ASC);
    }
    
    /**
     * @public
     *
     * @description Checks if the current direction is a desc.
     *
     * @return { boolean }
     **/
    isSortDesc()
    {
        return this.checkState(TableStateTypesClassifier.SORT_DESC);
    }
    
    /**
     * @public
     *
     * @description Returns element.
     *
     * @return { HTMLTableCellElement }
     **/
    getElement()
    {
        return this.element;
    }
    
    /**
     * @public
     *
     * @description Returns row.
     *
     * @return { HTMLTableRowElement }
     **/
    getRow()
    {
        return this.element.parentElement;
    }
    
    /**
     * @public
     *
     * @description Clears the component.
     *
     * @return { void }
     **/
    clear()
    {
        this.element.innerHTML = '';
    }
    
    /**
     * @public
     *
     * @description Updates component.
     *
     * @return { void }
     **/
    update(value)
    {
        if (this.settings.label === value)
        {
            return ;
        }
        
        this.settings.label = value;
        
        this._elementProcessing();
    }
}
