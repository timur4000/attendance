/**
 * @const
 *
 * @enum { string }
 *
 * @description Contains all possible error messages of the Database class.
 **/
export const DatabaseErrorMessagesClassifier =
    {
            OPEN: 'Failed to open the database. Details: {0}',
            
            INSERT: 'Failed to insert a record into the database. Details: {0}',
            
            SELECT: 'Failed to retrieve the specified record from the database. Details: {0}',
            
            UPDATE: 'Failed to update the record in the database. Details: {0}',
            
            DELETE: 'Failed to delete the specified record from the database. Details: {0}',
            
            ALL: 'Failed to retrieve all records from the database. Details: {0}',
            
            DROP: 'Failed to drop the database. Details: {0}',
            
            UNDEFINED_METHOD: 'The method \'{0}\' is not defined in the Database class.',
            
            RECORD_IS_NOT_OBJECT: 'The provided record must be an object. Please check the input.',
            
            RECORD_ID_IS_NOT_NUMBER: 'The provided record ID \'{0}\' must be a valid number. Please verify the input.',
    };
