import { TablePaginationSettings } from './Settings/TablePaginationSettings.js';
import { createElement }           from '../../tea-modules/Functions/DOM/Elements/createElement.js';
import { createSvgElement }        from '../../tea-modules/Functions/DOM/Elements/createSvgElement.js';
import { TableStateTypesClassifier } from './Standards/TableStateTypesClassifier.js';
import { structureMerge } from '../../tea-modules/Functions/Structures/structureMerge.js';
import { createFragment } from '../../tea-modules/Functions/DOM/Elements/createFragment.js';
import { CustomEvents } from '../../tea-modules/Classes/CustomEvents/CustomEvents.js';
import { TableEventTypesClassifier } from './Standards/TableEventTypesClassifier.js';
import { querySelector } from '../../tea-modules/Functions/DOM/Queries/querySelector.js';


/**
 * @class
 *
 * @description Implements logic of table pagination element.
 **/
export class TablePagination
{
    /**
     * @public
     *
     * @type { TablePaginationSettings }
     **/
    settings;
    
    /**
     * @public
     *
     * @type { Table }
     **/
    parentInstance;
    
    /**
     * @public
     *
     * @type { CustomEvents }
     **/
    customEvents;
    
    /**
     * @public
     *
     * @type { HTMLUListElement }
     **/
    element;
    
    /**
     * @public
     *
     * @type { HTMLLIElement }
     **/
    rightArrow;
    
    /**
     * @public
     *
     * @type { HTMLLIElement }
     **/
    leftArrow;
    
    /**
     * @public
     *
     * @type { HTMLLIElement[] }
     **/
    items = [];
    
    /**
     * @constructor
     *
     * @param { TablePaginationSettingProperties } settings
     *
     * @param { Table } parentInstance
     **/
    constructor(settings, parentInstance)
    {
        this.settings = new TablePaginationSettings(settings);
        
        this.parentInstance = parentInstance;
        
        this.customEvents = new CustomEvents();
        
        this.element = this._createElement();
    }
    
    /**
     * @public
     *
     * @description Implements initialize of the element.
     *
     * @return { void }
     **/
    initialization()
    {
        this.element.addEventListener('click', this._clickHandler.bind(this));
        
        if (this.withCursorKeys() && this.parentInstance.withPagination())
        {
            document.addEventListener('keyup', this._documentKeyupHandler.bind(this));
        }
    }
    
    /**
     * @private
     *
     * @description Implements handler for the document key up event.
     *
     * @param { KeyboardEvent } event
     *
     * @return { void }
     **/
    _documentKeyupHandler(event)
    {
        if (this.isDisabled() || !event.shiftKey)
        {
            return ;
        }
        
        switch (event.code)
        {
            case 'ArrowRight':
            {
                this.next();
                
                break ;
            }
            case 'ArrowLeft':
            {
                this.previous();
                
                break ;
            }
        }
    }
    
    /**
     * @private
     *
     * @description Implements handler for the pagination click event.
     *
     * @param { PointerEvent } event
     *
     * @return { void }
     **/
    _clickHandler(event)
    {
        /**
         * @type { HTMLLIElement }
         **/
        const item = event.target.closest(`[${ this.settings.itemAttribute }]`);
        
        if (!item)
        {
            return ;
        }
        
        const page = parseInt(item.dataset.page);
        
        this.setPage(page);
        
        this.render();
        
        this.customEvents.execute(TableEventTypesClassifier.PAGINATION_ITEM_CLICK, item, page, event, this);
    }
    
    /**
     * @private
     *
     * @description Creates html node of the element.
     *
     * @return { HTMLUListElement }
     **/
    _createElement()
    {
        return createElement('ul', { class: this.settings.elementClass });
    }
    
    /**
     * @private
     *
     * @description Creates html node of the item element.
     *
     * @param { number } page
     *
     * @param { ...(Element | string) } nodes
     *
     * @return { HTMLLIElement }
     **/
    _createItem(page, ...nodes)
    {
        const link = this._createLink(nodes);
        
        return createElement('li', { class: this.settings.itemClass, [this.settings.itemAttribute]: '', [this.settings.itemPageAttribute]: page }, [ link ]);
    }
    
    /**
     * @private
     *
     * @description Creates right arrow item.
     *
     * @param { number } page
     *
     * @return { HTMLLIElement }
     **/
    _createRightArrowItem(page)
    {
        return this._createItem(page, this._createRightArrowSvg());
    }

    /**
     * @private
     *
     * @description Creates left arrow item.
     *
     * @param { number } page
     *
     * @return { HTMLLIElement }
     **/
    _createLeftArrowItem(page)
    {
        return this._createItem(page, this._createLeftArrowSvg());
    }
    
    /**
     * @private
     *
     * @description Creates html node of the link element.
     *
     * @param { Element[] | string[] } nodes
     *
     * @return { HTMLAnchorElement }
     **/
    _createLink(nodes)
    {
        return createElement('a', { class: this.settings.linkClass }, nodes);
    }
    
    /**
     * @private
     *
     * @description Creates html node of the right arrow element.
     **
     * @return { SVGElement }
     **/
    _createRightArrowSvg()
    {
        return createSvgElement(this.settings.rightIconId, { class: this.settings.iconClass });
    }
    
    /**
     * @private
     *
     * @description Creates html node of the left arrow element.
     **
     * @return { SVGElement }
     **/
    _createLeftArrowSvg()
    {
        return createSvgElement(this.settings.leftIconId, { class: this.settings.iconClass });
    }
    
    /**
     * @private
     *
     * @description Implements processing with the arrows.
     *
     * @return { void }
     **/
    _arrowsProcessing()
    {
        this.setItemState(this.leftArrow, TableStateTypesClassifier.DISABLED, this.isStart());
        
        this.setItemState(this.rightArrow, TableStateTypesClassifier.DISABLED, this.isEnd());
    }
    
    /**
     * @private
     *
     * @description Implements processing with page property, after updating the settings.
     *
     * @return { void }
     **/
    _pageProcessing()
    {
        if (this.getCount() !== 0 && this.getPage() > this.getCount())
        {
            this.setPage(this.getCount());
        }
        
        if (this.getPage() === 0)
        {
            this.setPage(1);
        }
    }
    
    /**
     * @public
     *
     * @description Returns item by the given index.
     *
     * @param { number } index
     *
     * @return { HTMLLIElement }
     **/
    getItem(index)
    {
        return this.items[index];
    }
    
    /**
     * @public
     *
     * @description Sets active state on the given item. Removes active state from the last item.
     *
     * @return { void }
     **/
    setActive(item)
    {
        const last = querySelector(`[${ this.settings.itemAttribute }].${ TableStateTypesClassifier.ACTIVE }`, { root: this.parentInstance.element });
        
        if (last)
        {
            this.setItemState(last, TableStateTypesClassifier.ACTIVE, false);
        }
        
        if (item === this.rightArrow)
        {
            item = this.getItem(this.getNext() - 1);
        }
        
        if (item === this.leftArrow)
        {
            item = this.getItem(this.getPrevious() - 1);
        }
        
        this.setItemState(item, TableStateTypesClassifier.ACTIVE, true);
        
        this._arrowsProcessing();
    }
    
    /**
     * @public
     *
     * @description Switches cursor to next item.
     *
     * @return { void }
     **/
    next()
    {
        this.setPage(this.getNext());
        
        this.render();
        
        this.customEvents.execute(TableEventTypesClassifier.PAGINATION_ITEM_CHANGE, this);
    }
    
    /**
     * @public
     *
     * @description Switches cursor to previous item.
     *
     * @return { void }
     **/
    previous()
    {
        this.setPage(this.getPrevious());
        
        this.render();
        
        this.customEvents.execute(TableEventTypesClassifier.PAGINATION_ITEM_CHANGE, this);
    }
    
    /**
     * @public
     *
     * @description Sets the given state to the element by the given force.
     *
     * @param { TableStateTypesClassifier } state
     *
     * @param { boolean } force
     *
     * @return { void }
     **/
    setState(state, force)
    {
        this.element.classList.toggle(state, force);
    }
    
    /**
     * @public
     *
     * @description Checks if the element contains a given state.
     *
     * @param { TableStateTypesClassifier } state
     *
     * @return { boolean }
     **/
    checkState(state)
    {
        return this.element.classList.contains(state);
    }
    
    /**
     * @public
     *
     * @description Sets the given state to the item element by the given force.
     *
     * @param { HTMLLIElement } item
     *
     * @param { TableStateTypesClassifier } state
     *
     * @param { boolean } force
     *
     * @return { void }
     **/
    setItemState(item, state, force)
    {
        item.classList.toggle(state, force);
    }
    
    /**
     * @public
     *
     * @description Checks if the given item contains a given state.
     *
     * @param { HTMLLIElement } item
     *
     * @param { TableStateTypesClassifier } state
     *
     * @return { boolean }
     **/
    checkItemState(item, state)
    {
        return item.classList.contains(state);
    }
    
    /**
     * @public
     *
     * @description Sets the given value in to page property.
     *
     * @param { number } value
     *
     * @return { void }
     **/
    setPage(value)
    {
        this.update({ page: value });
    }
    
    /**
     * @public
     *
     * @description Sets the given value in to limit property.
     *
     * @param { number } value
     *
     * @return { void }
     **/
    setLimit(value)
    {
        this.update({ limit: value });
    }
    
    /**
     * @public
     *
     * @description Implements render items.
     *
     * @return { void }
     **/
    render()
    {
        this.clear();
        
        this.rightArrow = this._createRightArrowItem(this.getNext());
        
        this.leftArrow = this._createLeftArrowItem(this.getPrevious());
        
        this._arrowsProcessing();
        
        const fragment = createFragment();
        
        fragment.append(this.leftArrow);
        
        for (let i = this.getStart(), n = this.getEnd(); i <= n; i++)
        {
            const item = this._createItem(i, i.toString());
            
            this.items.push(item);
            
            if (i === this.getPage())
            {
                this.setActive(item);
            }
            
            fragment.append(item);
        }
        
        fragment.append(this.rightArrow);
        
        this.element.append(fragment);
    }
    
    /**
     * @public
     *
     * @description Clears all inner html of the element.
     *
     * @return { void }
     **/
    clear()
    {
        this.element.innerHTML = '';
        
        this.items = [];
    }
    
    /**
     * @public
     *
     * @description Checks if the current page is first.
     *
     * @return { boolean }
     **/
    isStart()
    {
        return this.getPage() === 1;
    }
    
    /**
     * @public
     *
     * @description Checks if the current page is end.
     *
     * @return { boolean }
     **/
    isEnd()
    {
        return this.getPage() === this.getCount();
    }
    
    /**
     * @public
     *
     * @description Updates settings by the given settings.
     *
     * @param { TablePaginationSettingProperties ? } settings
     *
     * @return { void }
     **/
    update(settings)
    {
        structureMerge(this.settings, settings);
        
        this._pageProcessing();
    }
    
    /**
     * @public
     *
     * @description return start for the loop.
     *
     * @return { number }
     **/
    getStart()
    {
        let start = this.getPage();
        
        if (start - 2 < 0 || start - 1 < 0)
        {
            start = 1;
        }
        else if (start - 1 === 1)
        {
            start -= 1;
        }
        else
        {
            start -= 2;
        }
        
        return start;
    }
    
    /**
     * @public
     *
     * @description return end for the loop.
     *
     * @return { number }
     **/
    getEnd()
    {
        let end = this.getPage();
        
        if (end + 2 > this.getCount() || end + 1 > this.getCount())
        {
            end = this.getCount();
        }
        else
        {
            end += 2;
        }
        
        return end;
    }
    
    /**
     * @public
     *
     * @description return total count of the pages.
     *
     * @return { number }
     **/
    getCount()
    {
        return Math.ceil(this.settings.total / this.settings.limit);
    }
    
    /**
     * @public
     *
     * @description return number of the current page.
     *
     * @return { number }
     **/
    getPage()
    {
        return this.settings.page;
    }
    
    /**
     * @public
     *
     * @description return number of the limit.
     *
     * @return { number }
     **/
    getLimit()
    {
        return this.settings.limit;
    }
    
    /**
     * @public
     *
     * @description return number of the previous page.
     *
     * @return { number }
     **/
    getPrevious()
    {
        if (this.getPage() - 1 < 1)
        {
            return 1;
        }
        
        return this.getPage() - 1;
    }
    
    /**
     * @public
     *
     * @description return number of the next page.
     *
     * @return { number }
     **/
    getNext()
    {
        if (this.getPage() + 1 > this.getCount())
        {
            return this.getCount();
        }
        
        return this.getPage() + 1;
    }
    
    /**
     * @public
     *
     * @description Returns position property from the settings.
     *
     * @return { TablePositionsClassifier }
     **/
    getPosition()
    {
        return this.settings.position;
    }
    
    /**
     * @public
     *
     * @description Determines whether the cursor keys should switch pages.
     *
     * @return { boolean }
     **/
    withCursorKeys()
    {
        return this.settings.withCursorKeys;
    }
    
    /**
     * @public
     *
     * @description Checks if the current component state is disabled.
     *
     * @return { boolean }
     **/
    isDisabled()
    {
        return this.checkState(TableStateTypesClassifier.DISABLED);
    }
}
