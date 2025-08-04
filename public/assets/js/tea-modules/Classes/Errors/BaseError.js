/**
 * @class
 *
 * @description Base class for all classes of error.
 *
 * @extends Error
**/
export class BaseError extends Error
{
    /**
     * @public
     *
     * @description The name of error.
     *
     * @type { string }
     **/
    name;
    
    /**
     * @public
     *
     * @description The message of error.
     *
     * @type { string }
     **/
    message;
    
    /**
     * @constructor
     *
     * @return { BaseError }
    **/
    constructor()
    {
        super();
    }
}
