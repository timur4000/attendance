import { structureMerge } from '../../../tea-modules/Functions/Structures/structureMerge.js';


/**
 * @description Contains all possible settings of the IconLineInfoManager component.
 **/
export class IconLineInfoManagerSettings
{
    /**
     * @typedef { Object } IconLineInfoManagerSetting
     *
     * @property { HttpRequestSettingProperties } [httpRequestSettings]
     *
     * @property { string } [domWrapperClassName]
     *
     * @property { Array<IconLineInfoSetting | IconLineInfoSettings> } [iconLineInfoSettings]
     *
     * @property { string } [countCssVariable]
     **/
    
    /**
     * @public
     *
     * @type { HttpRequestSettingProperties }
     **/
    httpRequestSettings = {};
    
    /**
     * @public
     *
     * @type { string }
     **/
    domWrapperClassName = 'icon-line-info-manager';
    
    /**
     * @public
     *
     * @type { Array<IconLineInfoSetting | IconLineInfoSettings> }
     **/
    iconLineInfoSettings = [];
    
    /**
     * @public
     *
     * @type { string }
     **/
    countCssVariable = 'icon-line-info-count';
    
    /**
     * @public
     *
     * @param { IconLineInfoManagerSetting } settings
     **/
    constructor(settings)
    {
        structureMerge(this, settings);
    }
}
