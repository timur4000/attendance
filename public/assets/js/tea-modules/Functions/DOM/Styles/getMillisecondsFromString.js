/**
 * @function
 *
 * @description Returns milliseconds by the given time string.
 *
 * @param { string } time
 *
 * @return { number }
 **/
export function getMillisecondsFromString(time)
{
    if (!time)
    {
        return 0;
    }
    
    const unit = time.replace(/[\d.]*/, '');
    
    let value = parseFloat(time);
    
    if (unit === 's')
    {
        value *= 1000;
    }
    
    return value;
}
