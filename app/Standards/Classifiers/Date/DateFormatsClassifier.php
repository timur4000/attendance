<?php

namespace App\Standards\Classifiers\Date;

/**
 * Contains all possible formats of the date.
 */
enum DateFormatsClassifier: string
{
    case Y = 'Y';

    case m = 'm';

    case Y_m_d = 'Y-m-d';

    case Y_m_d_H_i_s = 'Y-m-d H:i:s';

    case H = 'H';
}
