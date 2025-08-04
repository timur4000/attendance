import { structureMerge } from '../../Functions/Structures/structureMerge.js';
import { DatabaseNamesClassifier } from './DatabaseNamesClassifier.js';
import { DatabaseVersionsClassifier } from './DatabaseVersionsClassifier.js';


/**
 * @description Contains all possible settings of the Database class.
 **/
export class DatabaseSettings
{
    /**
     * @typedef { Object } DatabaseSetting
     *
     * @property { DatabaseNamesClassifier } [name]
     *
     * @property { DatabaseStoresClassifier } store
     *
     * @property { DatabaseVersionsClassifier } [version]
     *
     * @property { IDBObjectStoreParameters } [storeParameters]
     **/
    
    /**
     * @public
     *
     * @type { DatabaseNamesClassifier }
     **/
    name = DatabaseNamesClassifier.APP;
    
    /**
     * @public
     *
     * @type { DatabaseStoresClassifier }
     **/
    store;

    /**
     * @public
     *
     * @type { DatabaseVersionsClassifier }
     **/
    version = DatabaseVersionsClassifier.DEFAULT;
    
    /**
     * @public
     *
     * @type { IDBObjectStoreParameters }
     **/
    storeParameters = { keyPath: 'id', autoIncrement: true };
    
    /**
     * @constructor
     *
     * @param { DatabaseSetting } promiseArguments
     **/
    constructor(promiseArguments)
    {
        structureMerge(this, promiseArguments);
    }
}
