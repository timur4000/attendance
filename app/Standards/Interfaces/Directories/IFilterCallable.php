<?php

namespace App\Standards\Interfaces\Directories;

use RecursiveDirectoryIterator;
use SplFileInfo;

/**
 * Implements standard of RecursiveCallbackFilterIterator class for callable argument.
 */
interface IFilterCallable
{
	/**
	 * Filters items by return boolean value.
	 *
	 * @param SplFileInfo $current
	 *
	 * @param string $key
	 *
	 * @param RecursiveDirectoryIterator $directory_iterator
	 *
	 * @return bool
	 */
	public function __invoke(SplFileInfo $current, string $key, RecursiveDirectoryIterator $directory_iterator): bool;
}
