import { isObject } from '../Is/isObject.js';
import { isArray }  from '../Is/isArray.js';


/**
 * @function
 *
 * @description Returns empty structure value by type of given argument.
 *
 * @param { Object | Array } structure - The structure whose type is to be returned.
 *
 * @return { Object | Array } The empty structure.
 **/
export function getStructureEmpty(structure)
{
    if (isObject(structure))
    {
        return {};
    }
    else if (isArray(structure))
    {
        return [];
    }
}