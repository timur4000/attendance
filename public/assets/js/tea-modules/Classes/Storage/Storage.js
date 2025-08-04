export class Storage
{
    /**
     * @static
     *
     * @public
     *
     * @description Sets the given value to the local storage.
     *
     * @param { string } key
     *
     * @param { string } value
     *
     * @return { void }
     **/
    static set(key, value)
    {
        localStorage.setItem(key, value);
    }
    
    /**
     * @static
     *
     * @public
     *
     * @description Returns the value from local storage by the given key.
     *
     * @param { string } key
     *
     * @return { string | null }
     **/
    static get(key)
    {
        return localStorage.getItem(key);
    }
    
    /**
     * @static
     *
     * @public
     *
     * @description Checks if the item with the given key is an exist.
     *
     * @param { string } key
     *
     * @return { boolean }
     **/
    static has(key)
    {
        return Boolean(localStorage.getItem(key));
    }
    
    /**
     * @static
     *
     * @public
     *
     * @description Removes the value from local storage by the given key.
     *
     * @param { string } key
     *
     * @return { void }
     **/
    static remove(key)
    {
        localStorage.removeItem(key);
    }
}
