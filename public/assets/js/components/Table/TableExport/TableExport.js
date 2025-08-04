import { Button } from '../../Button/Button.js';
import { ButtonEventsClassifier } from '../../Button/ButtonEventsClassifier.js';
import { createElement } from '../../../tea-modules/Functions/DOM/Elements/createElement.js';
import { Dropdown } from '../../Dropdown/Dropdown.js';
import { convertToFullUrl } from '../../../tea-modules/Functions/Convertations/convertToFullUrl.js';
import { TableExportInnerButtonTypesClassifier } from './Standards/TableExportInnerButtonTypesClassifier.js';
import { isStructureEmpty } from '../../../tea-modules/Functions/Is/isStructureEmpty.js';


/**
 * @abstract
 *
 * @description Implements abstract logic for the exports.
 **/
export class TableExport
{
    /**
     * @public
     *
     * @type { TableExportSettings }
     **/
    settings;
    
    /**
     * @public
     *
     * @type { Object<Table> } table
     **/
    table;
    
    /**
     * @public
     *
     * @type { Button }
     **/
    button;
    
    /**
     * @public
     *
     * @type { HTMLDivElement }
     **/
    content;
    
    /**
     * @public
     *
     * @type { HTMLDivElement }
     **/
    contentInner;
    
    /**
     * @public
     *
     * @type { Dropdown }
     **/
    dropdown;
    
    /**
     * @constructor
     *
     * @param { TableExportSettings } settings
     **/
    constructor(settings)
    {
        this.settings = settings;
        
        this.button = new Button({ elementClass: this.settings.buttonClass, attributes: this.settings.buttonAttributes, iconClass: this.settings.buttonIconClass, iconId: this.settings.buttonIconId, clueSettings: this.settings.buttonClueSettings });
    }
    
    /**
     * @abstract
     *
     * @public
     *
     * @description Implements base logic.
     *
     * @return { void }
     **/
    initialization()
    {
        this._contentProcessing();
        
        this.button.customEvents.subscribe(ButtonEventsClassifier.CLICK, this._buttonClickHandler.bind(this));
    };
    
    /**
     * @public
     *
     * @description Sets the given table to the current class.
     *
     * @param { Object<Table> } table
     **/
    setTable(table)
    {
        this.table = table;
    }
    
    /**
     * @private
     *
     * @description Implements handler for the button click event.
     *
     * @param { PointerEvent } event
     *
     * @param { Button } button
     *
     * @return { void }
     **/
    _buttonClickHandler(event, button)
    {
        if (this.settings.isAdvanced)
        {
            return;
        }
        
        const type = TableExportInnerButtonTypesClassifier.ALL_PROPERTIES;
        
        button.loading(true);
        
        const url = this._createUrl(type);

        this._redirect(url);

        button.loading(false);
    }
    
    /**
     * @private
     *
     * @description Implements process of the content.
     *
     * @return { void }
     **/
    _contentProcessing()
    {
        if (!this.settings.isAdvanced)
        {
            return ;
        }
        
        this.contentInner = this._createContentInner();
        
        this.content = this._createContent();
        
        this._innerButtonsProcessing();
        
        this.dropdown = new Dropdown(this.button.getElement(), this.content);
    }
    
    /**
     * @private
     *
     * @description Implements process of the inner buttons.
     *
     * @return { void }
     **/
    _innerButtonsProcessing()
    {
        for (let i = 0, n = this.settings.innerButtons.length; i < n; i++)
        {
            const innerButton = this.settings.innerButtons[ i ];
            
            const instance = new Button({ elementClass: this.settings.innerButtonClass, text: innerButton.text });
            
            i > 0 && instance.setClasses([ 'margin-top-10' ]);
        
            instance.setAttribute('data-type', innerButton.type.toString());
            
            instance.customEvents.subscribe(ButtonEventsClassifier.CLICK, this._innerButtonClickHandler.bind(this));
            
            this.contentInner.append(instance.getElement());
        }
    }
    
    /**
     * @private
     *
     * @description Implements handler for the inner button click event.
     *
     * @param { PointerEvent } event
     *
     * @param { Button } button
     *
     * @return { void }
     **/
    _innerButtonClickHandler(event, button)
    {
        const type = parseInt(button.getAttribute('data-type'));
        
        button.loading(true);
        
        const url = this._createUrl(type);
        
        this._redirect(url);
        
        button.loading(false);
    }
    
    /**
     * @private
     *
     * @description Implements process of the URL instance.
     *
     * @param { URL } url
     *
     * @param { number } type
     *
     * @return { void }
     **/
    _urlProcessing(url, type)
    {
        url.searchParams.set('type', type.toString());
        
        if (type !== TableExportInnerButtonTypesClassifier.ALL_PROPERTIES)
        {
            url.searchParams.set('columns', this.table.getColumnNamesAsString(type === TableExportInnerButtonTypesClassifier.DISPLAYED_COLUMNS));
        }
    }
    
    /**
     * @private
     *
     * @description Sets http settings to URL.
     *
     * @param { URL } url
     *
     * @return { void }
     **/
    _dataProcessing(url)
    {
        if (isStructureEmpty(this.settings.dataVariables))
        {
            return ;
        }
        
        for (let i = 0, n = this.settings.dataVariables.length; i < n; i++)
        {
            const key = this.settings.dataVariables[ i ];

            url.searchParams.set(key, this.table.getHttpRequestSettings().data[ key ] || '');
        }
    }
    
    /**
     * @private
     *
     * @description Creates URL instance.
     *
     * @param { number } type
     *
     * @return { URL }
     **/
    _createUrl(type)
    {
        const url = new URL(convertToFullUrl(this.settings.url));
        
        this._urlProcessing(url, type);
        
        this._dataProcessing(url);
        
        return url;
    }
    
    /**
     * @private
     *
     * @description Implements redirect.
     *
     * @param { URL } url
     *
     * @param { string } target
     *
     * @return { void }
     **/
    _redirect(url, target = '_blank')
    {
        createElement('a', { href: url.toString(), target: '_blank' }).click();
    }
    
    /**
     * @private
     *
     * @description Creates html node of the content.
     *
     * @return { HTMLDivElement }
     **/
    _createContent()
    {
        return createElement('div', { class: this.settings.contentClass, id: this.settings.contentId, 'data-position': this.settings.contentPosition, 'data-dropdown-ignored': '' }, [ this.contentInner ]);
    }
    
    /**
     * @private
     *
     * @description Creates html node of the content inner.
     *
     * @return { HTMLDivElement }
     **/
    _createContentInner()
    {
        return createElement('div', { class: this.settings.contentInnerClass });
    }
}
