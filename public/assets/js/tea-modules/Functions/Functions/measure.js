/**
 * @function
 *
 * @description Measuring program execution time.
 *
 * @param { Function } callback - The function to execute.
 *
 * @param { number } [cycles = 1] - The execute count.
 *
 * @return { number } The executed time.
 **/
export function measure(callback, cycles = 1)
{
	let time = performance.now();

	for (let i = 0, n = cycles; i < n; i++)
	{
		callback();
	}

	time = performance.now() - time;

	return time;
}