import { BaseTable } from '../../BaseTable.js';
import { TableCellTypesClassifier } from '../../../components/Table/Standards/TableCellTypesClassifier.js';
import { querySelector } from '../../../tea-modules/Functions/DOM/Queries/querySelector.js';
import { getAttribute } from '../../../tea-modules/Functions/DOM/Attributes/getAttribute.js';
import { TableActionTypesClassifier } from '../../../components/Table/Standards/TableActionTypesClassifier.js';
import { TablePositionsClassifier } from '../../../components/Table/Standards/TablePositionsClassifier.js';
import { HttpRequest } from '../../../tea-modules/Classes/Requests/HttpRequest.js';
import { HttpRequestMethodsClassifier } from '../../../tea-modules/Classes/Requests/Standards/HttpRequestMethodsClassifier.js';
import { NotificationItemTypesClassifier } from '../../../components/Notifications/Classifiers/NotificationItemTypesClassifier.js';
import { NotificationItemThemesClassifier } from '../../../components/Notifications/Classifiers/NotificationItemThemesClassifier.js';
import { ButtonModifiersClassifier } from '../../../components/Button/ButtonModifiersClassifier.js';
import { TableStateTypesClassifier } from '../../../components/Table/Standards/TableStateTypesClassifier.js';
import { HttpStatusesClassifier } from '../../../tea-modules/Classes/Requests/Standards/HttpStatusesClassifier.js';


/**
 * @class
 *
 * @description Implements logic for the sca user food card history table.
 **/
export class ScaUserFoodCardHistoryTable extends BaseTable
{
    /**
     * @inheritDoc
     **/
    selectors = '#sca-user-food-card-history-table';
    
    /**
     * @inheritDoc
     **/
    url = 'admin/sca-users/food-card-history-json';
    
    /**
     * @public
     *
     * @type { number }
     **/
    idUser;
    
    /**
     * @inheritDoc
     **/
    withTableExport = true;
    
    /**
     * @public
     *
     * @type { string }
     **/
    deleteAction;
    
    /**
     * @public
     *
     * @type { string }
     **/
    withdrawAction;
    
    /**
     * @public
     *
     * @type { string }
     **/
    cancelWithdrawAction;
    
    /**
     * @public
     *
     * @type { string }
     **/
    historyExcelAction;
    
    /**
     * @inheritDoc
     **/
    constructor()
    {
        super();
        
        this.element = querySelector(this.selectors);
        
        this.idUser = parseInt(getAttribute(this.element, 'id-user', { isDataAttribute: true, isAfterRemove: true }));
        
        this.deleteAction = getAttribute(this.element, 'delete-action', { isDataAttribute: true, isAfterRemove: true });
        
        this.historyExcelAction = getAttribute(this.element, 'history-excel-action', { isDataAttribute: true, isAfterRemove: true });
        
        this.withdrawAction = getAttribute(this.element, 'withdraw-action', { isDataAttribute: true, isAfterRemove: true });
        
        this.cancelWithdrawAction = getAttribute(this.element, 'cancel-withdraw-action', { isDataAttribute: true, isAfterRemove: true });
        
        this.data = { 'id_user': this.idUser };
    }
    
    /**
     * @inheritDoc
     **/
    getTableExportSettings()
    {
        return {
            tableExportExcelSettings:
                {
                    url: this.historyExcelAction,
                    isAdvanced: true,
                    dataVariables: [ 'id_user' ],
                },
        };
    };
    
    /**
     * @inheritDoc
     **/
    getActions()
    {
        return [];
    }
    
    /**
     * @inheritDoc
     **/
    getButtons()
    {
        return [
            {
                position: TablePositionsClassifier.TOP_RIGHT,
                type: TableActionTypesClassifier.ALERT,
                buttonSettings:
                    {
                        elementName: 'table-record-withdraw-money',
                        iconId: 'money-send',
                        type: TableActionTypesClassifier.DEFAULT,
                        iconClass: 'icon icon-size-20',
                        clueSettings: { text: 'Refund', },
                    },
            },
            {
                position: TablePositionsClassifier.TOP_RIGHT,
                type: TableActionTypesClassifier.DEFAULT,
                buttonSettings:
                    {
                        elementClass: [ 'margin-right-30' ],
                        elementName: 'table-record-cancel-withdraw-money',
                        iconId: 'money-receive',
                        type: TableActionTypesClassifier.DEFAULT,
                        iconClass: 'icon icon-size-20',
                        clueSettings: { text: 'Cancel Refund', },
                    },
            },
            {
                position: TablePositionsClassifier.TOP_RIGHT,
                type: TableActionTypesClassifier.ALERT,
                buttonSettings:
                    {
                        elementName: 'table-record-remove',
                        iconId: 'money-wallet-minus',
                        type: TableActionTypesClassifier.DEFAULT,
                        iconClass: 'icon icon-size-20',
                        isConfirm: true,
                        clueSettings: { text: 'Last replenishment cancel', },
                        attributes: { 'data-modal-id': 'food-card-remove-modal' },
                    },
            },
            {
                position: TablePositionsClassifier.TOP_RIGHT,
                type: TableActionTypesClassifier.DEFAULT,
                buttonSettings:
                    {
                        elementName: 'table-record-add',
                        iconId: 'money-wallet-add',
                        type: TableActionTypesClassifier.DEFAULT,
                        iconClass: 'icon icon-size-20',
                        clueSettings: { text: 'Money replenishment', },
                        attributes: { 'data-modal-id': 'food-card-add-modal' },
                    },
            },
        ];
    }
    
    /**
     * @inheritDoc
     **/
    async buttonClickHandler(instance, event, table)
    {
        instance.loading(true);
        
        switch (instance.getName())
        {
            case 'table-record-remove':
            {
                await this._removeProcessing(instance, event, table);

                break ;
            }
            case 'table-record-add':
            {
                break ;
            }
            case 'table-record-withdraw-money':
            {
                await this._withdrawProcessing(instance, event, table);
                
                break ;
            }
            case 'table-record-cancel-withdraw-money':
            {
                await this._cancelWithdrawProcessing(instance, event, table);
                
                break ;
            }
        }
        
        instance.loading(false);
    }
    
    /**
     * @private
     *
     * @description Implements process of remove action.
     *
     * @param { Button } instance
     *
     * @param { MouseEvent } event
     *
     * @param { Object<Table> } table
     *
     * @return { void }
     **/
    async _removeProcessing(instance, event, table)
    {
        const record = this.table.getFirstRecord();
        
        const request = new HttpRequest(
            {
                url: this.deleteAction,
                method: HttpRequestMethodsClassifier.DELETE,
                data:
                    {
                        'id_user': this.idUser,
                        'money_added': record.money_added,
                    }
            });
        
        const response = await request.execute();
        
        if (response.data.number !== 0)
        {
            app.notifications.create(
                {
                    heading: 'Error',
                    type: NotificationItemTypesClassifier.DEFAULT,
                    theme: NotificationItemThemesClassifier.ERROR,
                    withClose: true,
                    svgId: 'essential-notification',
                    paragraphs: [ response.data.message ],
                });
        }
        else
        {
            app.notifications.create(
                {
                    heading: 'Success',
                    type: NotificationItemTypesClassifier.DEFAULT,
                    theme: NotificationItemThemesClassifier.SUCCESS,
                    withClose: true,
                    svgId: 'essential-verify',
                    paragraphs: [ response.data.message ],
                });
        }
        
        table.update();
    }
    
    /**
     * @private
     *
     * @description Implements process of withdraw action.
     *
     * @param { Button } instance
     *
     * @param { MouseEvent } event
     *
     * @param { Object<Table> } table
     *
     * @return { void }
     **/
    async _withdrawProcessing(instance, event, table)
    {
        const request = new HttpRequest(
            {
                url: this.withdrawAction,
                method: HttpRequestMethodsClassifier.POST,
                data: { 'id_user': this.idUser, },
            });
        
        const response = await request.execute();
        
        if (response.status !== HttpStatusesClassifier.SUCCESS)
        {
            app.notifications.error('Error', [ response.message ]);
        }
        else
        {
            app.notifications.success('Success', [ response.message ]);
        }
        
        table.update();
    }
    
    /**
     * @private
     *
     * @description Implements process of cancel withdraw action.
     *
     * @param { Button } instance
     *
     * @param { MouseEvent } event
     *
     * @param { Object<Table> } table
     *
     * @return { void }
     **/
    async _cancelWithdrawProcessing(instance, event, table)
    {
        const request = new HttpRequest(
            {
                url: this.cancelWithdrawAction,
                method: HttpRequestMethodsClassifier.POST,
                data: { 'id_user': this.idUser, },
            });
        
        const response = await request.execute();
        
        if (response.status !== HttpStatusesClassifier.SUCCESS)
        {
            app.notifications.error('Error', [ response.message ]);
        }
        else
        {
            app.notifications.success('Success', [ response.message ]);
        }
        
        table.update();
    }
    
    /**
     * @inheritDoc
     **/
    paginationItemClickHandler(item, page, event, instance)
    {
        this.table.setState(TableStateTypesClassifier.BUTTONS_DISABLED, page !== 1);
    }
    
    /**
     * @inheritDoc
     **/
    async tableUpdateHandler(instance)
    {
        const button = instance.getButton('table-record-remove');
        
        const record = instance.getFirstRecord();
        
        button.button.disable(!record);
        
        if (button.button.hasModifier(ButtonModifiersClassifier.LOADING))
        {
            button.button.loading(false);
        }
    }
    
    /**
     * @inheritDoc
     **/
    getColumns()
    {
        return [
            { name: 'date_event_as_text', label: 'Date', type: TableCellTypesClassifier.STRING, isSortable: false },
            { name: 'money_before', label: 'Before', type: TableCellTypesClassifier.COINS, isSortable: false },
            { name: 'money_added', label: 'Added', type: TableCellTypesClassifier.COINS, isSortable: false },
            { name: 'money_after', label: 'After', type: TableCellTypesClassifier.COINS, isSortable: false },
        ];
    }
    
    /**
     * @inheritDoc
     **/
    initialization()
    {
        this.tableInitializeProcessing();
    }
}
