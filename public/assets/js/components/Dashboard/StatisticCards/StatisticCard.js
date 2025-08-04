import { convertToHtml } from '../../../tea-modules/Functions/Convertations/convertToHtml.js';
import { querySelector } from '../../../tea-modules/Functions/DOM/Queries/querySelector.js';
import { isEmpty }       from '../../../tea-modules/Functions/Is/isEmpty.js';


/**
 * @abstract
 *
 * @class
 *
 * @description Implements abstract logic of statistic cards.
 **/
export class StatisticCard
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
     * @type { HTMLHeadingElement }
     **/
    heading;
    
    /**
     * @public
     *
     * @type { HTMLHeadingElement }
     **/
    firstHeading;
    
    /**
     * @public
     *
     * @type { HTMLSpanElement }
     **/
    firstValue;
    
    /**
     * @public
     *
     * @type { HTMLSpanElement }
     **/
    firstTotal;
    
    /**
     * @public
     *
     * @type { SVGCircleElement }
     **/
    firstCircle;
    
    /**
     * @public
     *
     * @type { HTMLHeadingElement }
     **/
    secondHeading;
    
    /**
     * @public
     *
     * @type { HTMLSpanElement }
     **/
    secondValue;
    
    /**
     * @public
     *
     * @type { HTMLSpanElement }
     **/
    secondTotal;
    
    /**
     * @public
     *
     * @type { SVGCircleElement }
     **/
    secondCircle;
    
    /**
     * @public
     *
     * @type { string }
     **/
    statisticProgressClass = 'statistic-progress statistic-progress--theme-royal-blue statistic-progress--size-default';
    
    /**
     * @constructor
     *
     * @param { string ? } statisticProgressClass
     *
     * @return { StatisticCard }
     **/
    constructor(statisticProgressClass)
    {
        if (!isEmpty(statisticProgressClass))
        {
            this.statisticProgressClass = statisticProgressClass;
        }
        
        this.element = convertToHtml(this._getHtml());
        
        this.heading = querySelector('.card-heading', { root: this.element });
        
        this.total = querySelector('[data-total]', { root: this.element });
        
        
        this.firstHeading = querySelector('[data-first-heading]', { root: this.element });
        
        this.firstValue = querySelector('[data-first-value]', { root: this.element });
        
        // this.firstTotal = querySelector('[data-first-total]', { root: this.element });
        
        this.firstCircle = querySelector('[data-first-circle]', { root: this.element });
        
        
        this.secondHeading = querySelector('[data-second-heading]', { root: this.element });
        
        this.secondValue = querySelector('[data-second-value]', { root: this.element });
        
        // this.secondTotal = querySelector('[data-second-total]', { root: this.element });
        
        this.secondCircle = querySelector('[data-second-circle]', { root: this.element });
    }
    
    /**
     * @abstract
     *
     * @public
     *
     * @description Implements request for the information.
     *
     * @param { Object ? } settings
     *
     * @return { Promise }
     **/
    async informationRequest(settings) {}
    
    /**
     * @abstract
     *
     * @public
     *
     * @description Updates component.
     *
     * @param { Object ? } settings
     *
     * @return { Promise }
     **/
    async update(settings) {}
    
    /**
     * @private
     *
     * @description Returns html of the current component.
     *
     * @return { string }
     **/
    _getHtml()
    {
        return (
            `
            <section class="grid-column grid-column-3">
                <div class="statistic-card card card--theme-white">
        
        <div class="card-head card-head--type-between card-head--theme-jumbo card-head--size-default">
        
            <h2 class="card-heading card-heading--theme-jumbo card-heading--size-default"></h2>
            
            <p class="card-paragraph card-paragraph--size-medium card-paragraph--theme-paarl" data-total></p>
        
        </div>
        
        <div class="card-main card-main--size-default">
        
            <div class="grid-row">
        
                <div class="statistic-card__column statistic-card__column--type-center grid-column grid-column-6">
        
                    <h3 class="statistic-card__heading statistic-card__heading--size-default" data-first-heading></h3>
        
                    <div class="${ this.statisticProgressClass }">
        
                        <div class="statistic-progress__property statistic-progress__icon--size-default">
                            <span data-first-value></span>
                        </div>
        
                        <svg viewBox="0 0 120 120" class="statistic-progress__progress">
                            <circle cx="60" cy="60" r="54" class="statistic-progress__progress-outer" />
        
                            <circle class="statistic-progress__progress-inner" cx="60" cy="60" r="54" pathLength="100" data-first-circle />
                        </svg>
                    </div>
        
                </div>
        
                <div class="statistic-card__column statistic-card__column--type-center grid-column grid-column-6">
        
                    <h3 class="statistic-card__heading statistic-card__heading--size-default" data-second-heading></h3>
        
                    <div class="${ this.statisticProgressClass }">
        
                        <div class="statistic-progress__property">
                            <span data-second-value></span>
                        </div>
        
                        <svg viewBox="0 0 120 120" class="statistic-progress__progress">
                            <circle cx="60" cy="60" r="54" class="statistic-progress__progress-outer" />
        
                            <circle class="statistic-progress__progress-inner" cx="60" cy="60" r="54" pathLength="100" data-second-circle />
                        </svg>
                    </div>
        
                </div>
        
            </div>
        
        </div>
        
        </div>
</section>`
        );
    }
}
