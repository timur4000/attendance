import { IconLineInfoManagerSettings } from './IconLineInfoManagerSettings.js';
import { createElement }               from '../../../tea-modules/Functions/DOM/Elements/createElement.js';
import { IconLineInfo }                from '../IconLineInfo.js';
import { isStructureEmpty }            from '../../../tea-modules/Functions/Is/isStructureEmpty.js';
import { toggleClass }                 from '../../../tea-modules/Functions/DOM/Elements/toggleClass.js';
import { IconLineInfoStatesClassifier } from '../Standards/IconLineInfoStatesClassifier.js';
import { setCssVariable } from '../../../tea-modules/Functions/DOM/Variables/setCssVariable.js';


/**
 * @description Implements manage for IconInfo components.
 **/
export class IconLineInfoManager
{
    /**
     * @public
     *
     * @type { IconLineInfoManagerSettings }
     **/
    settings;
    
    /**
     * @public
     *
     * @type { HTMLDivElement }
     **/
    domWrapper;
    
    /**
     * @public
     *
     * @type { Array<IconLineInfo> }
     **/
    iconLineInfos = [];
    
    /**
     * @constructor
     *
     * @param { IconLineInfoManagerSetting | IconLineInfoManagerSettings} settings
     **/
    constructor(settings = {})
    {
        this.settings = settings instanceof IconLineInfoManagerSettings ? settings : new IconLineInfoManagerSettings(settings);
        
        this.domWrapper = this._createDomWrapper();
        
        this._iconLineInfosProcessing();
        
        setCssVariable(this.settings.countCssVariable, this.iconLineInfos.length.toString());
    }
    
    /**
     * @public
     *
     * @description Implements initialize base logic.
     *
     * @return { void }
     **/
    initialization()
    {
        this._iconLineInfosInitialization();
    }
    
    /**
     * @public
     *
     * @description Updates all components.
     *
     * @param { ? ResponseStandard } response
     *
     * @return { void }
     **/
    async update(response = null)
    {
        this.loading(true);
        
        response = response ? response : await IconLineInfo.request(this.settings.httpRequestSettings);
        
        this._updateProcessing(response);
        
        this.loading(false);
    }
    
    /**
     * @private
     *
     * @description Implements process of the update.
     *
     * @param { ? ResponseStandard } response
     *
     * @return { void }
     **/
    async _updateProcessing(response)
    {
        if (!response)
        {
            return ;
        }
        
        for (let i = 0, n = this.iconLineInfos.length; i < n; i++)
        {
            const iconLineInfo = this.iconLineInfos[ i ];
            
            if (!isStructureEmpty(iconLineInfo.settings.httpRequestSettings))
            {
                await iconLineInfo.update();
                
                continue ;
            }
            
            await iconLineInfo.update(response);
        }
    }
    
    /**
     * @private
     *
     * @description Implements process of the IconLineInfo components.
     *
     * @return { void }
     **/
    _iconLineInfosProcessing()
    {
        for (let i = 0, n = this.settings.iconLineInfoSettings.length; i < n; i++)
        {
            const iconLineInfoSettings = this.settings.iconLineInfoSettings[ i ];
            
            const instance = new IconLineInfo(iconLineInfoSettings);
            
            this.iconLineInfos.push(instance);
            
            this.domWrapper.append(instance.getDomElement());
        }
    }
    
    /**
     * @private
     *
     * @description Implements a initialize process of the IconLineInfo components.
     *
     * @return { void }
     **/
    _iconLineInfosInitialization()
    {
        this.iconLineInfos.forEach(instance => instance.initialization());
    }
    
    /**
     * @private
     *
     * @description Creates html node of the dom wrapper element.
     *
     * @return { HTMLDivElement }
     **/
    _createDomWrapper()
    {
        return createElement('div', { class: this.settings.domWrapperClassName });
    }
    
    /**
     * @public
     *
     * @description Returns dom wrapper element.
     *
     * @return { HTMLDivElement }
     **/
    getDomWrapper()
    {
        return this.domWrapper;
    }
    
    /**
     * @public
     *
     * @description Sets the loading state by the specified force.
     *
     * @param { boolean } force
     *
     * @return { void }
     **/
    loading(force)
    {
        toggleClass(this.domWrapper, IconLineInfoStatesClassifier.LOADING, force);
    }
}
