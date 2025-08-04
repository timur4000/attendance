import { isDate } from '../../Functions/Is/isDate.js';
import { isString } from '../../Functions/Is/isString.js';
import { isUndefined } from '../../Functions/Is/isUndefined.js';
import { DateFormatsClassifier } from '../Standards/Date/DateFormatsClassifier.js';


/**
 * Implements help work with date.
 **/
export class DateManager
{
    /**
     * @static
     *
     * @public
     *
     * @description Converts the given seconds to H:i:s format.
     *
     * @param { number } value
     *
     * @return { string }
     **/
    static secondsToTime(value)
    {
        const hours = this.pad(this.secondsToHoursRemainder(value));
        
        const minutes = this.pad(this.secondsToMinutesRemainder(value));
        
        const seconds = this.pad(this.secondsToRemainder(value));
        
        return `${ hours }:${ minutes }:${ seconds }`;
    }
    
    /**
     * @static
     *
     * @public
     *
     * @description Calculates difference between from the given dates.
     *
     * @param { string | Date } firstDate
     *
     * @param { string | Date } secondDate
     *
     * @return { number }
     **/
    static difference(firstDate, secondDate)
    {
        isString(firstDate) && (firstDate = new Date(firstDate));
        
        isString(secondDate) && (secondDate = new Date(secondDate));
        
        return firstDate - secondDate;
    }
    
    /**
     * @static
     *
     * @description Converts seconds to hours remainder.
     *
     * @param { number } value
     *
     * @return { number }
     **/
    static secondsToHoursRemainder(value)
    {
        return Math.floor(value / 3600);
    }
    
    /**
     * @static
     *
     * @description Converts seconds to minutes remainder.
     *
     * @param { number } value
     *
     * @return { number }
     **/
    static secondsToMinutesRemainder(value)
    {
        return Math.floor(value / 60) % 60;
    }
    
    /**
     * @static
     *
     * @description Converts seconds to minutes.
     *
     * @param { number } value
     *
     * @return { number }
     **/
    static secondsToMinutes(value)
    {
        return Math.floor(value / 60);
    }
    
    /**
     * @static
     *
     * @description Converts seconds to remainder.
     *
     * @param { number } value
     *
     * @return { number }
     **/
    static secondsToRemainder(value)
    {
        return Math.floor(value % 60);
    }
    
    /**
     * @static
     *
     * @description Converts milliseconds to seconds.
     *
     * @param { number } value
     *
     * @return { number }
     **/
    static millisecondsToSeconds(value)
    {
        return Math.floor(value / 1000);
    }
    
    /**
     * @static
     *
     * @description Converts milliseconds to minutes remainder.
     *
     * @param { number } value
     *
     * @return { number }
     **/
    static millisecondsToMinutesRemainder(value)
    {
        return Math.floor(value / 1000 / 60) % 60;
    }
    
    /**
     * @static
     *
     * @description Returns date by the given format.
     *
     * @param { DateFormatsClassifier ? } format
     *
     * @param { (string | Date) ? } date
     *
     * @return { string }
     **/
    static date(format = DateFormatsClassifier.Y_m_d_H_i_s, date = '')
    {
        if (!isDate(date))
        {
            date = date ? new Date(date) : new Date();
        }
        
        const dateSegments = this.dateSegments(date);
        
        return format.replace(/\w/g, a => dateSegments[ a ]);
    }
    
    /**
     * @static
     *
     * @description Returns tomorrow date by the given date.
     *
     * @param { string | Date } date
     *
     * @return { Date }
     **/
    static tomorrow(date)
    {
        if (!isDate(date))
        {
            date = date ? new Date(date) : new Date();
        }
        
        date.setDate(date.getDate() + 1);
        
        return date;
    }
    
    /**
     * @static
     *
     * @description Returns yesterday date by the specified date.
     *
     * @param { ? (string | Date) } [date]
     *
     * @return { Date }
     **/
    static yesterday(date)
    {
        if (isUndefined(date))
        {
            date = new Date();
        }
        
        if (!isDate(date))
        {
            date = new Date(date);
        }
        
        date.setDate(date.getDate() - 1);
        
        return date;
    }
    
    /**
     * @static
     *
     * @description Returns the days count of the specified date.
     *
     * @param { ? (string | Date) } [date]
     *
     * @return { number }
     **/
    static countDaysOfMonth(date)
    {
        if (isUndefined(date))
        {
            date = new Date();
        }
        
        if (!isDate(date))
        {
            date = new Date(date);
        }
        
        return (new Date(date.getFullYear(), date.getMonth() + 1, 0)).getDate();
    }
    
    /**
     * @static
     *
     * @description Returns the month number of the specified date.
     *
     * @param { ? (string | Date) } [date]
     *
     * @return { number }
     **/
    static month(date)
    {
        if (isUndefined(date))
        {
            date = new Date();
        }
        
        if (!isDate(date))
        {
            date = new Date(date);
        }
        
        return date.getMonth() + 1;
    }
    
    /**
     * @static
     *
     * @description Returns the full year number of the specified date.
     *
     * @param { ? (string | Date) } [date]
     *
     * @return { number }
     **/
    static fullYear(date)
    {
        if (isUndefined(date))
        {
            date = new Date();
        }
        
        if (!isDate(date))
        {
            date = new Date(date);
        }
        
        return date.getFullYear();
    }
    
    /**
     * @static
     *
     * @public
     *
     * @description Returns segments of the given date.
     *
     * @param { Date } date
     *
     * @return { Object }
     **/
    static dateSegments(date)
    {
        return (
            {
                Y: date.getFullYear(),
                m: this.pad(date.getMonth() + 1),
                d: this.pad(date.getDate()),
                H: this.pad(date.getHours()),
                i: this.pad(date.getMinutes()),
                s: this.pad(date.getSeconds()),
                u: this.pad(date.getMilliseconds(), 6),
            });
    }
    
    /**
     * @static
     *
     * @public
     *
     * @description Inserts zero digit in to value start.
     *
     * @param { number } value
     *
     * @param { number ? } length
     *
     * @return { string }
     **/
    static pad(value, length = 2)
    {
        return value.toString().padStart(length, '0');
    }
}
