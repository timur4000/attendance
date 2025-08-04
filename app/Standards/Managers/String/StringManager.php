<?php

namespace App\Standards\Managers\String;

/**
 * Implements help work with strings.
 */
class StringManager
{
	/**
	 * Replaces given string to snake case.
	 *
	 * @param string $string
	 *
	 * @return string
	 */
	public static function to_snake_case(string $string): string
	{
		if (empty($string))
		{
			return '';
		}
		
		preg_match_all('/([A-Z][A-Z0-9]*(?=$|[A-Z][a-z0-9])|[A-Za-z][a-z0-9]+)/', $string, $matches);
		
		$match = $matches[0];
		
		foreach ($match as &$value)
		{
			$value = mb_strtolower($value);
		}
		
		return implode('_', $match);
	}
}