import { isUndefined } from '../Is/isUndefined.js';


/**
 * @function
 *
 * @description Sorts an array based on input.
 *
 * @template { Array } T
 *
 * @param { T } array
 *
 * @param { ( 'asc' | 'desc' ) } direction
 *
 * @param { number | string } key
 *
 * @return { T }
 **/
export function sort(array = [], direction = 'asc', key)
{
	const compare = (a, b) => (direction === 'asc' ? 1 : -1) * ((a < b) ? -1 : (a > b) ? 1 : 0);

	const value = (a) => isUndefined(a[key]) ? a : a[key];

	return array.sort((a, b) => compare(value(a), value(b)));
}
