import { GallerySliderWrapperSettings } from './GallerySliderWrapperSettings.js';
import { createElement }                from '../../../tea-modules/Functions/DOM/Elements/createElement.js';
import { Queue }                        from '../../../tea-modules/Classes/Arrays/Queue.js';
import { GallerySliderItem }            from '../GallerySliderItem/GallerySliderItem.js';
import { getPaddings }                  from '../../../tea-modules/Functions/DOM/Styles/getPaddings.js';
import { getBorders }                   from '../../../tea-modules/Functions/DOM/Styles/getBorders.js';
import { getTransition }                from '../../../tea-modules/Functions/DOM/Styles/getTransition.js';
import { sleep }                        from '../../../tea-modules/Functions/Functions/sleep.js';
import { GallerySliderModifiersClassifier } from '../Classifiers/GallerySliderModifiersClassifier.js';
import { isArray } from '../../../tea-modules/Functions/Is/isArray.js';
import { GallerySliderTransformActionsClassifier } from '../Classifiers/GallerySliderTransformActionsClassifier.js';
import { CustomEvents } from '../../../tea-modules/Classes/CustomEvents/CustomEvents.js';
import { GallerySliderEventsClassifier } from '../Classifiers/GallerySliderEventsClassifier.js';
import { GallerySlider } from '../GallerySlider.js';


export class GallerySliderWrapper
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
     * @type { GallerySlider }
     **/
    gallerySlider;
    
    /**
     * @public
     *
     * @type { GallerySliderWrapperSettings }
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
     * @type { Array<GallerySliderItem> }
     **/
    items = [];
    
    /**
     * @public
     *
     * @type { Queue<GallerySliderItem> }
     **/
    queue;
    
    /**
     * @private
     *
     * @type { number }
     **/
    _queueCheckerIntervalId = 0;
    
    /**
     * @private
     *
     * @type { boolean }
     **/
    _isQueueCheckerActive = false;
    
    /**
     * @constructor
     *
     * @param { GallerySlider } gallerySlider
     *
     * @param { GallerySliderWrapperSetting | GallerySliderWrapperSettings } settings
     **/
    constructor(gallerySlider, settings= {})
    {
        this.customEvents = new CustomEvents();
        
        this.gallerySlider = gallerySlider;
        
        this.settings = settings instanceof GallerySliderWrapperSettings ? settings : new GallerySliderWrapperSettings(settings);
        
        this.queue = new Queue();
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
        this._nodesProcessing();
        
        this.customEvents.subscribe(GallerySliderEventsClassifier.DRAW, this._drawHandler.bind(this));
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
    }
    
    /**
     * @public
     *
     * @description Implements process of the styles of the dom element.
     *
     * @return { void }
     **/
    domElementStylesProcessing()
    {
        const style = this.domElement.style;
        
        if (!this.gallerySlider.settings.height)
        {
            style.height = this.settings.height + 'px';
        }
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
        return createElement('div', { class: [ this.settings.domElementClassName ] }, []);
    }
    
    /**
     * @private
     *
     * @description Launches the queue checker process.
     *
     * @return { void }
     **/
    _queueCheckerLaunch()
    {
        if (this._isQueueCheckerActive)
        {
            return ;
        }
        
        this._isQueueCheckerActive = true;
        
        this._queueCheckerSetup();
    }
    
    /**
     * @private
     *
     * @description Setups the queue checker timeout.
     *
     * @return { void }
     **/
    _queueCheckerSetup()
    {
        this._queueCheckerIntervalId = setTimeout(this._queueCheckerHandler.bind(this), 100);
    }
    
    /**
     * @private
     *
     * @description Stops the queue checker process.
     *
     * @return { void }
     **/
    _queueCheckerStop()
    {
        clearTimeout(this._queueCheckerIntervalId);
        
        this._isQueueCheckerActive = false;
    }
    
    /**
     * @private
     *
     * @description Implements a handler for the draw event.
     *
     * @param { GallerySliderWrapper } instance
     *
     * @param { GallerySliderItem } item
     *
     * @return { void }
     **/
    _drawHandler(instance, item) {}
    
    /**
     * @private
     *
     * @description Implements a handler for the queue checker process.
     *
     * @return { void }
     **/
    async _queueCheckerHandler()
    {
        if (this.queue.isEmpty())
        {
            this._queueCheckerStop();

            return ;
        }

        while (this.queue.size())
        {
            const item = this.queue.dequeue();

            this._draw(item);
            
            this.customEvents.execute(GallerySliderEventsClassifier.DRAW, this, item);
            
            await sleep(this.settings.creationDelay);

            if (this.queue.isEmpty())
            {
                this._queueCheckerStop();
            }
        }

        this._queueCheckerSetup();
    }
    
    /**
     * @public
     *
     * @description Updates current component.
     *
     * @return { void }
     **/
    update()
    {
        this.domElementStylesProcessing();
     
        this.items.forEach(this.baseCalculating.bind(this));
        
        setTimeout(this._calculateProcessing.bind(this), 5);
    }
    
    /**
     * @public
     *
     * @description Returns item by the specified index or id.
     *
     * @param { string | number } indexOrId
     *
     * @return { GallerySliderItem | undefined }
     **/
    get(indexOrId)
    {
        return this.items.find((value, index) => value.settings.id === indexOrId || index === indexOrId);
    }
    
    /**
     * @public
     *
     * @description Returns index of the specified item.
     *
     * @param { GallerySliderItem | string | number } itemOrId
     *
     * @return { number }
     **/
    getIndex(itemOrId)
    {
        return this.items.findIndex(a => a === itemOrId || a.settings.id === itemOrId);
    }
    
    /**
     * @public
     *
     * @description Returns collection of items by the specified group id.
     *
     * @param { string | number } groupId
     *
     * @param { ...GallerySliderItem } ignoreElements
     *
     * @return { Array<GallerySliderItem> }
     **/
    getAll(groupId, ...ignoreElements)
    {
        return this.items.filter(a => a.settings.groupId === groupId && !ignoreElements.includes(a));
    }
    
    /**
     * @public
     *
     * @description Creates item by the specified settings and adds then to queue.
     *
     * @param { GallerySliderItemSetting | GallerySliderItemSettings | Array<GallerySliderItemSetting | GallerySliderItemSettings> } item
     *
     * @return { GallerySliderItem | null }
     **/
    add(item)
    {
        if (isArray(item))
        {
            item.forEach(this.add.bind(this));
            
            return null;
        }
        
        const instance = this.createItem(item);
        
        this.queue.enqueue(instance);
        
        this._queueCheckerLaunch();
        
        return instance;
    }
    
    /**
     * @public
     *
     * @description Removes the specified item from collection by the specified index or instance.
     *
     * @param { number | GallerySliderItem } indexOrItemOrId
     *
     * @param { boolean } isCustomRemove
     *
     * @return { void }
     **/
    remove(indexOrItemOrId, isCustomRemove = false)
    {
        const item = indexOrItemOrId instanceof GallerySliderItem ? indexOrItemOrId : (this.get(indexOrItemOrId) || this.getById(indexOrItemOrId));

        if (!item)
        {
            return ;
        }

        const classifier = isCustomRemove ? GallerySliderTransformActionsClassifier.CUSTOM_REMOVE : GallerySliderTransformActionsClassifier.REMOVE;

        this.itemStyleProcessing(item, classifier);

        this._unDraw(item);

        this._calculateProcessing();
    }

    /**
     * @public
     *
     * @description Removes all items from the wrapper.
     *
     * @return { void }
     */
    clear()
    {
        while (this.items.length)
        {
            this.remove(0, true);
        }
    }

    /**
     * @public
     *
     * @description Creates instance of the item by the specified settings.
     *
     * @param { GallerySliderItemSetting | GallerySliderItemSettings } item
     *
     * @return { GallerySliderItem }
     **/
    createItem(item)
    {
        const instance = new GallerySliderItem(item);

        instance.setWrapper(this);

        instance.initialization();

        this.baseCalculating(instance);

        return instance;
    }

    /**
     * @private
     *
     * @description Draws the specified item in the wrapper.
     *
     * @param { GallerySliderItem } item
     *
     * @return { void }
     **/
    _draw(item)
    {
        this.items.push(item);

        GallerySlider.addItemInstance(item, this.gallerySlider.getGroupId());

        this.domElement.append(item.getDomElement());

        item.setModifier(GallerySliderModifiersClassifier.DISPLAYED, true);

        setTimeout(this._calculateProcessing.bind(this), 5);
    }

    /**
     * @private
     *
     * @description Un draws the specified item from the wrapper.
     *
     * @param { GallerySliderItem } item
     *
     * @return { void }
     **/
    _unDraw(item)
    {
        this.items.splice(this.getIndex(item), 1);

        GallerySlider.removeItemInstance(item, this.gallerySlider.getGroupId());

        item.setModifier(GallerySliderModifiersClassifier.DISPLAYED, false);

        const transition = getTransition(item.getDomElement(), 'all');

        setTimeout(item.domRemove.bind(item), transition.duration);
    }

    /**
     * @private
     *
     * @description Implements process of the calculating.
     *
     * @return { void }
     **/
    _calculateProcessing()
    {
        for (let i = 0, n = this.items.length; i < n; i++)
        {
            const item = this.items[ i ];

            this.itemStyleProcessing(item);

            if (i + 1 > this.settings.itemsCount)
            {
                this.remove(0, false);
            }
        }
    }

    /**
     * @public
     *
     * @description Implements a transform process of the specified item by the specified classifier.
     *
     * @param { GallerySliderItem } item
     *
     * @param { GallerySliderTransformActionsClassifier } classifier
     *
     * @return { void }
     **/
    itemStyleProcessing(item, classifier = GallerySliderTransformActionsClassifier.DEFAULT)
    {
        switch (classifier)
        {
            case GallerySliderTransformActionsClassifier.DEFAULT:
            {
                item.getDomElement().style.transform = `translate(${ this.getItemTranslateX(this.getIndex(item)) }px, ${ this.getItemTranslateY(0) }px) rotateY(360deg) scale(1)`;

                break ;
            }
            case GallerySliderTransformActionsClassifier.REMOVE:
            {
                item.getDomElement().style.transform = `translate(${ this.getItemTranslateX(-1) }px, ${ this.getItemTranslateY(0) }px) rotateY(0deg) scale(0)`;

                break ;
            }
            case GallerySliderTransformActionsClassifier.CUSTOM_REMOVE:
            {
                item.getDomElement().style.transform = `translate(${ this.getItemTranslateX(this.getIndex(item)) }px, ${ -this.getItemHeight() }px) rotateY(0deg) scale(0)`;

                break ;
            }
        }
    }

    /**
     * @public
     *
     * @description Returns count of the items.
     *
     * @return { number }
     **/
    getCount()
    {
        return this.items.length;
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
     * @description Returns bounding client rect of the dom element.
     *
     * @return { DOMRect }
     **/
    boundingClientRect()
    {
        return this.domElement.getBoundingClientRect();
    }

    /**
     * @public
     *
     * @description Returns paddings of the dom element.
     *
     * @return { Paddings }
     **/
    getPaddings()
    {
        return getPaddings(this.getDomElement());
    }

    /**
     * @public
     *
     * @description Returns borders of the dom element.
     *
     * @return { Borders }
     **/
    getBorders()
    {
        return getBorders(this.getDomElement());
    }

    /**
     * @public
     *
     * @description Returns real width without paddings and borders.
     *
     * @return { number }
     **/
    getRealWidth()
    {
        return this.boundingClientRect().width - this.getBorders().x - this.getPaddings().x;
    }

    /**
     * @public
     *
     * @description Returns real height without paddings and borders.
     *
     * @return { number }
     **/
    getRealHeight()
    {
        return this.boundingClientRect().height - this.getBorders().x - this.getPaddings().x;
    }

    /**
     * @public
     *
     * @description Returns width of the item.
     *
     * @return { number }
     **/
    getItemWidth()
    {
        const between = this.settings.horizontalBetween * (this.settings.itemsCount + 1) / this.settings.itemsCount;

        return this.getRealWidth() / this.settings.itemsCount - between;
    }

    /**
     * @public
     *
     * @description Returns height of the item.
     *
     * @return { number }
     **/
    getItemHeight()
    {
        return this.getRealHeight() - this.settings.verticalBetween * 2;
    }

    /**
     * @public
     *
     * @description Returns translate Y of the item by the specified index.
     *
     * @param { number } index
     *
     * @return { number }
     **/
    getItemTranslateY(index)
    {
        return this.settings.verticalBetween;
    }
    /**
     * @public
     *
     * @description Returns translate X of the item by the specified index.
     *
     * @param { number } index
     *
     * @return { number }
     **/
    getItemTranslateX(index)
    {
        index = this.getCount() - 1 - index;

        let translate = this.getItemWidth() * index;

        translate += this.settings.horizontalBetween * (index + 1);

        return this.gallerySlider.isSideRight() ? translate : -translate;
    }

    /**
     * @public
     *
     * @description Calculates base properties for the specified item.
     *
     * @param { GallerySliderItem } item
     *
     * @return { void }
     **/
    baseCalculating(item)
    {
        item.getDomElement().style.width = `${ this.getItemWidth() }px`;

        item.getDomElement().style.height = `${ this.getItemHeight() }px`;
    }
}
