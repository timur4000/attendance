import { structureMerge } from '../../Functions/Structures/structureMerge.js';


/**
 * @description Contains all possible arguments for promises of the Database class.
 **/
export class DatabasePromiseArguments
{
    /**
     * @typedef { Object } DatabasePromiseArgs
     *
     * @property { DatabaseMethodTypesClassifier } methodType
     *
     * @property { IDBValidKey } [recordId]
     *
     * @property { Object } [record]
     *
     * @property { IDBRequest } [request]
     *
     * @property { function(value: unknown): void } [resolve]
     *
     * @property { function(value: unknown): void } [reject]
     **/
    
    /**
     * @public
     *
     * @type { DatabaseNamesClassifier }
     **/
    methodType;
    
    /**
     * @public
     *
     * @type { IDBValidKey }
     **/
    recordId;
    
    /**
     * @public
     *
     * @type { Object }
     **/
    record;
    
    /**
     * @public
     *
     * @type { IDBOpenDBRequest | IDBRequest }
     **/
    request;
    
    /**
     * @public
     *
     * @type { function(value: unknown): void }
     **/
    resolve;
    
    /**
     * @public
     *
     * @type { function(value: unknown): void }
     **/
    reject;
    
    /**
     * @constructor
     *
     * @param { DatabasePromiseArgs } promiseArguments
     **/
    constructor(promiseArguments)
    {
        structureMerge(this, promiseArguments);
    }
}
