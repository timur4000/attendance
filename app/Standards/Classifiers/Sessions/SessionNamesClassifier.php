<?php

namespace App\Standards\Classifiers\Sessions;

/**
 * Contains all possible session names of app.
 */
enum SessionNamesClassifier
{
    case authorization;

    case is_remember;
}