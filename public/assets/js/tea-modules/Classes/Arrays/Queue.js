/**
 * @description Implements logic of the queue.
 **/
export class Queue
{
    /**
     * @private
     *
     * @type { Array<any> }
     **/
    _items = [];
    
    /**
     * @constructor
     */
    constructor() {}
    
    /**
     * @public
     *
     * @description Adds an element to the end of the queue.
     *
     * @param { any } element
     *
     * @return { void }
     */
    enqueue(element)
    {
        this._items.push(element);
    }
    
    /**
     * @public
     *
     * @description Removes and returns the first element from the queue.
     *
     * @return { any | undefined }
     */
    dequeue()
    {
        return this._items.shift();
    }
    
    /**
     * @public
     *
     * @description Returns the first element of the queue without removing it.
     *
     * @returns { any | undefined }
     */
    front()
    {
        return this._items[0];
    }
    
    /**
     * @public
     *
     * @description Determines whether the queue is empty.
     *
     * @return { boolean }
     */
    isEmpty()
    {
        return !this._items.length;
    }
    
    /**
     * @public
     *
     * @description Returns the number of elements in the queue.
     *
     * @return { number }
     */
    size()
    {
        return this._items.length;
    }
}
