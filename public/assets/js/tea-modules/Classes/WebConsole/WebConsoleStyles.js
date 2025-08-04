/**
 * @class
 *
 * @description Implements work with formatting styles of web-console message.
 **/
export class WebConsoleStyles
{
    /**
     * @private
     *
     * @description Contains properties for formatting message in web-console.
     *
     * @type { Map }
     **/
    _properties = new Map();
    
    /**
     * @private
     *
     * @description Contains converted string of valid css.
     *
     * @type { string }
     **/
    _convertedString = '';
    
    /**
     * @private
     *
     * @description Implements a processing iteration for each property.
     *
     * @param { string } property
     *
     * @param { string } key
     *
     * @return { void }
     **/
    _loopHandler(property, key)
    {
        this._convertedString += `${ key }: ${ property };`;
    }
    
    /**
     * @public
     *
     * @description Sets property style for the web-console.
     *
     * @param { string } key - The key of property. It should be property of ConsoleStyleProperties class.
     *
     * @param { string } value
     *
     * @return { void }
     **/
    setProperty(key, value)
    {
        this._properties.set(key, value);
    }
    
    /**
     * @public
     *
     * @description Converts all properties for valid css string format.
     *
     * @return { string } The converted string.
     **/
    toString()
    {
        this._properties.forEach(this._loopHandler.bind(this));
        
        return this._convertedString;
    }
    
    /**
     * @public
     *
     * @description Checks if the properties is empty.
     *
     * @return { boolean }
     **/
    isEmpty()
    {
        return !this._properties.size;
    }
}