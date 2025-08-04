import { SimpleOrdersListItemListSettings } from './SimpleOrdersListItemListSettings.js';
import { createElement }                    from '../../../tea-modules/Functions/DOM/Elements/createElement.js';
import { createFragment }                   from '../../../tea-modules/Functions/DOM/Elements/createFragment.js';


/**
 * @class
 *
 * @description Implements logic for the simple orders list item list component.
 **/
export class SimpleOrdersListItemList
{
    /**
     * @public
     *
     * @type { SimpleOrdersListItem }
     **/
    parentInstance;
    
    /**
     * @public
     *
     * @type { SimpleOrdersListItemListSettings }
     **/
    settings;
    
    /**
     * @public
     *
     * @type { HTMLUListElement }
     **/
    domElement;
    
    /**
     * @public
     *
     * @type { HTMLLIElement[] }
     **/
    domItems = [];
    
    /**
     * @constructor
     *
     * @param { SimpleOrdersListItem } parentInstance
     *
     * @param { SimpleOrdersListItemListSettings } settings
     **/
    constructor(parentInstance, settings)
    {
        !settings && (settings = new SimpleOrdersListItemListSettings());
        
        this.parentInstance = parentInstance;
        
        this.settings = settings;
        
        this.domElement = this._createElement();
    }
    
    /**
     * @public
     *
     * @description Implements initialize base logic of component.
     *
     * @return { void }
     **/
    initialization()
    {
        this._itemsProcessing();
    }
    
    /**
     * @public
     *
     * @description Implements process of the items.
     *
     * @return { void }
     **/
    _itemsProcessing()
    {
        for (let i = 0, n = this.parentInstance.record.items.length; i < n; i++)
        {
            const item = this.parentInstance.record.items[ i ];
            
            const domItem = this._createItem(item);
            
            this.domItems.push(domItem);
            
            this.domElement.append(domItem);
        }
    }
    
    /**
     * @private
     *
     * @description Creates base html node of the element.
     *
     * @return { HTMLUListElement }
     **/
    _createElement()
    {
        return createElement('ul', { class: this.settings.elementClass });
    }
    
    /**
     * @private
     *
     * @description Creates base html node of the item element.
     *
     * @param { Object } item
     *
     * @return { HTMLLIElement }
     **/
    _createItem(item)
    {
        const food = this.parentInstance.parentInstance.getFoodById(item.id_item);
        
        const imageSection = this._createItemImageSection(food.picture);
        
        const nameSection = this._createItemSection(this.settings.itemNameClass, this.settings.itemNameProperty, item.name_item);
        
        const priceFragment = createFragment();
        
        priceFragment.append(food.price_object + ' ');
        
        priceFragment.append(this._createCurrency(food.code_currency));
        
        const priceSection = this._createItemSection(this.settings.itemPriceClass, this.settings.itemPriceProperty, priceFragment);
        
        const quantitySection = this._createItemSection(this.settings.itemQuantityClass, this.settings.itemQuantityProperty, item.quantity.toFixed(this.parentInstance.parentInstance.settings.quantityFractionDigit));
        
        return createElement('li', { class: this.settings.itemClass }, [ imageSection, nameSection ]);
    }
    
    /**
     * @private
     *
     * @description Creates base html node of the item-section element.
     *
     * @param { string } className
     *
     * @param { string } property
     *
     * @param { string | DocumentFragment } value
     *
     * @return { HTMLDivElement }
     **/
    _createItemSection(className, property, value)
    {
        return createElement('div', { class: this.settings.itemSectionClass + ' ' + className }, [ this._createItemProperty(property), this._createItemValue(value) ]);
    }
    
    /**
     * @private
     *
     * @description Creates base html node of the item-property element.
     *
     * @param { string | DocumentFragment } value
     *
     * @return { HTMLDivElement }
     **/
    _createItemProperty(value)
    {
        return createElement('p', { class: this.settings.itemPropertyClass }, [ value ]);
    }
    
    /**
     * @private
     *
     * @description Creates base html node of the item-value element.
     *
     * @param { string | Element } value
     *
     * @return { HTMLDivElement }
     **/
    _createItemValue(value)
    {
        return createElement('p', { class: this.settings.itemValueClass }, [ value ]);
    }
    
    /**
     * @private
     *
     * @description Creates base html node of the currency element.
     *
     * @param { string } value
     *
     * @return { HTMLDivElement }
     **/
    _createCurrency(value)
    {
        return createElement('span', { class: this.settings.currencyClass }, [ value ]);
    }
    
    /**
     * @private
     *
     * @description Creates base html node of the image-element element.
     *
     * @param { Object } picture
     *
     * @return { HTMLUListElement }
     **/
    _createItemImageSection(picture)
    {
        return createElement('div', { class: this.settings.itemSectionClass + ' ' + this.settings.itemImageClass }, [ this._createItemImageElement(picture) ]);
    }
    
    /**
     * @private
     *
     * @description Creates base html node of the image-element element.
     *
     * @param { Object } picture
     *
     * @return { HTMLUListElement }
     **/
    _createItemImageElement(picture)
    {
        const src = `data:image/${ picture.comment };base64,${ picture.message }`;
        
        return createElement('img', { class: this.settings.itemImageElementClass, src: src });
    }
    
    /**
     * @public
     *
     * @description Returns dom element.
     *
     * @return { HTMLUListElement }
     **/
    getElement()
    {
        return this.domElement;
    }
}
