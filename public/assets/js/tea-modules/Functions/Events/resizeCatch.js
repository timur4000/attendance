/**
 * @function
 *
 * @description Executes the given callbacks if the specified screen width is larger or smaller.
 *
 * @param { number } width
 *
 * @param { Function ? } overCallback
 *
 * @param { Function ? } notOverCallback
 *
 * @return { void }
 **/
export function resizeCatch(width, overCallback, notOverCallback)
{
    let innerWidth = window.innerWidth;
    
    let isOver = innerWidth > width;
    
    let isOverComplete = 0;
    
    handler();
    
    window.addEventListener('resize', resize);
    
    function resize()
    {
        innerWidth = window.innerWidth;
        
        isOver = innerWidth > width;
        
        handler();
    }
    
    function handler()
    {
        if (isOver && [0, 2].includes(isOverComplete))
        {
            isOverComplete = 1;
            
            overCallback && overCallback();
        }
        else if (!isOver && [0, 1].includes(isOverComplete))
        {
            isOverComplete = 2;
            
            notOverCallback && notOverCallback();
        }
    }
}