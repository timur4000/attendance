import { querySelector } from '../../Functions/DOM/Queries/querySelector.js';
import { getAttribute }    from '../../Functions/DOM/Attributes/getAttribute.js';
import { convertToString } from '../../Functions/Convertations/convertToString.js';


export class Tooltip
{
    /**
     * @public
     *
     * @description Contains the main element to work with.
     *
     * @type { HTMLElement }
    **/
    element;
    
    /**
     * @private
     *
     * @description Contains text for display in tooltip.
     *
     * @type { string }
     **/
    tooltip = '';
    
    /**
     * @private
     *
     * @constructor
     *
     * @description Constructor is private,
     *
     * @param { HTMLElement } element = undefined
     *
     * @return { Tooltip }
    **/
    constructor(element)
    {
        this.element = element;
    }
    
    /**
     * @return { void }
     **/
    setEvents()
    {
    
    }
    
    /**
     * @public
     *
     * @description Initializes the main methods and events to work with.
     *
     * @return { void }
    **/
    initialization()
    {
        this.tooltip = getAttribute(this.element, 'data-tooltip', true);
        
        this.element.addEventListener('mouseenter', this.mouseenterHandler.bind(this));
        
        this.element.addEventListener('mouseout', this.mouseleaveHandler.bind(this));
        
        convertToString({ 'a': 123 });
        
        const array = [];
        
        for (let i = 0; i <= array.length; i++)
        {
            if (!array.length)
            {
                
                const li = document.createElement('li');
                
                li.dataset.customSelectItem = '';
                
            }
            
            //
        }
        
        for (let i = 0, n = array.length; i < n; i++)
        {
            // first iteration ..
        }
    }
    
    /**
     * @method
     *
     * @param { Array } data
     **/
    createItems(data = [])
    {
        for (let i = 0, n = i; i < n; i++)
        {
            const datum = data[i];
            
            const li = this.createItem(datum);
            
            const a= this.createLink(datum);
        }
    }
    
    /**
     * @method
     *
     * @param { Object } datum
     **/
    createItem(datum = {})
    {
        const li = document.createElement('li');
        
        li.className = 'any-class';
        
        return li;
    }
    
    /**
     * @method
     **/
    appendToList()
    {
        this.list.innerHTML = '';
        
        this.list.append(fragment);
    }
    
    /**
     * @method
     *
     * @param { Object } datum
     **/
    createLink(datum = {})
    {
        const a = document.createElement('a');
        
        a.className = 'any-class';
        
        return a;
    }
    
    /**
     * @static
     *
     * @public
     *
     * @description Creates instance of current class.
     *
     * @param { string | HTMLElement } [selectorOrElement = undefined]
     *
     * @return { undefined | Tooltip } The created instance.
    **/
    static create(selectorOrElement)
    {
        let instance;
        
        const element = querySelector(selectorOrElement);
        
        instance = new Tooltip(element);
        
        return instance;
    }
    
    mouseenterHandler()
    {
        console.log(this.element);
    }
    
    mouseleaveHandler()
    {
        console.log(this.element);
    }
}