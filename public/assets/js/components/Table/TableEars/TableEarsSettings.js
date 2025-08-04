import { structureMerge } from '../../../tea-modules/Functions/Structures/structureMerge.js';
import { TableEarTypesClassifier } from './TableEarTypesClassifier.js';


/**
 * @class
 *
 * @description Contains all possible settings of the TableEars class.
 **/
export class TableEarsSettings
{
    /**
     * @typedef { Object } TableEarsSettingProperties
     *
     * @property { TableEarSettingProperties ? } rightEarSettings - The settings of the right ear component.
     *
     * @property { TableEarSettingProperties ? } leftEarSettings - The settings of the left ear component.
     *
     * @property { number ? } animateDuration - The duration of the animations.
     *
     * @property { number ? } animateStep - The step of the animation (px).
     **/
    
    /**
     * @public
     *
     * @type { TableEarSettingProperties }
     **/
    rightEarSettings =
        {
            type: TableEarTypesClassifier.RIGHT,
        };
    
    /**
     * @public
     *
     * @type { TableEarSettingProperties }
     **/
    leftEarSettings =
        {
            type: TableEarTypesClassifier.LEFT,
        };
    
    /**
     * @public
     *
     * @type { number }
     **/
    animateDuration = 1000;
    
    /**
     * @public
     *
     * @type { number }
     **/
    animateStep = 7;
    
    /**
     * @constructor
     *
     * @param { TableEarsSettingProperties } settings
     *
     * @return { TableEarsSettings }
     **/
    constructor(settings)
    {
        structureMerge(this, settings);
    }
}
