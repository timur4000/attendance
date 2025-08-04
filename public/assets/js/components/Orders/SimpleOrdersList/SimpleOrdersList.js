import { SimpleOrdersListSettings } from './SimpleOrdersListSettings.js';
import { HttpRequest }              from '../../../tea-modules/Classes/Requests/HttpRequest.js';
import { HttpRequestMethodsClassifier } from '../../../tea-modules/Classes/Requests/Standards/HttpRequestMethodsClassifier.js';
import { getAttribute } from '../../../tea-modules/Functions/DOM/Attributes/getAttribute.js';
import { querySelector } from '../../../tea-modules/Functions/DOM/Queries/querySelector.js';
import { SimpleOrdersListItem } from '../SimpleOrdersListItem/SimpleOrdersListItem.js';
import { createFragment } from '../../../tea-modules/Functions/DOM/Elements/createFragment.js';
import { playAudio } from '../../../tea-modules/Functions/Audios/playAudio.js';
import { isStructureEmpty } from '../../../tea-modules/Functions/Is/isStructureEmpty.js';
import { createElement } from '../../../tea-modules/Functions/DOM/Elements/createElement.js';
import { SimpleOrdersListSystemStatesClassifier } from './SimpleOrdersListSystemStatesClassifier.js';
import { SimpleOrdersListItemSettings } from '../SimpleOrdersListItem/SimpleOrdersListItemSettings.js';
import { HttpStatusesClassifier } from '../../../tea-modules/Classes/Requests/Standards/HttpStatusesClassifier.js';
import { LibraryChars } from '../../../tea-modules/Classes/Standards/Chars/LibraryChars.js';
import { isArray } from '../../../tea-modules/Functions/Is/isArray.js';


/**
 * @class
 *
 * @description Implements logic for the simple orders list component.
 **/
export class SimpleOrdersList
{
    /**
     * @public
     *
     * @type { HTMLElement }
     **/
    domElement;
    
    /**
     * @public
     *
     * @type { SimpleOrdersListSettings }
     **/
    settings;
    
    /**
     * @public
     *
     * @type { SimpleOrdersListItem[] }
     **/
    items = [];
    
    /**
     * @public
     *
     * @type { HTMLHeadingElement }
     **/
    domSystem;
    
    /**
     * @public
     *
     * @type { Array<Object> }
     **/
    food ;
    
    /**
     * @public
     *
     * @type { number }
     **/
    autoUpdateId = 0;
    
    /**
     * @public
     *
     * @type { number }
     **/
    autoExistId = 0;
    
    /**
     * @public
     *
     * @type { number }
     **/
    timeUpdateId = 0;
    
    /**
     * @public
     *
     * @type { boolean }
     **/
    isInitialize = false;
    
    /**
     * @public
     *
     * @type { boolean }
     **/
    isLoading = false;
    
    /**
     * @public
     *
     * @type { number }
     **/
    newStateTime = 0;
    
    /**
     * @public
     *
     * @type { number }
     **/
    staleStateTime = 0;
    
    /**
     * @public
     *
     * @type { number }
     **/
    oldStateTime = 0;
    
    /**
     * @constructor
     *
     * @param { string } selectors
     *
     * @param { SimpleOrdersListSettings } settings
     **/
    constructor(selectors, settings)
    {
        !settings && (settings = new SimpleOrdersListSettings());
        
        this.domElement = querySelector(selectors);
        
        this.settings = settings;
        
        this.settings.ordersUrl = getAttribute(this.domElement, 'orders-url', { isAfterRemove: true, isDataAttribute: true });
        
        this.settings.foodUrl = getAttribute(this.domElement, 'food-url', { isAfterRemove: true, isDataAttribute: true });
        
        this.settings.existUrl = getAttribute(this.domElement, 'exist-url', { isAfterRemove: true, isDataAttribute: true });
        
        this.settings.removeUrl = getAttribute(this.domElement, 'remove-url', { isAfterRemove: true, isDataAttribute: true });
        
        this.newStateTime = parseInt(getAttribute(this.domElement, 'new-state-time', { isAfterRemove: true, isDataAttribute: true }));
        
        this.staleStateTime = parseInt(getAttribute(this.domElement, 'stale-state-time', { isAfterRemove: true, isDataAttribute: true }));
        
        this.oldStateTime = parseInt(getAttribute(this.domElement, 'old-state-time', { isAfterRemove: true, isDataAttribute: true }));
        
        this.domSystem = this._createSystem();
    }
    
    /**
     * @public
     *
     * @description Implements initialize base logic.
     *
     * @return { void }
     **/
    async initialization()
    {
        this.setSystemProcessing(SimpleOrdersListSystemStatesClassifier.LOADING);
        
        this.food = (await this.foodRequest()).data;
        
        await this.update();
        
        this.autoExistLauncher();
        
        this.timeUpdateLauncher();
    }
    
    /**
     * @public
     *
     * @description Implements launch auto-update.
     *
     * @return { void }
     **/
    autoUpdateLauncher()
    {
        this.autoUpdateId = setInterval(this.autoUpdateIntervalHandler.bind(this), 5000);
    }
    
    /**
     * @public
     *
     * @description Implements launch auto-exist.
     *
     * @return { void }
     **/
    autoExistLauncher()
    {
        this.autoExistId = setInterval(this.autoExistIntervalHandler.bind(this), 1000);
    }
    
    /**
     * @public
     *
     * @description Implements launch time-update.
     *
     * @return { void }
     **/
    timeUpdateLauncher()
    {
        this.timeUpdateId = setInterval(this.timeUpdateIntervalHandler.bind(this), 500);
    }
    
    /**
     * @public
     *
     * @description Implements handler for the auto-update interval.
     *
     * @return { void }
     **/
    async autoUpdateIntervalHandler()
    {
        await this.update();
    }
    
    /**
     * @public
     *
     * @description Implements handler for the auto-exist interval.
     *
     * @return { void }
     **/
    async autoExistIntervalHandler()
    {
        await this.exist();
    }
    
    /**
     * @public
     *
     * @description Implements handler for the time-update interval.
     *
     * @return { void }
     **/
    timeUpdateIntervalHandler()
    {
        for (let i = 0, n = this.items.length; i < n; i++)
        {
            const item = this.items[ i ];
            
            item.timeUpdateProcessing();
        }
    }
    
    /**
     * @public
     *
     * @description Updates component.
     *
     * @return { void }
     **/
    async update()
    {
        clearInterval(this.autoUpdateId);
        
        const response = await this.ordersRequest();
        
        if (!response.data)
        {
            this.autoUpdateLauncher();
            
            return ;
        }
        
        if (this.isInitialize && response.data.length)
        {
            playAudio('/assets/audios/pop-window-low-tone.mp3');
        }
        
        const fragment = this.itemsCreating(response.data);
        
        if (this.isEmpty())
        {
            this.setSystemProcessing(SimpleOrdersListSystemStatesClassifier.EMPTY);
        }
        else
        {
            this.setSystemProcessing(SimpleOrdersListSystemStatesClassifier.DEFAULT);
        }
        
        this.domElement.prepend(fragment);
        
        this.autoUpdateLauncher();
        
        if (!this.isInitialize)
        {
            this.isInitialize = true;
        }
    }
    
    /**
     * @public
     *
     * @description Implements checks relevance of items.
     *
     * @return { void }
     **/
    async exist()
    {
        const request = await this.existRequest();

        if (request.status !== HttpStatusesClassifier.SUCCESS)
        {
            return ;
        }
        
        this.removeItemById(request.data);
    }
    
    /**
     * @public
     *
     * @description Sets the given state to the system.
     *
     * @param { SimpleOrdersListSystemStatesClassifier } classifier
     *
     * @return { void }
     **/
    setSystemProcessing(classifier)
    {
        switch (classifier)
        {
            case SimpleOrdersListSystemStatesClassifier.DEFAULT:
            {
                this.domSystem.textContent = '';
                
                document.contains(this.domSystem) && this.domSystem.remove();
                
                break ;
            }
            case SimpleOrdersListSystemStatesClassifier.EMPTY:
            {
                this.domSystem.textContent = this.settings.emptyText;
                
                !document.contains(this.domSystem) && this.domElement.append(this.domSystem);
                
                break ;
            }
            case SimpleOrdersListSystemStatesClassifier.LOADING:
            {
                this.domSystem.textContent = this.settings.loadingText;
                
                !document.contains(this.domSystem) && this.domElement.append(this.domSystem);
                
                break ;
            }
        }
    }
    
    /**
     * @private
     *
     * @description Creates html node of the system element.
     *
     * @return { HTMLHeadingElement }
     **/
    _createSystem()
    {
        return createElement('h2', { class: this.settings.systemClass });
    }
    
    /**
     * @protected
     *
     * @description Creates item components.
     *
     * @param { Array<Object> } records
     *
     * @return { DocumentFragment }
     **/
    itemsCreating(records)
    {
        const fragment = createFragment();
        
        const items = [];
        
        for (let i = 0, n = records.length; i < n; i++)
        {
            const record = records[ i ];
            
            const simpleOrdersListItemSettings = new SimpleOrdersListItemSettings(this.settings.simpleOrdersListItemSettings);
            
            simpleOrdersListItemSettings.newStateTime = this.newStateTime;
            
            simpleOrdersListItemSettings.staleStateTime = this.staleStateTime;
            
            simpleOrdersListItemSettings.oldStateTime = this.oldStateTime;
            
            const item = new SimpleOrdersListItem(this, record, simpleOrdersListItemSettings);
            
            item.initialization();
        
            items.push(item);
            
            fragment.append(item.getElement());
        }
        
        this.items.unshift(...items);
        
        return fragment;
    }
    
    /**
     * @public
     *
     * @description Implements request for the orders.
     *
     * @return { Promise<ResponseStandard> }
     **/
    async ordersRequest()
    {
        this.isLoading = true;
        
        const request = new HttpRequest(
            {
                url: this.settings.ordersUrl,
                method: HttpRequestMethodsClassifier.POST,
                data: { last_id_order: this.getLastOrderId() },
            }
        );
        
        const response = await request.execute();
        
        this.isLoading = false;
        
        return response;
    }
    
    /**
     * @public
     *
     * @description Implements removes order by the specified identifier.
     *
     * @param { number } idOrder
     *
     * @return { void }
     **/
    async removeOrder(idOrder)
    {
        clearTimeout(this.autoUpdateId);
        
        const request = await this.removeRequest(idOrder);
        
        if (request.status !== HttpStatusesClassifier.SUCCESS)
        {
            app.notifications.error('Error', [ request.message ]);
        }
        else
        {
            app.notifications.success('Success', [ request.message ]);
            
            this.removeItemById(idOrder);
        }
        
        this.autoUpdateLauncher();
    }
    
    /**
     * @public
     *
     * @description Implements request for determines whether orders exists.
     *
     * @return { Promise<ResponseStandard> }
     **/
    async existRequest()
    {
        this.isLoading = true;
        
        const request = new HttpRequest(
            {
                url: this.settings.existUrl,
                method: HttpRequestMethodsClassifier.POST,
                data: { identifiers: this.getItemsIdentifiers() },
            }
        );
        
        const response = await request.execute();
        
        this.isLoading = false;
        
        return response;
    }
    
    /**
     * @public
     *
     * @description Implements request for the remove order.
     *
     * @param { number } idOrder
     *
     * @return { Promise<ResponseStandard> }
     **/
    async removeRequest(idOrder)
    {
        this.isLoading = true;
        
        const request = new HttpRequest(
            {
                url: this.settings.removeUrl,
                method: HttpRequestMethodsClassifier.POST,
                data: { id_order: idOrder },
            }
        );
        
        const response = await request.execute();
        
        this.isLoading = false;
        
        return response;
    }
    
    /**
     * @public
     *
     * @description Returns all identifiers of items.
     *
     * @param { boolean } stringRequired
     *
     * @return { Array<number> | string }
     **/
    getItemsIdentifiers(stringRequired = false)
    {
        const identifiers = this.items.map(item => item.record.id_order);
        
        return stringRequired ? identifiers.join(LibraryChars.stringSeparator) : identifiers;
    }
    
    /**
     * @public
     *
     * @description Implements finds and returns item by specified id.
     *
     * @param { number } idOrder
     *
     * @return { SimpleOrdersListItem }
     **/
    getItemById(idOrder)
    {
        return this.items.find(item => item.record.id_order === idOrder);
    }
    
    /**
     * @public
     *
     * @description Implements find an index of item by specified id and returns it.
     *
     * @param { number } idOrder
     *
     * @return { number }
     **/
    getIndexItemById(idOrder)
    {
        return this.items.findIndex(item => item.record.id_order === idOrder);
    }
    
    /**
     * @public
     *
     * @description Implements remove item by specified id.
     *
     * @param { Array<number> | number } identifiers
     *
     * @return { void }
     **/
    removeItemById(identifiers)
    {
        this.items = this.items.filter(item =>
        {
            const isRemove = isArray(identifiers) ? identifiers.includes(item.record.id_order) : item.record.id_order === identifiers;
            
            isRemove && item.remove();
            
            return !isRemove;
        });
    }
    
    /**
     * @public
     *
     * @description Implements request for the food.
     *
     * @return { Promise<ResponseStandard> }
     **/
    async foodRequest()
    {
        this.isLoading = true;
        
        const request = new HttpRequest(
            {
                url: this.settings.foodUrl,
                method: HttpRequestMethodsClassifier.POST,
            }
        );
        
        const response = await request.execute();
        
        this.isLoading = false;
        
        return response;
    }
    
    /**
     * @public
     *
     * @description Finds and returns food by the given id.
     *
     * @param { number } id
     *
     * @return { Object | undefined }
     **/
    getFoodById(id)
    {
        return this.food.find(a => a.id_object === id);
    }
    
    /**
     * @public
     *
     * @description Returns last order id from items.
     *
     * @return { number }
     **/
    getLastOrderId()
    {
        return (this.items[ 0 ] && this.items[ 0 ].record.id_order) || 0;
    }
    
    /**
     * @public
     *
     * @description Checks if the items is empty.
     *
     * @return { boolean }
     **/
    isEmpty()
    {
        return isStructureEmpty(this.items);
    }
}
