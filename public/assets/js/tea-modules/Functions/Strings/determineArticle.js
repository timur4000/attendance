/**
 * @function
 *
 * @description Determines whether to use 'a' or 'an' based on the given string.
 *
 * @param { string } string
 *
 * @return { string } The appropriate article ('a' or 'an').
**/
export function determineArticle(string)
{
    const firstLetter = string.charAt(0).toLowerCase();
    
    if ([ 'a', 'e', 'i', 'o', 'u' ].includes(firstLetter))
    {
        return 'an';
    }
    else
    {
        return 'a';
    }
}
