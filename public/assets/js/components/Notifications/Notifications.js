import { NotificationsSettings } from './NotificationsSettings.js';
import { NotificationItem }      from './NotificationItem/NotificationItem.js';
import { NotificationItemStatesClassifier } from './Classifiers/NotificationItemStatesClassifier.js';
import { NotificationItemEventsClassifier } from './Classifiers/NotificationItemEventsClassifier.js';
import { NotificationItemThemesClassifier } from './Classifiers/NotificationItemThemesClassifier.js';


/**
 * @class
 *
 * @description Implements logic of the notification toasts.
 **/
export class Notifications
{
    /**
     * @public
     *
     * @type { NotificationsSettings }
     **/
    settings;
    
    /**
     * @public
     *
     * @type { Set<NotificationItem> }
     **/
    items;
    
    /**
     * @public
     *
     * @type { Set<NotificationItem> }
     **/
    drawItems;
    
    /**
     * @constructor
     *
     * @param { NotificationSettingProperties } settings
     *
     * @return { Notifications }
     **/
    constructor(settings)
    {
        this.settings = new NotificationsSettings(settings);
        
        this.items = new Set();
        
        this.drawItems = new Set();
    }
    
    /**
     * TODO: Needs refactoring for positions of displaying.
     *
     * @private
     *
     * @description Implements calculate style of the all draw items.
     *
     * @return { void }
     **/
    _calculating()
    {
        let top = this.getStart();
        
        for (const item of this.drawItems)
        {
            item.setState(NotificationItemStatesClassifier.DISPLAY, true);
            
            if (item.isMouseenter)
            {
                continue;
            }
            
            item.style().bottom = `${ top }px`;

            item.style().right = `${ this.getEdgeStart() }px`;

            top += item.getOffsetHeight() + this.getMargin();
        }
    }
    
    /**
     * @private
     *
     * @description Implements inserting element of the items collection to the document.
     *
     * @return { void }
     **/
    _insertProcessing()
    {
        while (this.items.size > 0 && this.drawItems.size < this.getShowQuantity())
        {
            /**
             * @type { NotificationItem }
             **/
            const item = this.items.values().next().value;
            
            this.items.delete(item);
            
            this.drawItems.add(item);
            
            this._removeProcessing(item);
            
            this._insert(item);
        }
        
        setTimeout(this._calculating.bind(this), 5);
    }
    
    /**
     * @private
     *
     * @description Implements removes the given element from the document.
     *
     * @param { NotificationItem } item
     *
     * @return { void }
     **/
    _remove(item)
    {
        if (!item.checkState(NotificationItemStatesClassifier.DISPLAY))
        {
            return ;
        }
        
        this.drawItems.delete(item);

        item.getElement().style.right = ``;
        
        setTimeout(() =>
        {
            item.remove();
            
            item.setState(NotificationItemStatesClassifier.DISPLAY, false);
        }, item.getTransition().duration);
        
        this._insertProcessing();
    }
    
    /**
     * @private
     *
     * @description Implements removes processing of the items.
     *
     * @param { NotificationItem } item
     *
     * @return { void }
     **/
    _removeProcessing(item)
    {
        this._itemRemoveTimeoutProcessing(item);
        
        item.customEvents.subscribe(NotificationItemEventsClassifier.CLOSE_CLICK, this._itemCloseClickHandler.bind(this));
        
        item.customEvents.subscribe(NotificationItemEventsClassifier.MOUSE_ENTER, this._itemMouseenterHandler.bind(this));
        
        item.customEvents.subscribe(NotificationItemEventsClassifier.MOUSE_LEAVE, this._itemMouseleaveHandler.bind(this));
    }
    
    /**
     * @private
     *
     * @description Implements processing of the timeout remove.
     *
     * @param { NotificationItem } item
     *
     * @return { void }
     **/
    _itemRemoveTimeoutProcessing(item)
    {
        item.removeTimeout = setTimeout(this._itemRemoveTimeoutHandler.bind(this, item), this.getShowTime());
    }
    
    /**
     * @private
     *
     * @description Implements handler for the timeout remove.
     *
     * @param { NotificationItem } item
     *
     * @return { void }
     **/
    _itemRemoveTimeoutHandler(item)
    {
        this._remove(item);
    }
    
    /**
     * @private
     *
     * @description Implements handler for the item click event.
     *
     * @param { NotificationItem } instance
     *
     * @return { void }
     **/
    _itemCloseClickHandler(instance)
    {
        clearTimeout(instance.removeTimeout);
        
        this._remove(instance);
    }
    
    /**
     * @private
     *
     * @description Implements handler for the item mouse enter event.
     *
     * @param { NotificationItem } instance
     *
     * @return { void }
     **/
    _itemMouseenterHandler(instance)
    {
        clearTimeout(instance.removeTimeout);
    }
    
    /**
     * @private
     *
     * @description Implements handler for the item mouse leave event.
     *
     * @param { NotificationItem } instance
     *
     * @return { void }
     **/
    _itemMouseleaveHandler(instance)
    {
        this._itemRemoveTimeoutProcessing(instance);
        
        setTimeout(this._calculating.bind(this), 5);
    }
    
    /**
     * @private
     *
     * @description Implements inserting the given element to the document.
     *
     * @param { NotificationItem } item
     *
     * @return { void }
     **/
    _insert(item)
    {
        document.body.prepend(item.getElement());
    }
    
    /**
     * @public
     *
     * @description Creates new notification.
     *
     * @param { NotificationItemSettingProperties } settings
     *
     * @return { void }
     **/
    create(settings)
    {
        const item = new NotificationItem(settings);
        
        item.initialization();
        
        this.items.add(item);
        
        this._insertProcessing();
    }
    
    /**
     * @public
     *
     * @description Sets start.
     *
     * @param { number } value
     *
     * @return { number }
     **/
    setStart(value)
    {
        return this.settings.start = value;
    }
    
    /**
     * @public
     *
     * @description Returns start position.
     *
     * @return { number }
     **/
    getStart()
    {
        return this.settings.start;
    }
    
    /**
     * @public
     *
     * @description Returns edge start position.
     *
     * @return { number }
     **/
    getEdgeStart()
    {
        return this.settings.edgeStart;
    }
    
    /**
     * @public
     *
     * @description Returns margin.
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
     * @description Returns show quantity.
     *
     * @return { number }
     **/
    getShowQuantity()
    {
        return this.settings.showQuantity;
    }
    
    /**
     * @public
     *
     * @description Returns show time.
     *
     * @return { number }
     **/
    getShowTime()
    {
        return this.settings.showTime;
    }
    
    /**
     * @public
     *
     * @description Clears all items and draw items.
     *
     * @return { number }
     **/
    clearItems()
    {
        this.items.clear();
        
        this.drawItems.forEach(item => this._remove(item));
    }
    
    /**
     * @public
     *
     * @description Creates success notification.
     *
     * @param { string } heading
     *
     * @param { Array<string> } paragraphs
     *
     * @return { void }
     **/
    success(heading = 'Success', paragraphs = [])
    {
        this.create({ svgId: 'essential-verify', heading: heading, paragraphs: paragraphs, theme: NotificationItemThemesClassifier.SUCCESS });
    }
    
    /**
     * @public
     *
     * @description Creates error notification.
     *
     * @param { string } heading
     *
     * @param { Array<string> } paragraphs
     *
     * @return { void }
     **/
    error(heading = 'Error', paragraphs = [])
    {
        this.create({ svgId: 'essential-notification', heading: heading, paragraphs: paragraphs, theme: NotificationItemThemesClassifier.ERROR });
    }
    
    /**
     * @public
     *
     * @description Creates success notification.
     *
     * @param { string } heading
     *
     * @param { Array<string> } paragraphs
     *
     * @return { void }
     **/
    info(heading = 'Info', paragraphs = [])
    {
        this.create({ svgId: 'essential-info', heading: heading, paragraphs: paragraphs, theme: NotificationItemThemesClassifier.INFO });
    }
}
