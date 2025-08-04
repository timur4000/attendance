import { AnimateEventsClassifier } from '../Standards/Animates/AnimateEventsClassifier.js';
import { CustomEvents }            from '../CustomEvents/CustomEvents.js';


/**
 * @class
 *
 * @abstract
 *
 * @description Abstract class for all animation classes.
 * **/
export class Animate
{
	/**
	 * @public
	 *
	 * @type { CustomEvents }
	 * **/
	customEvents;
	
	/**
	 * @private
	 *
	 * @type { number}
	 * **/
	_id = 0;

	/**
	 * @protected
	 *
	 * @type { DOMHighResTimeStamp }
	 * **/
	_now;

	/**
	 * @protected
	 *
	 * @type { function(number) }
	 * **/
	_draw;

	/**
	 * @public
	 *
	 * @type { boolean }
	 * **/
	isPlaying = false;

	/**
	 * @constructor
	 *
	 * @param { function(number) } draw
	 *
	 * @return { Animate }
	 * **/
	constructor(draw)
	{
		this._draw = draw;
		
		this.customEvents = new CustomEvents();
	}

	/**
	 * @protected
	 *
	 * @description Frame for each animation step.
	 *
	 * @param { number } timestamp
	 *
	 * @return { void }
	 * **/
	_frame(timestamp) {}

	/**
	 * @protected
	 *
	 * @description Checks if the animation should end or continue.
	 *
	 * @param { number } timeFraction
	 *
	 * @return { void }
	 * **/
	_checkContinue(timeFraction)
	{
		if (timeFraction < 1 && this.isPlaying)
		{
			this.continue();

			return ;
		}

		this.end();
	}

	/**
	 * @static
	 *
	 * @protected
	 *
	 * @description Handles time so that it doesn't return less than 0 or greater than 1
	 *
	 * @param { number } timeFraction
	 *
	 * @return { number }
	 * **/
	static _timeFractionProcessing(timeFraction)
	{
		if (timeFraction > 1)
		{
			timeFraction = 1;
		}

		if (timeFraction < 0)
		{
			timeFraction = 0;
		}

		return timeFraction;
	}
	
	/**
	 * @public
	 *
	 * @description Plays animation.
	 *
	 * @return { void }
	 * **/
	play()
	{
		this.isPlaying = true;

		this._now = performance.now();

		this._id = requestAnimationFrame(this._frame.bind(this));
		
		this.customEvents.execute(AnimateEventsClassifier.START, this);
	}

	/**
	 * @public
	 *
	 * @description Continues animation if isPlaying property is true.
	 *
	 * @return { void }
	 * **/
	continue()
	{
		if (!this.isPlaying)
		{
			return ;
		}

		this._id = requestAnimationFrame(this._frame.bind(this));
		
		this.customEvents.execute(AnimateEventsClassifier.CONTINUE, this);
	}

	/**
	 * @public
	 *
	 * @description Ends animation.
	 *
	 * @return { void }
	 * **/
	end()
	{
		this.isPlaying = false;

		cancelAnimationFrame(this._id);
		
		this.customEvents.execute(AnimateEventsClassifier.END, this);
	}
	
	/**
	 * @public
	 *
	 * @description Stops animation.
	 *
	 * @return { void }
	 * **/
	stop()
	{
		this.customEvents.unsubscribe(AnimateEventsClassifier.END, this._infinityEndHandler);
		
		this.isPlaying = false;

		cancelAnimationFrame(this._id);
		
		this.customEvents.execute(AnimateEventsClassifier.STOP, this);
	}
	
	/**
	 * @public
	 *
	 * @description Plays infinity animation.
	 *
	 * @return { void }
	 * **/
	infinity()
	{
		this.play();
		
		this.customEvents.subscribe(AnimateEventsClassifier.END, this._infinityEndHandler);
	}
	
	/**
	 * @private
	 *
	 * @description Implements handler for the infinity end event.
	 *
	 * @param { Animate } instance
	 *
	 * @return { void }
	 **/
	_infinityEndHandler(instance)
	{
		instance.play();
	}
}
