import { HttpRequest } from '../../tea-modules/Classes/Requests/HttpRequest.js';
import { HttpRequestMethodsClassifier } from '../../tea-modules/Classes/Requests/Standards/HttpRequestMethodsClassifier.js';


/**
 * @description Implements static logic for the parameters.
 **/
export class Parameters
{
    /**
     * @public
     *
     * @type { string }
     **/
    static url = 'admin/parameters/record-json';
    
    /**
     * @public
     *
     * @type { HttpRequest }
     **/
    static httpRequest;
    
    /**
     * @public
     *
     * @description Implements a request to the parameter.
     *
     * @param { ParametersIdsClassifier } idParameter
     *
     * @return { Promise<ResponseStandard | XMLHttpRequest>}
     **/
    static async get(idParameter)
    {
        const httpRequest = new HttpRequest(
            {
                url: this.url,
                method: HttpRequestMethodsClassifier.POST,
                data: { id_parameter: idParameter },
            }
        );
        
        this.httpRequest = httpRequest;
        
        return httpRequest.execute();
    }
}
