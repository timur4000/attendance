<?php

namespace App\Standards\Chars\Classifiers;

/**
 * Contains all possible chars of braces.
 */
enum BracesClassifier: string
{
    case BRACE_OPEN = '{';

    case BRACE_CLOSE = '}';

    case PARENTHESIS_OPEN = '(';

    case PARENTHESIS_CLOSE = ')';

    case SQUARE_BRACKET_OPEN = '[';

    case SQUARE_BRACKET_CLOSE = ']';

    /**
     * Returns a string equal of the current classifier.
     *
     * @return string|null
     */
    public function get_type(): string | null
    {
        return match ($this)
        {
            self::BRACE_OPEN, self::BRACE_CLOSE => 'brace',
            self::PARENTHESIS_OPEN, self::PARENTHESIS_CLOSE => 'parenthesis',
            self::SQUARE_BRACKET_OPEN, self::SQUARE_BRACKET_CLOSE => 'square_bracket',
        };
    }
}
