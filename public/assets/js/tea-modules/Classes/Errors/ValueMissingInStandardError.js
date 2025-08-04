import { BaseError } from './BaseError.js';
import { ErrorMessages } from '../Standards/Errors/ErrorMessages.js';


/**
 * @class
 *
 * @description Represents an error when the requested property is missing in the current context.
 *
 * @extends BaseError
**/
export class ValueMissingInStandardError extends BaseError
{
    /**
     * @constructor
     *
     * @param { Class } standard - The standard in which the value is missing.
     *
     * @param { any } value - The value that is missing in the standard.
     *
     * @return { ValueMissingInStandardError }
    **/
    constructor(standard, value)
    {
        super();
        
        this.name = this.constructor.name;
        
        this.message = ErrorMessages.valueMissingInStandardError(standard, value);
    }
}