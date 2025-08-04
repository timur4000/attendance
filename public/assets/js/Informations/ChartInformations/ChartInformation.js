import { BaseInformation } from '../BaseInformation.js';
import { Chart }           from '../../components/Charts/Chart.js';
import { ChartTypesClassifier } from '../../components/Charts/Standards/ChartTypesClassifier.js';
import { ConfigurationCodesClassifier } from '../../standards/Classifiers/Configurations/ConfigurationCodesClassifier.js';
import { Configurations } from '../../standards/Configurations/Configurations.js';
import { LibraryChars } from '../../tea-modules/Classes/Standards/Chars/LibraryChars.js';
import { InputOuterPositionsClassifier } from '../../components/Inputs/Standards/InputOuterPositionsClassifier.js';
import { en } from '../../lib/air-datepicker/locale/en.js';
import { Charts } from '../../components/Charts/Charts.js';


/**
 * @abstract
 *
 * @description Implements extends logic of the ChartInformation.
 *
 * @extends BaseInformation
 **/
export class ChartInformation extends BaseInformation
{
    /**
     * @public
     *
     * @type { Chart }
     **/
    chart;
    
    /**
     * @public
     *
     * @type { ChartTypesClassifier }
     **/
    chartType = ChartTypesClassifier.LINE;
    
    /**
     * @public
     *
     * @type { Object<string, string> | Array<string> }
     **/
    labels = {};
    
    /**
     * @public
     *
     * @type { ConfigurationCodesClassifier }
     **/
    configurationCode;
    
    /**
     * @public
     *
     * @type { Object }
     **/
    configuration;
    
    /**
     * @inheritDoc
     **/
    async baseInitialization()
    {
        await super.baseInitialization();
        
        await this._configurationProcessing();
        
        this.chart = Charts.createChartByType(this.chartType, this._getChartSettings());
        
        this.information.insert(this.chart.getDomElement());
    }
    
    /**
     * @inheritDoc
     **/
    async initialization()
    {
        await super.initialization();

        await this.chart.initialization();
        
        this.render();
    }
    
    /**
     * TODO: Need refactoring with separate loading process!
     *
     * @inheritDoc
     *
     * @param { ResponseStandard | XMLHttpRequest } response
     **/
    async update(response)
    {
        // this.chart.loading(true);
        
        this._propertiesProcessing(response.data);
        
        this.chart.update();
        
        // this.chart.loading(false);
    }
    
    /**
     * @inheritDoc
     **/
    async loading(force)
    {
        this.chart.loading(force);
    }
    
    /**
     * @private
     *
     * @description Implements process of the properties.
     *
     * @param { Array } data
     *
     * @return { void }
     **/
    _propertiesProcessing(data)
    {
        for (let i = 0, n = this.getChartProperties().length; i < n; i++)
        {
            const property = this.getChartProperties()[ i ];

            this.chart.addSeries(data.map(datum => datum[ property ]), this.labels[ property ]);
        }
    }
    
    /**
     * @public
     *
     * @description Converts the configuration value to array and returns it.
     *
     * @return { Array<string> }
     **/
    getChartProperties()
    {
        return this.configuration.value_string.split(LibraryChars.stringSeparator);
    }
    
    /**
     * @inheritDoc
     **/
    async render()
    {
        this.chart.render();
    }
    
    /**
     * @abstract
     *
     * @description Returns settings of the Chart component.
     *
     * @return { ChartSetting | LineChartSetting }
     **/
    _getChartSettings()
    {
        return {};
    }
    
    /**
     * @inheritDoc
     **/
    _getCustomInputOptions()
    {
        return [
            {
                inputId: 'chart-information-date',
                inputName: 'date',
                title: 'Select month..',
                isDatepicker: true,
                datepickerSettings:
                    {
                        locale: en,
                        selectedDates: [ new Date() ],
                        autoClose: true,
                        view: 'months',
                        minView: 'months',
                        dateFormat: 'yyyy, MMMM',
                        maxDate: new Date(),
                    },
                withInputOuter: true,
                inputOuterSettings: { identifier: 'chart-information-date-between' },
                iconLabelOptions:
                    [
                        { position: InputOuterPositionsClassifier.AFTER, forAttribute: 'information-date-start', iconId: 'time-calendar-search', iconClassName: 'icon icon-size-16' },
                    ]
            }
        ];
    }
    
    /**
     * @protected
     *
     * @description Implements process of the configuration.
     *
     * @return { void }
     **/
    async _configurationProcessing()
    {
        const response = await Configurations.get(this.configurationCode);
        
        this.configuration = response.record;
    }
}
