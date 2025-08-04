import { ListDetail }                from '../../components/ListDetail/ListDetail.js';
import { ListDetailSettings }        from '../../components/ListDetail/ListDetailSettings.js';
import { ListDetailTypesClassifier } from '../../components/ListDetail/ListDetailTypesClassifier.js';


/**
 * Implements list detail logic for the sca users report attendance.
 **/
export class ReportAttendanceListDetail
{
    /**
     * @public
     *
     * @type { string }
     **/
    selector = '.report-attendance-list-detail';
    
    /**
     * @public
     *
     * @type { ListDetail }
     **/
    listDetail;
    
    /**
     * @public
     *
     * @description Implements base logic.
     **/
    initialization()
    {
        this.listDetail = new ListDetail(new ListDetailSettings(this.getSettings()));
        
        this.listDetail.initialization();
    }
    
    /**
     * @public
     *
     * @description Returns settings for the ListDetail component.
     *
     * @return { Object }
     **/
    getSettings()
    {
        return {
            selector: this.selector,
            columns: this.getColumns(),
        };
    }
    
    /**
     * @public
     *
     * @description Returns columns of the settings.
     *
     * @return { Array<Object> }
     **/
    getColumns()
    {
        return [
            { name: 'first_enter', 'title': 'First enter', type: ListDetailTypesClassifier.DATETIME },
            { name: 'last_enter', 'title': 'Last enter', type: ListDetailTypesClassifier.DATETIME },
            { name: 'last_exit', 'title': 'Last exit', type: ListDetailTypesClassifier.DATETIME },
            { name: 'time_at_work', 'title': 'Time spent at work', type: ListDetailTypesClassifier.TIME },
            { name: 'count_enter', 'title': 'Number of arrivals', type: ListDetailTypesClassifier.NUMBER },
            { name: 'count_exit', 'title': 'Number of departures', type: ListDetailTypesClassifier.NUMBER },
            { name: 'is_on_time', 'title': 'On time', type: ListDetailTypesClassifier.BOOLEAN },
            { name: 'is_late', 'title': 'Is the person a latecomer', type: ListDetailTypesClassifier.BOOLEAN, iconCheckId: 'essential-circle', iconCloseId: 'essential-circle' },
            { name: 'is_at_work', 'title': 'Is at work', type: ListDetailTypesClassifier.BOOLEAN },
            { name: 'is_permitted_absent', 'title': 'Permitted absent', type: ListDetailTypesClassifier.BOOLEAN, displayByColumn: 'count_enter' },
        ];
    }
}
