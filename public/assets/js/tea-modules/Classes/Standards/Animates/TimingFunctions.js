/**
 * @const
 *
 * @enum { Function }
 *
 * @description Contains all possible processing fraction time of animations.
 * **/
export const TimingFunctions =
	{
		/**
		 *@function
		 * @description Linear animation.
		 *
		 * @param { number } timeFraction
		 *
		 * @return { number }
		 * **/
		linear(timeFraction)
		{
			return timeFraction;
		}
	};
