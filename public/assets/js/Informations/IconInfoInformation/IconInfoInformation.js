import { BaseInformation } from '../BaseInformation.js';
import { IconInfoManager } from '../../components/IconInfo/IconInfoManager/IconInfoManager.js';
import { IconInfoManagerSettings } from '../../components/IconInfo/IconInfoManager/IconInfoManagerSettings.js';
import { IconInfoTypesClassifier } from '../../components/IconInfo/Standards/IconInfoTypesClassifier.js';


/**
 * @abstract
 *
 * @description Implements merge abstract logic of the IconInfo & Information components.
 *
 * @extends BaseInformation
 **/
export class IconInfoInformation extends BaseInformation
{
    /**
     * @public
     *
     * @type { IconInfoManager }
     **/
    iconInfoManager;
    
    /**
     * @inheritDoc
     **/
    async baseInitialization()
    {
        super.baseInitialization();
        
        this.iconInfoManager = new IconInfoManager(this._getIconInfoManagerSettings());
        
        this.information.insert(this.iconInfoManager.getWrapper());
    }
    
    /**
     * @inheritDoc
     **/
    async initialization()
    {
        await super.initialization();
        
        this.iconInfoManager.initialization();
    }
    
    /**
     * @inheritDoc
     **/
    async update(...variables)
    {
        await this.iconInfoManager.update();
    }
    
    /**
     * @private
     *
     * @description Returns settings of the IconInfoManager component.
     *
     * @return { IconInfoManagerSettings }
     **/
    _getIconInfoManagerSettings()
    {
        return new IconInfoManagerSettings(
            {
                type: this._getType(),
                isCurrency: this._isCurrency(),
                defaultValue: this._getDefaultValue(),
                items: this._getItems(),
                httpRequestSettings: this._getHttRequestSetting(),
            }
        );
    }
    
    /**
     * @protected
     *
     * @description Returns type setting of the IconInfoManager component.
     *
     * @return { IconInfoTypesClassifier }
     **/
    _getType()
    {
        return IconInfoTypesClassifier.DEFAULT;
    }
    
    /**
     * @protected
     *
     * @description Returns default value setting of the IconInfoManager component.
     *
     * @return { string }
     **/
    _getDefaultValue()
    {
        return '0';
    }
    
    /**
     * @protected
     *
     * @description Returns isCurrency setting of the IconInfoManager component.
     *
     * @return { boolean }
     **/
    _isCurrency()
    {
        return true;
    }
    
    /**
     * @abstract
     *
     * @protected
     *
     * @description Returns settings of the items of the IconInfoManager component.
     *
     * @return { Array<IconInfoSetting> }
     **/
    _getItems() {}
    
    /**
     * @abstract
     *
     * @protected
     *
     * @description Returns settings of the HttpRequest of the IconInfoManager component.
     *
     * @return { HttpRequestSettingProperties }
     **/
    _getHttRequestSetting() {}
}
