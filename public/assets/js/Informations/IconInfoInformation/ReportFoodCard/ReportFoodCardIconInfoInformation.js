import { IconInfoInformation } from '../IconInfoInformation.js';
import { HttpRequestMethodsClassifier } from '../../../tea-modules/Classes/Requests/Standards/HttpRequestMethodsClassifier.js';
import { IconInfoThemesClassifier } from '../../../components/IconInfo/Standards/IconInfoThemesClassifier.js';
import { IconInfoTypesClassifier } from '../../../components/IconInfo/Standards/IconInfoTypesClassifier.js';
import { DateManager } from '../../../tea-modules/Classes/Dates/DateManager.js';
import { en } from '../../../lib/air-datepicker/locale/en.js';
import { InputOuterPositionsClassifier } from '../../../components/Inputs/Standards/InputOuterPositionsClassifier.js';
import { InformationTypesClassifier } from '../../../components/Information/Standards/InformationTypesClassifier.js';


/**
 * @description Implements logic of the ReportFoodCardInformation component for the ReportFoodCard.
 *
 * @extends { BaseInformation }
 **/
export class ReportFoodCardInformation extends IconInfoInformation
{
    /**
     * @inheritDoc
     **/
    type = InformationTypesClassifier.INPUTS;
    
    /**
     * @public
     *
     * @type { number }
     **/
    idUser = 0;
    
    /**
     * @return { HttpRequestSettingProperties }
     **/
    _getHttRequestSetting()
    {
        return {
            url: 'admin/accounting/totals',
            method: HttpRequestMethodsClassifier.POST,
            data: () =>
            {
                return {
                    id_user: this.idUser,
                    date_start: this.information.getCustomInputById('information-date-start').getValue(),
                    date_end: this.information.getCustomInputById('information-date-end').getValue(),
                };
            },
        };
    }
    
    /**
     * @return { Array<IconInfoSetting> }
     **/
    _getItems()
    {
        return [
            { label: 'Start', iconSvgId: 'money-card', property: 'mx_start', theme: IconInfoThemesClassifier.AZURE, isCurrency: true, defaultValue: 0, type: IconInfoTypesClassifier.COLUMN, },
            { label: 'Plus', iconSvgId: 'money-card-send', property: 'mx_plus', theme: IconInfoThemesClassifier.GREEN, isCurrency: true, defaultValue: 0, type: IconInfoTypesClassifier.COLUMN, },
            // { label: 'Minus', iconSvgId: 'money-card-receive', property: 'mx_minus', theme: IconInfoThemesClassifier.PERSIAN_ROSE, isCurrency: true, defaultValue: 0, type: IconInfoTypesClassifier.COLUMN, },
            { label: 'Purchase', iconSvgId: 'money-card-receive', property: 'mx_purchase', theme: IconInfoThemesClassifier.PERSIAN_ROSE, isCurrency: true, defaultValue: 0, type: IconInfoTypesClassifier.COLUMN, },
            { label: 'Withdraw', iconSvgId: 'money-card-receive', property: 'mx_withdraw', theme: IconInfoThemesClassifier.PERSIAN_ROSE, isCurrency: true, defaultValue: 0, type: IconInfoTypesClassifier.COLUMN, },
            { label: 'Difference', iconSvgId: 'money-card-convert', property: 'mx_diff', theme: IconInfoThemesClassifier.BITTERSWEET, isCurrency: true, defaultValue: 0, type: IconInfoTypesClassifier.COLUMN, },
            { label: 'End', iconSvgId: 'money-card-tick', property: 'mx_end', theme: IconInfoThemesClassifier.DEFAULT, isCurrency: true, defaultValue: 0, type: IconInfoTypesClassifier.COLUMN, },
        ];
    }
    
    /**
     * @inheritDoc
     **/
    _getHeading()
    {
        return 'Report food card by specified period';
    }
    
    /**
     * @inheritDoc
     **/
    _getMargins()
    {
        return '0 0 50px 0';
    }
    
    /**
     * @return { Array<CustomInputSetting> }
     **/
    _getCustomInputOptions()
    {
        return [
            {
                inputId: 'information-date-start',
                inputName: 'date_start',
                title: 'Date start',
                isDatepicker: true,
                datepickerSettings:
                    {
                        locale: en,
                        selectedDates: [ DateManager.yesterday() ],
                        autoClose: true,
                        dateFormat: 'yyyy-MM-dd',
                        maxDate: new Date(),
                    },
                withInputOuter: true,
                inputOuterSettings: { identifier: 'information-date-between' },
                iconLabelOptions:
                    [
                        { position: InputOuterPositionsClassifier.AFTER, forAttribute: 'information-date-start', iconId: 'arrows-long-right', iconClassName: 'icon icon-size-12' },
                    ]
            },
            {
                inputId: 'information-date-end',
                inputName: 'date_end',
                title: 'Date end',
                isDatepicker: true,
                datepickerSettings:
                    {
                        locale: en,
                        selectedDates: [ DateManager.tomorrow(new Date()) ],
                        autoClose: true,
                        dateFormat: 'yyyy-MM-dd',
                        maxDate: DateManager.tomorrow(new Date()),
                    },
                withInputOuter: true,
                inputOuterSettings: { identifier: 'information-date-between' },
                iconLabelOptions:
                    [
                        { position: InputOuterPositionsClassifier.AFTER, forAttribute: 'information-date-end', iconId: 'time-calendar-search', iconClassName: 'icon icon-size-16' },
                    ]
            },
        ];
    }
    
    /**
     * @inheritDoc
     **/
    async _keyUpHandler(input, customInput, instance)
    {
        await this.iconInfoManager.update();
    }
}
