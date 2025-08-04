import { StatisticCard } from './StatisticCard.js';
import { HttpRequest }   from '../../../tea-modules/Classes/Requests/HttpRequest.js';
import { HttpRequestMethodsClassifier } from '../../../tea-modules/Classes/Requests/Standards/HttpRequestMethodsClassifier.js';
import { setClasses } from '../../../tea-modules/Functions/DOM/Elements/setClasses.js';
import { removeClasses } from '../../../tea-modules/Functions/DOM/Elements/removeClasses.js';

/**
 * @class
 *
 * @extends { StatisticCard }
 *
 * @description Implements logic for the attendance users by category card.
 **/
export class AttendanceUsersByCategory extends StatisticCard
{
    /**
     * @public
     *
     * @type { string }
     **/
    codeCategory;
    
    /**
     * @constructor
     *
     * @param { string } codeCategory
     *
     * @param { string ? } statisticProgressClass
     *
     * @return { AttendanceUsersByCategory }
     **/
    constructor(codeCategory, statisticProgressClass)
    {
        super(statisticProgressClass);
        
        this.codeCategory = codeCategory;
    }
    
    /**
     * @inheritDoc
     **/
    async informationRequest(settings)
    {
        const request = new HttpRequest(
            {
                url: '/admin/dashboard/users-by-category',
                method: HttpRequestMethodsClassifier.POST,
                data:
                    {
                        code_category: this.codeCategory,
                    },
            });
        
        return request.execute();
    }
    
    /**
     * @inheritDoc
     **/
    async update(settings)
    {
        setClasses(this.element, [ 'loading' ]);
        
        const record = await this.informationRequest();
        
        this.heading.textContent = record.name_category;
        
        this.total.textContent = record.count_total;
        
        this.firstHeading.textContent = 'Inside';
        
        this.firstValue.textContent = record.count_at_work;
        
        // this.firstTotal.textContent = record.count_total;
        
        if (record.count_at_work && record.count_total)
        {
            const percent = record.count_at_work / record.count_total * 100;
            
            this.firstCircle.setAttribute('style', `--statistic-progress-level: ${ percent }`);
        }
        
        this.secondHeading.textContent = 'Outside';
        
        this.secondValue.textContent = record.count_at_home;
        
        // this.secondTotal.textContent = record.count_total;
        
        if (record.count_at_home && record.count_total)
        {
            const percent = record.count_at_home / record.count_total * 100;
            
            this.secondCircle.setAttribute('style', `--statistic-progress-level: ${ percent }`);
        }
        
        removeClasses(this.element, [ 'loading' ]);
    }
}
