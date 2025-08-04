import { getMillisecondsFromString } from './getMillisecondsFromString.js';
import { isEmpty }                   from '../../Is/isEmpty.js';


/**
 * @function
 *
 * @description Returns transition value of the given element.
 *
 * @param { Element } element
 *
 * @param { string ? } property
 *
 * @returns { Transition | Transition[] }
 **/
export function getTransition(element, property)
{
    /**
     * @typedef { Object } Transition
     *
     * @property { string } property
     *
     * @property { number } duration
     *
     * @property { string } timing
     *
     * @property { number } delay
     **/
    
    /**
     * @type { Transition[] }
     **/
    const transitions = [];
    
    const style = getComputedStyle(element);
    
    const transitionProperties = style.transitionProperty.split(', ');
    
    const transitionDurations = style.transitionDuration.split(', ');
    
    const transitionTimingFunctions = style.transitionTimingFunction.split(', ');
    
    const transitionDelays = style.transitionDelay.split(', ');
    
    for (let i = 0, n = transitionProperties.length; i < n; i++)
    {
        transitions.push({ property: transitionProperties[ i ], duration: getMillisecondsFromString(transitionDurations[ i ]), timing: transitionTimingFunctions[ i ], delay: getMillisecondsFromString(transitionDelays[ i ]) });
    }
    
    if (!isEmpty(property))
    {
        return transitions.find(a => a.property === property);
    }
    
    return transitions;
}
