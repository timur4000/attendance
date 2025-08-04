<?php

namespace App\Managers\String;

use App\Standards\Managers\Abstracts\Manager;
use App\Standards\Strings\Classifiers\HashAlgorithmsClassifier;

/**
 * Implements help work with strings.
 */
class StringManager extends Manager
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

    /**
     * Returns a hash value by the specified data.
     *
     * @param HashAlgorithmsClassifier $classifier
     *
     * @param string $data
     *
     * @param bool $binary
     *
     * @param array $options
     *
     * @return string
     */
    static public function hash(HashAlgorithmsClassifier $classifier, string $data, bool $binary = false, array $options = []): string
    {
        return hash($classifier->value, $data, $binary, $options);
    }

    /**
     * Returns the sha-512 hash value by the specified data.
     *
     * @param string $data
     *
     * @return string
     */
    static public function sha512(string $data): string
    {
        return self::hash(HashAlgorithmsClassifier::SHA_512, $data);
    }
}