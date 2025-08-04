/**
 * @typedef { Object } TreeObject
 *
 * @property { Array } tree
 **/

/**
 * @function
 *
 * @description Creates tree from the given array of object by the given key names and returned it.
 *
 * @param { Array<Object> } records
 *
 * @param { string } record_key
 *
 * @param { string } parent_key
 *
 * @return { Array<(Object & TreeObject)> }
 **/
export function toTree(records, record_key, parent_key)
{
    function tree(records, id)
    {
        return records.reduce((previousValue, currentValue) =>
        {
            if (currentValue[ parent_key ] === id || id === undefined && currentValue[ parent_key ] === null)
            {
                previousValue.push(currentValue);
                
                currentValue.tree = tree(records, currentValue[ record_key ]);
            }
            
            return previousValue;
        }, []);
    }
    
    return tree(records);
}
