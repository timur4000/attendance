/**
 * @function
 *
 * @description Compares the given structures.
 *
 * @example key.key.key
 *
 * @param { Object | Array } target
 *
 * @param { Object | Array } source
 *
 * @return { any }
 **/
export function structureCompare(target, source)
{
    return JSON.stringify(target) === JSON.stringify(source);
}
