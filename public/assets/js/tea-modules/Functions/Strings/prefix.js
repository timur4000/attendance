/**
 * @function
 *
 * @description Adds a prefix to the given value if the condition is true.
 *
 * @param { string } value - The value to which the prefix will be added.
 *
 * @param { string } prefix - The prefix to add.
 *
 * @param { boolean } [force = true] - If equal to `false`, returns the original value.
 *
 * @return { string } The processed string.
 * **/
export function prefix(value, prefix, force = true)
{
    if (force)
    {
        return prefix + value;
    }
    
    return value;
}