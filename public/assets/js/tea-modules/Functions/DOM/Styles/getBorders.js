/**
 * @typedef { Object } Borders
 *
 * @property { number } top
 *
 * @property { number } right
 *
 * @property { number } bottom
 *
 * @property { number } left
 *
 * @property { number } x
 *
 * @property { number } y
 **/

/**
 * @function
 *
 * @description Returns borders object of the given element.
 *
 * @param { Element } element
 *
 * @return { Borders }
 **/
export function getBorders(element)
{
    const styles = getComputedStyle(element);
    
    return ({
        top: parseFloat(styles.borderTop),
        right: parseFloat(styles.borderRight),
        bottom: parseFloat(styles.borderBottom),
        left: parseFloat(styles.borderLeft),
        x: parseFloat(styles.borderRight) + parseFloat(styles.borderLeft),
        y: parseFloat(styles.borderTop) + parseFloat(styles.borderBottom),
    });
}
