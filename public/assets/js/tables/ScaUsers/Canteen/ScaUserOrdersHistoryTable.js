import { BaseTable } from '../../BaseTable.js';
import { TableCellTypesClassifier } from '../../../components/Table/Standards/TableCellTypesClassifier.js';
import { querySelector } from '../../../tea-modules/Functions/DOM/Queries/querySelector.js';
import { getAttribute } from '../../../tea-modules/Functions/DOM/Attributes/getAttribute.js';
import { DateFormatsClassifier } from '../../../tea-modules/Classes/Standards/Date/DateFormatsClassifier.js';
import { TablePositionsClassifier } from '../../../components/Table/Standards/TablePositionsClassifier.js';
import { en } from '../../../lib/air-datepicker/locale/en.js';
import { DateManager } from '../../../tea-modules/Classes/Dates/DateManager.js';
/**
 * @class
 *
 * @description Implements logic for the sca user orders history table.
 **/
export class ScaUserOrdersHistoryTable extends BaseTable
{
    /**
     * @inheritDoc
     **/
    selectors = '#sca-user-orders-history-table';
    
    /**
     * @inheritDoc
     **/
    url = 'admin/sca-users/orders-history';
    
    /**
     * @inheritDoc
     **/
    withTableExport = true;
    
    /**
     * @public
     *
     * @type { number }
     **/
    idUser;
    
    /**
     * @inheritDoc
     **/
    constructor()
    {
        super();
        
        this.element = querySelector(this.selectors);
        
        this.idUser = parseInt(getAttribute(this.element, 'id-user', { isDataAttribute: true, isAfterRemove: true }));
        
        this.data = { 'id_user': this.idUser };
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
                        selectedDates: [ DateManager.tomorrow(new Date()) ],
                        autoClose: true,
                        dateFormat: 'yyyy-MM-dd',
                        maxDate: DateManager.tomorrow(new Date()),
                    },
            }
        ];
    }
    
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
    getTableExportSettings()
    {
        return {
            tableExportExcelSettings:
                {
                    url: 'admin/orders/export/excel',
                    isAdvanced: true,
                    dataVariables: [ 'date_start', 'date_end', 'id_user' ],
                },
        };
    };
    
    /**
     * @inheritDoc
     **/
    getTableHeadingSettings()
    {
        return {
            position: TablePositionsClassifier.TOP_LEFT,
            text: 'Orders history',
            level: 4,
        };
    }
    
    /**
     * @inheritDoc
     **/
    getColumns()
    {
        return [
            { name: 'id_order', label: 'Id', type: TableCellTypesClassifier.NUMBER, isSortable: false },
            { name: 'name_item', label: 'Name', type: TableCellTypesClassifier.STRING, isSortable: false },
            { name: 'is_paid', label: 'Payment status', type: TableCellTypesClassifier.BOOLEAN, isSortable: false },
            { name: 'money_invoice', label: 'Invoice', type: TableCellTypesClassifier.COINS, isSortable: false },
            { name: 'money_paid', label: 'Paid', type: TableCellTypesClassifier.COINS, isSortable: false },
            { name: 'must_pay', label: 'Must pay', type: TableCellTypesClassifier.COINS, isSortable: false },
            { name: 'quantity', label: 'Quantity', type: TableCellTypesClassifier.NUMBER, isSortable: false },
            { name: 'date_order', label: 'Date', type: TableCellTypesClassifier.DATETIME, isSortable: false, dateFormat: DateFormatsClassifier.Y_m_d_H_i_s },
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
