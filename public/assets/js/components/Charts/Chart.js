import { ChartSettings } from './ChartSettings.js';
import { createElement } from '../../tea-modules/Functions/DOM/Elements/createElement.js';
import { CustomEvents }  from '../../tea-modules/Classes/CustomEvents/CustomEvents.js';
import { ChartTypesClassifier } from './Standards/ChartTypesClassifier.js';
import { hasClass } from '../../tea-modules/Functions/DOM/Elements/hasClass.js';
import { toggleClass } from '../../tea-modules/Functions/DOM/Elements/toggleClass.js';
import { clearArray } from '../../tea-modules/Functions/Arrays/clearArray.js';
import { ChartEventsClassifier } from '../Dashboard/Charts/ChartEventsClassifier.js';
import { ApexChartLib } from '../ApexChartOuter/ApexChartLib.js';
import { ChartModifiersClassifier } from './Standards/ChartModifiersClassifier.js';


/**
 * @abstract
 *
 * @description Implements abstract logic of the Chart components.
 **/
export class Chart
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
     * @type { ApexChartLib }
     **/
    lib;
    
    /**
     * @public
     *
     * @type { ChartSettings }
     **/
    settings;
    
    /**
     * @public
     *
     * @type { HTMLDivElement }
     **/
    domElement;
    
    /**
     * @public
     *
     * @type { Object }
     **/
    options = {};
    
    /**
     * @public
     *
     * @type { Array<string | number> | Array<Object> }
     **/
    series = [];
    
    /**
     * @public
     *
     * @type { Array }
     **/
    categories = [];
    
    /**
     * @public
     *
     * @type { Array<string> }
     **/
    labels = [];
    
    /**
     * @constructor
     *
     * @param { ChartSetting | ChartSettings } settings
     **/
    constructor(settings)
    {
        this.customEvents = new CustomEvents();
        
        this.settings = settings instanceof ChartSettings ? settings : new ChartSettings(settings);
        
        this.domElement = this._createDomElement();
    }
    
    /**
     * @abstract
     *
     * @public
     *
     * @description Returns options of the lib.
     *
     * @return { Object }
     **/
    getOptions() {}
    
    /**
     * @public
     *
     * @description Implements initialize base logic.
     *
     * @return { void }
     **/
    async initialization()
    {
        this.options = this.getOptions();
        
        this._eventsProcessing();
        
        this.lib = new ApexChartLib(this.domElement, this.options);
        
        await this.lib.load();
        
        await this.lib.initialization();
    }
    
    /**
     * @private
     *
     * @description Creates html node of the dom element.
     *
     * @return { HTMLDivElement }
     **/
    _createDomElement()
    {
        const div = createElement('div', { class: this.settings.domElementClassName });
        
        this.settings.modifiers.forEach(modifier => toggleClass(div, this.settings.domElementClassName + '--' + modifier + '-' + this.settings[ modifier ]));
        
        return div;
    }
    
    /**
     * @public
     *
     * @description Renders the component.
     *
     * @return { void }
     **/
    render()
    {
        this.lib.lib.render();
    }
    
    /**
     * @public
     *
     * @description Updates the component.
     *
     * @return { void }
     **/
    update()
    {
        this.lib.lib.updateSeries(this.series);
        
        clearArray(this.series);
    }
    
    /**
     * @public
     *
     * @description Adds the specified name and series.
     *
     * @param { Array } series
     *
     * @param { ? string } name
     *
     * @return { void }
     **/
    addSeries(series, name = null)
    {
        if (this.settings.type === ChartTypesClassifier.DONUT)
        {
            this.series = series;
            
            return ;
        }
        
        this.series.push({ name: name, data: series });
    }
    
    /**
     * @public
     *
     * @description Adds the specified categories.
     *
     * @param { Array<string> } categories
     *
     * @return { void }
     **/
    addCategories(categories)
    {
        this.categories = categories;
    }
    
    /**
     * @public
     *
     * @description Adds the specified labels.
     *
     * @param { Array<string> } labels
     *
     * @return { void }
     **/
    addLabels(labels)
    {
        this.labels = labels;
    }
    
    /**
     * @public
     *
     * @description Formatters the specified labels value of the component.
     *
     * @param { string | number } value
     *
     * @param { Object } options
     *
     * @return { string | number }
     **/
    dataLabelsFormatter(value, options)
    {
        return value;
    }
    
    /**
     * @public
     *
     * @description Sets the specified modifier to the element by the specified force.
     *
     * @param { string } modifier
     *
     * @param { boolean } force
     *
     * @return { boolean }
     **/
    setModifier(modifier, force)
    {
        return toggleClass(this.domElement, modifier, force);
    }
    
    /**
     * @public
     *
     * @description Check if the element contains the specified modifier.
     *
     * @param { string } modifier
     *
     * @return { boolean }
     **/
    hasModifier(modifier)
    {
        return hasClass(this.domElement, modifier);
    }
    
    /**
     * @public
     *
     * @description Sets the loading state by the specified force.
     *
     * @return { boolean }
     **/
    loading(force)
    {
        this.setModifier(ChartModifiersClassifier.LOADING, force);
    }
    
    /**
     * @protected
     *
     * @description Implements process of the events.
     *
     * @return { void }
     **/
    _eventsProcessing()
    {
        this.options.chart.events =
            {
                click: this._clickHandler.bind(this),
                
                dataPointSelection: this._dataPointSelectionHandler.bind(this),
                
                markerClick: this._markerClickHandler.bind(this),
            };
    }
    
    /**
     * @private
     *
     * @description Implements a click handler for the component.
     *
     * @param { MouseEvent } mouseEvent
     *
     * @param { Object } chartContext
     *
     * @param { Object } config
     *
     * @return { void }
     **/
    _clickHandler(mouseEvent, chartContext, config)
    {
        this.customEvents.execute(ChartEventsClassifier.CLICK, mouseEvent, chartContext, config, this);
    };
    
    /**
     * @private
     *
     * @description Implements a data point selection handler for the component.
     *
     * @param { MouseEvent } mouseEvent
     *
     * @param { Object } chartContext
     *
     * @param { Object } config
     *
     * @return { void }
     **/
    _dataPointSelectionHandler(mouseEvent, chartContext, config)
    {
        this.customEvents.execute(ChartEventsClassifier.DATA_POINT_SELECTION, mouseEvent, chartContext, config, this);
    };
    
    /**
     * @private
     *
     * @description Implements a marker click handler for the component.
     *
     * @param { MouseEvent } mouseEvent
     *
     * @param { Object } chartContext
     *
     * @param { number } seriesIndex
     *
     * @param { number } dataPointIndex
     *
     * @param { Object } config
     *
     * @return { void }
     **/
    _markerClickHandler(mouseEvent, chartContext, { seriesIndex, dataPointIndex, config})
    {
        this.customEvents.execute(ChartEventsClassifier.MARKER_CLICK, mouseEvent, chartContext, seriesIndex, dataPointIndex, config, this);
    };
    
    /**
     * @public
     *
     * @description Returns the dom element.
     *
     * @return { HTMLDivElement }
     **/
    getDomElement()
    {
        return this.domElement;
    };
}
