import { querySelector } from '../../tea-modules/Functions/DOM/Queries/querySelector.js';
import { ClueSettings }  from './ClueSettings.js';
import { ClueTypesClassifier } from './ClueTypesClassifier.js';
import { createElement } from '../../tea-modules/Functions/DOM/Elements/createElement.js';
import { getAttribute } from '../../tea-modules/Functions/DOM/Attributes/getAttribute.js';
import { ClueStatesClassifier } from './ClueStatesClassifier.js';
import { CustomEvents } from '../../tea-modules/Classes/CustomEvents/CustomEvents.js';
import { CluePositionsClassifier } from './CluePositionsClassifier.js';
import { getTransition } from '../../tea-modules/Functions/DOM/Styles/getTransition.js';
import { isEmpty } from '../../tea-modules/Functions/Is/isEmpty.js';
import { hasAttribute } from '../../tea-modules/Functions/DOM/Attributes/hasAttribute.js';


/**
 * @class
 *
 * @description Implements float up clue for the html elements.
 **/
export class Clue
{
    /**
     * @private
     *
     * @type { Clue[] }
     **/
    static _instances = [];
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
    target;
    
    /**
     * @public
     *
     * @type { ClueSettings }
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
     * @type { string }
     **/
    text;
    
    /**
     * @public
     *
     * @type { number }
     **/
    timeout;
    
    /**
     * @constructor
     *
     * @param { string | HTMLElement } target
     *
     * @param { ClueSettingProperties } settings
     *
     * @return { Clue }
     **/
    constructor(target, settings = {})
    {
        Clue._instances.push(this);
        
        this.customEvents = new CustomEvents();
        
        this.target = querySelector(target);
        
        this.settings = new ClueSettings(settings);
        
        this.text = this.getText();
        
        this.element = this._createElement();
    }
    
    /**
     * @public
     *
     * @description Implements initialize all the based methods.
     *
     * @return { void }
     **/
    initialization()
    {
        this._settingAttributesProcessing();
        
        switch (this.settings.type)
        {
            case ClueTypesClassifier.HOVER:
            {
                this.target.addEventListener('mousemove', this._mouseMoveHandler.bind(this));
                
                break ;
            }
        }
        
        this.target.addEventListener('mouseleave', this._mouseLeaveHandler.bind(this));
    }
    
    /**
     * @private
     *
     * @description Implements processing with settings attributes.
     *
     * @return { void }
     **/
    _settingAttributesProcessing()
    {
        const position = getAttribute(this.target, this.settings.targetPositionAttribute, { isAfterRemove: true });
        
        if (!isEmpty(position))
        {
            this.settings.update({ position: CluePositionsClassifier[position.toUpperCase()] });
        }
    }
    
    /**
     * @public
     *
     * @description Implements a mousemove event for an element.
     *
     * @param { MouseEvent } event
     *
     * @return { void }
     **/
    _mouseMoveHandler(event)
    {
        this.show();
    }
    
    /**
     * @public
     *
     * @description Implements a mouseleave event for an element.
     *
     * @param { MouseEvent } event
     *
     * @param { HTMLElement } event.target
     *
     * @return { void }
     **/
    _mouseLeaveHandler(event)
    {
        this.hide();
    }
    
    /**
     * @public
     *
     * @description Shows the element.
     *
     * @return { void }
     **/
    show()
    {
        if (this.isFreezy() || this.isDisplay())
        {
            return ;
        }
        
        clearTimeout(this.timeout);
        
        this._insertElement();
        
        this._positionProcessing();
        
        setTimeout(() => this.setState(ClueStatesClassifier.DISPLAY, true), 0);
    }
    
    /**
     * @public
     *
     * @description Hides the element.
     *
     * @return { void }
     **/
    hide()
    {
        if (!this.isDisplay())
        {
            return ;
        }
        
        this.setState(ClueStatesClassifier.DISPLAY, false);
        
        this.timeout = setTimeout(this._removeElement.bind(this), this.getElementTransition().duration);
    }
    
    /**
     * @private
     *
     * @description Calculates position for the element.
     *
     * @return { void }
     **/
    _positionProcessing()
    {
        const rect = this.getTargetRect();
        
        let top = 0;
        
        let right = 0;
        
        switch (this.settings.position)
        {
            case CluePositionsClassifier.TOP:
            {
                top = (this.getTargetOffsetTop() - this.element.offsetHeight - this.getMargin());
                
                right = (window.innerWidth - rect.right - ((this.element.offsetWidth - rect.width) / 2));
                
                break ;
            }
            case CluePositionsClassifier.RIGHT:
            {
                top = (this.getTargetOffsetTop() + (rect.height / 2 - (this.element.offsetHeight / 2)));
                
                right = (window.innerWidth - rect.right - this.element.offsetWidth - this.settings.margin);
                
                break ;
            }
            case CluePositionsClassifier.BOTTOM:
            {
                top = (this.getTargetOffsetTop() + rect.height + this.getMargin());
                
                right = (window.innerWidth - rect.right - ((this.element.offsetWidth - rect.width) / 2));
                
                break ;
            }
            case CluePositionsClassifier.LEFT:
            {
                top = (this.getTargetOffsetTop() + (rect.height / 2 - (this.element.offsetHeight / 2)));
                
                right = (window.innerWidth - rect.left + this.settings.margin);
                
                break ;
            }
        }
        
        if (right < 0)
        {
            right = this.getMargin();
        }
        
        if (window.innerWidth - right < this.getWidth())
        {
            right -= this.getWidth() - (window.innerWidth - right) + this.getMargin();
        }
        
        this.element.style.top = top + 'px';
        
        this.element.style.right = right + 'px';
    }
    
    /**
     * @private
     *
     * @description Implements insertion of an element into a document.
     *
     * @return { void }
     **/
    _insertElement()
    {
        if (this.isInsert())
        {
            return ;
        }
        
        document.body.append(this.element);
    }
    
    /**
     * @private
     *
     * @description Implements remove of an element from a document.
     *
     * @return { void }
     **/
    _removeElement()
    {
        if (!this.isInsert())
        {
            return ;
        }
        
        this.element.remove();
    }
    
    /**
     * @private
     *
     * @description Creates and returns base html node of the element.
     *
     * @return { HTMLDivElement }
     **/
    _createElement()
    {
        return createElement('div', { class: this.settings.elementClass }, [ this.text ]);
    }
    
    /**
     * @public
     *
     * @description Sets the given state to the element by the given force.
     *
     * @param { ClueStatesClassifier } value
     *
     * @param { boolean } force
     *
     * @return { boolean }
     **/
    setState(value, force)
    {
        return this.element.classList.toggle(value, force);
    }
    
    /**
     * @public
     *
     * @description Check if the given state is a like with the element state.
     *
     * @param { ClueStatesClassifier } value
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
     * @description Returns value of the base attribute.
     *
     * @return { string }
     **/
    getText()
    {
        if (hasAttribute(this.target, this.settings.elementAttribute))
        {
            return getAttribute(this.target, `${ this.settings.elementAttribute }`, { isAfterRemove: true });
        }
        
        return this.settings.text;
    }
    
    /**
     * @public
     *
     * @description Returns margin value for an element.
     *
     * @return { number }
     **/
    getMargin()
    {
        return this.settings.margin;
    }
    
    /**
     * @public
     *
     * @description Returns rect value of the target element.
     *
     * @return { DOMRect }
     **/
    getTargetRect()
    {
        return this.target.getBoundingClientRect();
    }
    
    /**
     * @public
     *
     * @description Returns offset top from document of the target element.
     *
     * @return { number }
     **/
    getTargetOffsetTop()
    {
        return this.getTargetRect().top + window.scrollY;
    }
    
    /**
     * @public
     *
     * @description Returns transition value of the element.
     *
     * @return { Transition | Transition[] }
     **/
    getElementTransition()
    {
        return getTransition(this.element, 'all');
    }
    
    /**
     * @public
     *
     * @description Returns offset width of the element.
     *
     * @return { number }
     **/
    getWidth()
    {
        return this.element.offsetWidth;
    }
    
    /**
     * @public
     *
     * @description Updates the settings.
     *
     * @param { ClueSettingProperties } settings
     *
     * @return { void }
     **/
    update(settings)
    {
        return this.settings.update(settings);
    }
    
    /**
     * @public
     *
     * @description Checks if the document is contains an element.
     *
     * @return { boolean }
     **/
    isInsert()
    {
        return document.body.contains(this.element);
    }
    
    /**
     * @public
     *
     * @description Checks if the element contains state display.
     *
     * @return { boolean }
     **/
    isDisplay()
    {
        return this.checkState(ClueStatesClassifier.DISPLAY);
    }
    
    /**
     * @public
     *
     * @description Checks if the element is a freezy.
     *
     * @return { boolean }
     **/
    isFreezy()
    {
        return this.settings.freezy;
    }
    
    /**
     * @public
     *
     * @description Returns instance by the given target.
     *
     * @param { HTMLElement } target
     *
     * @return { Clue | null }
     **/
    static getInstanceByTarget(target)
    {
        return Clue._instances.find(a => a.target === target);
    }
}
