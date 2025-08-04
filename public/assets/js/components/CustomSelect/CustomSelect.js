import { querySelector }        from '../../tea-modules/Functions/DOM/Queries/querySelector.js';
import { CustomSelectInput }    from './CustomSelectInput.js';
import { CustomSelectSettings } from './CustomSelectSettings.js';
import { createElement }        from '../../tea-modules/Functions/DOM/Elements/createElement.js';
import { CustomSelectContent }  from './CustomSelectContent.js';
import { CustomSelectStates }   from './CustomSelectStates.js';
import { isNull }               from '../../tea-modules/Functions/Is/isNull.js';
import { isEmpty }              from '../../tea-modules/Functions/Is/isEmpty.js';
import { getAttribute }         from '../../tea-modules/Functions/DOM/Attributes/getAttribute.js';
import { CustomEvents }         from '../../tea-modules/Classes/CustomEvents/CustomEvents.js';
import { CustomSelectEventTypesClassifier } from './CustomSelectEventTypesClassifier.js';
import { HttpRequest } from '../../tea-modules/Classes/Requests/HttpRequest.js';
import { isStructureEmpty } from '../../tea-modules/Functions/Is/isStructureEmpty.js';
import { HttpRequestEventsClassifier } from '../../tea-modules/Classes/Requests/Standards/HttpRequestEventsClassifier.js';
import { HttpStatusesClassifier } from '../../tea-modules/Classes/Requests/Standards/HttpStatusesClassifier.js';
import { CustomSelectMultipleInput } from './CustomSelectMultipleInput.js';
import { CustomSelectContentItemStates } from './CustomSelectContentItemStates.js';
import { Storage } from '../../tea-modules/Classes/Storage/Storage.js';


/**
 * @class
 *
 * @description Implements base logic for all custom selects.
 **/
export class CustomSelect
{
    /**
     * @static
     *
     * @public
     *
     * @type { CustomSelect[] }
     **/
    static instances = [];
    
    /**
     * @public
     *
     * @type { HTMLDivElement }
     **/
    element;
    
    /**
     * @public
     *
     * @type { HTMLSelectElement }
     **/
    select;
    
    /**
     * @public
     *
     * @type { CustomSelectSettings }
     **/
    settings;
    
    /**
     * @public
     *
     * @type { CustomEvents }
     **/
    customEvents;
    
    /**
     * @public
     *
     * @type { CustomSelectInput | CustomSelectMultipleInput }
     **/
    input;
    
    /**
     * @public
     *
     * @type { CustomSelectContent }
     **/
    content;
    
    /**
     * @public
     *
     * @type { Object }
     **/
    cache;
    
    /**
     * @public
     *
     * @type { boolean }
     **/
    isLoaded = false;
    
    /**
     * @public
     *
     * @type { HttpRequest }
     **/
    httpRequest;
    
    /**
     * @constructor
     *
     * @param { string | Element } selector
     *
     * @param { CustomSelectSettingsItems ? } settings
     *
     * @return { CustomSelect }
     **/
    constructor(selector, settings)
    {
        this.select = querySelector(selector);
        
        this.settings = new CustomSelectSettings(settings, this.select);
        
        this.settings.id = this.settings.id.replace(/%SELECT_NAME%/, this.getName());
        
        this.customEvents = new CustomEvents();
        
        this.input = this._getInput();
        
        this.content = new CustomSelectContent(this.settings.contentSettings, this.select.options);
        
        this.element = this.createElement();
        
        if (this.settings.isStorage)
        {
            this.storageProcessing();
        }
        
        CustomSelect.instances.push(this);
    }
    
    /**
     * @public
     *
     * @description Implements initialize base methods and logic.
     *
     * @return { void }
     **/
    initialization()
    {
        this._initialProcessing();
        
        this.content.initialization();
        
        this.setState(CustomSelectStates.WITHOUT_LABEL, !this.settings.inputSettings.withLabel);
        
        this._replaceProcessing();
        
        document.addEventListener('click', this._documentClickHandler.bind(this));
        
        document.addEventListener('scroll', this._documentScrollHandler.bind(this));
        
        window.addEventListener('resize', this._windowResizeHandler.bind(this));
        
        this.content.customEvents.subscribe(CustomSelectEventTypesClassifier.KEY_UP, this._contentKeyUpHandler.bind(this));
    }

    /**
     * @private
     *
     * @description Creates input depending on state multiple.
     *
     * @return { CustomSelectInput | CustomSelectMultipleInput }
     **/
    _getInput()
    {
        return this.isMultiple() ? new CustomSelectMultipleInput(this.settings.multipleInputSettings) : new CustomSelectInput(this.settings.inputSettings);
    }
    
    /**
     * @private
     *
     * @description Implements processing of initial options.
     *
     * @return { void}
     **/
    _initialProcessing()
    {
        if (this.isEmpty())
        {
            this.setUnselect(true);
            
            return ;
        }
        
        if (this.isMultiple())
        {
            for (let i = 0, n = this.getSelectedOptions().length; i < n; i++)
            {
                const option = this.getSelectedOptions()[i];
                
                this.input.setValue(option.text, option.value);
            }
        }
        else
        {
            this.setOption(this.getSelected(0).text, this.getSelected(0).value);
        }
    }
    
    /**
     * @private
     *
     * @description Implements handler for the content key up event.
     *
     * @param { CustomSelectContent } instance
     *
     * @return { void }
     **/
    async _contentKeyUpHandler(instance)
    {
        const options = await this.getOptions();
        
        this.content.createItems(this.isServerSide() ? options.data : options);
        
        this.content.draw(this);
    }
    
    /**
     * @public
     *
     * @description Implements request to the server.
     *
     * @return { Promise<any> }
     **/
    async request()
    {
        this.httpRequest = new HttpRequest(this.settings.httpRequestSettings);
     
        this.httpRequest.customEvents.subscribe(HttpRequestEventsClassifier.CANCEL, this._httpRequestCancelHandler.bind(this));
        
        return await this.httpRequest.execute();
    }
    
    /**
     * @private
     *
     * @description Implements handler for the cancel http request event.
     *
     * @return { void }
     **/
    _httpRequestCancelHandler()
    {
        this.cache = undefined;
    }
    
    /**
     * @private
     *
     * @description Implements replace select to element.
     *
     * @return { void }
     **/
    _replaceProcessing()
    {
        this.select.after(this.element);
        
        this.element.append(this.select);
    }
    
    /**
     * @private
     *
     * @description Implements handler for the document click event.
     *
     * @param { Element } target
     *
     * @return { void }
     **/
    _documentClickHandler({ target })
    {
        const element = target.closest(`[${ this.settings.elementAttribute }]`);

        const content = target.closest(`[${ this.settings.contentSettings.elementAttribute }]`);

        const item = target.closest(`[${ this.settings.contentSettings.listItemValueAttribute }]`);

        const valueClose = target.closest(`.${ this.input.settings.valueCloseClass }`);
        
        if (valueClose && element === this.element)
        {
            this.removeOptionByClose(valueClose);
            
            if (this.isOpen())
            {
                return ;
            }
        }
        
        if (!isNull(item) && this.content.isItemContains(item))
        {
            this.setOptionByItem(item);
            
            if (this.isMultiple())
            {
                // code
            }
            else
            {
                this.close();
            }
            
            return ;
        }

        if (!isNull(content))
        {
            return ;
        }

        if (this.isOpen())
        {
            this.close();

            return ;
        }

        if (!element || element !== this.element)
        {
            return ;
        }

        this.open();
    }
    
    /**
     * @public
     *
     * @description Gets option by the given value.
     *
     * @param { string } value
     *
     * @return { HTMLOptionElement | null }
     **/
    getOption(value)
    {
        for (let i = 0, n = this.select.options.length; i < n; i++)
        {
            if (this.select.options[i].value === value)
            {
                return this.select.options[i];
            }
        }
        
        return null;
    }
    
    /**
     * @public
     *
     * @description Sets option to select.
     *
     * @param { string } text
     *
     * @param { string } value
     *
     * @return { void }
     **/
    setOption(text, value)
    {
        if (this.isMultiple())
        {
            if (this.getOption(value).selected)
            {
                this.removeOption(value);
            }
            else
            {
                this.input.setValue(text, value);
                
                this.getOption(value).selected = true;
            }
        }
        else
        {
            if (this.isServerSide())
            {
                this.selectClear();
                
                const option = this.createOption(text, value, true);
                
                this.content.selectedOption = option;
                
                this.select.append(option);
            }
            else
            {
                this.getSelected(0).selected = false;
                
                this.getOption(value).selected = true;
            }
            
            this.input.setValue(text);
        }
        
        if (this.isMultiple())
        {
            this.content.draw(this);
        }
        
        this.setUnselect(this.isEmpty());
    }
    
    /**
     * @public
     *
     * @description Removes option from select.
     *
     * @param { string } value
     *
     * @return { void }
     **/
    removeOption(value)
    {
        const option = this.getOption(value);
        
        this.input.removeValue(value);
        
        option.selected = false;
        
        if (this.isMultiple())
        {
            this.content.draw(this);
        }
    }
    
    /**
     * @public
     *
     * @description .
     *
     * @param { HTMLLIElement } valueClose
     *
     * @return { void }
     **/
    removeOptionByClose(valueClose)
    {
        const domValue = valueClose.parentElement;
        
        const value = getAttribute(domValue, this.settings.contentSettings.listItemValueAttribute);
        
        const option = this.getOption(value);

        if (!option)
        {
            return ;
        }
        
        this.removeOption(value);
        
        const item = this.content.getSelectedItemByValue(value);
        
        if (!item)
        {
            return ;
        }
        
        this.content.setItemState(CustomSelectContentItemStates.SELECTED, item,false);
    }
    
    /**
     * @public
     *
     * @description Sets option to select by the given item.
     *
     * @param { HTMLLIElement | undefined } item
     *
     * @return { void }
     **/
    setOptionByItem(item)
    {
        const value = getAttribute(item, this.settings.contentSettings.listItemValueAttribute);
        
        const isSelected = this.isSelected(value);
        
        this.setOption(item.firstElementChild.textContent, value);
        
        if (this.settings.isStorage)
        {
            this.setStorage(item);
        }
        
        if (isSelected)
        {
            this.content.setItemState(CustomSelectContentItemStates.SELECTED, item,false);
        }
        else
        {
            this.content.setItemState(CustomSelectContentItemStates.SELECTED, item,true);
            
            this.customEvents.execute(CustomSelectEventTypesClassifier.SELECT_ITEM, item, this);
        }
    }
    
    /**
     * @public
     *
     * @description Implements process of setting options from storage.
     *
     * @return { void }
     **/
    storageProcessing()
    {
        const storage = JSON.parse(Storage.get(this.settings.id));
        
        if (!storage)
        {
            return ;
        }
        
        for (let i = 0, n = storage.items.length; i < n; i++)
        {
            const item = storage.items[i];
            
            this.setOption(item.text, item.value);
        }
    }
    
    /**
     * @public
     *
     * @description Sets the given item to storage.
     *
     * @param { HTMLLIElement } item
     *
     * @return { void }
     **/
    setStorage(item)
    {
        let storage = this.getStorage();

        if (!storage)
        {
            storage = { items: [] };
        }
        
        const storageItem = { text: item.firstElementChild.textContent, value: item.dataset.value };
        
        if (this.isMultiple())
        {
            storage.items.push(storageItem);
        }
        else
        {
            storage.items.splice(0, 1, storageItem)
        }
        
        storage.isMultiple = this.isMultiple();

        Storage.set(this.settings.id, JSON.stringify(storage));
    }
    
    /**
     * @public
     *
     * @description Returns value from storage.
     *
     * @return { object | null }
     **/
    getStorage()
    {
        return JSON.parse(Storage.get(this.settings.id));
    }
    
    /**
     * @protected
     *
     * @description Implements process with the given item.
     *
     * @param { HTMLLIElement } item
     *
     * @return { boolean }
     *
     * @deprecated
     **/
    itemClickProcessing(item)
    {
        this.setSelected(item);
        
        this.close();
     
        this.customEvents.execute(CustomSelectEventTypesClassifier.SELECT_ITEM, item, this);
        
        return true;
    }
    
    /**
     * @private
     *
     * @description Implements handler for the document scroll event.
     *
     * @return { void }
     **/
    _documentScrollHandler()
    {
        if (!this.isOpen())
        {
            return;
        }
        
        this.content.draw(this);
    }
    
    /**
     * @private
     *
     * @description Implements handler for the window resize event.
     *
     * @return { void }
     **/
    _windowResizeHandler()
    {
        if (!this.isOpen())
        {
            return ;
        }
        
        this.content.draw(this);
    }
    
    /**
     * @protected
     *
     * @description Returns html node of base element.
     *
     * @return { HTMLDivElement }
     **/
    createElement()
    {
        return createElement('div', { class: this.settings.elementClass, [this.settings.elementAttribute]: '' }, [ this.input.element ]);
    }
    
    /**
     * TODO: Need refactoring
     *
     * @public
     *
     * @description Opens the content.
     *
     * @return { void }
     **/
    async open()
    {
        this.setState(CustomSelectStates.LOADING, true);
        
        this.input.loadProcessing(true);
        
        this.setState(CustomSelectStates.OPEN, true);
        
        let options;
        
        if (this.isServerSide())
        {
            options = (await this.getOptions()).data;
        }
        else
        {
            options = this.select.options;
        }
        
        if (options)
        {
            this.content.createItems(options);

            this.content.draw(this);
        }
        
        if (this.content.settings.withSearch)
        {
            this.content.searchInput.focus();
        }
        
        this.setState(CustomSelectStates.LOADING, false);
        
        this.input.loadProcessing(false);
    }
    
    /**
     * @public
     *
     * @description Returns options by the settings.
     *
     * @return { Promise<any> | HTMLOptionsCollection }
     **/
    async getOptions()
    {
        if (this.isServerSide())
        {
            if (this.isSaveCache() && this.cache)
            {
                return this.cache;
            }
            
            const request = this.request();
            
            this.isLoaded = true;
            
            this.cache = request;
            
            return request;
        }
        
        return this.select.options;
    }
    
    /**
     * @public
     *
     * @description Closes the content.
     *
     * @return { void }
     **/
    close()
    {
        this.setState(CustomSelectStates.OPEN, false);
        
        this.content.clear();
        
        this.content.remove();
        
        if (this.content.settings.withSearch)
        {
            this.content.searchInput.blur();
            
            this.content.clearSearchInput();
        }
        
        if (this.isServerSide() && !this.isRequestSuccess())
        {
            this.httpRequest.cancel();
        }
    }
    
    /**
     * @public
     *
     * @description Checks if the select is an empty.
     *
     * @return { boolean }
     **/
    isEmpty()
    {
        return !(this.getSelected() && !isEmpty(this.getSelected().value));
    }
    
    /**
     * @public
     *
     * @description Checks if the select is an open.
     *
     * @return { boolean }
     **/
    isOpen()
    {
        return this.checkState(CustomSelectStates.OPEN);
    }
    
    /**
     * @public
     *
     * @description Sets selected option by the given value.
     *
     * @param { HTMLLIElement } item
     *
     * @return { void }
     *
     * @deprecated
     **/
    setSelected(item)
    {
        const value = getAttribute(item, this.settings.contentSettings.listItemValueAttribute);
        
        const span = this.content.getItemValue(item);
        
        const option = this.createOption(span.innerText, value, true);
        
        if (this.isServerSide())
        {
            this.selectClear();
            
            this.select.add(option);
        }
        else
        {
            this.select.value = value;
        }
        
        this.input.setValue(this.getSelected().text);

        this.content.selectedOption = option;
        
        this.setUnselect(this.isEmpty());
    }
    
    /**
     * @public
     *
     * @description Clears the select element.
     *
     * @return { void }
     **/
    selectClear()
    {
        this.select.innerHTML = '';
    }
    
    /**
     * @public
     *
     * @description Creates and returns option by the given arguments.
     *
     * @param { string } text
     *
     * @param { string } value
     *
     * @param { boolean } defaultSelected
     *
     * @return { HTMLOptionElement }
     **/
    createOption(text, value, defaultSelected = false)
    {
        return new Option(text, value, defaultSelected);
    }
    
    /**
     * @public
     *
     * @description Returns selected option.
     *
     * @param { number } [index=0]
     *
     * @return { HTMLOptionElement }
     **/
    getSelected(index = 0)
    {
        return this.select.selectedOptions.item(index);
    }
    
    /**
     * @public
     *
     * @description Returns selected options.
     *
     * @return { HTMLOptionsCollection }
     **/
    getSelectedOptions()
    {
        return this.select.selectedOptions;
    }
    
    /**
     * @public
     *
     * @description Sets state to element by force.
     *
     * @param { string } state
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
     * @description Checks if the select contains the given state.
     *
     * @param { string } state
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
     * @description Sets unselect state to element by force.
     *
     * @param { boolean } force
     *
     * @return { void }
     **/
    setUnselect(force)
    {
        this.setState(CustomSelectStates.UNSELECT, force);
    }
    
    /**
     * @public
     *
     * @description Returns bounding rect of the element.
     *
     * @return { DOMRect }
     **/
    rect()
    {
        return this.element.getBoundingClientRect();
    }
    
    /**
     * @public
     *
     * @description Checks whether data is accepted from the server.
     *
     * @return { boolean }
     **/
    isServerSide()
    {
        return !isStructureEmpty(this.settings.httpRequestSettings);
    }
    
    /**
     * @public
     *
     * @description Checks whether data should be stored in cache.
     *
     * @return { boolean }
     **/
    isSaveCache()
    {
        return this.settings.isSaveCache;
    }
    
    /**
     * @public
     *
     * @description Returns name of the select element.
     *
     * @return { string }
     **/
    getName()
    {
        return this.select.name;
    }
    
    /**
     * @public
     *
     * @description Checks if the request status is success.
     *
     * @return { boolean }
     **/
    isRequestSuccess()
    {
        return this.httpRequest && this.httpRequest.xhr.status === HttpStatusesClassifier.SUCCESS;
    }
    
    /**
     * @public
     *
     * @description Checks if the select element is a multiple.
     *
     * @return { boolean }
     **/
    isMultiple()
    {
        return this.select.multiple;
    }
    
    /**
     * @public
     *
     * @description Checks if the option with the given value is selected.
     *
     * @return { boolean }
     **/
    isSelected(value)
    {
        return this.getOption(value) && this.getOption(value).selected;
    }
    
    /**
     * @static
     *
     * @public
     *
     * @description Checks if the option with the given value is selected.
     *
     * @param { HTMLSelectElement } element
     *
     * @return { CustomSelect | null }
     **/
    static getInstanceBySelect(element)
    {
        return this.instances.find(a => a.select === element);
    }
}
