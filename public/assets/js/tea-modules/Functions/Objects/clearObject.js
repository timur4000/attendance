/**
 * @function
 *
 * @description Clears the given object.
 *
 * @param { Object } target
 *
 * @return { void }
 **/
export function clearObject(target)
{
    for (const key in target)
    {
        delete target[key];
    }
}
