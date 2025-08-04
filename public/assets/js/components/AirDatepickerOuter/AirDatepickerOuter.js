import { querySelector } from '../../tea-modules/Functions/DOM/Queries/querySelector.js';
import { CustomEvents }  from '../../tea-modules/Classes/CustomEvents/CustomEvents.js';
import { loadScript }    from '../../tea-modules/Functions/DOM/Elements/loadScript.js';
import { convertToFullUrl } from '../../tea-modules/Functions/Convertations/convertToFullUrl.js';
import { loadLink }         from '../../tea-modules/Functions/DOM/Elements/loadLink.js';
import { AirDatepickerOuterStatesClassifier } from './AirDatepickerOuterStatesClassifier.js';


/**
 * @class
 *
 * @description Implements helper work with the air datepicker component.
 **/
export class AirDatepickerOuter
{
    /**
     * @public
     *
     * @type { CustomEvents }
     **/
    customEvents;
    
    /**
     * @public
     *
     * @type { Object }
     **/
    settings;
    
    /**
     * @public
     *
     * @type { HTMLInputElement }
     **/
    input;
    
    /**
     * @public
     *
     * @type { AirDatepicker }
     **/
    element;
    
    /**
     * @public
     *
     * @type { AirDatepickerOuterStatesClassifier }
     **/
    static state = AirDatepickerOuterStatesClassifier.UNLOAD;
    
    /**
     * @public
     *
     * @type { Promise<any> }
     **/
    static script;
    
    /**
     * @public
     *
     * @type { Promise<any> }
     **/
    static link;
    
    /**
     * @public
     *
     * @type { AirDatepickerOuter[] }
     **/
    static instances = [];
    
    /**
     * @constructor
     *
     * @param { string | HTMLInputElement } selectors
     *
     * @param { Object } settings
     *
     * @return { AirDatepickerOuter }
     **/
    constructor(selectors, settings = {})
    {
        this.customEvents = new CustomEvents();
        
        this.settings = settings;
        
        this.input = querySelector(selectors);
        
        settings.onSelect = this.onSelectHandler.bind(this);
        
        AirDatepickerOuter.instances.push(this);
    }
    
    /**
     * @public
     *
     * @description Implements handler for the onSelect event.
     *
     * @return { void }
     **/
    onSelectHandler()
    {
        const event = new KeyboardEvent('keyup', { bubbles: true, composed: true });
        
        this.input.dispatchEvent(event);
    }
    
    /**
     * @public
     *
     * @description Implements base methods.
     *
     * @return { void }
     **/
    async initialization()
    {
        this.settingsProcessing();
        
        this.element = new AirDatepicker(this.input, this.settings);
        
        // TODO: ?!
        this.element._setInputValue('');
    }
    
    /**
     * @private
     *
     * @description Implements process with settings.
     *
     * @return { void }
     **/
    settingsProcessing()
    {
        if (!this.settings.selectedDates)
        {
            this.settings.selectedDates = [ new Date() ];
        }
        
        if (!this.settings.position)
        {
            this.settings.position = 'bottom center';
        }
        
        if (!this.settings.dateFormat)
        {
            this.settings.dateFormat = 'yyyy-MM-dd';
        }
        
        if (!this.settings.timeFormat)
        {
            this.settings.timeFormat = 'HH:mm';
        }
        
        if (this.input.dataset.timepicker)
        {
            this.settings.timepicker = Boolean(this.input.dataset.timepicker);
        }
        
        if (this.input.dataset.selectedDate)
        {
            this.settings.selectedDates = [ new Date(this.input.dataset.selectedDate) ];
        }
        
        if (this.input.dataset.autoClose)
        {
            this.settings.autoClose = Boolean(this.input.dataset.autoClose);
        }
        
        if (this.input.dataset.maxDate)
        {
            this.settings.maxDate = new Date(this.input.dataset.maxDate);
        }
        
        if (this.input.dataset.minDate)
        {
            this.settings.minDate = new Date(this.input.dataset.minDate);
        }
    }
    
    /**
     * @public
     *
     * @description Updates lib.
     *
     * @param { Object } settings
     *
     * @return { void }
     **/
    update(settings = {})
    {
        this.element.update(settings);
    }
    
    /**
     * @public
     *
     * @description Implements loading assets.
     *
     * @return { void }
     **/
    static async load()
    {
        if (this.state === AirDatepickerOuterStatesClassifier.LOADED)
        {
            return ;
        }
        
        if (this.state === AirDatepickerOuterStatesClassifier.LOADING)
        {
            await Promise.all([ this.script, this.link ]).then(() =>
            {
                this.state = AirDatepickerOuterStatesClassifier.LOADED;
            });
            
            return ;
        }

        this.state = AirDatepickerOuterStatesClassifier.LOADING;

        this.script = loadScript(convertToFullUrl('assets/js/lib/air-datepicker/air-datepicker.js'));

        this.link = loadLink(convertToFullUrl('assets/js/lib/air-datepicker/air-datepicker.css'), 'stylesheet');
        
        await Promise.all([ this.script, this.link ]).then(() =>
        {
            this.state = AirDatepickerOuterStatesClassifier.LOADED;
        });
    }
    
    /**
     * @public
     *
     * @description Returns instance by the given input name.
     *
     * @return { AirDatepickerOuter }
     **/
    static getInstanceByTheInputName(name)
    {
        return this.instances.find(a => a.input.name === name);
    }
}
