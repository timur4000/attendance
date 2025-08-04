/**
 * @class
 **/
export class OrderItemSettings
{
    /**
     * @public
     *
     * @type { string }
     **/
    elementClass = 'order-item order-item--size-default order-item--theme-default grid-column grid-column-4';
    
    /**
     * @public
     *
     * @type { string }
     **/
    upperClass = 'order-item__upper';
    
    /**
     * @public
     *
     * @type { string }
     **/
    imageClass = 'order-item__image image';
    
    /**
     * @public
     *
     * @type { string }
     **/
    imageElementClass = 'order-item__image-element image__element';
    
    /**
     * @public
     *
     * @type { string }
     **/
    lowerClass = 'order-item__lower';
    
    /**
     * @public
     *
     * @type { string }
     **/
    headingClass = 'order-item__heading';
    
    /**
     * @public
     *
     * @type { string }
     **/
    priceClass = 'order-item__price';
    
    /**
     * @public
     *
     * @type { string }
     **/
    priceValueClass = 'order-item__price-value';
    
    /**
     * @public
     *
     * @type { string }
     **/
    priceCurrencyClass = 'order-item__price-currency currency currency--size-default';
    
    /**
     * @public
     *
     * @type { string }
     **/
    systemTextClass = 'order-item__system-text';
    
    /**
     * @public
     *
     * @type { CustomNumberSettingProperties }
     **/
    customNumberSettings =
        {
            isUserInput: false,
            min: 0,
            max: 10,
            step: 1,
            fractionDigits: 0,
        };
}
