/**
 * @function
 *
 * @description Checks if the given value is empty.
 *
 * @param { any } verifiable
 *
 * @return { boolean }
 * **/
export function isEmpty(verifiable)
{
	return (verifiable !== 0) && !verifiable;
}
