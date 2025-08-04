import { BaseTable } from '../BaseTable.js';
import { TableCellTypesClassifier } from '../../components/Table/Standards/TableCellTypesClassifier.js';
import { querySelector } from '../../tea-modules/Functions/DOM/Queries/querySelector.js';
import { TablePositionsClassifier } from '../../components/Table/Standards/TablePositionsClassifier.js';
import { getAttribute } from '../../tea-modules/Functions/DOM/Attributes/getAttribute.js';
import { en } from '../../lib/air-datepicker/locale/en.js';

/**
 * @class
 *
 * @description Implements logic for the sca user attendance table.
 **/
export class ScaUserAttendanceByDayTable extends BaseTable
{
    /**
     * @inheritDoc
     **/
    selectors = '#sca-user-attendance-table';
    
    /**
     * @inheritDoc
     **/
    url = 'admin/sca-users/attendance-by-day-json';
    
    /**
     * @inheritDoc
     **/
    withPagination = false;
    
    /**
     * @inheritDoc
     **/
    withTotal = true;
    
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
                inputName: 'date',
                inputId: 'date-search',
                inputPlaceholder: 'Date',
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
        return { text: 'Count of entrances / exits by day', level: 3 };
    }
    
    getActions()
    {
        return [];
    }
    
    /**
     * @inheritDoc
     **/
    getColumns()
    {
        return [
            { name: 'hour', label: 'Hour', type: TableCellTypesClassifier.NUMBER, isSortable: false },
            { name: 'count_enter', label: 'Count enter', type: TableCellTypesClassifier.NUMBER, isSortable: false, isTotal: true },
            { name: 'count_exit', label: 'Count exit', type: TableCellTypesClassifier.NUMBER, isSortable: false, isTotal: true },
            { name: 'count_seconds', label: 'Time', type: TableCellTypesClassifier.SECONDS_TO_HOURS, isSortable: false, isTotal: true },
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
