/**
 * @function
 *
 * @description Checks if the given argument is a date object.
 *
 * @param { any } verifiable
 *
 * @return { boolean }
 **/
export function isDate(verifiable)
{
    return verifiable instanceof Date;
}
