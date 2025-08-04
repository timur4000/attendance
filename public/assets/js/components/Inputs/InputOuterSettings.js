import { structureMerge } from '../../tea-modules/Functions/Structures/structureMerge.js';


export class InputOuterSettings
{
    /**
     * @typedef { Object } InputOuterSetting
     *
     * @property { ? string } [identifier]
     *
     * @property { ? string } [elementClassName]
     **/
    
    /**
     * @public
     *
     * @type { string }
     **/
    identifier = '';
    
    /**
     * @public
     *
     * @type { string }
     **/
    elementClassName = 'input-outer input-outer--theme-mercury input-outer--size-middle input-outer--type-label';
    
    constructor(settings = {})
    {
        structureMerge(this, settings);
    }
}
