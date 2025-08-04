import { getStructureEmpty } from './getStructureEmpty.js';
import { isStructure }       from '../Is/isStructure.js';
import { isOwnProperty }     from '../Is/isOwnProperty.js';


/**
 * @function
 *
 * @description Recursive clones structure and return new structure.
 *
 * @template { Object | Array } TargetType
 *
 * @param { TargetType } target - The structure to clone.
 *
 * @param { boolean } [isOwnPropertyOnly=true] - If set to `true`, only own properties of the target structure will be cloned to new structure.
 *
 * @return { TargetType } - The cloned structure.
 **/
export function structureClone(target, { isOwnPropertyOnly = true } = {})
{
    const structure = getStructureEmpty(target);
    
    for (const key in target)
    {
        if (isOwnPropertyOnly && !isOwnProperty(target, key))
        {
            continue ;
        }
        
        const value = target[ key ];
        
        if (isStructure(value))
        {
            structure[ key ] = structureClone(target[key]);
            
            continue;
        }
        
        structure[ key ] = value;
    }
    
    return structure;
}
