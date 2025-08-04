/**
 * @function
 *
 * @description Returns the maximum value in an array of numbers or, if a key is provided, the maximum value of that key across an array of objects.
 *
 * @param { Array } structure
 *
 * @param { string } key
 *
 * @return { number }
 **/
export function getStructureMax(structure, key)
{
    if (!key)
    {
        return Math.max(...structure);
    }
    
    return structure.reduce((previousValue, currentValue) => previousValue[ key ] > currentValue[ key ] ? previousValue[ key ] : currentValue[ key ], 0);
}
