import { convertToString } from '../../../Functions/Convertations/convertToString.js';


/**
 * @static
 *
 * @class
 *
 * @description Contains messages about all possible errors.
**/
export class ErrorMessages
{
    /**
     * @static
     *
     * @public
     *
     * @description If the argument value is of the wrong type.
     *
     * @param { string } argument - The argument to display in the message.
     *
     * @param { string } shouldType - The type to display in the message. It should be property of Types class.
     *
     * @param { any } value - The value to display in the message.
     *
     * @return { string } The generated message.
     **/
    static argumentTypeError(argument, shouldType, value)
    {
        return `\n\nArgument '${ argument }' must be of type '${ shouldType }'.\n\nGiven value '${ convertToString(value) }' with type '${ typeof value }'.\n`;
    };
    
    /**
     * @static
     *
     * @public
     *
     * @description If the argument value is of the wrong type.
     *
     * @param { Object } standard - The standard to display in message.
     *
     * @param { any } value - The value to display in message.
     *
     * @return { string } The generated message.
     **/
    static valueMissingInStandardError(standard, value)
    {
        return `\n\nThe value '${ value }' is missing in the '${ standard }' standard.\n`;
    };
    
    /**
     * @static
     *
     * @public
     *
     * @description If request is timed out.
     *
     * @return { string }
     **/
    static requestTimeoutError()
    {
        return 'The request is timed out!';
    }
}
