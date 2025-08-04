<?php

namespace App\Standards\Chars\Classifiers;

use App\Standards\Components\Classifiers\ComponentsBracesClassifier;
use App\Standards\Components\Classifiers\ComponentsBracesTypesClassifier;

/**
 * Contains all possible types of braces.
 */
enum BracesTypesClassifier: string
{
    case BRACE = 'brace';

    case PARENTHESIS = 'parenthesis';

    case SQUARE_BRACKET = 'square_bracket';

    /**
     * @param string $char
     *
     * @return ComponentsBracesTypesClassifier|null
     */
    static public function from_char(string $char): BracesTypesClassifier | null
    {
        return match ($char)
        {
            ComponentsBracesClassifier::BRACE_OPEN->value, ComponentsBracesClassifier::BRACE_CLOSE->value => BracesTypesClassifier::BRACE,
            ComponentsBracesClassifier::PARENTHESIS_OPEN->value, ComponentsBracesClassifier::PARENTHESIS_CLOSE->value => BracesTypesClassifier::PARENTHESIS,
            ComponentsBracesClassifier::SQUARE_BRACKET_OPEN->value, ComponentsBracesClassifier::SQUARE_BRACKET_CLOSE->value => BracesTypesClassifier::SQUARE_BRACKET,
            default => null,
        };
    }
}
