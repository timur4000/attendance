import { NotificationItemSettings } from './NotificationItemSettings.js';
import { createElement }            from '../../../tea-modules/Functions/DOM/Elements/createElement.js';
import { NotificationLine } from '../NotificationLine/NotificationLine.js';
import { createSvgElement }         from '../../../tea-modules/Functions/DOM/Elements/createSvgElement.js';
import { NotificationColumn }       from '../NotificationColumn/NotificationColumn.js';
import { isStructureEmpty }         from '../../../tea-modules/Functions/Is/isStructureEmpty.js';
import { CustomEvents }             from '../../../tea-modules/Classes/CustomEvents/CustomEvents.js';
import { NotificationItemEventsClassifier } from '../Classifiers/NotificationItemEventsClassifier.js';
import { getTransition } from '../../../tea-modules/Functions/DOM/Styles/getTransition.js';


/**
 * @class
 *
 * @description Implements logic of the notification item component.
 **/
export class NotificationItem
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
     * @type { NotificationItemSettings }
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
     * @type { NotificationLine }
     **/
    upper;
    
    /**
     * @public
     *
     * @type { NotificationColumn }
     **/
    upperColumn;
    
    /**
     * @public
     *
     * @type { NotificationLine }
     **/
    lower;
    
    /**
     * @public
     *
     * @type { HTMLDivElement }
     **/
    icon;
    
    /**
     * @public
     *
     * @type { HTMLDivElement }
     **/
    heading;
    
    /**
     * @public
     *
     * @type { HTMLButtonElement }
     **/
    close;
    
    /**
     * @public
     *
     * @type { HTMLParagraphElement[] }
     **/
    paragraphs = [];
    
    /**
     * @public
     *
     * @type { number }
     **/
    removeTimeout = 0;
    
    /**
     * @public
     *
     * @type { boolean }
     **/
    isMouseenter = false;
    
    /**
     * @static
     *
     * @public
     *
     * @type { string }
     **/
    static closeAttribute = 'data-notification-close';
    
    /**
     * @constructor
     *
     * @param { NotificationItemSettingProperties } settings
     *
     * @return { NotificationItem }
     **/
    constructor(settings)
    {
        this.customEvents = new CustomEvents();
        
        this.settings = new NotificationItemSettings(settings);
        
        this.upper = new NotificationLine(this.settings.upperLineSettings);
        
        this.upperColumn = new NotificationColumn(this.settings.upperColumnSettings);
        
        this.lower = new NotificationLine(this.settings.lowerLineSettings);
        
        this.element = this._createElement();
    }
    
    /**
     * @public
     *
     * @description Implements initialize base logic.
     *
     * @return { void }
     **/
    initialization()
    {
        this.setState(this.settings.type, true);
        
        this.setState(this.settings.theme, true);
        
        this.upper.append(this.upperColumn.getElement());
        
        if (this.withIcon())
        {
            this.icon = this._createIcon();
            
            this.upperColumn.append(this.icon);
        }
        
        if (this.withHeading())
        {
            this.heading = this._createHeading();
            
            this.upperColumn.append(this.heading);
        }
        
        if (this.withClose())
        {
            this.close = this._createClose();
            
            this.upper.append(this.close);
        }
        
        if (this.withParagraphs())
        {
            this._paragraphsProcessing();
            
            this.append(this.lower.getElement());
        }
        
        this.customEvents.execute(NotificationItemEventsClassifier.INITIALIZATION);
        
        this._eventsProcessing();
    }
    
    /**
     * @private
     *
     * @description Implements the setting of all element events.
     *
     * @return { void }
     **/
    _eventsProcessing()
    {
        this.close.addEventListener('click', this._closeClickHandler.bind(this));
        
        this.element.addEventListener('mouseenter', this._mouseenterHandler.bind(this));
        
        this.element.addEventListener('mouseleave', this._mouseleaveHandler.bind(this));
    }
    
    /**
     * @private
     *
     * @description Implements handler for the click event of the close button element.
     *
     * @return { void }
     **/
    _closeClickHandler()
    {
        this.customEvents.execute(NotificationItemEventsClassifier.CLOSE_CLICK, this);
    }
    
    /**
     * @private
     *
     * @description Implements handler for the mouse enter event of the element.
     *
     * @return { void }
     **/
    _mouseenterHandler()
    {
        this.isMouseenter = true;
        
        this.customEvents.execute(NotificationItemEventsClassifier.MOUSE_ENTER, this);
    }
    
    /**
     * @private
     *
     * @description Implements handler for the mouse leave event of the element.
     *
     * @return { void }
     **/
    _mouseleaveHandler()
    {
        this.isMouseenter = false;
        
        this.customEvents.execute(NotificationItemEventsClassifier.MOUSE_LEAVE, this);
    }
    
    /**
     * @private
     *
     * @description Implements processing of paragraphs.
     *
     * @return { void }
     **/
    _paragraphsProcessing()
    {
        for (let i = 0, n = this.settings.paragraphs.length; i < n; i++)
        {
            const value = this.settings.paragraphs[i];
            
            const paragraph = this._createParagraph(value);
            
            this.lower.append(paragraph);
            
            this.paragraphs.push(paragraph);
        }
    }
    
    /**
     * @private
     *
     * @description Implements creates html node of the element.
     *
     * @return { HTMLElement }
     **/
    _createElement()
    {
        return createElement('section', { class: this.settings.elementClass }, [ this.upper.getElement() ]);
    }
    
    /**
     * @private
     *
     * @description Implements creates html node of the icon element.
     *
     * @return { HTMLDivElement }
     **/
    _createIcon()
    {
        return createElement('div', { class: this.settings.iconClass }, [ this._createSvg() ]);
    }
    
    /**
     * @private
     *
     * @description Implements creates html node of the svg element.
     *
     * @return { SVGElement }
     **/
    _createSvg()
    {
        return createSvgElement(this.settings.svgId, { class: this.settings.svgClass });
    }
    
    /**
     * @private
     *
     * @description Implements creates html node of the heading element.
     *
     * @return { HTMLDivElement }
     **/
    _createHeading()
    {
        return createElement('div', { class: this.settings.headingClass }, [ this.settings.heading ]);
    }
    
    /**
     * @private
     *
     * @description Implements creates html node of the close button element.
     *
     * @return { HTMLButtonElement }
     **/
    _createClose()
    {
        return createElement('button', { class: this.settings.closeClass, [NotificationItem.closeAttribute]: '' }, [ this._createCloseSvg() ]);
    }
    
    /**
     * @private
     *
     * @description Implements creates html node of the close svg element.
     *
     * @return { SVGElement }
     **/
    _createCloseSvg()
    {
        return createSvgElement(this.settings.closeSvgId, { class: this.settings.closeSvgClass });
    }
    
    /**
     * @private
     *
     * @description Implements creates html node of the paragraph element.
     *
     * @param { string } text
     *
     * @return { HTMLParagraphElement }
     **/
    _createParagraph(text)
    {
        return createElement('p', { class: this.settings.paragraphClass }, [ text ]);
    }
    
    /**
     * @public
     *
     * @description Appends the given element to the current element.
     *
     * @param { Element } element
     *
     * @return { void }
     **/
    append(element)
    {
        this.element.append(element);
    }
    
    /**
     * @public
     *
     * @description Sets the given state value to the element by the given force.
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
     * @description Checks if the element contain a given state value.
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
     * @description Determines whether icon element is needed.
     *
     * @return { boolean }
     **/
    withIcon()
    {
        return !!this.settings.svgId;
    }
    
    /**
     * @public
     *
     * @description Determines whether heading element is needed.
     *
     * @return { boolean }
     **/
    withHeading()
    {
        return !!this.settings.heading;
    }
    
    /**
     * @public
     *
     * @description Determines whether close button is needed.
     *
     * @return { boolean }
     **/
    withClose()
    {
        return this.settings.withClose;
    }
    
    /**
     * @public
     *
     * @description Determines whether paragraphs is needed.
     *
     * @return { boolean }
     **/
    withParagraphs()
    {
        return !isStructureEmpty(this.settings.paragraphs);
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
     * @description Removes element.
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
     * @description Returns style.
     *
     * @return { CSSStyleDeclaration }
     **/
    style()
    {
        return this.element.style;
    }
    
    /**
     * @public
     *
     * @description Returns offset height of the element.
     *
     * @return { number }
     **/
    getOffsetHeight()
    {
        return this.element.offsetHeight;
    }
    
    /**
     * @public
     *
     * @description Returns transition.
     *
     * @return { Transition | Transition[] }
     **/
    getTransition()
    {
        return getTransition(this.element, 'all');
    }
}
