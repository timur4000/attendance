/**
 * @function
 *
 * @description Sets the given classes to the given element.
 *
 * @param { Element } element
 *
 * @param { string[] } classes
 *
 * @return { void }
 **/
export function setClasses(element, classes = [])
{
    classes.forEach(value =>
    {
        element.classList.add(value);
    });
}
