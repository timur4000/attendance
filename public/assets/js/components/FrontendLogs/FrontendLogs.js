import { HttpRequest } from '../../tea-modules/Classes/Requests/HttpRequest.js';
import { HttpRequestMethodsClassifier } from '../../tea-modules/Classes/Requests/Standards/HttpRequestMethodsClassifier.js';


/**
 * @description Implements logic for the logs.
 **/
export class FrontendLogs
{
    /**
     * @public
     *
     * @type { string }
     **/
    static url = '/admin/frontend-logs/add';
    
    /**
     * @public
     *
     * @description Sends a log message to the server for recording.
     *
     * @param { string } message
     *
     * @param { Array } [attributes]
     *
     * @param { string } [id]
     *
     * @return { Promise<ResponseStandard> }
     **/
    static async add(message, attributes = [], id = undefined)
    {
        const httpRequest = new HttpRequest({ id: id, url: this.url, method: HttpRequestMethodsClassifier.POST, data: { message: message, attributes: attributes } });
        
        return httpRequest.execute();
    }
}
