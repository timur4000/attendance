import { createElement } from '../../tea-modules/Functions/DOM/Elements/createElement.js';
import { CustomSelectContentItemStates } from './CustomSelectContentItemStates.js';
import { isEmpty } from '../../tea-modules/Functions/Is/isEmpty.js';
import { CustomEvents } from '../../tea-modules/Classes/CustomEvents/CustomEvents.js';
import { CustomSelectEventTypesClassifier } from './CustomSelectEventTypesClassifier.js';
import { toTree } from '../../tea-modules/Functions/Arrays/toTree.js';
import { isStructureEmpty } from '../../tea-modules/Functions/Is/isStructureEmpty.js';
import { querySelector } from '../../tea-modules/Functions/DOM/Queries/querySelector.js';


/**
 * @class
 *
 * @description Implements help work for content of the custom select.
 **/
export class CustomSelectContent
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
     * @type { CustomSelectContentSettings }
     **/
    settings;
    
    /**
     * @public
     *
     * @type { HTMLOptionsCollection }
     **/
    options;
    
    /**
     * @public
     *
     * @type { HTMLDivElement }
     **/
    search;
    
    /**
     * @public
     *
     * @type { HTMLInputElement }
     **/
    searchInput;
    
    /**
     * @public
     *
     * @type { HTMLUListElement }
     **/
    list;
    
    /**
     * @public
     *
     * @type { string }
     **/
    query = '';
    
    /**
     * @public
     *
     * @type { number }
     **/
    timeout = 0;
    
    /**
     * @public
     *
     * @type { HTMLOptionElement }
     **/
    selectedOption;
    
    /**
     * @constructor
     *
     * @param { CustomSelectContentSettings } settings
     *
     * @param { HTMLOptionsCollection } options
     **/
    constructor(settings, options)
    {
        this.customEvents = new CustomEvents();
        
        this.settings = settings;
        
        this.options = options;
        
        if (this.settings.withSearch)
        {
            this.searchInput = this.createSearchInput();
            
            this.search = this.createSearch();
        }
        
        // this.list = this.createList();
        
        this.element = this.createElement();
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
        if (this.settings.withSearch)
        {
            this.searchInput.addEventListener('keyup', this._searchInputKeyupHandler.bind(this));
        }
    }
    
    /**
     * @private
     *
     * @description Implements handler for the search input keyup event.
     *
     * @return { void }
     **/
    _searchInputKeyupHandler()
    {
        clearTimeout(this.timeout);
        
        this.timeout = setTimeout(this._searchInputKeyupTimeoutCallback.bind(this), 300);
    }
    
    /**
     * @private
     *
     * @description Implements handler for the search input keyup timeout callback.
     *
     * @return { void }
     **/
    _searchInputKeyupTimeoutCallback()
    {
        this.query = this.searchInput.value;
        
        this.customEvents.execute(CustomSelectEventTypesClassifier.KEY_UP, this);
    }
    
    /**
     * @public
     *
     * @description Clears the search input.
     *
     * @return { void }
     **/
    clearSearchInput()
    {
        this.searchInput.value = '';
        
        this.query = '';
    }
    
    /**
     * @protected
     *
     * @description Returns html node of the base element.
     *
     * @return { HTMLDivElement }
     **/
    createElement()
    {
        const nodes = [];
        
        if (this.settings.withSearch)
        {
            nodes.push(this.search);
        }
        
        return createElement('div', { class: this.settings.elementClass, [ this.settings.elementAttribute ]: '' }, nodes);
    }
    
    /**
     * @protected
     *
     * @description Returns html node of the search element.
     *
     * @return { HTMLDivElement }
     **/
    createSearch()
    {
        return createElement('div', { class: this.settings.searchClass }, [ this.searchInput ]);
    }
    
    /**
     * @protected
     *
     * @description Returns html node of the search input element.
     *
     * @return { HTMLInputElement }
     **/
    createSearchInput()
    {
        return createElement('input', { class: this.settings.searchInputClass, placeholder: this.settings.searchInputPlaceholder });
    }
    
    /**
     * @protected
     *
     * @description Returns html node of the list element.
     *
     * @return { HTMLUListElement }
     **/
    createList()
    {
        return createElement('ul', { class: this.settings.listClass });
    }
    
    /**
     * @public
     *
     * @description Returns html node of the list item element.
     *
     * @param { string } value
     *
     * @param { string } text
     *
     * @param { number } level
     *
     * @return { HTMLLIElement }
     **/
    createListItem(value, text, level = 1)
    {
        const span = this.createListItemValue(text,  level);
        
        return createElement('li', { class: this.settings.listItemClass, [ this.settings.listItemValueAttribute ]: value }, [ span ]);
    }
    
    /**
     * @protected
     *
     * @description Returns html node of the list item value element.
     *
     * @param { string } text
     *
     * @param { number } level
     *
     * @return { HTMLSpanElement }
     **/
    createListItemValue(text, level)
    {
        return createElement('span', { class: this.settings.listItemValueClass, style: `--${ this.settings.levelVariableName }: ${ level }` }, [ text ]);
    }
    
    /**
     * @public
     *
     * @description Returns html node of the empty list item element.
     *
     * @return { HTMLLIElement }
     **/
    createEmptyListItem()
    {
        const item = this.createListItem('', this.settings.noResultsText);
        
        this.setItemState(CustomSelectContentItemStates.DISABLED, item, true);
        
        return item;
    }
    
    /**
     * @private
     *
     * @description Implements recursive creating items and returns it.
     *
     * @param { Array | HTMLOptionsCollection } options
     *
     * @param { number } level
     *
     * @return { HTMLUListElement }
     **/
    _createItems(options, level = 1)
    {
        const list = this.createList();
     
        if (level > this.settings.treeMaxLevel)
        {
            return list;
        }
        
        if (!options.length)
        {
            list.append(this.createEmptyListItem());
            
            return list;
        }
        
        for (let i = 0, n = options.length; i < n; i++)
        {
            const isOptionsCollection = options instanceof HTMLOptionsCollection;
            
            const option = options[i];
            
            let value = (isOptionsCollection) ? option.value : option[this.settings.keyValue];
            
            let text = (isOptionsCollection) ? option.text : option[this.settings.keyText];
            
            if (!this.isQueryValid(text))
            {
                continue ;
            }
            
            const item = this.createListItem(value, text, level);
            
            if (isOptionsCollection && option.selected || !isOptionsCollection && this.selectedOption && this.selectedOption.value === value.toString())
            {
                this.setItemState(CustomSelectContentItemStates.SELECTED, item, true);
            }
            
            list.append(item);
            
            if (!isStructureEmpty(option.tree))
            {
                item.append(this._createItems(option.tree, level + 1));
            }
        }
        
        return list;
    }
    
    /**
     * @public
     *
     * @description Creates items by given options.
     *
     * @param { Array | HTMLOptionsCollection } options
     *
     * @return { void }
     **/
    createItems(options)
    {
        this.clear();
        
        if (this.settings.isTree)
        {
            options = toTree(options, this.settings.treeIdKey, this.settings.treeParentIdKey);
        }
        
        this.list = this._createItems(options);
        
        this.fill(this.list);
    }
    
    /**
     * @protected
     *
     * @description Implements processing scroll to selected item.
     *
     * @return { void }
     **/
    scrollToSelectedItemProcessing()
    {
        const item = this.getSelectedItem();
        
        if (!item)
        {
            return ;
        }
        
        const listHeight = this.list.offsetHeight;
        
        const itemValueHeight = this.getItemValue(item).offsetHeight;
        
        let scroll = item.offsetTop + (itemValueHeight / 2) - (listHeight / 2);
        
        this.list.scrollTo(0, scroll);
    }
    
    /**
     * @public
     *
     * @description Returns the selected item.
     *
     * @return { HTMLLIElement }
     **/
    getSelectedItem()
    {
        return querySelector(`li.${ CustomSelectContentItemStates.SELECTED }`, { root: this.element });
    }
    
    /**
     * @public
     *
     * @description Returns the selected item by the given value.
     *
     * @param { string } value
     *
     * @return { HTMLLIElement }
     **/
    getSelectedItemByValue(value)
    {
        return querySelector(`li.${ CustomSelectContentItemStates.SELECTED }[${ this.settings.listItemValueAttribute }="${ value }"]`, { root: this.element });
    }
    
    /**
     * @public
     *
     * @description Returns item value tag of the given item.
     *
     * @param { HTMLLIElement } item
     *
     * @return
     **/
    getItemValue(item)
    {
        return item.firstElementChild;
    }
    
    /**
     * @public
     *
     * @description Checks if the given value contains the query string.
     *
     * @param { string } value
     *
     * @return { boolean }
     **/
    isQueryValid(value)
    {
        if (isEmpty(this.query))
        {
            return true;
        }
        
        return value.toLowerCase().includes(this.query.toLowerCase());
    }
    
    /**
     * @public
     *
     * @description Sets the given state to the given item by force.
     *
     * @param { string } state
     *
     * @param { HTMLLIElement } item
     *
     * @param { boolean } force
     **/
    setItemState(state, item, force)
    {
        item.classList.toggle(state, force);
    }
    
    /**
     * @public
     *
     * @description Fills the given list to element.
     *
     * @param { HTMLUListElement } list
     *
     * @return { void }
     **/
    fill(list)
    {
        this.clear();
        
        this.element.append(list);
    }
    
    /**
     * @public
     *
     * @description Removes all items from list.
     *
     * @return { void }
     **/
    clear()
    {
        if (!this.list)
        {
            return ;
        }
        
        this.list.remove();
    }
    
    /**
     * @public
     *
     * @description Places content to document.
     *
     * @param { CustomSelect } instance
     *
     * @return { void }
     **/
    async draw(instance)
    {
        const rect = instance.rect();

        this.element.style.top = (rect.top + window.scrollY + rect.height) + 'px';

        this.element.style.left = (rect.left) + 'px';

        this.element.style.minWidth = rect.width + 'px';

        if (!this.isDraw())
        {
            document.body.append(this.element);
            
            this.scrollToSelectedItemProcessing();
        }
    }
    
    /**
     * @public
     *
     * @description Checks if the content is a draw in document.
     *
     * @return { boolean }
     **/
    isDraw()
    {
        return document.body.contains(this.element);
    }
    
    /**
     * @public
     *
     * @description Removes content from the document.
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
     * @description Checks if the given item is contains in the list.
     *
     * @param { HTMLLIElement } item
     *
     * @return { boolean }
     **/
    isItemContains(item)
    {
        if (!this.isDraw() || !this.list)
        {
            return false;
        }
        
        return this.list.contains(item);
    }
}
