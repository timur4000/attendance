import { isUndefined } from '../Is/isUndefined.js';


/**
 * @function
 *
 * @description Implements multi-sort for the given array by the given keys.
 *
 * @template { Array } T
 *
 * @param { T } array
 *
 * @param { Array<{ name: string, direction: ('asc' | 'desc') }> } keys
 *
 * @return { T }
 **/
export function multiSort(array = [], keys = [])
{
	function compare(a, b, key, direction)
	{
		const order  = direction === 'asc' ? 1 : -1;
		
		const value = (c) => isUndefined(c[key]) ? c : c[key];
		
		return order * ((value(a) < value(b)) ? -1 : (value(a) > value(b)) ? 1 : 0);
	}
	
	function _sort(a, b)
	{
		for (let { name, direction } of keys)
		{
			const result = compare(a, b, name, direction);
			
			if (result !== 0)
			{
				return result;
			}
		}
		
		return 0;
	}
	
	return array.sort(_sort);
}
