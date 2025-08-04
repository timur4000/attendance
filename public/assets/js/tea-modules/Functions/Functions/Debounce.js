import { isFunction } from '../Is/isFunction.js';
import { isNumber }   from '../Is/isNumber.js';
import { isString } from '../Is/isString.js';
import { isUndefined } from '../Is/isUndefined.js';


/**
 * @description Centralized manager for managing debounced functions using debounce Ids or function references.
 **/
export class Debounce
{
    /**
     * @typedef { string | number | Function } debounceId
     **/
    
    /**
     * @typedef { Object } debounceEntry
     *
     * @property { number } timeoutId
     *
     * @property { Function } handler
     *
     * @property { number } delay
     *
     * @property { debounceId } id
     **/
    
    /**
     * @protected
     *
     * @type { Map<debounceId, debounceEntry> }
     **/
    static _entries = new Map();
    
    /**
     * @public
     *
     * @description Registers a debounced function with a specific delay and debounce id.
     *
     * @param { Function } handler
     *
     * @param { number } delay
     *
     * @param { debounceId } [id]
     *
     * @return { void }
     **/
    static register(handler, delay, id)
    {
        if (!isFunction(handler))
        {
            throw new Error(`Argument 'handler' must be a function! Given value: ${ handler }.`);
        }
        
        if (!isNumber(delay))
        {
            throw new Error(`Argument 'delay' must be a number! Given value: ${ delay }.`);
        }
        
        if (!isUndefined(id) && !isNumber(id) && !isString(id) && !isFunction(id))
        {
            throw new Error(`Argument 'id' must be a string or number! Given value: ${ id }.`);
        }
        
        id = id || handler;
        
        Debounce.reset(id);
        
        Debounce._set(id, handler, delay);
    }
    
    /**
     * @protected
     *
     * @description Sets the specified debounce entry.
     *
     * @param { debounceId } id
     *
     * @param { Function } handler
     *
     * @param { number } delay
     *
     * @return { Map<Function | debounceId, debounceEntry> }
     **/
    static _set(id, handler, delay)
    {
        const timeoutId = setTimeout(Debounce._timeoutHandler.bind(Debounce, id, handler), delay);

        return Debounce._entries.set(id, { timeoutId, handler, delay, id });
    }

    /**
     * @protected
     *
     * @description Implements a handler for the setTimeout function.
     *
     * @param { debounceId } id
     *
     * @param { Function } handler
     *
     * @return { void }
     **/
    static _timeoutHandler(id, handler)
    {
        handler();

        Debounce._delete(id);
    }
    
    /**
     * @public
     *
     * @description Returns the debounce entry by the specified id.
     *
     * @param { debounceId } id
     *
     * @return { debounceEntry | undefined }
     **/
    static get(id)
    {
        return Debounce._entries.get(id);
    }
    
    /**
     * @public
     *
     * @description Determines whether debounce entry with the specified id exist.
     *
     * @param { debounceId } id
     *
     * @return { boolean }
     **/
    static has(id)
    {
        return Debounce._entries.has(id);
    }
    
    /**
     * @protected
     *
     * @description Deletes the debounce entry by the specified id.
     *
     * @param { debounceId } id
     *
     * @return { boolean }
     **/
    static _delete(id)
    {
        return Debounce._entries.delete(id);
    }
    
    /**
     * @public
     *
     * @description Resets the timeout of the debounce entry by the specified id.
     *
     * @param { debounceId } id
     *
     * @return { debounceEntry | undefined }
     **/
    static reset(id)
    {
        if (!Debounce.has(id))
        {
            return ;
        }
        
        clearTimeout(Debounce.get(id).timeoutId);
    }
    
    /**
     * @public
     *
     * @description Resets the timeout of all debounce entries.
     *
     * @return { debounceEntry | undefined }
     **/
    static resetAll()
    {
        for (const [id, entry] of Debounce._entries)
        {
            this.reset(id);
        }
    }
    
    /**
     * @public
     *
     * @description Clears collection of debounce entries.
     *
     * @return { void }
     **/
    static clear()
    {
        this.resetAll();
        
        this._entries.clear();
    }
}
