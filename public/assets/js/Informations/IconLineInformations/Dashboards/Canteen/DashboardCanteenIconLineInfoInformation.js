import { IconLineInfoInformation } from '../../IconLineInfoInformation.js';
import { IconLineInfoThemesClassifier } from '../../../../components/IconLineInfo/Standards/IconLineInfoThemesClassifier.js';


/**
 * @description Implements extends logic of the IconLineInfoInformation component for DashboardCanteen.
 *
 * @extends IconLineInfoInformation
 **/
export class DashboardCanteenIconLineInfoInformation extends IconLineInfoInformation
{
    /**
     * @return { Array<IconLineInfoSetting | IconLineInfoSettings> }
     **/
    _iconLineInfoSettings()
    {
        return [
            { heading: 'Start', domUpperIconSvgId: 'money-card', valueKey: 'data.1.mx_start', secondValueKey: 'data.0.mx_start', theme: IconLineInfoThemesClassifier.DEFAULT, },
            { heading: 'Plus', domUpperIconSvgId: 'money-card-send', valueKey: 'data.1.mx_plus', secondValueKey: 'data.0.mx_plus', theme: IconLineInfoThemesClassifier.EMERALD, },
            // { heading: 'Minus', domUpperIconSvgId: 'money-card-receive', valueKey: 'data.1.mx_minus', secondValueKey: 'data.0.mx_minus', theme: IconLineInfoThemesClassifier.PERSIAN_ROSE, },
            { heading: 'Purchase', domUpperIconSvgId: 'money-card-receive', valueKey: 'data.1.mx_purchase', secondValueKey: 'data.0.mx_purchase', theme: IconLineInfoThemesClassifier.PERSIAN_ROSE, },
            { heading: 'Withdraw', domUpperIconSvgId: 'money-card-receive', valueKey: 'data.1.mx_withdraw', secondValueKey: 'data.0.mx_withdraw', theme: IconLineInfoThemesClassifier.PERSIAN_ROSE, },
            { heading: 'Difference', domUpperIconSvgId: 'money-card-convert', valueKey: 'data.1.mx_diff', secondValueKey: 'data.0.mx_diff', theme: IconLineInfoThemesClassifier.BITTERSWEET, withPercents: false, },
            { heading: 'End', domUpperIconSvgId: 'money-card-tick', valueKey: 'data.1.mx_end', secondValueKey: 'data.0.mx_end', theme: IconLineInfoThemesClassifier.MERCURY, },
        ];
    }
    
    /**
     * @inheritDoc
     **/
    _getHeading()
    {
        return 'Report food card by specified period';
    }
}
