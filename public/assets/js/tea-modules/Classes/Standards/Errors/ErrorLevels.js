/**
 * @static
 *
 * @class
 *
 * @description Contains levels of errors.
**/
export class ErrorLevels
{
    /**
     * @static
     *
     * @public
     *
     * @description The error is not displayed anywhere.
     *
     * @type { number }
    **/
    static doNothing = 0;
    
    /**
     * @static
     *
     * @public
     *
     * @description The error is displayed only in the web-console.
     *
     * @type { number }
    **/
    static showWarning = 1;
    
    /**
     * @static
     *
     * @public
     *
     * @description The error will be thrown into an exception.
     *
     * @type { number }
    **/
    static throwException = 2;
}
