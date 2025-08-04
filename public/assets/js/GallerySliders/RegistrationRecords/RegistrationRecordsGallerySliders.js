import { EntrancesRegistrationRecordsGallerySlider } from './EntrancesRegistrationRecordsGallerySlider.js';
import { ExitsRegistrationRecordsGallerySlider }     from './ExitsRegistrationRecordsGallerySlider.js';
import { querySelector }                             from '../../tea-modules/Functions/DOM/Queries/querySelector.js';
import { Configurations }                            from '../../standards/Configurations/Configurations.js';
import { ConfigurationCodesClassifier }              from '../../standards/Classifiers/Configurations/ConfigurationCodesClassifier.js';
import { DateManager }                               from '../../tea-modules/Classes/Dates/DateManager.js';
import { DateFormatsClassifier }                     from '../../tea-modules/Classes/Standards/Date/DateFormatsClassifier.js';
import { HttpRequest }                               from '../../tea-modules/Classes/Requests/HttpRequest.js';
import { HttpRequestMethodsClassifier }              from '../../tea-modules/Classes/Requests/Standards/HttpRequestMethodsClassifier.js';
import { RegistrationRecordsGallerySlider }          from './RegistrationRecordsGallerySlider.js';
import { isStructureEmpty }                          from '../../tea-modules/Functions/Is/isStructureEmpty.js';
import { GallerySliderSidesClassifier }              from '../../components/GallerySlider/Classifiers/GallerySliderSidesClassifier.js';
import { DetectedRfidTagsIdActionsClassifier }       from './DetectedRfidTagsIdActionsClassifier.js';
import { ObjectPictures }                            from '../../components/ObjectPictures/ObjectPictures.js';
import { ObjectPictureCodeEntityTypesClassifier }    from '../../components/ObjectPictures/ObjectPictureCodeEntityTypesClassifier.js';
import { getStructureMax }                           from '../../tea-modules/Functions/Structures/getStructureMax.js';
import { HttpRequestsGroup }                         from '../../tea-modules/Classes/Requests/RequestGroup/HttpRequestsGroup.js';
import { HttpRequestsGroupEventsClassifier }         from '../../tea-modules/Classes/Requests/RequestGroup/HttpRequestsGroupEventsClassifier.js';
import { GallerySliderEventsClassifier }             from '../../components/GallerySlider/Classifiers/GallerySliderEventsClassifier.js';
import { GallerySliderWrapper }                      from '../../components/GallerySlider/GallerySliderWrapper/GallerySliderWrapper.js';
import { GallerySlider }                             from '../../components/GallerySlider/GallerySlider.js';
import { GallerySliderModifiersClassifier }          from '../../components/GallerySlider/Classifiers/GallerySliderModifiersClassifier.js';
import { toggleFullScreen }                          from '../../tea-modules/Functions/Screen/toggleFullScreen.js';
import { getPaddings }                               from '../../tea-modules/Functions/DOM/Styles/getPaddings.js';
import { Debounce }                                  from '../../tea-modules/Functions/Functions/Debounce.js';
import { HttpRequestEventsClassifier }               from '../../tea-modules/Classes/Requests/Standards/HttpRequestEventsClassifier.js';
import { Database }                                  from '../../tea-modules/Classes/Database/Database.js';
import { DatabaseStoresClassifier }                  from '../../tea-modules/Classes/Database/DatabaseStoresClassifier.js';
import { FrontendLogs }                              from '../../components/FrontendLogs/FrontendLogs.js';
import { RegistrationRecordsGallerySlidersLogTypesClassifier } from './RegistrationRecordsGallerySlidersLogTypesClassifier.js';
import { RegistrationRecordsGallerySlidersLogVariables } from './RegistrationRecordsGallerySlidersLogVariables.js';
import { format } from '../../tea-modules/Functions/Strings/format.js';
import { RegistrationRecordsGallerySlidersLogMessagesClassifier } from './RegistrationRecordsGallerySlidersLogMessagesClassifier.js';
import { createElement } from '../../tea-modules/Functions/DOM/Elements/createElement.js';
import { createFragment } from '../../tea-modules/Functions/DOM/Elements/createFragment.js';
import { isArray } from '../../tea-modules/Functions/Is/isArray.js';
import { HttpStatusesClassifier } from '../../tea-modules/Classes/Requests/Standards/HttpStatusesClassifier.js';
import { TimeOut } from '../../tea-modules/Classes/Events/TimeOut.js';
import { trim } from '../../tea-modules/Functions/Strings/trim.js';
import { isUndefined } from '../../tea-modules/Functions/Is/isUndefined.js';


/**
 * @description Implements management of the registration records gallery sliders.
 **/
export class RegistrationRecordsGallerySliders
{
    /**
     * @public
     *
     * @type { Array<Object> }
     **/
    configurations;
    
    /**
     * @public
     *
     * @type { RegistrationRecordsGallerySlider }
     **/
    entrancesGallerySlider;
    
    /**
     * @public
     *
     * @type { RegistrationRecordsGallerySlider }
     **/
    exitsGallerySlider;
    
    /**
     * @public
     *
     * @type { HTMLDivElement }
     **/
    viewInner;
    
    /**
     * @public
     *
     * @type { Date }
     **/
    _timeStart = new Date();
    
    /**
     * @public
     *
     * @type { number }
     **/
    _timeoutId = 0;
    
    /**
     * @public
     *
     * @type { number }
     **/
    _lastIdRow = 0;
    
    /**
     * @public
     *
     * @type { boolean }
     **/
    _isDraws = false;
    
    /**
     * @private
     *
     * @type { HttpRequestsGroup }
     **/
    _httpRequestsGroup;
    
    /**
     * @private
     *
     * @type { ResizeObserver }
     **/
    _resizeObserver;
    
    /**
     * @private
     *
     * @type { Database }
     **/
    _database;
    
    /**
     * @private
     *
     * @type { TimeOut }
     **/
    _pictureInspectorTimeOut;
    
    /**
     * @constructor
     **/
    constructor()
    {
        this.entrancesGallerySlider = new EntrancesRegistrationRecordsGallerySlider({ id: 'entrances', heading: 'Entrances', groupId: 'gallery' });
        
        this.exitsGallerySlider = new ExitsRegistrationRecordsGallerySlider({ id: 'exits', heading: 'Exits', groupId: 'gallery' });
        
        this.viewInner = querySelector('.view__inner');
    }
    
    /**
     * @public
     *
     * @description Implements initialized base logic.
     *
     * @return { void }
     **/
    async initialization()
    {
        this._database = new Database({ store: DatabaseStoresClassifier.USER_IMAGES, storeParameters: { keyPath: 'id_object', autoIncrement: false } });
        
        await this._database.open();
        
        await this._configurationsProcessing();
        
        this._pictureInspectorTimeOut = new TimeOut(
            {
                timeout: this.getConfigurationValue(ConfigurationCodesClassifier.FREQUENCY_OF_ITEM_INSPECTOR_PROCESS),
                handler: this._pictureInspectionProcessing.bind(this),
            });
        
        this._httpRequestsGroup = new HttpRequestsGroup({ groupName: 'gallery-sliders', maxRequests: this.getConfigurationValue(ConfigurationCodesClassifier.NUMBER_OF_HTTP_REQUEST_PROCESSES), });
        
        this._httpRequestsGroup.customEvents.subscribe(HttpRequestsGroupEventsClassifier.COMPLETE, this._pictureCompleteHandler.bind(this));
        
        this.mergeSettings(this.entrancesGallerySlider);
        
        this.mergeSettings(this.exitsGallerySlider);
        
        this._buttonSettingsProcessing();
        
        await this.entrancesGallerySlider.initialization();
        
        await this.exitsGallerySlider.initialization();
        
        this.entrancesGallerySlider.gallerySlider.wrapper.customEvents.subscribe(GallerySliderEventsClassifier.DRAW, this._drawHandler.bind(this));
        
        this.exitsGallerySlider.gallerySlider.wrapper.customEvents.subscribe(GallerySliderEventsClassifier.DRAW, this._drawHandler.bind(this));
        
        this.entrancesGallerySlider.gallerySlider.customEvents.subscribe(GallerySliderEventsClassifier.BUTTON_TOGGLE, this._buttonToggleHandler.bind(this));
        
        this.exitsGallerySlider.gallerySlider.customEvents.subscribe(GallerySliderEventsClassifier.BUTTON_TOGGLE, this._buttonToggleHandler.bind(this));
        
        window.addEventListener('resize', this._resizeHandler.bind(this));
        
        this._insertProcessing();
        
        this._resizeObserverProcessing();
        
        this.intervalLauncher();
        
        this._pictureInspectorTimeOut.start();
    }
    
    /**
     * @private
     *
     * @description Implements inspection process of each item.
     *
     * @return { void }
     **/
    async _pictureInspectionProcessing()
    {
        const items = GallerySlider.getItemInstances('gallery');
        
        if (!isArray(items) || isStructureEmpty(items))
        {
            this._pictureInspectorTimeOut.start();
            
            return ;
        }
        
        for (let i = 0, n = items.length; i < n; i++)
        {
            /**
             * @type { GallerySliderItem }
             **/
            const item = items[ i ];
            
            if (!this.isItemPictureRequestNeed(item))
            {
                continue ;
            }
            
            await this._pictureInitialization(item, item.getRecord(), item.getGallerySlider());
            
            this._log({ type: RegistrationRecordsGallerySlidersLogTypesClassifier.PICTURE_INSPECTOR, item: item, record: item.getRecord(), gallerySlider: item.getGallerySlider() });
        }
        
        this._pictureInspectorTimeOut.start();
    }
    
    /**
     * @private
     *
     * @description Implements a process of the button settings.
     *
     * @return { void }
     **/
    _buttonSettingsProcessing()
    {
        this.entrancesGallerySlider.gallerySlider.settings.buttonSettings.push({
            elementClass: [ 'button', 'button--size-small', 'button--type-default', 'button--theme-white-azure-wild-sand' ],
            iconId: 'media-fullscreen-line',
            iconClass: 'icon icon-size-20',
            customId: 'fullscreen-mode',
            isToggle: true,
        });
    }
    
    /**
     * @private
     *
     * @description Implements a click handler for the click of the gallery slider buttons.
     *
     * @param { boolean } force
     *
     * @param { Button } button
     *
     * @param { GallerySlider } instance
     *
     * @return { void }
     **/
    async _buttonToggleHandler(force, button, instance)
    {
        if (button.getCustomId() !== 'fullscreen-mode')
        {
            return ;
        }
        
        const iconId = force ? 'media-fullscreen-exit-line' : 'media-fullscreen-line';
        
        button.changeIcon(iconId);
        
        app.states.noTools(force);
        
        await toggleFullScreen(force);
        
        this.gallerySlidersUpdate();
    }
    
    /**
     * @private
     *
     * @description Implements process of the ResizeObserver class.
     *
     * @return { void }
     **/
    _resizeObserverProcessing()
    {
        this._resizeObserver = new ResizeObserver(this._resizeObserverHandler.bind(this));
        
        this._resizeObserver.observe(this.viewInner);
    }
    
    /**
     * @private
     *
     * @description Implements a handler of the ResizeObserver callback.
     *
     * @param { Array<ResizeObserverEntry> } entries
     *
     * @param { ResizeObserver } observer
     *
     * @return { void }
     **/
    _resizeObserverHandler(entries, observer)
    {
        Debounce.register(this.gallerySlidersUpdate.bind(this), 50, this.gallerySlidersUpdate);
    }
    
    /**
     * @private
     *
     * @description Implements a handler for the resize event.
     *
     * @return { void }
     **/
    _resizeHandler()
    {
        Debounce.register(this.gallerySlidersUpdate.bind(this), 50, this.gallerySlidersUpdate);
    }
    
    /**
     * @public
     *
     * @description Implements update for each gallery slider.
     *
     * @param { string ? } eventType
     *
     * @return { void }
     **/
    gallerySlidersUpdate(eventType)
    {
        const gallerySliders = GallerySlider.getAllInstances('gallery');
        
        for (let i = 0, n = gallerySliders.length; i < n; i++)
        {
            const gallerySlider = gallerySliders[ i ];
            
            gallerySlider.settings.height = this.getGallerySliderHeight();
            
            setTimeout(gallerySlider.update.bind(gallerySlider), 200);
        }
    }
    
    /**
     * @public
     *
     * @description Returns height of each gallery slider.
     *
     * @param { boolean ? } bySettings
     *
     * @return { number }
     **/
    getGallerySliderHeight(bySettings = false)
    {
        const height = (this.viewInner.offsetHeight - getPaddings(this.viewInner).y - 30) / 2;
        
        return bySettings ? this.getConfigurationValue(ConfigurationCodesClassifier.HEIGHT_OF_GALLERY) : height;
    }
    
    /**
     * @private
     *
     * @description Implements a handler for the gallery slider draw event.
     *
     * @param { GallerySliderWrapper } instance
     *
     * @param { GallerySliderItem } item
     **/
    _drawHandler(instance, item)
    {
        this._itemsDisplayProcessing(item);
    }
    
    /**
     * @private
     *
     * @description Implements a display process of the items.
     *
     * @param { GallerySliderItem } item
     *
     * @return { void }
     **/
    _itemsDisplayProcessing(item)
    {
        const items = GallerySlider.getItemInstances('gallery', item.getGroupId());
        
        const isHideImages = this.getConfigurationValue(ConfigurationCodesClassifier.HIDE_IMAGES_FOR_OUTDATED_ITEMS);
        
        const isHideItems = this.getConfigurationValue(ConfigurationCodesClassifier.HIDE_OUTDATED_ITEMS);
        
        isHideImages && this._hideImagesProcessing(items);
        
        isHideItems && this._hideItemsProcessing(items);
    }
    
    /**
     * @private
     *
     * @description Implements process for the hide images of the specified items.
     *
     * @param { Array<GallerySliderItem> } items
     *
     * @return { void }
     **/
    _hideImagesProcessing(items)
    {
        if (items.length <= 1)
        {
            return ;
        }
        
        items.reduce((previousValue, currentValue) => this._hideReduceHandler(previousValue, currentValue));
    }
    
    /**
     * @private
     *
     * @description Implements process for the hide images of the specified items.
     *
     * @param { Array<GallerySliderItem> } items
     *
     * @return { void }
     **/
    _hideItemsProcessing(items)
    {
        if (items.length <= 1)
        {
            return ;
        }
        
        items.reduce((previousValue, currentValue) => this._hideReduceHandler(previousValue, currentValue, true));
    }
    
    /**
     * @private
     *
     * @description Implements a handler for the reduce method of the all hide processes.
     *
     * @param { GallerySliderItem } previousValue
     *
     * @param { GallerySliderItem } currentValue
     *
     * @param { boolean ? } isRemove
     *
     * @return { GallerySliderItem }
     **/
    _hideReduceHandler(previousValue, currentValue, isRemove = false)
    {
        if (previousValue.getId() < currentValue.getId())
        {
            isRemove ? previousValue.removeFromWrapper() : previousValue.hideDomImageElement();
            
            return currentValue;
        }
        
        isRemove ? currentValue.removeFromWrapper() : currentValue.hideDomImageElement();
        
        return previousValue;
    }
    
    /**
     * @public
     *
     * @description Launches the interval process.
     *
     * @return { void }
     **/
    intervalLauncher()
    {
        this._timeoutId = setTimeout(this._intervalHandler.bind(this), this.getConfigurationValue(ConfigurationCodesClassifier.FREQUENCY_SENDING_HTTP_REQUESTS));
    }
    
    /**
     * @public
     *
     * @description Stops the interval process.
     *
     * @return { void }
     **/
    intervalStop()
    {
        clearTimeout(this._timeoutId);
    }
    
    /**
     * @public
     *
     * @description Restarts the interval process.
     *
     * @return { void }
     **/
    intervalRestart()
    {
        this.intervalStop();
        
        this.intervalLauncher();
    }
    
    /**
     * @private
     *
     * @description Implements a handler for the interval.
     *
     * @return { void }
     **/
    async _intervalHandler()
    {
        if (!this._isDraws)
        {
            await this.update();
        }
        
        this.intervalLauncher();
    }
    
    /**
     * @public
     *
     * @description Updates the components.
     *
     * @return { void }
     **/
    async update()
    {
        this._isDraws = true;
        
        const records = await this.getRecords();
        
        await this._log({ type: RegistrationRecordsGallerySlidersLogTypesClassifier.GET_RECORDS, records: records });
        
        if (isStructureEmpty(records) || records instanceof HttpRequest)
        {
            this._isDraws = false;
            
            return ;
        }
        
        this._lastIdRow = getStructureMax(records, 'id_row');
        
        if (app.isFrontendLogs)
        {
            await this.add(records, this.entrancesGallerySlider);
            
            await this.add(records, this.exitsGallerySlider);
        }
        else
        {
            const entrancesGallerySlider = this.add(records, this.entrancesGallerySlider);
            
            const exitsGallerySlider = this.add(records, this.exitsGallerySlider);
            
            await Promise.all([ entrancesGallerySlider, exitsGallerySlider ]);
        }
        
        this._isDraws = false;
    }
    
    /**
     * @private
     *
     * @description Creates html node elements for each variable of the item title.
     *
     * @param { Object } record
     *
     * @return { DocumentFragment }
     **/
    _createTitle(record)
    {
        const fragment = createFragment();
        
        const variables = this.getConfigurationValue(ConfigurationCodesClassifier.NAME_TEMPLATE).match(/(?<=%)[^%\s]*(?=%)/g);
        
        for (let i = 0, n = variables.length; i < n; i++)
        {
            const variable = variables[ i ];
            
            const span = createElement('span', {}, [ trim(record[ variable.toLowerCase() ], ' ') ]);
            
            fragment.append(span);
        }
        
        return fragment;
    }
    
    /**
     * @private
     *
     * @description Creates html node elements for each segment of the item time.
     *
     * @param { Object } record
     *
     * @return { DocumentFragment }
     **/
    _createTime(record)
    {
        const fragment = createFragment();
        
        const date = DateManager.date(this.getConfigurationValue(ConfigurationCodesClassifier.ITEM_TIME_FORMAT), record.time_registration_string);
        
        const segments = date.split('||');
        
        for (let i = 0, n = segments.length; i < n; i++)
        {
            const span = createElement('span', {}, [ trim(segments[ i ], ' ') ]);
            
            fragment.append(span);
        }
        
        return fragment;
    }
    
    /**
     * @public
     *
     * @description Adds the specified records to gallery slider by the specified classifier.
     *
     * @param { Array<Object> } records
     *
     * @param { RegistrationRecordsGallerySlider } registrationRecordsGallerySlider
     *
     * @return { Promise<void> }
     **/
    async add(records, registrationRecordsGallerySlider)
    {
        records = this.getRecordsByActionId(records, registrationRecordsGallerySlider.idAction);
        
        records = records.slice(Math.max(records.length - this.getConfigurationValue(ConfigurationCodesClassifier.MAX_ITEMS_OF_GALLERY), 0));
        
        for (let i = 0, n = records.length; i < n; i++)
        {
            const record = records[ i ];
            
            const item = registrationRecordsGallerySlider.gallerySlider.wrapper.add(
                {
                    id: record.id_row,
                    groupId: record.id_user,
                    src: '',
                    time: this._createTime(record),
                    title: this._createTitle(record),
                    timeFontSize: this.getConfigurationValue(ConfigurationCodesClassifier.ITEM_TIME_FONT_SIZE),
                    titleFontSize: this.getConfigurationValue(ConfigurationCodesClassifier.ITEM_TITLE_FONT_SIZE),
                    record: record,
                });
            
            await this._log({ type: RegistrationRecordsGallerySlidersLogTypesClassifier.ITEM_CREATED, record: record, gallerySlider: registrationRecordsGallerySlider .gallerySlider});
            
            item.setModifier(registrationRecordsGallerySlider.gallerySlider.getId() === 'entrances' ? GallerySliderModifiersClassifier.SUCCESS : GallerySliderModifiersClassifier.INFO, true);
            
            if (this.isItemPictureRequestNeed(item))
            {
                await this._pictureInitialization(item, record, registrationRecordsGallerySlider.gallerySlider);
            }
        }
    }
    
    /**
     * @private
     *
     * @description Implements initialization for the picture of the specified item.
     *
     * @param { GallerySliderItem } item
     *
     * @param { Object } record
     *
     * @param { GallerySlider } gallerySlider
     *
     * @return { Promise<void> }
     **/
    async _pictureInitialization(item, record, gallerySlider)
    {
        const databasePicture = await this._database.select(record.id_user);
        
        await this._log({ type: RegistrationRecordsGallerySlidersLogTypesClassifier.PICTURE_DATABASE_SELECT, record: record, gallerySlider: gallerySlider, databasePicture: databasePicture });
        
        if (databasePicture)
        {
            item.setSrcToDomImageElement(ObjectPictures.base64(databasePicture.message, databasePicture.comment));
            
            return ;
        }
        
        item.setModifier(GallerySliderModifiersClassifier.LOADING, true);
        
        const pictureHttpRequest = ObjectPictures.pictureHttpRequest(record.id_user, ObjectPictureCodeEntityTypesClassifier.USER, record.id_user);
        
        pictureHttpRequest.customEvents.subscribe(HttpRequestEventsClassifier.SUCCESS, async (response) =>
        {
            await this._databaseProcessing.call(this, this._database, record, response);
            
            await this._log({ type: RegistrationRecordsGallerySlidersLogTypesClassifier.PICTURE_REQUEST_RESPONSE, record: record, gallerySlider: gallerySlider, pictureResponse: response });
        });
        
        pictureHttpRequest.customEvents.subscribe(HttpRequestEventsClassifier.ERROR, async (response) =>
        {
            await this._log({ type: RegistrationRecordsGallerySlidersLogTypesClassifier.PICTURE_REQUEST_ERROR, record: record, gallerySlider: gallerySlider, pictureResponse: response });
        });
        
        pictureHttpRequest.customEvents.subscribe(HttpRequestEventsClassifier.COMPLETE, () => item.setModifier(GallerySliderModifiersClassifier.LOADING, false));
        
        this._httpRequestsGroup.create(pictureHttpRequest, item);
        
        await this._log({ type: RegistrationRecordsGallerySlidersLogTypesClassifier.PICTURE_REQUEST_INITIALIZATION, record: record, gallerySlider: gallerySlider, pictureHttpRequest: pictureHttpRequest });
    }
    
    /**
     * @public
     *
     * @description Determines whether the specified item need request to a picture.
     *
     * @param { GallerySliderItem } item
     *
     * @return { boolean }
     **/
    isItemPictureRequestNeed(item)
    {
        return !item.hasSrcOfDomImageElement()
            && !item.hasModifier(GallerySliderModifiersClassifier.IMAGE_NOT_FOUND)
            && !item.hasModifier(GallerySliderModifiersClassifier.IMAGE_UNDISPLAYED)
            && !item.hasModifier(GallerySliderModifiersClassifier.LOADING)
            && !this._httpRequestsGroup.has(item);
    }
    
    /**
     * @private
     *
     * @description Logs the specified variables.
     *
     * @param { RegistrationRecordsGallerySlidersLogVars | RegistrationRecordsGallerySlidersLogVariables } variables
     *
     * @return { void }
     **/
    async _log(variables)
    {
        if (!app.isFrontendLogs)
        {
            return ;
        }
        
        variables = variables instanceof RegistrationRecordsGallerySlidersLogVariables ? variables : new RegistrationRecordsGallerySlidersLogVariables(variables);
        
        let message = RegistrationRecordsGallerySlidersLogMessagesClassifier[ variables.type ];
        
        let information = '';
        
        if (variables.record)
        {
            information += `id_row: ${ variables.record.id_row }; id_file: ${ variables.record.id_file }; id_user: ${ variables.record.id_user }; length_file = ${ variables.record.len_file };`;
        }
        
        if (variables.gallerySlider)
        {
            message += ` Slider id: ${ variables.gallerySlider.getId() };`;
        }
        
        if (variables.item)
        {
            message += ` Item lifespan: ${ variables.item.getLifespan() } seconds;`;
        }
        
        if (variables.error)
        {
            message += ` Error: ${ variables.error };`;
        }
        
        if (!isUndefined(variables.isSuccess))
        {
            message += ` Is success ${ variables.isSuccess };`;
        }
        
        switch (variables.type)
        {
            case RegistrationRecordsGallerySlidersLogTypesClassifier.PICTURE_DATABASE_SELECT:
            {
                information += ` Image exist: ${ !!variables.databasePicture }; Image length: ${ variables.databasePicture && variables.databasePicture.message.length };`;
                
                break ;
            }
            case RegistrationRecordsGallerySlidersLogTypesClassifier.GET_RECORDS:
            {
                information += ` Records count: ${ variables.records.length };`;
                
                break ;
            }
            case RegistrationRecordsGallerySlidersLogTypesClassifier.PICTURE_REQUEST_INITIALIZATION:
            {
                information += ` Data: ${ JSON.stringify(variables.pictureHttpRequest.settings.data) };`;
                
                break ;
            }
            case RegistrationRecordsGallerySlidersLogTypesClassifier.PICTURE_REQUEST_RESPONSE:
            case RegistrationRecordsGallerySlidersLogTypesClassifier.PICTURE_DATABASE_INSERTING:
            {
                information += ` Response: ${ JSON.stringify(variables.pictureResponse.record.request) };`;
                
                break ;
            }
            case RegistrationRecordsGallerySlidersLogTypesClassifier.PICTURE_REQUEST_ERROR:
            {
                information += ` Status text: ${ variables.pictureResponse.statusText }; Status: ${ variables.pictureResponse.status };`;
                
                break ;
            }
        }

        information += ` Lifespan: ${ this.getLifespan() } seconds;`;
        
        message = format(message, [ information ]);
        
        try
        {
            await FrontendLogs.add(message);
        }
        catch (exception)
        {
            console.log(exception);
        }
    }
    
    /**
     * @private
     *
     * @description Implements process of the database.
     *
     * @param { Database } database
     *
     * @param { Object } record
     *
     * @param { ResponseStandard } response
     *
     * @return { void }
     **/
    async _databaseProcessing(database, record, response)
    {
        if (response.record.number !== 0)
        {
            return ;
        }
        
        response.record.id_object = record.id_user;
        
        let isSuccess, error;
        
        try
        {
            await database.insert(response.record);
            
            isSuccess = true;
        }
        catch (exception)
        {
            error = exception.message;
            
            isSuccess = false;
        }
        
        await this._log({ type: RegistrationRecordsGallerySlidersLogTypesClassifier.PICTURE_DATABASE_INSERTING, record: record, pictureResponse: response, isSuccess: isSuccess, error: error });
    }
    
    /**
     * @private
     *
     * @description Implements a handler of the picture for the "complete" event.
     *
     * @param { ResponseStandard | XMLHttpRequest } response
     *
     * @param { HttpRequest } httpRequest
     *
     * @param { GallerySliderItem } key
     *
     * @return { void }
     **/
    _pictureCompleteHandler(response, httpRequest, key)
    {
        if (httpRequest.isCompleted() && httpRequest.xhr.status !== HttpStatusesClassifier.SUCCESS)
        {
            key.setModifier(GallerySliderModifiersClassifier.REQUEST_ERROR, true);
            
            return ;
        }
        
        if (response.record.number !== 0)
        {
            key.setModifier(GallerySliderModifiersClassifier.IMAGE_NOT_FOUND, true);

            return ;
        }

        key.setSrcToDomImageElement(ObjectPictures.base64(response.record.message, response.record.comment));
    }
    
    /**
     * @private
     *
     * @description Implements process of the nodes insert.
     *
     * @return { void }
     **/
    _insertProcessing()
    {
        this.viewInner.append(this.entrancesGallerySlider.getDomElement());
        
        this.viewInner.append(this.exitsGallerySlider.getDomElement());
    }
    
    /**
     * @private
     *
     * @description Implements process of the configurations.
     *
     * @return { void }
     **/
    async _configurationsProcessing()
    {
        if (!isStructureEmpty(this.configurations))
        {
            return ;
        }
        
        const configurations = await Configurations.get(ConfigurationCodesClassifier.ALL);
        
        if (configurations)
        {
            this.configurations = configurations.data;
        }
    }
    
    /**
     * @public
     *
     * @description Returns value of the configuration by the specified code.
     *
     * @param { ConfigurationCodesClassifier } code
     *
     * @return { string | number | null }
     **/
    getConfigurationValue(code)
    {
        const configuration =  this.configurations.find(configuration => configuration.code === code);
        
        if (!configuration)
        {
            return null;
        }
        
        return configuration.value_string || configuration.value_integer;
    }
    
    /**
     * @public
     *
     * @description Implements merge base settings to the specified gallery slider.
     *
     * @param { RegistrationRecordsGallerySlider } registrationRecordsGallerySlider
     *
     * @return { void }
     **/
    mergeSettings(registrationRecordsGallerySlider)
    {
        const settings = registrationRecordsGallerySlider.gallerySlider.settings;
        
        // settings.height = this.getConfigurationValue(ConfigurationCodesClassifier.HEIGHT_OF_GALLERY);
        
        settings.height = this.getGallerySliderHeight();
        
        settings.wrapperSettings.itemsCount = this.getConfigurationValue(ConfigurationCodesClassifier.MAX_ITEMS_OF_GALLERY);
        
        settings.wrapperSettings.horizontalBetween = this.getConfigurationValue(ConfigurationCodesClassifier.HORIZONTAL_BETWEEN);
        
        settings.wrapperSettings.verticalBetween = this.getConfigurationValue(ConfigurationCodesClassifier.VERTICAL_BETWEEN);
        
        settings.wrapperSettings.creationDelay = this.getConfigurationValue(ConfigurationCodesClassifier.ITEM_CREATION_DELAY);
        
        settings.headingFontSize = this.getConfigurationValue(ConfigurationCodesClassifier.HEADING_FONT_SIZE);
        
        settings.side = this.getConfigurationValue(registrationRecordsGallerySlider.configurationSide) ? GallerySliderSidesClassifier.RIGHT : GallerySliderSidesClassifier.LEFT;
    }
    
    /**
     * @public
     *
     * @description Returns records.
     *
     * @return { Promise<Array<Object>> }
     **/
    async getRecords()
    {
        const httpRequest = new HttpRequest(
            {
                url: '/admin/gallery/registration-records',
                method: HttpRequestMethodsClassifier.POST,
                data:
                    {
                        date_start: DateManager.date(DateFormatsClassifier.Y_m_d),
                        number_of_records: this.getConfigurationValue(ConfigurationCodesClassifier.LIMIT_NUMBER_OF_RECORDS),
                        id_row: this._lastIdRow,
                    },
            });
        
        let response;
        
        try
        {
            response = (await httpRequest.execute()).data;
        }
        catch (exception)
        {
            response = httpRequest;
            
            if (!httpRequest.isCancel)
            {
                app.notifications.error(exception.statusText, [ httpRequest.url.toString() ]);
            }
        }
        
        return response;
    }
    
    /**
     * @public
     *
     * @description Filters records from the specified records by the specified action id.
     *
     * @param { Array<Object> } records
     *
     * @param { DetectedRfidTagsIdActionsClassifier } classifier
     *
     * @return { Array<Object> }
     **/
    getRecordsByActionId(records, classifier)
    {
        return records.filter(record => record.id_antenna_database_standard === classifier);
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
