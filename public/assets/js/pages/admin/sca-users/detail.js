import { App }                from '../../../app.js';
import { ScaUserFoodCardHistoryTable } from '../../../tables/ScaUsers/Canteen/ScaUserFoodCardHistoryTable.js';
import { FoodCardAddModalForm } from '../../../modal-forms/FoodCardAddModalForm.js';
import { ScaUsersAbsencesTable } from '../../../tables/ScaUsers/Absences/ScaUsersAbsencesTable.js';
import { AbsencesCreateModalForm } from '../../../modal-forms/Absences/AbsencesCreateModalForm.js';
import { ScaUserOrdersHistoryTable } from '../../../tables/ScaUsers/Canteen/ScaUserOrdersHistoryTable.js';
import { ReportAttendanceListDetail } from '../../../list-details/ScaUsers/ReportAttendanceListDetail.js';
import { UsersArrivalsDeparturesTable } from '../../../tables/Users/UsersArrivalsDeparturesTable.js';
import { IconInfo } from '../../../components/IconInfo/IconInfo.js';
import { IconInfoSettings } from '../../../components/IconInfo/IconInfoSettings.js';
import { HttpRequestMethodsClassifier } from '../../../tea-modules/Classes/Requests/Standards/HttpRequestMethodsClassifier.js';
import { TableEventTypesClassifier } from '../../../components/Table/Standards/TableEventTypesClassifier.js';
import { ReportFoodCardInformation } from '../../../Informations/IconInfoInformation/ReportFoodCard/ReportFoodCardIconInfoInformation.js';
import { Tabs } from '../../../components/Tabs/Tabs.js';
import { querySelector } from '../../../tea-modules/Functions/DOM/Queries/querySelector.js';


const app = new App();

const tabs = new Tabs(
    {
        id: 'user-detail-tabs',
        tabsButtonSettings:
            [
                { tabIdentifierValue: 'information', iconId: 'essential-circle-info', text: 'Information' },
                { tabIdentifierValue: 'canteen', iconId: 'essential-reserve', text: 'Canteen' },
                { tabIdentifierValue: 'absences', iconId: 'user-profile-delete', text: 'Absences' },
                { tabIdentifierValue: 'statistics', iconId: 'business-chart', text: 'Statistics' },
                { tabIdentifierValue: 'tuition', iconId: 'money-card', text: 'Tuition' },
            ],
    }
);

tabs.addViewFromNode(querySelector('[data-id="information"]'));

tabs.addViewFromNode(querySelector('[data-id="canteen"]'));

tabs.addViewFromNode(querySelector('[data-id="absences"]'));

tabs.initialization();

querySelector('.view__inner').append(tabs.getDomElement());

const usersArrivalsDeparturesTable = new UsersArrivalsDeparturesTable();

usersArrivalsDeparturesTable.initialization();

if (tabs.hasView('canteen'))
{
    const foodCardHistoryTable = new ScaUserFoodCardHistoryTable();

    foodCardHistoryTable.initialization();
    
    const foodCardAddModalForm = new FoodCardAddModalForm(foodCardHistoryTable);
    
    foodCardAddModalForm.initialization();
    
    const ordersHistoryTable = new ScaUserOrdersHistoryTable();
    
    ordersHistoryTable.initialization();
    
    const reportFoodCardInformation = new ReportFoodCardInformation();
    
    reportFoodCardInformation.idUser = ordersHistoryTable.idUser;
    
    reportFoodCardInformation.baseInitialization();
    
    await reportFoodCardInformation.initialization();
    
    ordersHistoryTable.table.element.parentElement.parentElement.before(reportFoodCardInformation.information.getElement());
    
    const settings = new IconInfoSettings(
        {
            label: 'Balance',
            property: 'money_amount',
            iconSvgId: 'money-card',
            defaultValue: '0',
            isCurrency: true,
            requestDataVariable: 'record',
            httpRequestSettings:
                {
                    url: 'admin/sca-users/food-card-balance',
                    method: HttpRequestMethodsClassifier.POST,
                    data: { id_user: foodCardHistoryTable.idUser },
                }
        });
    
    const iconInfo = new IconInfo(settings);
    
    foodCardHistoryTable.table.element.before(iconInfo.domElement);
    
    iconInfo.initialization();
    
    iconInfo.update();
    
    foodCardHistoryTable.table.customEvents.subscribe(TableEventTypesClassifier.BEFORE_UPDATE, () =>
    {
        iconInfo.update();
        
        reportFoodCardInformation.iconInfoManager && reportFoodCardInformation.iconInfoManager.update();
    });
}

if (tabs.hasView('absences'))
{
    const absencesTable = new ScaUsersAbsencesTable();
    
    absencesTable.initialization();
    
    const absenceCreateModalForm = new AbsencesCreateModalForm(absencesTable);
    
    absenceCreateModalForm.initialization();
}

if (tabs.hasView('statistics'))
{
    const reportAttendanceListDetail = new ReportAttendanceListDetail();

    reportAttendanceListDetail.initialization();
    
    const usersArrivalsDeparturesTable = new UsersArrivalsDeparturesTable();
    
    usersArrivalsDeparturesTable.initialization();
}
