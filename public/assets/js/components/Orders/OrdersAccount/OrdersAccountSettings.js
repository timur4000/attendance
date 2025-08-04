/**
 * @class
 **/
export class OrdersAccountSettings
{
    /**
     * @public
     *
     * @type { string }
     **/
    elementClass = 'orders-account orders-account--size-default orders-account--theme-default';
    
    /**
     * @public
     *
     * @type { string }
     **/
    inputName = '';
    
    /**
     * @public
     *
     * @type { string }
     **/
    inputClass = 'orders-account__input';
    
    /**
     * @public
     *
     * @type { string }
     **/
    url = '';
    
    /**
     * @public
     *
     * @type { string }
     **/
    upperClass = 'orders-account__upper';
    
    /**
     * @public
     *
     * @type { string }
     **/
    imageClass = 'orders-account__image image';
    
    /**
     * @public
     *
     * @type { string }
     **/
    imageElementClass = 'orders-account__image image__element image__element--type-contain';
    
    /**
     * @public
     *
     * @type { string }
     **/
    headingClass = 'orders-account__heading';
    
    /**
     * @public
     *
     * @type { string }
     **/
    balanceClass = 'orders-account__balance';
    
    /**
     * @public
     *
     * @type { string }
     **/
    lowerClass = 'orders-account__lower';
    
    /**
     * @public
     *
     * @type { string }
     **/
    currencyClass = 'orders-account__currency currency currency--size-small';
    
    /**
     * @public
     *
     * @type { string }
     **/
    balanceText = 'Balance:';
    
    /**
     * @public
     *
     * @type { boolean }
     **/
    isCurrency = true;
    
    /**
     * @public
     *
     * @type { string }
     **/
    currency = 'TMT';
    
    /**
     * @public
     *
     * @type { ButtonSettingProperties }
     **/
    cancelButtonSettings =
        {
            text: 'Cancel',
            iconId: 'essential-cancel',
            iconClass: 'icon icon-size-16',
            elementClass: [ 'button--bubble', 'button--type-value-bubble button--type-default button--size-high-large button--theme-white-azure-bittersweet' ],
        };
}
