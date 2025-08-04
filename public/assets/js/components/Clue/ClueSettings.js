import { structureMerge } from '../../tea-modules/Functions/Structures/structureMerge.js';
import { ClueTypesClassifier } from './ClueTypesClassifier.js';
import { CluePositionsClassifier } from './CluePositionsClassifier.js';


/**
 * @class
 *
 * @description Contains all possible settings of the Clue class.
 **/
export class ClueSettings
{
    /**
     * @typedef { Object } ClueSettingProperties
     *
     * @property { string[] ? } elementClass - The class name of the element.
     *
     * @property { string ? } elementAttribute - The attribute of the element.
     *
     * @property { number ? } margin - The margin of the element.
     *
     * @property { string ? } targetPositionAttribute - The position attribute of the target.
     *
     * @property { ClueTypesClassifier ? } type - The type of the element.
     *
     * @property { CluePositionsClassifier ? } position - The position of the element.
     *
     * @property { boolean ? } freezy - Determines whether the element should be freezy.
     *
     * @property { string ? } text - The text for the element.
     **/
    
    /**
     * @public
     *
     * @type { string[] }
     **/
    elementClass = [ 'clue clue-theme-default clue-size-default' ];
    
    /**
     * @public
     *
     * @type { string }
     **/
    elementAttribute = 'data-clue';
    
    /**
     * @public
     *
     * @type { number }
     **/
    margin = 10;
    
    /**
     * @public
     *
     * @type { string }
     **/
    targetPositionAttribute = 'data-position';
    
    /**
     * @public
     *
     * @type { ClueTypesClassifier }
     **/
    type = ClueTypesClassifier.HOVER;
    
    /**
     * @public
     *
     * @type { CluePositionsClassifier }
     **/
    position = CluePositionsClassifier.BOTTOM;
    
    /**
     * @public
     *
     * @type { boolean }
     **/
    freezy = false;
    
    /**
     * @public
     *
     * @type { string }
     **/
    text = '';
    
    /**
     * @constructor
     *
     * @param { ClueSettingProperties } settings
     *
     * @return { ClueSettings }
     **/
    constructor(settings)
    {
        this.update(settings);
    }
    
    /**
     * @public
     *
     * @description Updates self properties by the given settings.
     *
     * @param { ClueSettingProperties } settings
     *
     * @return { void }
     **/
    update(settings)
    {
        structureMerge(this, settings);
    }
}
