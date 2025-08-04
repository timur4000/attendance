<?php

namespace App\Standards\Elements\Classifiers;

/**
 * Contains all possible views of elements.
 */
enum ViewsClassifier: string
{
    case form = 'forms.form';

    case input_text = 'forms.fields.text';

    case input_date = 'forms.fields.date';

    case input_date_time = 'forms.fields.date-time';

    case input_number = 'forms.fields.number';

    case input_checkbox = 'forms.fields.checkbox';

    case button = 'forms.fields.button';

    case hidden = 'forms.fields.hidden';
}
