import { BaseError } from './BaseError.js';
import { ErrorMessages } from '../Standards/Errors/ErrorMessages.js';


/**
 * @class
 *
 * @description Represents an error that occurs when the value does not match the expected type.
 *
 * @extends BaseError
**/
export class ArgumentTypeError extends BaseError
{
    /**
     * @constructor
     *
     * @param { string } argument - The argument name.
     *
     * @param { string } shouldType - The type that should be. It should be property of Types class.
     *
     * @param { any } value - The value of argument.
     *
     * @return { ArgumentTypeError }
    **/
    constructor(argument, shouldType, value)
    {
        super();
        
        this.name = this.constructor.name;
        
        this.message = ErrorMessages.argumentTypeError(argument, shouldType, value);
    }
}
