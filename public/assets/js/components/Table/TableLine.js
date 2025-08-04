import { TableLineSettings } from './Settings/TableLineSettings.js';
import { createElement }     from '../../tea-modules/Functions/DOM/Elements/createElement.js';
import { TableLineTypesClassifier } from './Standards/TableLineTypesClassifier.js';


/**
 * @class
 *
 * @description Implements help work with the table line component.
 **/
export class TableLine
{
    /**
     * @public
     *
     * @type { TableLineTypesClassifier }
     **/
    type;
    
    /**
     * @public
     *
     * @type { TableLineSettings }
     **/
    settings;
    
    /**
     * @public
     *
     * @type { HTMLElement }
     **/
    element;
    
    /**
     * @private
     *
     * @type { HTMLDivElement | null }
     **/
    _leftColumn = null;
    
    /**
     * @private
     *
     * @type { HTMLDivElement | null }
     **/
    _rightColumn = null;
    
    /**
     * @constructor
     *
     * @param { TableLineSettingProperties ? } settings
     *
     * @param { TableLineTypesClassifier ? } [type=TableLineTypesClassifier.COLUMNS]
     *
     * @return { TableLine }
     **/
    constructor(settings, type = TableLineTypesClassifier.COLUMNS)
    {
        this.settings = new TableLineSettings(settings);
        
        this.type = type;
        
        this.settings.elementClass.push(type);
        
        if (this.isColumns())
        {
            this._leftColumn = this._createColumn();
            
            this._rightColumn = this._createColumn();
        }
        
        this.element = this._createElement();
    }
    
    /**
     * @private
     *
     * @description Creates html node of the base element.
     *
     * @return { HTMLDivElement }
     **/
    _createElement()
    {
        const nodes = [];
        
        if (this.isColumns())
        {
            nodes.push(this._leftColumn, this._rightColumn);
        }
        
        return createElement('div', { class: this.settings.elementClass }, nodes);
    }
    
    /**
     * @private
     *
     * @description Creates html node of the column element.
     *
     * @return { HTMLDivElement }
     **/
    _createColumn()
    {
        return createElement('div', { class: this.settings.columnClass });
    }
    
    /**
     * @public
     *
     * @description Appends the given element to the inner of element.
     *
     * @param { Element } element
     *
     * @return { void }
     **/
    appendInner(element)
    {
        this.element.append(element);
    }
    
    /**
     * @public
     *
     * @description Appends the given element to the left column.
     *
     * @param { Element } element
     *
     * @return { void }
     **/
    appendToLeftColumn(element)
    {
        this._leftColumn.append(element);
    }
    
    /**
     * @public
     *
     * @description Appends the given element to the right column.
     *
     * @param { Element } element
     *
     * @return { void }
     **/
    appendToRightColumn(element)
    {
        this._rightColumn.append(element);
    }

    /**
     * @public
     *
     * @description Checks if the type of the element is a columns.
     *
     * @return { boolean }
     **/
    isColumns()
    {
        return this.type === TableLineTypesClassifier.COLUMNS;
    }
    
    /**
     * @public
     *
     * @description Returns element.
     *
     * @return { HTMLElement }
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
}
