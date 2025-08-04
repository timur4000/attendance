import { BaseTable }                    from '../BaseTable.js';
import { TableCellTypesClassifier }     from '../../components/Table/Standards/TableCellTypesClassifier.js';
import { querySelector }                from '../../tea-modules/Functions/DOM/Queries/querySelector.js';
import { TableActionTypesClassifier }   from '../../components/Table/Standards/TableActionTypesClassifier.js';
import { DateFormatsClassifier }        from '../../tea-modules/Classes/Standards/Date/DateFormatsClassifier.js';
import { HttpRequest }                  from '../../tea-modules/Classes/Requests/HttpRequest.js';
import { HttpRequestMethodsClassifier } from '../../tea-modules/Classes/Requests/Standards/HttpRequestMethodsClassifier.js';
import { TableStateTypesClassifier }    from '../../components/Table/Standards/TableStateTypesClassifier.js';
import { TablePositionsClassifier }     from '../../components/Table/Standards/TablePositionsClassifier.js';
import { en }                           from '../../lib/air-datepicker/locale/en.js';
import { DateManager }                  from '../../tea-modules/Classes/Dates/DateManager.js';
import { OrdersListDetailModalForm }    from '../../modal-forms/Food/Orders/OrdersListDetailModalForm.js';

/**
 * @class
 *
 * @description Implements logic for the orders list table.
 **/
export class OrdersListTable extends BaseTable
{
    /**
     * @inheritDoc
     **/
    selectors = '#orders-list-table';
    
    /**
     * @inheritDoc
     **/
    url = 'admin/orders-list/records-json';
    
    /**
     * @inheritDoc
     **/
    rowIdentifierColumnName = 'id_order';
    
    /**
     * @inheritDoc
     **/
    withPagination = false;
    
    /**
     * @inheritDoc
     **/
    withPostLoading = true;
    
    /**
     * @inheritDoc
     **/
    postLoadingIdentifier = 'id_order';
    
    /**
     * @inheritDoc
     **/
    postLoadingServerKey = 'last_id_order';
    
    /**
     * @public
     *
     * @type { OrdersListDetailModalForm }
     **/
    detailModalForm;
    
    /**
     * @inheritDoc
     **/
    constructor()
    {
        super();
        
        this.element = querySelector(this.selectors);
    }
    
    /**
     * @inheritDoc
     **/
    getSelects()
    {
        return [
            {
                options:
                    [
                        { value: '0', text: 'Unpaid', isSelected: true },
                        { value: '1', text: 'Paid', isSelected: false },
                        { value: '2', text: 'All', isSelected: false },
                    ],
                position: TablePositionsClassifier.TOP_LEFT,
                elementName: 'payment_completed',
                withLabel: 1,
                placeholder: 'State',
                withSearch: 0,
            },
        ];
    }
    
    /**
     * @inheritDoc
     **/
    getActions()
    {
        return [
            {
                type: TableActionTypesClassifier.DEFAULT,
                buttonSettings:
                    {
                        elementName: 'detail',
                        iconId: 'delivery-box-search',
                        iconClass: 'icon icon-size-16',
                        clueSettings: { text: 'Detail', },
                        attributes: { 'data-id-order': '{id_order}' },
                    },
            },
            {
                type: TableActionTypesClassifier.SUCCESS,
                buttonSettings:
                    {
                        elementName: 'payment',
                        iconId: 'money-wallet-minus',
                        iconClass: 'icon icon-size-16',
                        clueSettings: { text: 'Payment', },
                        attributes: { 'data-id-order': '{id_order}' },
                    },
            },
            {
                type: TableActionTypesClassifier.ALERT,
                buttonSettings:
                    {
                        elementName: 'cancel',
                        iconId: 'money-card-receive',
                        iconClass: 'icon icon-size-16',
                        clueSettings: { text: 'Cancel payment', },
                        attributes: { 'data-id-order': '{id_order}' },
                    },
            },
            {
                type: TableActionTypesClassifier.ALERT,
                buttonSettings:
                    {
                        elementName: 'delete',
                        iconId: 'essential-trash',
                        iconClass: 'icon icon-size-14',
                        clueSettings: { text: 'Delete', },
                        isConfirm: true,
                        attributes: { 'data-id-order': '{id_order}' },
                    },
            },
        ];
    }
    
    getInputs()
    {
        return [
            {
                position: TablePositionsClassifier.TOP_RIGHT,
                inputName: 'date_start',
                inputId: 'date-start',
                inputPlaceholder: 'Date start',
                iconId: 'arrows-long-right',
                iconClassName: 'icon icon-size-12',
                isDatepicker: true,
                datepickerSettings:
                    {
                        locale: en,
                        selectedDates: [],
                        autoClose: true,
                        dateFormat: 'yyyy-MM-dd',
                        maxDate: new Date(),
                    },
            },
            {
                position: TablePositionsClassifier.TOP_RIGHT,
                inputName: 'date_end',
                inputId: 'date-end',
                inputPlaceholder: 'Date end',
                iconId: 'time-calendar-search',
                isDatepicker: true,
                datepickerSettings:
                    {
                        locale: en,
                        selectedDates: [ new Date() ],
                        autoClose: true,
                        dateFormat: 'yyyy-MM-dd',
                        maxDate: new Date(),
                    },
            },
        ];
    }
    
    /**
     * @inheritDoc
     **/
    getColumns()
    {
        return [
            { name: 'id_order', label: 'Id', type: TableCellTypesClassifier.NUMBER, isSortable: false, isIdentifier: true, isFilter: true },
            { name: 'sur_name', label: 'Surname', type: TableCellTypesClassifier.STRING, isSortable: false, isFilter: true },
            { name: 'first_name', label: 'First name', type: TableCellTypesClassifier.STRING, isSortable: false, isFilter: true },
            { name: 'patronymic', label: 'Patronymic', type: TableCellTypesClassifier.STRING, isSortable: false },
            { name: 'money_to_pay', label: 'Paycheck', type: TableCellTypesClassifier.COINS, isSortable: false },
            // { name: 'money_paid', label: 'Money paid', type: TableCellTypesClassifier.COINS, isSortable: false },
            { name: 'is_paid', label: 'Payment status', type: TableCellTypesClassifier.BOOLEAN, isSortable: false },
            { name: 'date_event', label: 'Date', type: TableCellTypesClassifier.DATETIME, isSortable: false, dateFormat: DateFormatsClassifier.Y_m_d_H_i_s, },
            { name: 'note_object', label: 'Notes', type: TableCellTypesClassifier.STRING, isSortable: false },
            { name: 'user_barcode', label: 'User barcode', type: TableCellTypesClassifier.STRING, isSortable: false, isFilter: true },
        ];
    }
    
    /**
     * @inheritDoc
     **/
    initialization()
    {
        this.tableInitializeProcessing();
    }
    
    /**
     * @private
     *
     * @description Implements process of the detailing.
     *
     * @param { Button } button
     *
     * @param { number } identifier
     *
     * @param { TableRow } tableRow
     *
     * @return { void }
     **/
    async _detailProcessing(button, identifier, tableRow)
    {
        this.detailModalForm.tableRow = tableRow;
        
        this.detailModalForm.modal.open();
    }
    
    /**
     * @private
     *
     * @description Implements process of the deleting.
     *
     * @param { Button } button
     *
     * @param { number } identifier
     *
     * @param { TableRow } tableRow
     *
     * @return { void }
     **/
    async _deleteProcessing(button, identifier, tableRow)
    {
        const request = new HttpRequest({ url: 'admin/orders-list/delete', method: HttpRequestMethodsClassifier.DELETE, data: { id_order: identifier } });
        
        const response = await request.execute();
        
        if (response.data.number !== 0)
        {
            app.notifications.error('Error', [ response.data.message ]);
        }
        else
        {
            app.notifications.success('Success', [ response.data.message ]);
            
            this.table.tableElement.removeTableRowByIdentifier(identifier);
            
            this.table.removeRecordByIdentifier(identifier);
            
            this.table.updateTools();
        }
    }
    
    /**
     * @private
     *
     * @description Implements process of the payment.
     *
     * @param { Button } button
     *
     * @param { number } identifier
     *
     * @param { TableRow } tableRow
     *
     * @return { void }
     **/
    async _paymentProcessing(button, identifier, tableRow)
    {
        const request = new HttpRequest({ url: 'admin/orders-list/payment', method: HttpRequestMethodsClassifier.PUT, data: { id_order: identifier } });
        
        const response = await request.execute();
        
        if (response.data.number !== 0)
        {
            app.notifications.error('Error', [ response.data.message ]);
        }
        else
        {
            app.notifications.success('Success', [ response.data.message ]);
            
            const paymentCompleted = parseInt(this.table.getSelect('payment_completed').customSelect.getSelected().value);
            
            switch (paymentCompleted)
            {
                case 0:
                {
                    this.table.tableElement.removeTableRowByIdentifier(identifier);
                    
                    this.table.removeRecordByIdentifier(identifier);
                    
                    break ;
                }
                case 1:
                {
                    
                    break ;
                }
                case 2:
                {
                    this.table.updateRecordByIdentifier(identifier, response.record);
                    
                    break ;
                }
            }
        }
    }
    
    /**
     * @private
     *
     * @description Implements process of the payment cancel.
     *
     * @param { Button } button
     *
     * @param { number } identifier
     *
     * @param { TableRow } tableRow
     *
     * @return { void }
     **/
    async _paymentCancelProcessing(button, identifier, tableRow)
    {
        const request = new HttpRequest({ url: 'admin/orders-list/cancel', method: HttpRequestMethodsClassifier.PUT, data: { id_order: identifier } });
        
        const response = await request.execute();
        
        if (response.data.number !== 0)
        {
            app.notifications.error('Error', [ response.data.message ]);
        }
        else
        {
            app.notifications.success('Success', [ response.data.message ]);
            
            const paymentCompleted = parseInt(this.table.getSelect('payment_completed').customSelect.getSelected().value);
            
            switch (paymentCompleted)
            {
                case 0:
                {
                    
                    break ;
                }
                case 1:
                {
                    this.table.tableElement.removeTableRowByIdentifier(identifier);
                    
                    this.table.removeRecordByIdentifier(identifier);
                    
                    break ;
                }
                case 2:
                {
                    this.table.updateRecordByIdentifier(identifier, response.record);
                    
                    break ;
                }
            }
        }
    }
    
    /**
     * @inheritDoc
     **/
    async actionButtonClickHandler(event, button, tableCell, tableElement, instance)
    {
        const identifier = parseInt(button.getAttribute('data-id-order'));
        
        if (!identifier)
        {
            return ;
        }
        
        const tableRow = this.table.tableElement.getTableRowByIdentifier(identifier);
        
        tableRow.setState(TableStateTypesClassifier.LOADING, true);
        
        button.loading(true);
        
        switch (button.getName())
        {
            case 'detail':
            {
                await this._detailProcessing(button, identifier, tableRow);
                
                break ;
            }
            case 'delete':
            {
                await this._deleteProcessing(button, identifier, tableRow);
                
                break ;
            }
            case 'payment':
            {
                await this._paymentProcessing(button, identifier, tableRow);
                
                break ;
            }
            case 'cancel':
            {
                await this._paymentCancelProcessing(button, identifier, tableRow);
                
                break ;
            }
        }
        
        this.table.updateTools();
        
        button.loading(false);
        
        tableRow.setState(TableStateTypesClassifier.LOADING, false);
    }
    
    async tableInitialHandler(instance)
    {
        this.detailModalForm = new OrdersListDetailModalForm(this);
        
        this.detailModalForm.initialization();
    }
}
