import { Lib }           from '../LibOuter/Lib.js';
import { querySelector } from '../../tea-modules/Functions/DOM/Queries/querySelector.js';


/**
 * @class
 *
 * @extends { Lib }
 *
 * @description Implements work with the apex chart lib.
 **/
export class ApexChartLib extends Lib
{
    /**
     * @public
     *
     * @type { HTMLElement }
     **/
    element;
    
    /**
     * @public
     *
     * @type { ApexCharts }
     **/
    lib;
    
    /**
     * @inheritDoc
     **/
    linkSrc = '/assets/js/lib/apex-charts/apexcharts.css';
    
    /**
     * @inheritDoc
     **/
    scriptSrc = '/assets/js/lib/apex-charts/apexcharts.min.js';
    
    /**
     * @inheritDoc
     **/
    localeSrc = '/assets/js/lib/apex-charts/locales/en.json';
    
    /**
     * @public
     *
     * @type { string }
     **/
    defaultLocale = 'en';
    
    /**
     * @inheritDoc
     *
     * @param { Object } settings
     *
     * @param { HTMLElement | string } selectors
     *
     * @return { ApexChartLib }
     **/
    constructor(selectors, settings)
    {
        super(settings);
        
        this.element = querySelector(selectors);
    }
    
    /**
     * @inheritDoc
     **/
    async initialization()
    {
        if (this.settings.chart)
        {
            const locale = await this.localeRequest();
            
            this.settings.chart.locales = [ locale ];
            
            this.settings.chart.defaultLocale = this.defaultLocale;
        }
        
        this.lib = new ApexCharts(this.element, this.settings);
    }
}
