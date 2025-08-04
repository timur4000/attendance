import { isPrimitive } from './isPrimitive.js';


/**
 * @function
 *
 * @description Checks if the given composite includes the given value.
 *
 * @param { Object | Array } target - The composite in which the passed value will be checked.
 *
 * @param { any } verifiable
 *
 * @param { boolean } isDeep - If set to `true`, the function will search for the value deep within the composite's structure. Otherwise, the search will be limited to the top-level properties.
 *
 * @return { boolean }
 **/
export function isCompositeInclude(target, verifiable, isDeep = false)
{
    function deepSearch(target)
    {
        for (const key in target)
        {
            if (!target.hasOwnProperty(key))
            {
                continue;
            }
            
            const value = target[ key ];
            
            if (value === verifiable)
            {
                return true;
            }

            if (isDeep && !isPrimitive(value))
            {
                return deepSearch(value);
            }
        }
        
        return false;
    }
    
    return deepSearch(target);
}
