import { WebConsoleStyles } from './WebConsoleStyles.js';
import { WebConsoleMethods } from '../Standards/WebConsole/WebConsoleMethods.js';
import { WebConsoleStyleCharacters } from '../Standards/WebConsole/WebConsoleStyleCharacters.js';
import { WebConsoleStyleProperties } from '../Standards/WebConsole/WebConsoleStyleProperties.js';


/**
 * @static
 *
 * @class
 *
 * @description Helper class for extending console.
 **/
export class WebConsole
{
    /**
     * @private
     *
     * @description Contains message for showing in web-console.
     *
     * @type { string }
     **/
    _message = '';
    
    /**
     * @private
     *
     * @description Contains instance of ConsoleStyles.
     *
     * @type { WebConsoleStyles }
     **/
    _consoleStyles = new WebConsoleStyles();
    
    /**
     * @constructor
     *
     * @param { any } message - The message for displaying in web-console.
     *
     * @return { WebConsole }
     **/
    constructor(message)
    {
        this._message = message;
    }
    
    /**
     * @private
     *
     * @description Handler for message displaying in web-console.
     *
     * @param { string } method - The method to display in web-console.
     *
     * @return { void }
     **/
    _handler(method)
    {
        if (!this._consoleStyles.isEmpty())
        {
            this._message = WebConsoleStyleCharacters.color + this._message;
            
            console[ method ](this._message, this._consoleStyles.toString());
            
            return;
        }
        
        console[ method ](this._message);
    }
    
    /**
     * @public
     *
     * @description Simple displaying message in web-console.
     *
     * @return { void }
     **/
    log()
    {
        this._handler(WebConsoleMethods.log);
    }
    
    /**
     * @public
     *
     * @description Displaying message in web-console with method error.
     *
     * @return { void }
     **/
    error()
    {
        this._handler(WebConsoleMethods.error);
    }
    
    /**
     * @public
     *
     * @description Displaying message in web-console with method warn.
     *
     * @return { void }
     **/
    warning()
    {
        this._handler(WebConsoleMethods.warn);
    }
    
    /**
     * @public
     *
     * @description Displaying message in web-console with method info.
     *
     * @return { void }
     **/
    info()
    {
        this._handler(WebConsoleMethods.info);
    }
    
    /**
     * @public
     *
     * @description Displaying message in web-console with method dir.
     *
     * @return { void }
     **/
    dir()
    {
        this._handler(WebConsoleMethods.dir);
    }
    
    /**
     * @public
     *
     * @description Displaying message in web-console with method table.
     *
     * @return { void }
     **/
    table()
    {
        this._handler(WebConsoleMethods.table);
    }
    
    /**
     * @public
     *
     * @description Sets color for formatting message in web-console.
     *
     * @param { string } value - The color for formatting message in web-console. It should be property of ConsoleColors class.
     *
     * @return { this }
     **/
    color(value)
    {
        this._consoleStyles.setProperty(WebConsoleStyleProperties.color, value);
        
        return this;
    }
    
    /**
     * @public
     *
     * @description Sets background color for formatting message in web-console.
     *
     * @param { string } value - The background color for formatting message in web-console. It should be property of ConsoleColors class.
     *
     * @return { this }
     **/
    backgroundColor(value)
    {
        this._consoleStyles.setProperty(WebConsoleStyleProperties.backgroundColor, value);
        
        return this;
    }
    
    /**
     * @public
     *
     * @description Sets font size for formatting message in web-console.
     *
     * @param { string } value - The font-size for formatting message in web-console. It should be property of ConsoleFontSizes class.
     *
     * @return { this }
     **/
    fontSize(value)
    {
        this._consoleStyles.setProperty(WebConsoleStyleProperties.fontSize, value);
        
        return this;
    }
    
    /**
     * @public
     *
     * @description Sets font weight for formatting message in web-console.
     *
     * @param { string } value - The font-weight for formatting message in web-console. It should be property of ConsoleFontWeights class.
     *
     * @return { this }
     **/
    fontWeight(value)
    {
        this._consoleStyles.setProperty(WebConsoleStyleProperties.fontWeight, value);
        
        return this;
    }
}
