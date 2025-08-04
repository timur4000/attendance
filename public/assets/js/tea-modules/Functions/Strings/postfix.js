/**
 * @function
 *
 * @description Adds a postfix to the given value if the condition is true.
 *
 * @param { string } value - The value to which the postfix will be added.
 *
 * @param { string } postfix - The postfix to add.
 *
 * @param { boolean } [force = true] - If equal to `false`, returns the original value.
 *
 * @return { string } The processed string.
 * **/
export function postfix(value, postfix, force = true)
{
    if (force)
    {
        return value + postfix;
    }
    
    return value;
}