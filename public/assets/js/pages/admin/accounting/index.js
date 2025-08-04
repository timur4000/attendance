import { App }                from '../../../app.js';
import { AccountingTable }    from '../../../tables/Accounting/AccountingTable.js';
import { IconInfoManager }    from '../../../components/IconInfo/IconInfoManager/IconInfoManager.js';
import { IconInfoManagerSettings } from '../../../components/IconInfo/IconInfoManager/IconInfoManagerSettings.js';
import { IconInfoThemesClassifier } from '../../../components/IconInfo/Standards/IconInfoThemesClassifier.js';
import { TableEventTypesClassifier } from '../../../components/Table/Standards/TableEventTypesClassifier.js';
import { HttpRequestMethodsClassifier } from '../../../tea-modules/Classes/Requests/Standards/HttpRequestMethodsClassifier.js';


const app = new App();

const table = new AccountingTable();

table.initialization();

const iconInfoManagerSettings = new IconInfoManagerSettings(
    {
        items:
            [
                { label: 'Start', iconSvgId: 'money-card', property: 'mx_start', theme: IconInfoThemesClassifier.AZURE, isCurrency: true, defaultValue: 0 },
                { label: 'Plus', iconSvgId: 'money-card-send', property: 'mx_plus', theme: IconInfoThemesClassifier.GREEN, isCurrency: true, defaultValue: 0 },
                { label: 'Minus', iconSvgId: 'money-card-receive', property: 'mx_minus', theme: IconInfoThemesClassifier.PERSIAN_ROSE, isCurrency: true, defaultValue: 0 },
                { label: 'Purchase', iconSvgId: 'money-card-receive', property: 'mx_purchase', theme: IconInfoThemesClassifier.PERSIAN_ROSE, isCurrency: true, defaultValue: 0 },
                { label: 'Withdraw', iconSvgId: 'money-card-receive', property: 'mx_withdraw', theme: IconInfoThemesClassifier.PERSIAN_ROSE, isCurrency: true, defaultValue: 0 },
                { label: 'Difference', iconSvgId: 'money-card-convert', property: 'mx_diff', theme: IconInfoThemesClassifier.BITTERSWEET, isCurrency: true, defaultValue: 0 },
                { label: 'End', iconSvgId: 'money-card-tick', property: 'mx_end', theme: IconInfoThemesClassifier.DEFAULT, isCurrency: true, defaultValue: 0 },
            ],
        wrapper: '.icon-info-wrapper',
        httpRequestSettings:
            {
                url: 'admin/accounting/totals',
                method: HttpRequestMethodsClassifier.POST,
            },
    });



const iconInfoManager = new IconInfoManager(iconInfoManagerSettings);

iconInfoManager.initialization();

table.table.customEvents.subscribe(TableEventTypesClassifier.BEFORE_REQUEST_EXECUTE, () =>
{
    iconInfoManager.update();
});

table.table.customEvents.subscribe(TableEventTypesClassifier.AFTER_REQUEST_PROCESSING, () =>
{
    iconInfoManagerSettings.httpRequestSettings.data = table.table.getHttpRequestSettings().data;
}, { isOnce: true });
