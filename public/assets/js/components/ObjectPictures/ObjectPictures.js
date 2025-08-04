import { HttpRequest } from '../../tea-modules/Classes/Requests/HttpRequest.js';
import { HttpRequestMethodsClassifier } from '../../tea-modules/Classes/Requests/Standards/HttpRequestMethodsClassifier.js';
import { createElement } from '../../tea-modules/Functions/DOM/Elements/createElement.js';


/**
 * Implements logic of the object pictures.
 **/
export class ObjectPictures
{
    /**
     * @public
     *
     * @type { string }
     **/
    static url = '/admin/object-pictures/picture';
    
    /**
     * @public
     *
     * @type { HttpRequestMethodsClassifier }
     **/
    static method = HttpRequestMethodsClassifier.POST;
    
    /**
     * @public
     *
     * @description Returns picture by the specified file id and entity type.
     *
     * @param { number } fileId
     *
     * @param { ObjectPictureCodeEntityTypesClassifier } classifier
     *
     * @param { string ? } requestId
     *
     * @return { Promise<ResponseStandard> }
     **/
    static async picture(fileId, classifier, requestId)
    {
        const httpRequest = this.pictureHttpRequest(fileId, classifier, requestId);
        
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
     * @description Returns http request of the picture by the specified file id and entity type.
     *
     * @param { number } fileId
     *
     * @param { ObjectPictureCodeEntityTypesClassifier } classifier
     *
     * @param { string ? } requestId
     *
     * @return { HttpRequest }
     **/
    static pictureHttpRequest(fileId, classifier, requestId)
    {
        return new HttpRequest({ url: this.url, method: this.method, data: { code_entity: classifier, id_object: fileId, }, id: requestId });
    }
    
    /**
     * @public
     *
     * @description Creates html node of the image element by the specified base64 value.
     *
     * @param { string } value
     *
     * @param { string } extension
     *
     * @return { HTMLDivElement }
     **/
    static imageBase64(value, extension)
    {
        const imageElement = createElement('img', { src: this.base64(value, extension), class: 'image-element' });
        
        return createElement('div', { class: 'image' }, [ imageElement ]);
    }
    
    /**
     * @public
     *
     * @description Returns string of base64 by the specified arguments.
     *
     * @param { string } value
     *
     * @param { string } extension
     *
     * @return { string }
     **/
    static base64(value, extension)
    {
        return `data:image/${ extension };base64, ${ value }`;
    }
}
