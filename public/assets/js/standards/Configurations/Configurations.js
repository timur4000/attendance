import { HttpRequest } from '../../tea-modules/Classes/Requests/HttpRequest.js';
import { HttpRequestMethodsClassifier } from '../../tea-modules/Classes/Requests/Standards/HttpRequestMethodsClassifier.js';
import { ConfigurationCodesClassifier } from '../Classifiers/Configurations/ConfigurationCodesClassifier.js';


/**
 * @description Implements static logic for the configurations.
 **/
export class Configurations
{
    /**
     * @public
     *
     * @type { string }
     **/
    static url = '/admin/configurations/values/record-json';
    
    /**
     * @public
     *
     * @type { HttpRequestMethodsClassifier }
     **/
    static method = HttpRequestMethodsClassifier.POST;
    
    /**
     * @public
     *
     * @description Implements a request to the configuration.
     *
     * @param { ConfigurationCodesClassifier } code
     *
     * @param { string ? } requestId
     *
     * @return { Promise<ResponseStandard | XMLHttpRequest>}
     **/
    static async get_old_version_not_used(code, requestId)
    {
        const httpRequest = new HttpRequest({ url: this.url, method: this.method, data: { code: code }, id: requestId });
        
        let response;
        
        try
        {
            response = await httpRequest.execute();
        }
        catch (exception)
        {
            response = httpRequest;
            
            if (!httpRequest.isCancel)
            {
                app.notifications.error(exception.statusText, [ httpRequest.url.toString() ]);
            }
        }
        
        return response;
    }

/**
     * @public
     *
     * @description Implements a request to the configuration.
     *
     * @param { ConfigurationCodesClassifier } code
     *
     * @param { string ? } requestId
     *
     * @param { boolean ? } showError
     *
     * @return { Promise<ResponseStandard | XMLHttpRequest>}
     **/
    static async get(code, requestId, showError = true)
    {
        const httpRequest = new HttpRequest({ url: this.url, method: this.method, data: { code: code }, id: requestId });
        
        let response;
        
        try
        {
            response = await httpRequest.execute();
        }
        catch (exception)
        {
            response = httpRequest;
            
            if (!httpRequest.isCancel && showError)
            {
                app.notifications.error(exception.statusText, [ httpRequest.url.toString() ]);
            }
        }
        
        return response;
    }
}
