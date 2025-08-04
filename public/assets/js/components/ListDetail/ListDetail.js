import { HttpRequest }                  from '../../tea-modules/Classes/Requests/HttpRequest.js';
import { HttpRequestMethodsClassifier } from '../../tea-modules/Classes/Requests/Standards/HttpRequestMethodsClassifier.js';
import { clearArray }                   from '../../tea-modules/Functions/Arrays/clearArray.js';
import { createElement }                from '../../tea-modules/Functions/DOM/Elements/createElement.js';
import { createFragment }               from '../../tea-modules/Functions/DOM/Elements/createFragment.js';
import { createSvgElement }             from '../../tea-modules/Functions/DOM/Elements/createSvgElement.js';
import { querySelector }                from '../../tea-modules/Functions/DOM/Queries/querySelector.js';
import { isEmpty }                      from '../../tea-modules/Functions/Is/isEmpty.js';
import { ListDetailStatusesClassifier } from './ListDetailStatusesClassifier.js';
import { ListDetailTypesClassifier }    from './ListDetailTypesClassifier.js';


/**
 * Implements logic for list detail.
 **/
export class ListDetail
{
    /**
     * @public
     *
     * @type { ListDetailSettings }
     **/
    settings;
    
    /**
     * @public
     *
     * @type { HTMLUListElement }
     **/
    element;
    
    /**
     * @public
     *
     * @type { Array<HTMLLIElement> }
     **/
    items = [];
    
    /**
     * @constructor
     *
     * @param { ListDetailSettings } settings
     **/
    constructor(settings)
    {
        this.settings = settings;
        
        this.element = querySelector(this.settings.selector);
    }
    
    /**
     * @public
     *
     * @description Implements base logic.
     *
     * @return { void }
     **/
    async initialization()
    {
        if (this.settings.settingsByElement)
        {
            this.settings.setFromElement(this.element);
        }
        
        this.update();
    }
    
    /**
     * @public
     *
     * @description Updates component.
     *
     * @return { void }
     **/
    async update()
    {
        this.clear();
        
        this._systemItemProcessing('Loading..');
        
        const data = await this.getData();
        
        const items = this._createItems(data.record);
        
        this.clear();
        
        this.element.append(items);
    }
    
    /**
     * @public
     *
     * @description Clears component.
     *
     * @return { void }
     **/
    clear()
    {
        clearArray(this.items);
        
        this.element.innerHTML = '';
    }
    
    /**
     * @public
     *
     * @description Implements process of the system item.
     *
     * @param { string } label
     *
     * @return { void }
     **/
    _systemItemProcessing(label)
    {
        const item = createElement('li', { class: [ this.settings.itemClassName, ListDetailTypesClassifier.SYSTEM ] }, [ label ]);
        
        this.element.append(item);
    }
    
    /**
     * @public
     *
     * @description Creates items by the given record.
     *
     * @param { Object } record
     *
     * @return { DocumentFragment<HTMLLIElement> }
     **/
    _createItems(record)
    {
        const fragment = createFragment();
        
        for (let i = 0; i < this.settings.columns.length; i++)
        {
            const column = this.settings.columns[ i ];
            
            if (column.displayByColumn && !!record[ column.displayByColumn ])
            {
                continue;
            }
            
            const item = this._createItem(column, record);
            
            this.items.push(item);
            
            fragment.append(item);
        }
        
        return fragment;
    }
    
    /**
     * @public
     *
     * @description Creates item.
     *
     * @param { Object } column
     *
     * @param { Object } record
     *
     * @return { HTMLLIElement }
     **/
    _createItem(column, record)
    {
        const statusType = (column.isReverse ^ Boolean(record[ column.name ])) ? ListDetailStatusesClassifier.SUCCESS : ListDetailStatusesClassifier.ALERT;

        return createElement('li', { class: [ this.settings.itemClassName, statusType, column.type ] }, [ this._createProperty(column, record), this._createValue(column, record) ]);
    }
    
    /**
     * @public
     *
     * @description Creates property.
     *
     * @param { Object } column
     *
     * @param { Object } record
     *
     * @return { HTMLLIElement }
     **/
    _createProperty(column, record)
    {
        return createElement('p', { class: this.settings.itemPropertyClassName }, [ column.title ]);
    }
    
    /**
     * @public
     *
     * @description Creates value.
     *
     * @param { Object } column
     *
     * @param { Object } record
     *
     * @return { HTMLLIElement }
     **/
    _createValue(column, record)
    {
        const value = createElement('p', { class: this.settings.itemValueClassName });
        
        const data = this._dataProcessing(column, record);
        
        value.append(data);
        
        return value;
    }
    
    /**
     * @public
     *
     * @description Implements process of the data.
     *
     * @param { Object } column
     *
     * @param { Object } record
     *
     * @return { string | HTMLElement | SVGElement }
     **/
    _dataProcessing(column, record)
    {
        const title = record[ column.name ];
        
        switch (column.type)
        {
            case ListDetailTypesClassifier.BOOLEAN:
            {
                return (column.isReverse ^ Boolean(title)) ? this._createCheckSvg(column.iconCheckId) : this._createCloseSvg(column.iconCloseId);
            }
            default:
            {
                return isEmpty(title) ? '--' : title;
            }
        }
    }
    
    /**
     * @public
     *
     * @description Creates check svg.
     *
     * @param { string } iconId
     *
     * @return { SVGElement }
     **/
    _createCheckSvg(iconId)
    {
        return createSvgElement(iconId || this.settings.checkSvgId, { class: this.settings.checkSvgClass });
    }
    
    /**
     * @public
     *
     * @description Creates close svg.
     *
     * @param { string } iconId
     *
     * @return { SVGElement }
     **/
    _createCloseSvg(iconId)
    {
        return createSvgElement(iconId || this.settings.closeSvgId, { class: this.settings.closeSvgClass });
    }
    
    /**
     * @public
     *
     * @description Returns data.
     *
     * @return { Promise<ResponseStandard> }
     **/
    async getData()
    {
        const request = new HttpRequest(
            {
                url: this.settings.url,
                method: HttpRequestMethodsClassifier.POST,
                data: this.settings.data,
            });
        
        return request.execute();
    }
}
