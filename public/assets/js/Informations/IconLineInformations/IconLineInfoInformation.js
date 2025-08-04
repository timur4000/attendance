import { BaseInformation } from '../BaseInformation.js';
import { IconLineInfoManager } from '../../components/IconLineInfo/IconLineInfoManager/IconLineInfoManager.js';


/**
 * @abstract
 *
 * @description Implements merge abstract logic of the IconLineInfo & Information components.
 *
 * @extends BaseInformation
 **/
export class IconLineInfoInformation extends BaseInformation
{
    /**
     * @public
     *
     * @type { IconLineInfoManager }
     **/
    iconLineInfoManager;
    
    /**
     * @inheritDoc
     **/
    async baseInitialization()
    {
        await super.baseInitialization();
        
        this.iconLineInfoManager = new IconLineInfoManager(this._iconLineInfoManagerSettings());
        
        this.information.insert(this.iconLineInfoManager.getDomWrapper());
    }
    
    /**
     * @inheritDoc
     **/
    async initialization()
    {
        await super.initialization();
        
        this.iconLineInfoManager.initialization();
    }
    
    /**
     * @inheritDoc
     *
     * @param { ? ResponseStandard } response
     **/
    async update(response = null)
    {
        await this.iconLineInfoManager.update(response);
    }
    
    /**
     * @inheritDoc
     *
     * @param { boolean } force
     **/
    async loading(force)
    {
        this.iconLineInfoManager.loading(force);
    }
    
    /**
     * @protected
     *
     * @description Returns settings of the IconLineInfoManager component.
     *
     * @return { IconLineInfoManagerSetting }
     **/
    _iconLineInfoManagerSettings()
    {
        return {
            httpRequestSettings: this._httpRequestSettings(),
            iconLineInfoSettings: this._iconLineInfoSettings(),
        }
    }
    
    /**
     * @protected
     *
     * @description Returns HttpRequest settings of the IconLineInfoManager.
     *
     * @return { HttpRequestSettingProperties }
     **/
    _httpRequestSettings()
    {
        return {};
    }
    
    /**
     * @protected
     *
     * @description Returns iconLineSettings setting of the IconLineInfoManager.
     *
     * @return { Array<IconLineInfoSetting | IconLineInfoSettings> }
     **/
    _iconLineInfoSettings()
    {
        return [];
    }
}