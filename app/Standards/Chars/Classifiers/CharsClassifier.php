<?php

namespace App\Standards\Chars\Classifiers;

/**
 * Contains all possible chars of the system.
 */
enum CharsClassifier: string
{
    case EQUAL = '=';

    case NOT_EQUAL = '!=';

    case GREATER_THAN = '>';

    case LESS_THAN = '<';

    case GREATER_THAN_OR_EQUAL = '>=';

    case LESS_THAN_OR_EQUAL = '<=';

    case ADD_ASSIGNMENT = '+=';

    case SUB_ASSIGNMENT = '-=';

    case MULTIPLICATION_ASSIGNMENT = '*=';

    case DIVISION_ASSIGNMENT = '/=';

    case MODULUS_ASSIGNMENT = '%=';

    case SEMICOLON = ';';

    case COLON = ':';

    /**
     * Determines whether the length of the classifier value is the specified length.
     *
     * @param int $length
     *
     * @return bool
     */
    public function is_length_char(int $length = 1): bool
    {
        return mb_strlen($this->value) === $length;
    }
}
