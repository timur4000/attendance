import { LoadingStatesClassifier } from '../../tea-modules/Classes/Standards/States/LoadingStatesClassifier.js';
import { convertToFullUrl }        from '../../tea-modules/Functions/Convertations/convertToFullUrl.js';
import { loadScript }              from '../../tea-modules/Functions/DOM/Elements/loadScript.js';
import { loadLink }                from '../../tea-modules/Functions/DOM/Elements/loadLink.js';
import { HttpRequest }             from '../../tea-modules/Classes/Requests/HttpRequest.js';


/**
 * @abstract
 *
 * @class
 *
 * @description Implements abstract logic for the all libs.
 **/
export class Lib
{
    /**
     * @public
     *
     * @type { Object }
     **/
    settings;
    
    /**
     * @public
     *
     * @type { any }
     **/
    lib;
    
    /**
     * @public
     *
     * @type { any }
     **/
    element;
    
    /**
     * @abstract
     *
     * @public
     *
     * @type { string }
     **/
    scriptSrc;
    
    /**
     * @public
     *
     * @type { Promise<HTMLScriptElement> }
     **/
    domScript;
    
    /**
     * @abstract
     *
     * @public
     *
     * @type { string }
     **/
    linkSrc;
    
    /**
     * @public
     *
     * @type { Promise<HTMLLinkElement> }
     **/
    domLink;
    
    /**
     * @abstract
     *
     * @public
     *
     * @type { string }
     **/
    localeSrc;
    
    /**
     * @public
     *
     * @type { LoadingStatesClassifier }
     **/
    static state = LoadingStatesClassifier.UNLOAD;
    
    /**
     * @constructor
     *
     * @param { Object } settings
     *
     * @return { Lib }
     **/
    constructor(settings)
    {
        this.settings = settings;
    }
    
    /**
     * @abstract
     *
     * @public
     *
     * @description Implements initialize base logic for the lib.
     *
     * @return { void }
     **/
    async initialization() {}
    
    /**
     * @public
     *
     * @description Implements request for the locale.
     *
     * @return { Promise<Object> }
     **/
    async localeRequest()
    {
        const request = new HttpRequest(
            {
                url: convertToFullUrl(this.localeSrc),
            }
        );
        
        return await request.execute();
    }
    
    /**
     * @public
     *
     * @description Implements loading assets.
     *
     * @return { void }
     **/
    async load()
    {
        if (Lib.state === LoadingStatesClassifier.LOADED)
        {
            return ;
        }
        
        if (Lib.state === LoadingStatesClassifier.LOADING)
        {
            await Promise.all([ this.domScript, this.domLink ]).then(() =>
            {
                Lib.state = LoadingStatesClassifier.LOADED;
            });
            
            return ;
        }
        
        Lib.state = LoadingStatesClassifier.LOADING;
        
        this.domScript = loadScript(convertToFullUrl(this.scriptSrc));
        
        this.domLink = loadLink(convertToFullUrl(this.linkSrc), 'stylesheet');
        
        await Promise.all([ this.domScript, this.domLink ]).then(() =>
        {
            Lib.state = LoadingStatesClassifier.LOADED;
        });
    }
}
