import { Modal } from '../../Modal/Modal.js';
import { Table } from '../../Table/Table.js';
import { HttpRequestMethodsClassifier } from '../../../tea-modules/Classes/Requests/Standards/HttpRequestMethodsClassifier.js';
import { querySelector } from '../../../tea-modules/Functions/DOM/Queries/querySelector.js';
import { ModalStatesClassifier } from '../../Modal/Classifiers/ModalStatesClassifier.js';
import { ModalEventsClassifier } from '../../Modal/Classifiers/ModalEventsClassifier.js';
import { CustomEvents } from '../../../tea-modules/Classes/CustomEvents/CustomEvents.js';
import { TableEventTypesClassifier } from '../../Table/Standards/TableEventTypesClassifier.js';
import { ModalTableEventsClassifier } from './ModalTableEventsClassifier.js';


/**
 * @abstract
 *
 * @class
 *
 * @description Implements abstract logic for all modal tables.
 **/
export class ModalTable
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
     * @type { Modal }
     **/
    modal;
    
    /**
     * @abstract
     *
     * @public
     *
     * @type { string }
     **/
    modalId;
    
    /**
     * @abstract
     *
     * @public
     *
     * @type { string }
     **/
    modalHeading;
    
    /**
     * @public
     *
     * @type { Table }
     **/
    table;
    
    /**
     * @abstract
     *
     * @public
     *
     * @type { string }
     **/
    tableSelectors;
    
    /**
     * @abstract
     *
     * @public
     *
     * @type { string }
     **/
    tableUrl;
    
    /**
     * @public
     *
     * @type { boolean }
     **/
    tableWithTopLine = false;
    
    /**
     * @public
     *
     * @type { boolean }
     **/
    tableWithInputSearch = false;
    
    /**
     * @public
     *
     * @type { boolean }
     **/
    tableIsServerSide = true;
    
    /**
     * @public
     *
     * @type { boolean }
     **/
    tableWithPagination = true;
    
    /**
     * @constructor
     *
     * @return { ModalTable }
     **/
    constructor()
    {
    
    }
    
    /**
     * @abstract
     *
     * @public
     *
     * @description Implements initialize base logic.
     *
     * @return { void }
     **/
    async initialization() {};
    
    /**
     * @public
     *
     * @description Implements process of create modal component.
     *
     * @return { void }
     **/
    modalCreateProcessing()
    {
        this.customEvents = new CustomEvents();
        
        this.modal = this._createModal();
        
        this.modal.customEvents.subscribe(ModalEventsClassifier.CLOSE, this._modalCloseHandler.bind(this));
        
        this.modal.initialization();
    }
    
    /**
     * @public
     *
     * @description Implements process of create table component.
     *
     * @return { void }
     **/
    async tableCreateProcessing()
    {
        this.table = this._createTable();
        
        this.table.customEvents.subscribe(TableEventTypesClassifier.REQUEST_PROCESSING, this._tableRequestProcessingHandler.bind(this));
    }
    
    /**
     * @public
     *
     * @description Implements logic of activate components.
     *
     * @return { void }
     **/
    async activate()
    {
        this.modal.open();
        
        this.modal.setState(ModalStatesClassifier.FREEZY, true);
        
        if (!this.table.isInit())
        {
            await this.table.initialization();
        }
        else
        {
            await this.table.update();
        }
        
        this.modal.setState(ModalStatesClassifier.FREEZY, false);
    }
    
    /**
     * @protected
     *
     * @description Implements handler for close event of the modal component.
     *
     * @return { void }
     **/
    _modalCloseHandler()
    {
        this.modal.setState(ModalStatesClassifier.FREEZY, false);
        
        this.table.resetPagination();
    }
    
    /**
     * @protected
     *
     * @description Implements handler for request processing event of the table component.
     *
     * @param { HttpRequestSettingProperties } httpRequestSettings
     *
     * @param { Table } instance
     *
     * @return { void }
     **/
    _tableRequestProcessingHandler(httpRequestSettings, instance)
    {
        this.customEvents.execute(ModalTableEventsClassifier.TABLE_REQUEST_PROCESSING, httpRequestSettings, instance);
    }
    
    /**
     * @protected
     *
     * @description Implements create instance of the Modal class.
     *
     * @return { Modal }
     **/
    _createModal()
    {
        return new Modal(
            {
                id: this.modalId,
                elementClass: 'modal modal--theme-mercury modal--size-full',
                cardSettings:
                    {
                        heading: this.modalHeading,
                        cancelButtonSettings: { text: 'Close', elementClass: [ 'button--size-middle', 'button--type-default', 'button--theme-white-azure-bittersweet', ] },
                        lowerSettings:
                            {
                                isSingle: true,
                            },
                    },
            });
    }
    
    /**
     * @protected
     *
     * @description Implements create instance of the Table class.
     *
     * @return { Table }
     **/
    _createTable()
    {
        return new Table(this._getTableElement(),
            {
                withTopLine: this.tableWithTopLine,
                withInputSearch: this.tableWithInputSearch,
                isServerSide: this.tableIsServerSide,
                withPagination: this.tableWithPagination,
                httpRequestSettings:
                    {
                        url: this.tableUrl,
                        method: HttpRequestMethodsClassifier.POST,
                    },
                tableElementSettings:
                    {
                        columns: this._getTableColumns(),
                    },
            });
    }
    
    /**
     * @protected
     *
     * @description Finds and returns html element for table component.
     *
     * @return { HTMLElement }
     **/
    _getTableElement()
    {
        return querySelector(this.tableSelectors, { root: this.modal.getElement() });
    }
    
    /**
     * @abstract
     *
     * @protected
     *
     * @description Returns columns of the table component.
     *
     * @return { TableElementColumn[] }
     **/
    _getTableColumns() {}
}
