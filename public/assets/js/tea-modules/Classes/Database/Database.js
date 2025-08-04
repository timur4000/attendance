import { CustomEvents }                    from '../CustomEvents/CustomEvents.js';
import { DatabaseErrorMessagesClassifier } from './DatabaseErrorMessagesClassifier.js';
import { DatabaseVersionsClassifier }      from './DatabaseVersionsClassifier.js';
import { DatabaseMethodTypesClassifier }   from './DatabaseMethodTypesClassifier.js';
import { DatabasePromiseArguments }        from './DatabasePromiseArguments.js';
import { format }                          from '../../Functions/Strings/format.js';
import { isObject }                        from '../../Functions/Is/isObject.js';
import { isNumber }                        from '../../Functions/Is/isNumber.js';
import { DatabaseSettings }                from './DatabaseSettings.js';


/**
 * @description Implements extends logic of the IndexDB API.
 **/
export class Database
{
    /**
     * @public
     *
     * @type { CustomEvents }
     **/
    customEvents;
    
    /**
     * @protected
     *
     * @type { DatabaseSettings }
     **/
    _settings;
    
    /**
     * @protected
     *
     * @readonly
     *
     * @type { IDBDatabase }
     **/
    _database;
    
    /**
     * @constructor
     *
     * @param { DatabaseSetting | DatabaseSettings } settings
     **/
    constructor(settings)
    {
        this._settings = settings instanceof DatabaseSettings ? settings : new DatabaseSettings(settings);
        
        this.customEvents = new CustomEvents();
    }
    
    /**
     * @protected
     *
     * @description Implements a handler for each promise.
     *
     * @param { DatabasePromiseArguments } promiseArguments
     *
     * @param { resolve: (value: unknown) => void } resolve
     *
     * @param { resolve: (value: unknown) => void } reject
     *
     * @return { void }
     **/
    _promiseHandler(promiseArguments, resolve, reject)
    {
        const method = this[ `_${ promiseArguments.methodType }Processing` ];
        
        if (!method)
        {
            reject(this._getError(DatabaseErrorMessagesClassifier.UNDEFINED_METHOD, promiseArguments.methodType));

            return ;
        }

        promiseArguments.resolve = resolve;
        
        promiseArguments.reject = reject;
        
        method.call(this, promiseArguments);
    }
    
    /**
     * @protected
     *
     * @description Returns error instance with message by the specified classifier.
     *
     * @param { DatabaseErrorMessagesClassifier } classifier
     *
     * @param { ...string } replacements
     *
     * @return { Error }
     **/
    _getError(classifier, ...replacements)
    {
        return new Error(format(classifier, replacements));
    }
    
    /**
     * @protected
     *
     * @description Implements a handler of the upgrade needed event.
     *
     * @param { IDBVersionChangeEvent } event
     *
     * @return { void }
     **/
    _upgradeNeededHandler(event)
    {
        this._database = event.target.result;
        
        if (this._hasStore())
        {
            return ;
        }
        
        this._createStore();
    }
    
    /**
     * @protected
     *
     * @description Implements process of the events for each method.
     *
     * @param { DatabasePromiseArguments } promiseArguments
     *
     * @return { void }
     **/
    _eventsProcessing(promiseArguments)
    {
        if (promiseArguments.methodType === DatabaseMethodTypesClassifier.OPEN)
        {
            promiseArguments.request.addEventListener('upgradeneeded', this._upgradeNeededHandler.bind(this));
        }
        
        promiseArguments.request.addEventListener('success', this._successHandler.bind(this, promiseArguments));
        
        promiseArguments.request.addEventListener('error', this._errorHandler.bind(this, promiseArguments));
    }
    
    /**
     * @protected
     *
     * @description Implements a handler of the success event for each method.
     *
     * @param { DatabasePromiseArguments } promiseArguments
     *
     * @param { Event } event
     *
     * @return { void }
     **/
    _successHandler(promiseArguments, event)
    {
        switch (promiseArguments.methodType)
        {
            case DatabaseMethodTypesClassifier.OPEN:
            {
                this._database = event.target.result;
                
                promiseArguments.resolve(this._database);
                
                break;
            }
            case DatabaseMethodTypesClassifier.DROP:
            case DatabaseMethodTypesClassifier.DELETE:
            {
                promiseArguments.resolve(event);
                
                break;
            }
            default:
            {
                promiseArguments.resolve(promiseArguments.request.result);
            }
        }
    }
    
    /**
     * @protected
     *
     * @description Implements a handler of the error event for each method.
     *
     * @param { DatabasePromiseArguments } promiseArguments
     *
     * @param { Event } event
     *
     * @return { void }
     **/
    _errorHandler(promiseArguments, event)
    {
        promiseArguments.reject(this._getError(DatabaseErrorMessagesClassifier[ promiseArguments.methodType.toUpperCase() ], event.target.error));
    }
    
    /**
     * @protected
     *
     * @description Returns transaction of the database by the specified mode.
     *
     * @param { IDBTransactionMode } mode
     *
     * @return { IDBTransaction }
     **/
    _transaction(mode)
    {
        return this._database.transaction(this.getStore(), mode);
    }
    
    /**
     * @protected
     *
     * @description Creates and returns new store of database.
     *
     * @return { IDBObjectStore }
     **/
    _createStore()
    {
        return this._database.createObjectStore(this.getStore(), this.getStoreParameters());
    }
    
    /**
     * @protected
     *
     * @description Returns transaction store of database by the specified mode.
     *
     * @param { IDBTransactionMode } mode
     *
     * @return { IDBObjectStore }
     **/
    _getTransactionStore(mode)
    {
        return this._transaction(mode).objectStore(this.getStore());
    }
    
    /**
     * @protected
     *
     * @description Determines whether the current database contains the store.
     *
     * @return { boolean }
     **/
    _hasStore()
    {
        return this._database.objectStoreNames.contains(this.getStore());
    }
    
    /**
     * @protected
     *
     * @description Implements process of the open.
     *
     * @param { DatabasePromiseArguments } promiseArguments
     *
     * @return { void }
     **/
    _openProcessing(promiseArguments)
    {
        promiseArguments.request = indexedDB.open(this.getName(), this.getVersion());
        
        this._eventsProcessing(promiseArguments);
    }
    
    /**
     * @protected
     *
     * @description Implements process of the insert.
     *
     * @param { DatabasePromiseArguments } promiseArguments
     *
     * @return { void }
     **/
    _insertProcessing(promiseArguments)
    {
        if (!isObject(promiseArguments.record))
        {
            promiseArguments.reject(this._getError(DatabaseErrorMessagesClassifier.RECORD_IS_NOT_OBJECT));
            
            return ;
        }
        
        promiseArguments.request = this._getTransactionStore('readwrite').add(promiseArguments.record);
        
        this._eventsProcessing(promiseArguments);
    }
    
    /**
     * @protected
     *
     * @description Implements process of the update.
     *
     * @param { DatabasePromiseArguments } promiseArguments
     *
     * @return { void }
     **/
    _updateProcessing(promiseArguments)
    {
        if (!isObject(promiseArguments.record))
        {
            promiseArguments.reject(this._getError(DatabaseErrorMessagesClassifier.RECORD_IS_NOT_OBJECT));
            
            return ;
        }
        
        promiseArguments.request = this._getTransactionStore('readwrite').put(promiseArguments.record);
        
        this._eventsProcessing(promiseArguments);
    }
    
    /**
     * @protected
     *
     * @description Implements process of the select.
     *
     * @param { DatabasePromiseArguments } promiseArguments
     *
     * @return { void }
     **/
    _selectProcessing(promiseArguments)
    {
        if (!isNumber(promiseArguments.recordId))
        {
            promiseArguments.reject(this._getError(DatabaseErrorMessagesClassifier.RECORD_ID_IS_NOT_NUMBER, promiseArguments.recordId));
            
            return ;
        }
        
        promiseArguments.request = this._getTransactionStore('readonly').get(promiseArguments.recordId);
        
        this._eventsProcessing(promiseArguments);
    }
    
    /**
     * @protected
     *
     * @description Implements process of delete.
     *
     * @param { DatabasePromiseArguments } promiseArguments
     *
     * @return { void }
     **/
    _deleteProcessing(promiseArguments)
    {
        if (!isNumber(promiseArguments.recordId))
        {
            promiseArguments.reject(this._getError(DatabaseErrorMessagesClassifier.RECORD_ID_IS_NOT_NUMBER, promiseArguments.recordId));
            
            return ;
        }
        
        promiseArguments.request = this._getTransactionStore('readwrite').delete(promiseArguments.recordId);
        
        this._eventsProcessing(promiseArguments);
    }
    
    /**
     * @protected
     *
     * @description Implements process of the select all.
     *
     * @param { DatabasePromiseArguments } promiseArguments
     *
     * @return { void }
     **/
    _allProcessing(promiseArguments)
    {
        promiseArguments.request = this._getTransactionStore('readonly').getAll();
        
        this._eventsProcessing(promiseArguments);
    }
    
    /**
     * @protected
     *
     * @description Implements process of the drop.
     *
     * @param { DatabasePromiseArguments } promiseArguments
     *
     * @return { void }
     **/
    _dropProcessing(promiseArguments)
    {
        promiseArguments.request = indexedDB.deleteDatabase(this.getName());
        
        this._eventsProcessing(promiseArguments);
    }
    
    /**
     * @protected
     *
     * @description Implements process of main logic.
     *
     * @param { DatabasePromiseArgs | DatabasePromiseArguments } promiseArguments
     *
     * @return { Promise<any> }
     **/
    _mainProcessing(promiseArguments)
    {
        promiseArguments = promiseArguments instanceof DatabasePromiseArguments ? promiseArguments : new DatabasePromiseArguments(promiseArguments);
        
        return new Promise(this._promiseHandler.bind(this, promiseArguments));
    }
    
    /**
     * @public
     *
     * @description Opens the connection.
     *
     * @return { Promise<IDBDatabase> }
     **/
    async open()
    {
        return this._mainProcessing({ methodType: DatabaseMethodTypesClassifier.OPEN });
    }
    
    /**
     * @public
     *
     * @description Inserts the specified record to the database.
     *
     * @param { Object } record
     *
     * @return { Promise<IDBValidKey> }
     **/
    async insert(record)
    {
        return this._mainProcessing({ methodType: DatabaseMethodTypesClassifier.INSERT, record: record });
    }
    
    /**
     * @public
     *
     * @description Updates the specified record in the database by the specified record id.
     *
     * @param { Object } record
     *
     * @param { IDBValidKey ? } recordId
     *
     * @return { Promise<IDBValidKey> }
     **/
    async update(record, recordId)
    {
        return this._mainProcessing({ methodType: DatabaseMethodTypesClassifier.UPDATE, record: record, recordId: recordId });
    }
    
    /**
     * @public
     *
     * @description Returns the record by the specified record id.
     *
     * @param { IDBValidKey ? } recordId
     *
     * @return { Promise<Object | undefined> }
     **/
    async select(recordId)
    {
        return this._mainProcessing({ methodType: DatabaseMethodTypesClassifier.SELECT, recordId: recordId });
    }
    
    /**
     * @public
     *
     * @description Deletes the record by the specified record id.
     *
     * @param { IDBValidKey ? } recordId
     *
     * @return { Promise<void> }
     **/
    async delete(recordId)
    {
        return this._mainProcessing({ methodType: DatabaseMethodTypesClassifier.DELETE, recordId: recordId });
    }
    
    /**
     * @public
     *
     * @description Returns all records from database.
     *
     * @return { Promise<Array<Object>> }
     **/
    async all()
    {
        return this._mainProcessing({ methodType: DatabaseMethodTypesClassifier.ALL });
    }
    
    /**
     * @public
     *
     * @description Drops the current database.
     *
     * @return { Promise<Event> }
     **/
    async drop()
    {
        return this._mainProcessing({ methodType: DatabaseMethodTypesClassifier.DROP });
    }
    
    /**
     * @public
     *
     * @description Closes the current connection.
     *
     * @return { void }
     **/
    close()
    {
        this._database.close();
        
        this._database = undefined;
    }
    
    /**
     * @public
     *
     * @description Returns name of the database.
     *
     * @return { DatabaseNamesClassifier }
     **/
    getName()
    {
        return this._settings.name;
    }
    
    /**
     * @public
     *
     * @description Returns store of the database.
     *
     * @return { DatabaseStoresClassifier }
     **/
    getStore()
    {
        return this._settings.store;
    }
    
    /**
     * @public
     *
     * @description Returns version of the database.
     *
     * @return { DatabaseVersionsClassifier }
     **/
    getVersion()
    {
        return this._settings.version;
    }
    
    /**
     * @public
     *
     * @description Returns version of the database.
     *
     * @return { IDBObjectStoreParameters }
     **/
    getStoreParameters()
    {
        return this._settings.storeParameters;
    }
}
