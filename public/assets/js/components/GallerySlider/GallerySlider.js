import { GallerySliderSettings } from './GallerySliderSettings.js';
import { CustomEvents }          from '../../tea-modules/Classes/CustomEvents/CustomEvents.js';
import { createElement }         from '../../tea-modules/Functions/DOM/Elements/createElement.js';
import { GallerySliderColumnTypesClassifier } from './Classifiers/GallerySliderColumnTypesClassifier.js';
import { GallerySliderPositionsClassifier } from './Classifiers/GallerySliderPositionsClassifier.js';
import { createSvgElement } from '../../tea-modules/Functions/DOM/Elements/createSvgElement.js';
import { GallerySliderWrapper } from './GallerySliderWrapper/GallerySliderWrapper.js';
import { GallerySliderSidesClassifier } from './Classifiers/GallerySliderSidesClassifier.js';
import { Button } from '../Button/Button.js';
import { ButtonEventsClassifier } from '../Button/ButtonEventsClassifier.js';
import { GallerySliderEventsClassifier } from './Classifiers/GallerySliderEventsClassifier.js';


/**
 * @description Implements logic of the GallerySlider component.
 **/
export class GallerySlider
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
     * @type { GallerySliderSettings }
     **/
    settings;
    
    /**
     * @public
     *
     * @type { HTMLDivElement }
     **/
    domElement;
    
    /**
     * @public
     *
     * @type { HTMLDivElement }
     **/
    domUpper;
    
    /**
     * @public
     *
     * @type { HTMLDivElement }
     **/
    domUpperLeftColumn;
    
    /**
     * @public
     *
     * @type { HTMLDivElement }
     **/
    domUpperRightColumn;
    
    /**
     * @public
     *
     * @type { HTMLHeadingElement }
     **/
    domHeading;
    
    /**
     * @public
     *
     * @type { HTMLDivElement }
     **/
    domArrowIcon;
    
    /**
     * @public
     *
     * @type { GallerySliderWrapper }
     **/
    wrapper;
    
    /**
     * @private
     *
     * @type { Array<GallerySlider> }
     **/
    static _instances = [];
    
    /**
     * @private
     *
     * @type { Object<Array<GallerySliderItem>> }
     **/
    static _itemInstances = {};
    
    /**
     * @constructor
     *
     * @param { GallerySliderSetting | GallerySliderSettings } settings
     **/
    constructor(settings)
    {
        this.customEvents = new CustomEvents();
        
        this.settings = settings instanceof GallerySliderSettings ? settings : new GallerySliderSettings(settings);
        
        GallerySlider._instances.push(this);
    }

    /**
     * @public
     *
     * @description Initialize base logic.
     *
     * @return { void }
     **/
    initialization()
    {
        this.wrapper = new GallerySliderWrapper(this, this.settings.wrapperSettings);
        
        this.wrapper.initialization();
        
        this._nodesProcessing();
    }
    
    /**
     * @private
     *
     * @description Implements process of the nodes.
     *
     * @return { void }
     **/
    _nodesProcessing()
    {
        this.domElement = this._createDomElement();
        
        this.domUpper = this._createDomUpper();
        
        this.domUpperLeftColumn = this._createDomColumn(GallerySliderColumnTypesClassifier.LEFT);
        
        this.domUpperRightColumn = this._createDomColumn(GallerySliderColumnTypesClassifier.RIGHT);
        
        this.domHeading = this._createDomHeading();
        
        this.domArrowIcon = this._createDomArrowIcon();
        
        this.append(this.domUpperLeftColumn, GallerySliderPositionsClassifier.UPPER);
        
        this.append(this.domUpperRightColumn, GallerySliderPositionsClassifier.UPPER);
        
        this.append(this.domArrowIcon, GallerySliderPositionsClassifier.UPPER_LEFT);
        
        this.append(this.domHeading, GallerySliderPositionsClassifier.UPPER_LEFT);
        
        this.append(this.domUpper, GallerySliderPositionsClassifier.ELEMENT);
        
        this.append(this.wrapper.getDomElement(), GallerySliderPositionsClassifier.ELEMENT);
        
        this._buttonsProcessing();
        
        this._domElementStylesProcessing();
    }
    
    /**
     * @public
     *
     * @description Updates the current component.
     *
     * @return { void }
     **/
    update()
    {
        this._domElementStylesProcessing();
        
        this.wrapper.update();
    }
    
    /**
     * @private
     *
     * @description Creates base html node of the dom element.
     *
     * @return { HTMLDivElement }
     **/
    _createDomElement()
    {
        return createElement('div', { class: [ this.settings.domElementClassName, this.settings.side ] }, []);
    }
    
    /**
     * @private
     *
     * @description Implements process of the styles of the dom element.
     *
     * @return { void }
     **/
    _domElementStylesProcessing()
    {
        const style = this.domElement.style;
        
        if (this.settings.height)
        {
            style.height = this.settings.height + 'px';
        }
        
        this.domHeading.style.fontSize = this.settings.headingFontSize + 'px';
        
        this.wrapper.domElementStylesProcessing();
    }
    
    /**
     * @private
     *
     * @description Creates base html node of the dom upper.
     *
     * @return { HTMLDivElement }
     **/
    _createDomUpper()
    {
        return createElement('div', { class: this.settings.domUpperClassName }, []);
    }
    
    /**
     * @private
     *
     * @description Creates base html node of the dom column by the specified type.
     *
     * @param { GallerySliderColumnTypesClassifier } type
     *
     * @return { HTMLDivElement }
     **/
    _createDomColumn(type)
    {
        return createElement('div', { class: [ this.settings.domColumnClassName, type ] }, []);
    }
    
    /**
     * @private
     *
     * @description Creates base html node of the dom heading.
     *
     * @return { HTMLHeadingElement }
     **/
    _createDomHeading()
    {
        return createElement('h3', { class: this.settings.domHeadingClassName }, [ this.settings.heading ]);
    }
    
    /**
     * @private
     *
     * @description Creates base html node of the dom arrow icon.
     *
     * @return { HTMLDivElement }
     **/
    _createDomArrowIcon()
    {
        const arrowIconSvg = createSvgElement(this.settings.arrowIconSvgId, { class: this.settings.domArrowIconSvgClassName });
        
        return createElement('div', { class: this.settings.domArrowIconClassName }, [ arrowIconSvg ]);
    }
    
    /**
     * @private
     *
     * @description Implements a process of the buttons.
     *
     * @return { void }
     **/
    _buttonsProcessing()
    {
        for (let i = 0, n = this.settings.buttonSettings.length; i < n; i++)
        {
            const button = new Button(this.settings.buttonSettings[ i ]);
            
            button.customEvents.subscribe(ButtonEventsClassifier.CLICK, this._buttonClickHandler.bind(this));
            
            button.customEvents.subscribe(ButtonEventsClassifier.TOGGLE, this._buttonToggleHandler.bind(this));
            
            this.append(button.getElement(), GallerySliderPositionsClassifier.UPPER_RIGHT);
        }
    }
    
    /**
     * @private
     *
     * @description Implements a click handler for the click of each button.
     *
     * @param { PointerEvent } event
     *
     * @param { Button } instance
     *
     * @return { void }
     **/
    _buttonClickHandler(event, instance)
    {
        this.customEvents.execute(GallerySliderEventsClassifier.BUTTON_CLICK, event, instance, this);
    }
    
    /**
     * @private
     *
     * @description Implements a toggle handler for the click of each button.
     *
     * @param { boolean } force
     *
     * @param { Button } instance
     *
     * @return { void }
     **/
    _buttonToggleHandler(force, instance)
    {
        this.customEvents.execute(GallerySliderEventsClassifier.BUTTON_TOGGLE, force, instance, this);
    }
    
    /**
     * @public
     *
     * @description Appends the specified element by the specified position.
     *
     * @param { Element } element
     *
     * @param { GallerySliderPositionsClassifier } position
     *
     * @param { InsertPosition } where
     *
     * @return { Element | null }
     **/
    append(element, position, where = 'beforeend')
    {
        let to;
        
        switch (position)
        {
            case GallerySliderPositionsClassifier.ELEMENT: to = this.domElement; break;
            case GallerySliderPositionsClassifier.UPPER: to = this.domUpper; break;
            case GallerySliderPositionsClassifier.UPPER_LEFT: to = this.domUpperLeftColumn; break;
            case GallerySliderPositionsClassifier.UPPER_RIGHT: to = this.domUpperRightColumn; break;
            default: return null;
        }
        
        return to.insertAdjacentElement(where, element);
    }
    
    /**
     * @public
     *
     * @description Returns main dom element.
     *
     * @return { HTMLDivElement }
     **/
    getDomElement()
    {
        return this.domElement;
    }
    
    /**
     * @public
     *
     * @description Returns the id.
     *
     * @return { string }
     **/
    getId()
    {
        return this.settings.id;
    }
    
    /**
     * @public
     *
     * @description Returns the group id.
     *
     * @return { string }
     **/
    getGroupId()
    {
        return this.settings.groupId;
    }
    
    /**
     * @public
     *
     * @description Determines whether side is right.
     *
     * @return { boolean }
     **/
    isSideRight()
    {
        return this.settings.side === GallerySliderSidesClassifier.RIGHT;
    }
    
    /**
     * @public
     *
     * @description Returns instance by the specified id.
     *
     * @param { string } id
     *
     * @return { GallerySlider | undefined }
     **/
    static getInstance(id)
    {
        return this._instances.find(a => a.settings.id === id);
    }

    /**
     * @public
     *
     * @description Returns all instances.
     *
     * @param { (string | number) ? } groupId
     *
     * @return { Array<GallerySlider> }
     **/
    static getAllInstances(groupId)
    {
        return groupId ? this._instances.filter(a => a.getGroupId() === groupId) : this._instances;
    }

    /**
     * @public
     *
     * @description Returns all instances by the specified arguments.
     *
     * @param { string } groupId
     *
     * @param { GallerySliderItem ? } item
     *
     * @param { ...GallerySliderItem } ignoreItems
     *
     * @deprecated
     *
     * @see GallerySlider.getItemInstances
     *
     * @return { Array<GallerySliderItem> }
     **/
    static getAllItems(groupId, item, ...ignoreItems)
    {
        const instances = this._instances.filter(a => a.settings.groupId === groupId);

        if (!item)
        {
            return instances.reduce((previousValue, currentValue) => previousValue.concat(currentValue.wrapper.items), []);
        }

        return instances.reduce((previousValue, currentValue) => previousValue.concat(currentValue.wrapper.getAll(item.getGroupId(), ...ignoreItems)), []);
    }
    
    /**
     * @public
     *
     * @description Adds the specified item to the collection by the specified group id.
     *
     * @param { GallerySliderItem } item
     *
     * @param { string } groupId
     *
     * @return { void }
     **/
    static addItemInstance(item, groupId)
    {
        if (!this._itemInstances[ groupId ])
        {
            this._itemInstances[ groupId ] = [];
        }

        this._itemInstances[ groupId ].push(item);
    }

    /**
     * @public
     *
     * @description Removes the specified item from collection by the specified group id.
     *
     * @param { GallerySliderItem } item
     *
     * @param { string } groupId
     *
     * @return { void }
     **/
    static removeItemInstance(item, groupId)
    {
        this._itemInstances[ groupId ] = this._itemInstances[ groupId ].filter(a => a !== item);
    }

    /**
     * @public
     *
     * @description Returns item instances by the specified arguments.
     *
     * @param { string ? } groupId
     *
     * @param { (string | number) ? } itemGroupId
     *
     * @param { ...GallerySliderItem ? } ignoreItems
     *
     * @return { Array<GallerySliderItem> | Object<Array<GallerySliderItem>> }
     **/
    static getItemInstances(groupId, itemGroupId, ...ignoreItems)
    {
        if (!groupId)
        {
            return this._itemInstances;
        }

        if (!itemGroupId && groupId)
        {
            return this._itemInstances[ groupId ];
        }
        
        return this._itemInstances[ groupId ].filter(a => a.getGroupId() === itemGroupId && !ignoreItems.includes(a));
    }
    
    /**
     * @public
     *
     * @description Returns item instances by groups by the specified arguments.
     *
     * @param { string ? } groupId
     *
     * @param { ...GallerySliderItem ? } ignoreItems
     *
     * @return { Object<string | number, Array<GallerySliderItem>> }
     **/
    static getItemInstancesByGroups(groupId, ...ignoreItems)
    {
        return (groupId ? this._itemInstances[ groupId ] : this._itemInstances).reduce(this._getItemInstancesByGroupsReduceHandler.bind(this, ignoreItems), {});
    }
    
    /**
     * @private
     *
     * @description Handler for the reduce of the getItemInstancesByGroups method.
     *
     * @template { Object<string | number, Array<GallerySliderItem>> } T
     *
     * @param { Array<GallerySliderItem> } ignoreItems
     *
     * @param { T } previousValue
     *
     * @param { GallerySliderItem } currentValue
     *
     * @return { T }
     **/
    static _getItemInstancesByGroupsReduceHandler(ignoreItems, previousValue, currentValue)
    {
        if (!previousValue[ currentValue.getGroupId() ])
        {
            previousValue[ currentValue.getGroupId() ] = [];
        }
        
        if (!ignoreItems.includes(currentValue))
        {
            previousValue[ currentValue.getGroupId() ].push(currentValue);
        }
        
        return previousValue;
    }
}
