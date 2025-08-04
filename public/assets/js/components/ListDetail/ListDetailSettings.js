import { getAttribute }   from '../../tea-modules/Functions/DOM/Attributes/getAttribute.js';
import { structureMerge } from '../../tea-modules/Functions/Structures/structureMerge.js';


/**
 * Contains all possible settings of the ListDetail class.
 **/
export class ListDetailSettings
{
    /**
     * @public
     *
     * @type { string | HTMLElement }
     **/
    selector;
    
    /**
     * @public
     *
     * @type { string }
     **/
    url;
    
    /**
     * @public
     *
     * @type { string }
     **/
    data;
    
    /**
     * @public
     *
     * @type { string }
     **/
    itemClassName = 'list-detail__item list-detail__item--size-default';
    
    /**
     * @public
     *
     * @type { string }
     **/
    itemPropertyClassName = 'list-detail__item-property list-detail__item-property--size-default list-detail__item-property--theme-default';
    
    /**
     * @public
     *
     * @type { string }
     **/
    itemValueClassName = 'list-detail__item-value list-detail__item-value--size-default list-detail__item-value--theme-default';
    
    /**
     * @public
     *
     * @type { Array<string> }
     **/
    checkSvgClass = [ 'icon', 'icon-size-10' ];
    
    /**
     * @public
     *
     * @type { Array<string> }
     **/
    closeSvgClass = [ 'icon', 'icon-size-10' ];
    
    /**
     * @public
     *
     * @type { string }
     **/
    checkSvgId = 'essential-check';
    
    /**
     * @public
     *
     * @type { string }
     **/
    closeSvgId = 'essential-close';
    
    /**
     * @public
     *
     * @type { boolean }
     **/
    settingsByElement = true;
    
    /**
     * @public
     *
     * @type { Array<Object> }
     **/
    columns = [];
    
    /**
     * @public
     *
     * @type { boolean }
     **/
    isReverse = false;
    
    /**
     * @constructor
     *
     * @param { Object } settings
     **/
    constructor(settings)
    {
        structureMerge(this, settings);
    }
    
    /**
     * @public
     *
     * @description Sets properties by the attributes of the given element.
     *
     * @param { HTMLElement } element
     *
     * @return { void }
     **/
    setFromElement(element)
    {
        const properties = Reflect.ownKeys(this);
        
        for (let i = 0; i < properties.length; i++)
        {
            const property = properties[ i ];
            
            const attribute = getAttribute(element, 'list-detail-' + property, { isDataAttribute: true });
            
            if (!attribute || !Reflect.has(this, property))
            {
                continue;
            }
            
            this[ property ] = attribute;
        }
    }
}
