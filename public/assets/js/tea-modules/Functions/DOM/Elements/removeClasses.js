/**
 * @function
 *
 * @description Remove the given classes to the given element.
 *
 * @param { Element } element
 *
 * @param { string[] } classes
 *
 * @return { void }
 **/
export function removeClasses(element, classes = [])
{
    classes.forEach(value =>
    {
        element.classList.remove(value);
    });
}
