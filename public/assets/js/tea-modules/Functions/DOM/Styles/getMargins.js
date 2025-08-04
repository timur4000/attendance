/**
 * @typedef { Object } Margins
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
 * @description Returns margins object of the given element.
 *
 * @param { Element } element
 *
 * @return { Margins }
 **/
export function getMargins(element)
{
    const styles = getComputedStyle(element);
    
    return ({
        top: parseFloat(styles.marginTop),
        right: parseFloat(styles.marginRight),
        bottom: parseFloat(styles.marginBottom),
        left: parseFloat(styles.marginLeft),
        x: parseFloat(styles.marginRight) + parseFloat(styles.marginLeft),
        y: parseFloat(styles.marginTop) + parseFloat(styles.marginBottom),
    });
}
