/**
 * @export
 *
 * @description Sets css variable to the specified element.
 *
 * @param { string } property
 *
 * @param { string } value
 *
 * @param { HTMLElement } root
 *
 * @return { void }
 * **/
export function setCssVariable(property = '', value = '', root = document.documentElement)
{
	root.style.setProperty('--' + property, value);
}