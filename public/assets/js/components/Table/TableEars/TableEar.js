import { TableEarSettings } from './TableEarSettings.js';
import { createElement }    from '../../../tea-modules/Functions/DOM/Elements/createElement.js';
import { TableEarTypesClassifier } from './TableEarTypesClassifier.js';
import { createSvgElement } from '../../../tea-modules/Functions/DOM/Elements/createSvgElement.js';
import { CustomEvents } from '../../../tea-modules/Classes/CustomEvents/CustomEvents.js';
import { TableEventTypesClassifier } from '../Standards/TableEventTypesClassifier.js';


/**
 * @class
 *
 * @description Implements logic for every table ear.
 **/
export class TableEar
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
     * @type { Object<Table> }
     **/
    table;
    
    /**
     * @public
     *
     * @type { TableEarSettings }
     **/
    settings;
    
    /**
     * @public
     *
     * @type { HTMLDivElement }
     **/
    element;
    
    /**
     * @public
     *
     * @type { HTMLDivElement }
     **/
    circle;
    
    /**
     * @constructor
     *
     * @param { Object<Table> } table
     *
     * @param { TableEarSettingProperties } settings
     *
     * @return { TableEar }
     **/
    constructor(table, settings)
    {
        this.customEvents = new CustomEvents();
        
        this.table = table;
        
        this.settings = new TableEarSettings(settings);
        
        this.circle = this._createCircle();
        
        this.element = this._createElement();
    }
    
    /**
     * @public
     *
     * @description Implements initialize base methods and logics.
     *
     * @return { void }
     **/
    initialization()
    {
        this.setModifier(this.settings.type, true);
        
        this.element.addEventListener('mouseenter', this._mouseenterHandler.bind(this));
        
        this.element.addEventListener('mouseleave', this._mouseleaveHandler.bind(this));
    }
    
    /**
     * @private
     *
     * @description Implements handler for the mouseenter event.
     *
     * @return { void }
     **/
    _mouseenterHandler()
    {
        this.customEvents.execute(TableEventTypesClassifier.EAR_MOUSEENTER, this);
    }
    
    /**
     * @private
     *
     * @description Implements handler for the mouseleave event.
     *
     * @return { void }
     **/
    _mouseleaveHandler()
    {
        this.customEvents.execute(TableEventTypesClassifier.EAR_MOUSELEAVE, this);
    }
    
    /**
     * @public
     *
     * @description Implements create html node of the element.
     *
     * @return { HTMLDivElement }
     **/
    _createElement()
    {
        return createElement('div', { class: this.settings.elementClass }, [ this.circle ]);
    }
    
    /**
     * @public
     *
     * @description Implements create html node of the circle element.
     *
     * @return { HTMLDivElement }
     **/
    _createCircle()
    {
        return createElement('div', { class: this.settings.circleClass }, [ this._createIcon() ]);
    }
    
    /**
     * @public
     *
     * @description Implements create html node of the circle element.
     *
     * @return { SVGElement }
     **/
    _createIcon()
    {
        return createSvgElement(this.settings.iconId, { class: this.settings.iconClass });
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
     * @description Sets the given modifier to the element by the given force.
     *
     * @param { TableEarTypesClassifier | TableStateTypesClassifier } modifier
     *
     * @param { boolean } force
     *
     * @return { void }
     **/
    setModifier(modifier, force)
    {
        this.element.classList.toggle(modifier, force);
    }
    
    /**
     * @public
     *
     * @description Check if the element contains the given modifier.
     *
     * @param { TableEarTypesClassifier | TableStateTypesClassifier } modifier
     *
     * @return { void }
     **/
    hasModifier(modifier)
    {
        this.element.classList.contains(modifier);
    }
    
    /**
     * TODO: Need refactoring
     *
     * @public
     *
     * @description Implements draw for the element.
     *
     * @return { void }
     **/
    draw()
    {
        const bodyRect = this.table.tableElement.getBodyRect();
        
        let top = this.table.tableElement.getHeadRect().height;
        
        if (bodyRect.top < 0)
        {
            top = Math.abs(bodyRect.top) + top;
        }
        
        let height = 0;
        
        if (bodyRect.bottom > window.innerHeight)
        {
            if (bodyRect.top < 0)
            {
                height = window.innerHeight;
            }
            else
            {
                height = window.innerHeight - bodyRect.top;
            }
        }
        else
        {
            if (bodyRect.top < 0)
            {
                height = window.innerHeight - (window.innerHeight - bodyRect.bottom);
            }
            else
            {
                height = bodyRect.height;
            }
        }
        
        this.element.style.top = `${ top }px`;
        
        this.element.style.height = `${ height }px`;
    }
}
