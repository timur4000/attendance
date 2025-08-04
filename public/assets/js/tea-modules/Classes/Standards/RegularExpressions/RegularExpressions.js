/**
 * @static
 *
 * @class
 *
 * @description Contains helper regular expressions as methods.
**/
export class RegularExpressions
{
    /**
     * @static
     *
     * @public
     *
     * @description To search for the selector.
     *
     * @param { string ? } flags
     *
     * @return { RegExp } The generated RegExp.
    **/
    static selector(flags)
    {
        return new RegExp('^[.#a-zA-Z0-9][\\w-_]*$', flags);
    }
    
    /**
     * @static
     *
     * @public
     *
     * @description To search for keyword of 'class'.
     *
     * @param { string ? } flags
     *
     * @return { RegExp } The generated RegExp.
    **/
    static classKeywordSearch(flags)
    {
        return new RegExp('^class\\s+', flags);
    }
    
    /**
     * @static
     *
     * @public
     *
     * @description To search for the function name.
     *
     * @param { string ? } flags
     *
     * @return { RegExp } The generated RegExp.
    **/
    static functionNameSearch(flags)
    {
        return new RegExp('^function\\s+(.*)\\s*\\(', flags);
    }
    
    /**
     * @static
     *
     * @public
     *
     * @description To search for the function arguments block.
     *
     * @param { string ? } flags
     *
     * @return { RegExp } The generated RegExp.
    **/
    static functionArgumentsBlockSearch(flags)
    {
        return new RegExp('^function\\s+[a-zA-Z]*\\s*\\(([^)]*)\\)', flags);
    }
    
    /**
     * @static
     *
     * @public
     *
     * @description To search for the http(s) keyword.
     *
     * @param { string ? } flags
     *
     * @return { RegExp } The generated RegExp.
    **/
    static url(flags)
    {
        return new RegExp('^https?:\/\/', flags);
    }
    
    /**
     * @static
     *
     * @public
     *
     * @description To search for the char in a start string.
     *
     * @param { string ? } char
     *
     * @param { string ? } flags
     *
     * @return { RegExp } The generated RegExp.
    **/
    static startTrim(char, flags)
    {
        return new RegExp(`^${ char }*`, flags);
    }
    
    /**
     * @static
     *
     * @public
     *
     * @description To search for the char in an end string.
     *
     * @param { string ? } char
     *
     * @param { string ? } flags
     *
     * @return { RegExp } The generated RegExp.
    **/
    static endTrim(char, flags)
    {
        return new RegExp(`${ char }*$`, flags);
    }
}