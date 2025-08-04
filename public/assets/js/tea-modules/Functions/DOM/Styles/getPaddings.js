/**
 * @typedef { Object } Paddings
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
 * @description Returns paddings object of the given element.
 *
 * @param { Element } element
 *
 * @return { Paddings }
 **/
export function getPaddings(element)
{
    const styles = getComputedStyle(element);
    
    return ({
        top: parseFloat(styles.paddingTop),
        right: parseFloat(styles.paddingRight),
        bottom: parseFloat(styles.paddingBottom),
        left: parseFloat(styles.paddingLeft),
        x: parseFloat(styles.paddingRight) + parseFloat(styles.paddingLeft),
        y: parseFloat(styles.paddingTop) + parseFloat(styles.paddingBottom),
    });
}
