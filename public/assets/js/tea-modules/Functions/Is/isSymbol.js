/**
 * @function
 *
 * @description Checks if the given argument is a symbol.
 *
 * @param { any } verifiable
 *
 * @return { boolean }
 **/
export function isSymbol(verifiable)
{
    return typeof verifiable === 'symbol';
}
