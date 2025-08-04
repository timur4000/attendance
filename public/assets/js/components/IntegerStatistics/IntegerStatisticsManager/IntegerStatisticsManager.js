import { IntegerStatisticsManagerSettings }     from './IntegerStatisticsManagerSettings.js';
import { IntegerStatistics }                    from '../IntegerStatistics.js';
import { querySelector }                        from '../../../tea-modules/Functions/DOM/Queries/querySelector.js';
import { createElement }                        from '../../../tea-modules/Functions/DOM/Elements/createElement.js';
import { IntegerStatisticsStatesClassifier }    from '../Standards/IntegerStatisticsStatesClassifier.js';
import { setCssVariable }                       from '../../../tea-modules/Functions/DOM/Variables/setCssVariable.js';
import { IntegerStatisticsPositionsClassifier } from '../Standards/IntegerStatisticsPositionsClassifier.js';
import { CustomEvents }                         from '../../../tea-modules/Classes/CustomEvents/CustomEvents.js';
import { IntegerStatisticsEventsClassifier }    from '../Standards/IntegerStatisticsEventsClassifier.js';
import { isStructureEmpty }                     from '../../../tea-modules/Functions/Is/isStructureEmpty.js';


/**
 * @description Implements manage of all IntegerStatistics Components.
 **/
export class IntegerStatisticsManager
{
    /**
     * @public
     *
     * @type { CustomEvents }
     **/
    customEvents;
    
    /**
     * @public
     *
     * @type { IntegerStatisticsManagerSettings }
     **/
    settings;

    /**
     * @public
     *
     * @type { Array<IntegerStatistics> }
     **/
    integerStatistics = [];
    
    /**
     * @public
     *
     * @type { HTMLDivElement }
     **/
    domManager;
    
    /**
     * @public
     *
     * @type { ResponseStandard }
     **/
    response;
    
    /**
     * @constructor
     *
     * @param { IntegerStatisticsManagerSetting } settings
     **/
    constructor(settings = {})
    {
        this.customEvents = new CustomEvents();
        
        this.settings = settings instanceof IntegerStatisticsManagerSettings ? settings : new IntegerStatisticsManagerSettings(settings);
        
        this.domManager = this.settings.manager ? querySelector(this.settings.manager) : this._createDomManager();
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
        this._itemsProcessing();
     
        setCssVariable('integer-statistics-count', this.settings.countInRow.toString(), this.domManager);
    }
    
    /**
     * @private
     *
     * @description Creates html node of the dom manager element.
     *
     * @return { HTMLDivElement }
     **/
    _createDomManager()
    {
        return createElement('div', { class: this.settings.domManagerClassName });
    }
    
    /**
     * @private
     *
     * @description Implement process of the items.
     **/
    _itemsProcessing()
    {
        for (let i = 0, n = this.settings.items.length; i < n; i++)
        {
            const item = this.settings.items[ i ];
            
            item.type = this.settings.itemsType;
            
            const integerStatistics = new IntegerStatistics(item);
            
            integerStatistics.customEvents.subscribe(IntegerStatisticsEventsClassifier.EXTERNAL_BUTTON_CLICK, this._externalButtonClickHandler.bind(this));
            
            this._positionsProcessing(integerStatistics, i + 1, n);
            
            integerStatistics.initialization();
            
            this.integerStatistics.push(integerStatistics);
            
            this.domManager.append(integerStatistics.getElement());
        }
    }
    
    /**
     * @private
     *
     * @description Implements a positions process for each integerStatistics component.
     *
     * @param { IntegerStatistics } instance
     *
     * @param { number } index
     *
     * @param { number } length
     *
     * @return { void }
     **/
    _positionsProcessing(instance, index, length)
    {
        // const totalRows = length / this.settings.countInRow;
        
        // const currentRow = index / this.settings.countInRow;
        
        instance.setModifier(IntegerStatisticsPositionsClassifier.TOP_LEFT, index === 1);
        
        instance.setModifier(IntegerStatisticsPositionsClassifier.BOTTOM_RIGHT, index === length);

        instance.setModifier(IntegerStatisticsPositionsClassifier.BOTTOM_LEFT, index % (this.settings.countInRow + 1) === 0);
        
        instance.setModifier(IntegerStatisticsPositionsClassifier.TOP_RIGHT, index % this.settings.countInRow === 0 && index !== length);
        
        instance.setModifier(IntegerStatisticsPositionsClassifier.SEQUENCE, index > 1 && !(index % (this.settings.countInRow + 1) === 0));
        
        instance.setModifier(IntegerStatisticsPositionsClassifier.LOWER_SEQUENCE, index > this.settings.countInRow);
    }
    
    /**
     * @private
     *
     * @description Implements a click handler for each IntegerStatistics component.
     *
     * @param { PointerEvent } event
     *
     * @param { Button } button
     *
     * @param { IntegerStatistics } instance
     *
     * @return { void }
     **/
    _externalButtonClickHandler(event, button, instance)
    {
        this.customEvents.execute(IntegerStatisticsEventsClassifier.EXTERNAL_BUTTON_CLICK, event, button, instance, this);
    }
    
    /**
     * @public
     *
     * @description Updates all IntegerStatistics component.
     *
     * @param { ? ResponseStandard } response
     *
     * @return { Promise<void> }
     **/
    async update(response = null)
    {
        this.loading(true);
        
        response = response ? response : await IntegerStatistics.request(this.settings.httpRequestSettings);
     
        this.response = response;
        
        this._updateProcessing(response);
        
        this.loading(false);
        
        this.customEvents.execute(IntegerStatisticsEventsClassifier.UPDATE, response, this);
    }
    
    /**
     * @private
     *
     * @description Implements process of the update IntegerStatistics components.
     *
     * @param { ResponseStandard } response
     *
     * @return { void }
     **/
    async _updateProcessing(response)
    {
        for (let i = 0, n = this.integerStatistics.length; i < n; i++)
        {
            const instance = this.integerStatistics[ i ];
            
            if (response && isStructureEmpty(instance.settings.httpRequestSettings))
            {
                await instance.update(response);
                
                continue ;
            }
            
            await instance.update();
        }
    }
    
    /**
     * @public
     *
     * @description Sets the specified modifier to the element by the specified force.
     *
     * @param { IntegerStatisticsStatesClassifier } modifier
     *
     * @param { boolean } force
     *
     * @return { void }
     **/
    setModifier(modifier, force)
    {
        this.domManager.classList.toggle(modifier, force);
    }
    
    /**
     * @public
     *
     * @description Check if the element contains the specified modifier.
     *
     * @param { IntegerStatisticsStatesClassifier } modifier
     *
     * @return { void }
     **/
    hasModifier(modifier)
    {
        this.domManager.classList.contains(modifier);
    }
    
    /**
     * @public
     *
     * @description Returns dom manager element.
     *
     * @return { HTMLDivElement }
     **/
    getManager()
    {
        return this.domManager;
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
        this.setModifier(IntegerStatisticsStatesClassifier.LOADING, force);
    }
}
