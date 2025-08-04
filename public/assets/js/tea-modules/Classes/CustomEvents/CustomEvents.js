/**
 * @class
 *
 * @description Implements work with custom events according to the 'observer' pattern.
 **/
export class CustomEvents
{
    /**
     * @typedef { Object } CustomEventSettings
     *
     * @property { boolean ? } isOnce - If equal to 'true', the event executed only once and deleting.
     *
     * @property { boolean ? } isChain - if equal to 'true', the first time any callback returns false - it breaks the entire execution chain.
     **/
    
    /**
     * @typedef { Map<Function, CustomEventSettings> } CustomEventType
     **/
    
    /**
     * @private
     *
     * @type { Object<CustomEventType> }
     *
     * @description Contains event types and subscriptions to them.
     **/
    _events = {};
    
    /**
     * @private
     *
     * @description Creates a new event type.
     *
     * @param { string } type
     *
     * @return { void }
     **/
    _createType(type)
    {
        this._events[type] = new Map();
    }
    
    /**
     * @private
     *
     * @description Creates a new event handler.
     *
     * @param { string } type
     *
     * @param { Function } handler
     *
     * @param { CustomEventSettings } settings
     *
     * @return { void }
     **/
    _createHandler(type, handler, settings)
    {
        this.getHandlersByType(type).set(handler, settings);
    }
    
    /**
     * @private
     *
     * @description Deletes an event handler.
     *
     * @param { string } type
     *
     * @param { Function } handler
     *
     * @return { boolean }
     **/
    _deleteHandler(type, handler)
    {
        return this.getHandlersByType(type).delete(handler);
    }
    
    /**
     * @public
     *
     * @description Subscribes to an event by type.
     *
     * @param { string } type - The event type.
     *
     * @param { Function } handler - The handler function to event.
     *
     * @param { CustomEventSettings } settings - The settings for event.
     *
     * @return { CustomEvents }
     **/
    subscribe(type, handler, settings = {})
    {
        if (!this.hasType(type))
        {
            this._createType(type);
        }
        
        this._createHandler(type, handler, settings);
        
        return this;
    }
    
    /**
     * @public
     *
     * @description Unsubscribes to an event by type.
     *
     * @param { string } type - The event type.
     *
     * @param { Function } handler - The handler passed to the "subscribe" method.
     *
     * @return { boolean }
     **/
    unsubscribe(type, handler)
    {
        if (this.hasType(type))
        {
            return this._deleteHandler(type, handler);
        }
        
        return false;
    }
    
    /**
     * @public
     *
     * @description Executes all event handlers by given type.
     *
     * @param { string } type - The event type.
     *
     * @param { ...any } args - The custom arguments for execute handler.
     *
     * @return { void }
     **/
    execute(type, ...args)
    {
        if (!this.hasType(type))
        {
            return ;
        }
        
        for (const [ handler, settings ] of this.getHandlersByType(type))
        {
            const result = handler(...args);
            
            if (settings.isOnce)
            {
                this.unsubscribe(type, handler);
            }
            
            if (settings.isChain && !result)
            {
                break ;
            }
        }
    }
    
    /**
     * @public
     *
     * @description Checks if a given event type is contained.
     *
     * @param { string } type - The event type.
     *
     * @return { boolean }
     **/
    hasType(type)
    {
        return !!this._events[type];
    }
    
    /**
     * @public
     *
     * @description Returns all event handlers for the given type.
     *
     * @param { string } type
     *
     * @return { CustomEventType }
     **/
    getHandlersByType(type)
    {
        return this._events[type];
    }
}