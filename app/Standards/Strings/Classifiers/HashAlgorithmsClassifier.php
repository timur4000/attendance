<?php

namespace App\Standards\Strings\Classifiers;

/**
 * Contains all possible algorithms of hash function.
 *
 * @see hash()
 */
enum HashAlgorithmsClassifier: string
{
    case SHA_512 = 'sha512';
}
