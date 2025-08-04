import { BaseTable } from '../BaseTable.js';
import { TableCellTypesClassifier } from '../../components/Table/Standards/TableCellTypesClassifier.js';
import { querySelector } from '../../tea-modules/Functions/DOM/Queries/querySelector.js';
import { TablePositionsClassifier } from '../../components/Table/Standards/TablePositionsClassifier.js';
import { getAttribute } from '../../tea-modules/Functions/DOM/Attributes/getAttribute.js';
import { en } from '../../lib/air-datepicker/locale/en.js';

/**
 * @class
 *
 * @description Implements logic for the users arrivals and departures table.
 **/
export class UsersArrivalsDeparturesTable extends BaseTable
{
    /**
     * @inheritDoc
     **/
    selectors = '#users-arrivals-departures-table';
    
    /**
     * @inheritDoc
     **/
    url = 'admin/users/arrivals-departures';
    
    /**
     * @inheritDoc
     **/
    withPagination = true;
    
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
                inputId: 'users-arrivals-departures-date-start',
                inputPlaceholder: 'Date start',
                iconId: 'arrows-long-right',
                iconClassName: 'icon icon-size-12',
                isDatepicker: true,
                datepickerSettings:
                    {
                        locale: en,
                        selectedDates: [],
                        position: 'bottom center',
                        autoClose: true,
                        dateFormat: 'yyyy-MM-dd',
                        maxDate: new Date(),
                    },
            },
            {
                position: TablePositionsClassifier.TOP_RIGHT,
                inputName: 'date_end',
                inputId: 'users-arrivals-departures-date-end',
                inputPlaceholder: 'Date end',
                iconId: 'time-calendar-search',
                isDatepicker: true,
                datepickerSettings:
                    {
                        locale: en,
                        selectedDates: [ new Date() ],
                        position: 'bottom center',
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
    getTableHeadingSettings()
    {
        return { text: 'Logging of entries and exits', level: 4 };
    }
    
    getActions()
    {
        return [];
    }
    
    /**
     * @return { TableExportManagerSetting }
     **/
    getTableExportSettings()
    {
        return {
            tableExportExcelSettings:
                {
                    isAdvanced: true,
                    contentId: 'users-arrivals-departures-table-export',
                    buttonAttributes:
                        {
                            'data-content-id': 'users-arrivals-departures-table-export',
                        },
                    url: 'admin/users/export/arrivals-departures-excel',
                },
            dataVariables: [ 'date_start', 'date_end', 'id_user' ],
        };
    }
    
    /**
     * @inheritDoc
     **/
    getColumns()
    {
        return [
            { name: 'id_row', label: 'Id', type: TableCellTypesClassifier.NUMBER, isSortable: false },
            { name: 'date_event', label: 'Date', type: TableCellTypesClassifier.STRING, isSortable: false },
            { name: 'time_event_as_text', label: 'Time', type: TableCellTypesClassifier.STRING, isSortable: false, isTotal: true },
            { name: 'name_action', label: 'Name action', type: TableCellTypesClassifier.STRING, isSortable: false },
            { name: 'time_at_work_as_text', label: 'Time at work', type: TableCellTypesClassifier.STRING, isSortable: false, isTotal: true },
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
