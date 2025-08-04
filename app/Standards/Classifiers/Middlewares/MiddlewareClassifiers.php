<?php

namespace App\Standards\Classifiers\Middlewares;

/**
 * Contains all possible middleware names.
 */
enum MiddlewareClassifiers
{
    case localizations;

    case admin_localizations;

    case admin_authorization;

    case admin_before_authorization;

    case admin_roles;

    case admin_operation_logs;

    case admin_access_key_middleware;
}
