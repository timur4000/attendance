import { IconInfoSettings } from '../IconInfoSettings.js';
import { IconInfo }         from '../IconInfo.js';
import { HttpRequest }      from '../../../tea-modules/Classes/Requests/HttpRequest.js';
import { isStructureEmpty } from '../../../tea-modules/Functions/Is/isStructureEmpty.js';
import { querySelector }    from '../../../tea-modules/Functions/DOM/Queries/querySelector.js';
import { createFragment }   from '../../../tea-modules/Functions/DOM/Elements/createFragment.js';
import { setCssVariable }   from '../../../tea-modules/Functions/DOM/Variables/setCssVariable.js';
import { IconInfoModifiersClassifier } from '../Standards/IconInfoModifiersClassifier.js';
import { createElement } from '../../../tea-modules/Functions/DOM/Elements/createElement.js';
import { IconInfoManagerSettings } from './IconInfoManagerSettings.js';
import { isUndefined } from '../../../tea-modules/Functions/Is/isUndefined.js';


/**
 * Implements management of all IconInfo components.
 **/
export class IconInfoManager
{
    /**
     * @public
     *
     * @type { IconInfoManagerSettings }
     **/
    settings;
    
    /**
     * @public
     *
     * @type { HTMLElement }
     **/
    domWrapper;
    
    /**
     * @public
     *
     * @type { Array<IconInfo> }
     **/
    items = [];
    
    /**
     * @constructor
     *
     * @param { IconInfoManagerSetting | IconInfoManagerSettings } settings
     **/
    constructor(settings)
    {
        this.settings = settings instanceof IconInfoManagerSettings ? settings : new IconInfoManagerSettings(settings);
        
        this.domWrapper = this._wrapperProcessing();
        
        this._iconInfoCreateProcessing();
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
        this.domWrapper.append(this.getDomElements());
     
        setCssVariable(this.settings.countCssVariable, this.items.length.toString(), this.domWrapper);
    }
    
    /**
     * @private
     *
     * @description Implements process of the wrapper.
     *
     * @return { HTMLDivElement }
     **/
    _wrapperProcessing()
    {
        if (this.settings.wrapper)
        {
            return querySelector(this.settings.wrapper)
        }
        
        return createElement('div', { class: this.settings.wrapperClassName });
    }
    
    /**
     * @private
     *
     * @description Implements creating instances of the IconInfo.
     *
     * @return { void }
     **/
    _iconInfoCreateProcessing()
    {
        for (let i = 0, n = this.settings.items.length; i < n; i++)
        {
            const item = this.settings.items[ i ];
            
            if (isUndefined(item.type))
            {
                item.type = this.settings.type;
            }
            
            if (isUndefined(item.defaultValue))
            {
                item.defaultValue = this.settings.defaultValue;
            }
            
            if (isUndefined(item.requestDataVariable))
            {
                item.requestDataVariable = this.settings.requestDataVariable;
            }
            
            const settings = new IconInfoSettings(item);
            
            const instance = new IconInfo(settings);
            
            instance.initialization();
            
            this.items.push(instance);
        }
    }
    
    /**
     * @public
     *
     * @description Updates all components.
     *
     * @param { ResponseStandard ? } response
     *
     * @return { Promise<void> }
     **/
    async update(response)
    {
        this.setModifier(IconInfoModifiersClassifier.LOADING, true);
        
        const request = response ? response : await this.request();
        
        for (let i = 0, n = this.items.length; i < n; i++)
        {
            const item = this.items[ i ];
            
            if (isStructureEmpty(item.settings.httpRequestSettings))
            {
                item.update(request);
                
                continue ;
            }
            
            item.update();
        }
        
        this.setModifier(IconInfoModifiersClassifier.LOADING, false);
    }
    
    /**
     * @public
     *
     * @description Implements a request to obtain data from the server.
     *
     * @return { Promise<ResponseStandard> }
     **/
    async request()
    {
        const request = new HttpRequest(this.settings.httpRequestSettings);
        
        return request.execute();
    }
    
    /**
     * @public
     *
     * @description Returns all elements of IconInfo instances as DocumentFragment.
     *
     * @return { DocumentFragment }
     **/
    getDomElements()
    {
        const fragment = createFragment();
        
        this.items.forEach(item => fragment.append(item.domElement));
        
        return fragment;
    }
    
    /**
     * @public
     *
     * @description Returns wrapper element.
     *
     * @return { HTMLDivElement }
     **/
    getWrapper()
    {
        return this.domWrapper;
    }
    
    /**
     * @public
     *
     * @description Sets the given modifier to the element by the given force.
     *
     * @param { IconInfoModifiersClassifier } modifier
     *
     * @param { boolean } force
     *
     * @return { void }
     **/
    setModifier(modifier, force)
    {
        this.domWrapper.classList.toggle(modifier, force);
    }
    
    /**
     * @public
     *
     * @description Check if the element contains the given modifier.
     *
     * @param { IconInfoModifiersClassifier } modifier
     *
     * @return { void }
     **/
    hasModifier(modifier)
    {
        this.domWrapper.classList.contains(modifier);
    }
}
