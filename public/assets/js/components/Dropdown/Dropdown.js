import { querySelector } from '../../tea-modules/Functions/DOM/Queries/querySelector.js';
import { getAttribute }  from '../../tea-modules/Functions/DOM/Attributes/getAttribute.js';
import { getBorders }    from '../../tea-modules/Functions/DOM/Styles/getBorders.js';
import { CustomEvents }  from '../../tea-modules/Classes/CustomEvents/CustomEvents.js';
import { DropdownEventsClassifier } from './DropdownEventsClassifier.js';


export class Dropdown
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
     * @type { HTMLDivElement }
     **/
    element;
    
    /**
     * @public
     *
     * @type { HTMLDivElement }
     **/
    content;
    
    /**
     * @private
     *
     * @type { string }
     **/
    _activeClass = 'active';
    
    /**
     * @private
     *
     * @type { number }
     **/
    _offset = 4;
    
    /**
     * @constructor
     *
     * @param { HTMLElement | string } selector
     *
     * @param { HTMLElement ? } content
     **/
    constructor(selector, content = undefined)
    {
        this.customEvents = new CustomEvents();
        
        this.element = querySelector(selector);
        
        if (!content)
        {
            const contentId = getAttribute(this.element, 'content-id', { isDataAttribute: true, isAfterRemove: true });
            
            this.content = querySelector('#' + contentId);
        }
        else
        {
            this.content = content;
        }
        
        this.content.remove();
        
        this.initialization();
    }
    
    /**
     * @public
     *
     * @description Implements base initialization.
     *
     * @return { void }
     **/
    initialization()
    {
        document.addEventListener('click', this._documentClickHandler.bind(this));
        
        document.addEventListener('keyup', this._documentKeyupHandler.bind(this));
        
        window.addEventListener('resize', this._windowResizeHandler.bind(this));
    }
    
    /**
     * @public
     *
     * @description Returns rect properties of element.
     *
     * @return { DOMRect }
     **/
    getElementRect()
    {
        return this.element.getBoundingClientRect();
    }
    
    /**
     * @public
     *
     * @description Checks if the element is active.
     *
     * @return { boolean }
     **/
    isActive()
    {
        return this.element.classList.contains(this._activeClass);
    }
    
    /**
     * @public
     *
     * @description Checks whether position of element is left.
     *
     * @return { boolean }
     **/
    isLeft()
    {
        return this.content.dataset.position && this.content.dataset.position === 'left';
    }
    
    /**
     * @private
     *
     * @description Sets coordinates to content by element rect properties.
     *
     * @return { void }
     **/
    _setContentCoordinates()
    {
        const rect = this.getElementRect();
        
        this.content.style.top = rect.bottom + this._offset + 'px';
        
        if (this.isLeft())
        {
            this.content.style.left = (rect.left) + 'px';
        }
        else
        {
            this.content.style.right = (window.innerWidth - rect.right) + 'px';
        }
        
        let width = this.content.firstElementChild && this.content.firstElementChild.offsetWidth > this.element.offsetWidth ? this.content.firstElementChild.offsetWidth + getBorders(this.element).x : this.element.offsetWidth;
        
        this.content.style.width = width + 'px';
    }
    
    /**
     * @private
     *
     * @description Sets classes to all elements by given force.
     *
     * @param { boolean } force
     *
     * @return { void }
     **/
    _setClasses(force)
    {
        this.element.classList.toggle(this._activeClass, force);
    }
    
    /**
     * @private
     *
     * @description Handler for document click event.
     *
     * @param { Element } target
     *
     * @return { void }
     **/
    _documentClickHandler({ target })
    {
        const toggle = target.closest('[data-dropdown-toggle]');
        
        if (target.closest('[data-dropdown-ignored]'))
        {
            return ;
        }
        
        if (this.isActive())
        {
            this._setClasses(false);
            
            this.content.remove();
            
            this.customEvents.execute(DropdownEventsClassifier.CLOSE, this);
            
            return;
        }
        
        if (!toggle || !this.element.contains(toggle))
        {
            return ;
        }
        
        document.body.append(this.content);
        
        this._setContentCoordinates();
        
        this._setClasses(true);
        
        this.customEvents.execute(DropdownEventsClassifier.OPEN, this);
    }
    
    /**
     * @private
     *
     * @description Handler for window resize event.
     *
     * @return { void }
     **/
    _windowResizeHandler()
    {
        this._setContentCoordinates();
    }
    
    /**
     * @private
     *
     * @description Handler for document keyup event.
     *
     * @param { CloseEvent.code }
     *
     * @return { void }
     **/
    _documentKeyupHandler({ code })
    {
        if (!this.isActive())
        {
            return ;
        }
        
        if (code === 'Escape')
        {
            this._setClasses(false);
            
            this.content.remove();
        }
    }
}
