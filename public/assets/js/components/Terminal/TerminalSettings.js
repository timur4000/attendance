import { structureMerge } from '../../tea-modules/Functions/Structures/structureMerge.js';


/**
 * @class
 *
 * @description Contains all possible settings of the Terminal class.
 **/
export class TerminalSettings
{
    /**
     * @typedef { Object } TerminalSettingProperties
     *
     * @property { string ? } outputClass - The class name of the output element.
     *
     * @property { string ? } outputItemClass - The class name of the output item element.
     *
     * @property { string ? } insertClass - The class name of the insert element.
     *
     * @property { string ? } insertIconClass - The class name of the insert icon element.
     *
     * @property { string ? } insertIconSvgClass - The class name of the insert icon svg element.
     *
     * @property { string ? } insertIconSvgId - The id of the insert icon svg element.
     *
     * @property { string ? } insertInputClass - The class name of the insert input element.
     *
     * @property { string } insertInputId - The id of the insert input element.
     *
     * @property { string } insertInputPlaceholder - The placeholder of the insert input element.
     *
     * @property { string ? } insertInputName - The name of the insert input element.
     *
     * @property { string ? } insertSendClass - The class name of the insert send element.
     *
     * @property { string ? } insertSendSvgClass - The class name of the insert send svg element.
     *
     * @property { string ? } insertSendSvgId - The id of the insert send svg element.
     *
     * @property { number ? } width - The width of element.
     *
     * @property { number ? } height - The width of element.
     *
     * @property { number ? } bottomMargin - The margin of bottom.
     **/
    
    /**
     * @public
     *
     * @type { string }
     **/
    outputClass = 'terminal-output';
    
    /**
     * @public
     *
     * @type { string }
     **/
    outputItemClass = 'terminal-output-item';
    
    /**
     * @public
     *
     * @type { string }
     **/
    insertClass = 'terminal-insert';
    
    /**
     * @public
     *
     * @type { string }
     **/
    insertIconClass = 'terminal-insert__icon';
    
    /**
     * @public
     *
     * @type { string }
     **/
    insertIconSvgClass = 'icon icon-size-20';
    
    /**
     * @public
     *
     * @type { string }
     **/
    insertIconSvgId = 'programming-code';
    
    /**
     * @public
     *
     * @type { string }
     **/
    insertInputClass = 'terminal-insert__input';
    
    /**
     * @public
     *
     * @type { string }
     **/
    insertInputId;
    
    /**
     * @public
     *
     * @type { string }
     **/
    insertInputPlaceholder;
    
    /**
     * @public
     *
     * @type { string }
     **/
    insertInputName = 'command';
    
    /**
     * @public
     *
     * @type { string }
     **/
    insertSendClass = 'terminal-insert__send';
    
    /**
     * @public
     *
     * @type { string }
     **/
    insertSendSvgClass = 'icon icon-size-24';
    
    /**
     * @public
     *
     * @type { string }
     **/
    insertSendSvgId = 'essential-send';
    
    /**
     * @public
     *
     * @type { number }
     **/
    width = 0;
    
    /**
     * @public
     *
     * @type { number }
     **/
    height = 0;
    
    /**
     * @public
     *
     * @type { number }
     **/
    bottomMargin = 20;
    
    /**
     * @constructor
     *
     * @param { TerminalSettingProperties } settings
     *
     * @return { TerminalSettings }
     **/
    constructor(settings)
    {
        structureMerge(this, settings);
    }
}
