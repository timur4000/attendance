import { querySelector } from '../../tea-modules/Functions/DOM/Queries/querySelector.js';
import { isNull }        from '../../tea-modules/Functions/Is/isNull.js';
import { getPaddings }   from '../../tea-modules/Functions/DOM/Styles/getPaddings.js';


export class Menu
{
    /**
     * @public
     *
     * @type { HTMLElement }
     **/
    element;
    
    /**
     * @public
     *
     * @type { HTMLUListElement }
     **/
    list;
    
    /**
     * @public
     *
     * @type { NodeListOf<HTMLAnchorElement> }
     **/
    links;
    
    /**
     * @constructor
     *
     * @param { string } selector
     *
     * @return { Menu }
     **/
    constructor(selector)
    {
        this.element = querySelector(selector);
        
        this.list = querySelector('.menu-list');
    }
    
    /**
     * @public
     *
     * @description Initializes base methods.
     *
     * @return { void }
     **/
    initialization()
    {
        if (isNull(this.element))
        {
            return ;
        }
        
        this.links = this.getLinks();
        
        this._loadOpensProcessing();
        
        this._loadActiveProcessing();
        
        document.addEventListener('click', this._documentClickHandler.bind(this));
    }
    
    /**
     * @private
     *
     * @description Implements open for an element containing the open class.
     *
     * @return { void }
     **/
    _loadOpensProcessing()
    {
        const items = this.getOpens();
        
        if (isNull(items))
        {
            return ;
        }
        
        items.forEach(item => this.open(item));
    }
    
    /**
     * @private
     *
     * @description Implements opening of a parent item if there is an active item inside it.
     *
     * @return { void }
     **/
    _loadActiveProcessing()
    {
        const active = this.getActive();
        
        const parentItem = this._getParentItem(active);
        
        if (!parentItem)
        {
            this.scrollIntoView(active);
            
            return ;
        }
        
        this.open(parentItem);
        
        this.scrollIntoView(active);
    }
    
    /**
     * @private
     *
     * @description Implements logic for scrolling an item in the field of view.
     *
     * @return { void }
     **/
    scrollIntoView(item)
    {
        const rect = item.getBoundingClientRect();
        
        const listRect = this.list.getBoundingClientRect();

        const elementPaddings = getPaddings(this.element);

        const scrollOffset = (listRect.height - rect.height) / 2;

        this.list.scrollTo(0, rect.top + this.list.scrollTop - elementPaddings.top - scrollOffset - 70); // TODO: Needs refactoring.
    }
    
    /**
     * @public
     *
     * @param { HTMLElement } item
     *
     * @description Opens the content of the given item.
     **/
    open(item)
    {
        const content = this._getContent(item);
        
        content.style.height = this._getListHeight(item) + 'px';
        
        item.classList.add('open');
    }
    
    /**
     * @public
     *
     * @param { HTMLElement } item
     *
     * @description Coses the content of the given item.
     **/
    close(item)
    {
        const content = this._getContent(item);
        
        content.style.height = '';
        
        item.classList.remove('open');
    }
    
    /**
     * @private
     *
     * @param { HTMLElement } content
     *
     * @description Returns offset height list of the given content.
     *
     * @return { number }
     **/
    _getListHeight(content)
    {
        return this._getList(content).offsetHeight;
    }
    
    /**
     * @private
     *
     * @description Returns content of the given item.
     *
     * @param { HTMLElement } item
     *
     * @return { HTMLElement }
     **/
    _getContent(item)
    {
        return querySelector('.menu-content', { root: item });
    }
    
    /**
     * @private
     *
     * @description Returns parent item of the given item.
     *
     * @param { HTMLElement } item
     *
     * @return { HTMLElement }
     **/
    _getParentItem(item)
    {
        return item.closest('.menu-item[data-menu-content]');
    }
    
    /**
     * @private
     *
     * @description Returns list of given content.
     *
     * @param { HTMLElement } content
     *
     * @return { HTMLElement }
     **/
    _getList(content)
    {
        return querySelector('.menu-list', { root: content });
    }
    
    /**
     * @public
     *
     * @description Checks if the given item is open.
     *
     * @param { HTMLElement } item
     *
     * @return { boolean }
     **/
    isOpen(item)
    {
        return item.classList.contains('open');
    }
    
    /**
     * @public
     *
     * @description Returns the current item that is open.
     *
     * @return { HTMLLIElement | null }
     **/
    getOpen()
    {
        return querySelector('.open', { root: this.element });
    }
    
    /**
     * @public
     *
     * @description Returns the current items that is open.
     *
     * @return { NodeListOf<HTMLLIElement> }
     **/
    getOpens()
    {
        return querySelector('.open', { root: this.element, isAll: true });
    }
    
    /**
     * @public
     *
     * @description Returns the current item that is active.
     *
     * @return { HTMLLIElement }
     **/
    getActive()
    {
        return querySelector('.active', { root: this.element });
    }
    
    /**
     * @public
     *
     * @description Returns all link elements.
     *
     * @return { NodeListOf<HTMLAnchorElement> }
     **/
    getLinks()
    {
        return querySelector('.menu-link', { root: this.element, isAll: true });
    }
    
    /**
     * @private
     *
     * @description Implements handler to the document click event.
     *
     * @param { HTMLElement } target
     *
     * @return { void }
     **/
    _documentClickHandler({ target })
    {
        const item = target.closest('.menu-item[data-menu-content]');
        
        const content = target.closest('.menu-content');
        
        if (!item || content)
        {
            return ;
        }
        
        if (this.isOpen(item))
        {
            this.close(item);
            
            return ;
        }
        
        this.open(item);
    }
}
