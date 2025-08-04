import { querySelector } from '../../tea-modules/Functions/DOM/Queries/querySelector.js';
import { setCssVariable } from '../../tea-modules/Functions/DOM/Variables/setCssVariable.js';
import { Storage } from '../../tea-modules/Classes/Storage/Storage.js';
import { isNull } from '../../tea-modules/Functions/Is/isNull.js';
import { CustomEvents } from '../../tea-modules/Classes/CustomEvents/CustomEvents.js';
import { LeftNavigationEventsClassifier } from './LeftNavigationEventsClassifier.js';


export class LeftNavigation
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
     * @type { HTMLElement }
     **/
    element;
    
    /**
     * @public
     *
     * @type { HTMLButtonElement }
     **/
    toggle;
    
    /**
     * @constructor
     *
     * @param { HTMLElement | string } selector
     *
     * @return { LeftNavigation }
     **/
    constructor(selector)
    {
        this.customEvents = new CustomEvents();
        
        this.element = querySelector(selector);
    }
    
    /**
     * @public
     *
     * @description Initializes base methods.
     *
     **/
    initialization()
    {
        if (isNull(this.element))
        {
            return ;
        }
        
        this.toggle = querySelector('[data-left-navigation-toggle]', { root: this.element });
        
        this.classToggle(Storage.has('left-navigation'));
        
        this.toggle.addEventListener('click', this._toggleClickHandler.bind(this));
        
        this.element.addEventListener('transitionend', this._transitionEndHandler.bind(this));
    }
    
    /**
     * @public
     *
     * @description Checks if the element is closed.
     *
     * @return { boolean }
     **/
    isClosed()
    {
        return this.element.classList.contains('closed');
    }
    
    /**
     * @public
     *
     * @description Toggles class on the element by the given force value.
     *
     * @param { boolean } [force=undefined]
     *
     * @return { void }
     **/
    classToggle(force = undefined)
    {
        this.element.classList.toggle('closed', force);
        
        if (force)
        {
            setCssVariable('left-navigation-width', '81px');
            
            Storage.set('left-navigation', '1');
            
            this.customEvents.execute(LeftNavigationEventsClassifier.CLOSE);
            
            return ;
        }
        
        Storage.remove('left-navigation');
        
        setCssVariable('left-navigation-width', '');
        
        this.customEvents.execute(LeftNavigationEventsClassifier.OPEN);
    }
    
    /**
     * @private
     *
     * @description Implements handler to the toggle click event.
     *
     * @param { HTMLElement } target
     *
     * @return { void}
     **/
    _toggleClickHandler({ target })
    {
        this.classToggle(!this.isClosed());
    }
    
    /**
     * @private
     *
     * @description Implements handler to the transition-end event.
     *
     * @param { TransitionEvent } event
     *
     * @return { void}
     **/
    _transitionEndHandler(event)
    {
        const target = event.target;
        
        if (target !== this.element)
        {
            return ;
        }
        
        this.customEvents.execute(LeftNavigationEventsClassifier.TRANSITION_END, event);
    }
}
