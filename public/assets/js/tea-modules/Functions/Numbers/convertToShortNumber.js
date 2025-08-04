/**
 * @description Converts a number into a shortened string representation with appropriate suffixes.
 *
 * @param { number } number
 *
 * @param { number } fractionDigits
 *
 * @return { string }
 **/
export function convertToShortNumber(number, fractionDigits = 2)
{
    if (!number || number < 1)
    {
        return (number ? number : 0).toFixed(fractionDigits);
    }
    
    const tiers =
              [
                  { divider: 1, suffix: '' },
                  { divider: 1e3, suffix: 'K' },
                  { divider: 1e6, suffix: 'M' },
                  { divider: 1e9, suffix: 'B' },
                  { divider: 1e12, suffix: 'T' },
                  { divider: 1e15, suffix: 'P' },
                  { divider: 1e18, suffix: 'E' },
                  { divider: 1e21, suffix: 'Z' },
                  { divider: 1e24, suffix: 'Y' },
                  { divider: 1e27, suffix: 'X' },
                  { divider: 1e30, suffix: 'W' },
                  { divider: 1e36, suffix: 'U' },
              ];
    
    const tier = tiers.filter((n) => Math.abs(number) >= n.divider).pop();
    
    const numberFixed = (number / tier.divider).toFixed(fractionDigits);
    
    return `${numberFixed}${tier.suffix}`;
}
