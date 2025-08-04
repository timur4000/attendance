import { BaseInformation } from '../BaseInformation.js';
import { InformationTypesClassifier } from '../../components/Information/Standards/InformationTypesClassifier.js';
import { IntegerStatisticsManager } from '../../components/IntegerStatistics/IntegerStatisticsManager/IntegerStatisticsManager.js';


/**
 * @abstract
 *
 * @description Implements merge abstract logic of the IntegerStatistics & Information components.
 *
 * @extends BaseInformation
 **/
export class IntegerStatisticsInformation extends BaseInformation
{
    /**
     * @inheritDoc
     **/
    withHeading = false;
    
    /**
     * @public
     *
     * @type { number }
     **/
    countInRow = 4;
    
    /**
     * @public
     *
     * @type { IntegerStatisticsManager }
     **/
    integerStatisticsManager;
    
    /**
     * @inheritDoc
     **/
    async baseInitialization()
    {
        super.baseInitialization();
        
        this.integerStatisticsManager = new IntegerStatisticsManager(this._integerStatisticsManagerSettings());
    }
    
    /**
     * @inheritDoc
     **/
    async initialization()
    {
        await super.initialization();
        
        this.integerStatisticsManager.initialization();
        
        this.information.insert(this.integerStatisticsManager.getManager());
    }
    
    /**
     * @inheritDoc
     **/
    async update(response)
    {
        await this.integerStatisticsManager.update(response);
    }
    
    /**
     * @inheritDoc
     **/
    async loading(force)
    {
        this.integerStatisticsManager.loading(force);
    }
    
    /**
     * @private
     *
     * @description Returns settings of the integerStatisticsManager component.
     *
     * @return { IntegerStatisticsManagerSetting }
     **/
    _integerStatisticsManagerSettings()
    {
        return {
            httpRequestSettings: this._httpRequestSettings(),
            items: this._items(),
            countInRow: this.countInRow,
        };
    }
    
    /**
     * @abstract
     *
     * @protected
     *
     * @description Returns items setting of the IntegerStatisticsManager.
     *
     * @return { Array<IntegerStatisticsSetting> }
     **/
    _items()
    {
        return [];
    }
    
    /**
     * @protected
     *
     * @description Returns HttpRequestSettings of the IntegerStatisticsManager.
     *
     * @return { HttpRequestSettingProperties }
     **/
    _httpRequestSettings()
    {
        return {};
    }
}
