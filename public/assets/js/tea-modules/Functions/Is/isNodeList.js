/**
 * @function
 *
 * @description Checks if the given argument is a node list.
 *
 * @param { any } verifiable
 *
 * @return { Boolean }
 **/
export function isNodeList(verifiable)
{
    return NodeList.prototype.isPrototypeOf(verifiable);
}
