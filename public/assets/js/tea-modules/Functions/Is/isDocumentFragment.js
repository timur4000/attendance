/**
 * @function
 *
 * @description Checks if the given argument is a document fragment.
 *
 * @param { any } verifiable
 *
 * @return { Boolean }
 **/
export function isDocumentFragment(verifiable)
{
    return verifiable instanceof DocumentFragment;
}
