/**
 * @function
 *
 * @description Pauses execution for a specified number of milliseconds.
 *
 * @param {number} milliseconds
 *
 * @return { Promise<void> }
 */
export function sleep(milliseconds)
{
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}
