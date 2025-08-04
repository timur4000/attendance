import { GallerySliderItemSettings } from './GallerySliderItemSettings.js';
import { createElement }             from '../../../tea-modules/Functions/DOM/Elements/createElement.js';
import { GallerySliderModifiersClassifier } from '../Classifiers/GallerySliderModifiersClassifier.js';
import { getAttribute } from '../../../tea-modules/Functions/DOM/Attributes/getAttribute.js';
import { hasAttribute } from '../../../tea-modules/Functions/DOM/Attributes/hasAttribute.js';


/**
 * @description Implements logic for each item of the GallerySlider component.
 **/
export class GallerySliderItem
{
    /**
     * @public
     *
     * @type { GallerySliderWrapper }
     **/
    wrapper;
    
    /**
     * @public
     *
     * @type { GallerySliderItemSettings }
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
    domTime;
    
    /**
     * @public
     *
     * @type { HTMLDivElement }
     **/
    domImage;
    
    /**
     * @public
     *
     * @type { HTMLImageElement }
     **/
    domImageElement;
    
    /**
     * @public
     *
     * @type { HTMLDivElement }
     **/
    domTitle;
    
    /**
     * @private
     *
     * @type { Date }
     **/
    _timeStart;
    
    /**
     * @constructor
     *
     * @param { GallerySliderItemSetting | GallerySliderItemSettings } settings
     **/
    constructor(settings)
    {
        this.settings = settings instanceof GallerySliderItemSettings ? settings : new GallerySliderItemSettings(settings);
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
        this._timeStart = new Date();
        
        this._nodesProcessing();
        
        this._stylesProcessing();
        
        this.setModifier(GallerySliderModifiersClassifier.INITIALIZED, true);
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
        this.domTime = this._createDomTime();
        
        this.domImageElement = this._createDomImageElement();
        
        this.domImage = this._createDomImage();
        
        this.domTitle = this._createDomTitle();
        
        this.domElement = this._createDomElement();
    }
    
    /**
     * @private
     *
     * @description Implements process of the styles.
     *
     * @return { void }
     **/
    _stylesProcessing()
    {
        this.domTime.style.fontSize = this.settings.timeFontSize + 'px';
        
        this.domTitle.style.fontSize = this.settings.titleFontSize + 'px';
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
        return createElement('div', { class: [ this.settings.domElementClassName ] }, [ this.domTime, this.domImage, this.domTitle ]);
    }
    
    /**
     * @private
     *
     * @description Creates base html node of the dom time element.
     *
     * @return { HTMLDivElement }
     **/
    _createDomTime()
    {
        return createElement('div', { class: [ this.settings.domTimeClassName ] }, [ this.settings.time ]);
    }
    
    /**
     * @private
     *
     * @description Creates base html node of the dom image element.
     *
     * @return { HTMLDivElement }
     **/
    _createDomImage()
    {
        return createElement('div', { class: [ this.settings.domImageClassName ] }, [ this.domImageElement ]);
    }
    
    /**
     * @private
     *
     * @description Creates base html node of the dom image-element element.
     *
     * @return { HTMLImageElement }
     **/
    _createDomImageElement()
    {
        const attributes = { class: [ this.settings.domImageElementClassName ] };
        
        if (this.settings.src)
        {
            attributes.src = this.settings.src;
        }
        
        return createElement('img', attributes, []);
    }
    
    /**
     * @private
     *
     * @description Creates base html node of the dom image element.
     *
     * @return { HTMLDivElement }
     **/
    _createDomTitle()
    {
        return createElement('div', { class: [ this.settings.domTitleClassName ] }, [ this.settings.title ]);
    }
    
    /**
     * @public
     *
     * @description Sets the given modifier to the element by the given force.
     *
     * @param { GallerySliderModifiersClassifier } modifier
     *
     * @param { boolean } force
     *
     * @return { void }
     **/
    setModifier(modifier, force)
    {
        this.domElement.classList.toggle(modifier, force);
    }
    
    /**
     * @public
     *
     * @description Check if the element contains the given modifier.
     *
     * @param { GallerySliderModifiersClassifier } modifier
     *
     * @return { boolean }
     **/
    hasModifier(modifier)
    {
        return this.domElement.classList.contains(modifier);
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
     * @description Returns id.
     *
     * @return { string | number }
     **/
    getId()
    {
        return this.settings.id;
    }
    
    /**
     * @public
     *
     * @description Returns group id.
     *
     * @return { string | number }
     **/
    getGroupId()
    {
        return this.settings.groupId;
    }
    
    /**
     * @public
     *
     * @description Removes current main element from dom.
     *
     * @return { void }
     **/
    domRemove()
    {
        return this.getDomElement().remove();
    }
    
    /**
     * @public
     *
     * @description Sets the specified src to the dom image element.
     *
     * @param { string } src
     *
     * @return { void }
     **/
    setSrcToDomImageElement(src)
    {
        this.domImageElement.src = src;
    }
    
    /**
     * @public
     *
     * @description Returns the src attribute of the dom image-element element.
     *
     * @return { string }
     **/
    getSrcOfDomImageElement()
    {
        return getAttribute(this.domImageElement, 'src');
    }
    
    /**
     * @public
     *
     * @description Determines whether src attribute of the dom image-element element is not empty.
     *
     * @return { boolean }
     **/
    hasSrcOfDomImageElement()
    {
        return hasAttribute(this.domImageElement, 'src') && !!this.getSrcOfDomImageElement();
    }
    
    /**
     * @public
     *
     * @description Hides the dom image element from the item.
     *
     * @return { void }
     **/
    hideDomImageElement()
    {
        this.setModifier(GallerySliderModifiersClassifier.IMAGE_UNDISPLAYED, true);
    }
    
    /**
     * @public
     *
     * @description Removes the current item from the wrapper.
     *
     * @param { boolean } isCustomRemove
     *
     * @return { void }
     **/
    removeFromWrapper(isCustomRemove = true)
    {
        this.wrapper.remove(this, isCustomRemove);
    }
    
    /**
     * @public
     *
     * @description Sets the specified wrapper component.
     *
     * @param { GallerySliderWrapper } wrapper
     *
     * @return { void }
     **/
    setWrapper(wrapper)
    {
        this.wrapper = wrapper;
    }
    
    /**
     * @public
     *
     * @description Returns wrapper component.
     *
     * @return { GallerySliderWrapper }
     **/
    getWrapper()
    {
        return this.wrapper;
    }
    
    /**
     * @public
     *
     * @description Returns record.
     *
     * @return { Object }
     **/
    getRecord()
    {
        return this.settings.record;
    }
    
    /**
     * @public
     *
     * @description Returns GallerySlider.
     *
     * @return { Object }
     **/
    getGallerySlider()
    {
        return this.getWrapper().gallerySlider;
    }
    
    /**
     * @public
     *
     * @description Returns lifespan of the component on seconds.
     *
     * @return { number }
     **/
    getLifespan()
    {
        return Math.floor((new Date() - this._timeStart) / 1000);
    }
}
