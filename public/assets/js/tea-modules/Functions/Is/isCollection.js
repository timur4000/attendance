/**
 * @function
 *
 * @description Checks if the given argument is a collection.
 *
 * @param { any } verifiable
 *
 * @return { boolean }
 **/
export function isCollection(verifiable)
{
    return (
        verifiable instanceof Set
        || verifiable instanceof Map
        || NodeList.prototype.isPrototypeOf(verifiable)
        || HTMLCollection.prototype.isPrototypeOf(verifiable)
    );
}