<?php

namespace App\Standards\Forms\Callables;

use App\Standards\Callables\Interfaces\ICallable;
use App\Standards\Fields\Abstracts\Field;
use App\Standards\Forms\Classes\Form;

/**
 * Implements each loop processing of the rules creating method.
 *
 * @see Form::create_rules
 */
class RulesCreatingMapCallable implements ICallable
{
    /**
     * @param Field $record
     *
     * @param int $index
     *
     * @return array
     */
    public function __invoke(Field $record, int $index): array
    {
        if (!$record->has_rules())
        {
            return [];
        }

        return [ $record->get_name() => $record->get_rules() ];
    }
}
