import { BaseError } from './BaseError.js';
import { ErrorLevels } from '../Standards/Errors/ErrorLevels.js';
import { WebConsole } from '../WebConsole/WebConsole.js';


/**
 * @static
 *
 * @class
 *
 * @description Represents an error based on the errorLevels.
**/
export class LevelError
{
    /**
     * @private
     *
     * @description Contains successor instance class of BaseError.
     *
     * @type { BaseError }
    **/
    _errorInstance;
    
    /**
     * @private
     *
     * @description Contains type of error level.
     *
     * @type { number }
    **/
    _errorLevel;
    
    /**
     * @constructor
     *
     * @param { BaseError } errorInstance - The successor instance class of BaseError.
     *
     * @param { number } errorLevel - The level of error. It should be property of ErrorLevels class.
    **/
    constructor(errorInstance, errorLevel)
    {
        this._errorInstance = errorInstance;
        
        this._errorLevel = errorLevel;
        
        this._handler();
    }
    
    /**
     * @private
     *
     * @description Implements error handling.
     *
     * @return { void }
    **/
    _handler()
    {
        switch (this._errorLevel)
        {
            case (ErrorLevels.doNothing):
            {
                break;
            }
            case (ErrorLevels.showWarning):
            {
                new WebConsole(this._errorInstance)
                    .warning();
                
                break;
            }
            case (ErrorLevels.throwException):
            {
                throw this._errorInstance;
            }
        }
    }
}