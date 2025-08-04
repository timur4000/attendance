import { Animate }         from './Animate.js';
import { TimingFunctions } from '../Standards/Animates/TimingFunctions.js';

/**
 * @class
 *
 * @extends Animate
 *
 * @description Implements animation by duration.
 * **/
export class AnimateDuration extends Animate
{
	/**
	 * @private
	 *
	 * @type { number }
	 **/
	_duration;
	
	/**
	 * @private
	 *
	 * @type { TimingFunctions }
	 **/
	_animateFunction;
	
	/**
	 * @constructor
	 *
	 * @param { function(number) } draw
	 *
	 * @param { number ? } duration
	 *
	 * @param { TimingFunctions ? } animateFunction
	 *
	 * @return { AnimateDuration }
	 * **/
	constructor(draw, duration = 1000, animateFunction = TimingFunctions.linear)
	{
		super(draw);
		
		this._duration = duration;

		this._animateFunction = animateFunction;
	}

	/**
	 * @private
	 *
	 * @inheritDoc
	 * **/
	_frame(timestamp)
	{
		let timeFraction = (timestamp - this._now) / this._duration;

		timeFraction = Animate._timeFractionProcessing(timeFraction);

		const progress = this._animateFunction(timeFraction);

		this._draw.call(this, progress);

		this._checkContinue(timeFraction);
	}
}