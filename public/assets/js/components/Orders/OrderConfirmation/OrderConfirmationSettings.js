/**
 * @class
 **/
export class OrderConfirmationSettings
{
    /**
     * @public
     *
     * @type { string }
     **/
    elementClass = 'order-confirmation order-confirmation--size-default order-confirmation--theme-default';
    
    /**
     * @public
     *
     * @type { string }
     **/
    paragraphClass = 'order-confirmation__paragraph';
    
    /**
     * @public
     *
     * @type { string }
     **/
    paragraphValueClass = 'order-confirmation__paragraph-value';
    
    /**
     * @public
     *
     * @type { string }
     **/
    paragraphCurrencyClass = 'order-confirmation__paragraph-currency currency currency--size-default';
    
    /**
     * @public
     *
     * @type { ButtonSettingProperties }
     **/
    confirmButtonSettings =
        {
            elementClass: [ 'order-confirmation__button button button--size-high button--type-default button--theme-royal-blue' ],
            iconClass: 'icon icon-size-20',
            iconId: 'content-document-forward',
            text: 'Confirm',
        };
}
