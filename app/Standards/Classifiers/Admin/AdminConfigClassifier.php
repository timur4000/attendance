<?php

namespace App\Standards\Classifiers\Admin;

/**
 * Contains all possible config names of admin.
 */
enum AdminConfigClassifier
{
    case identifier;

    case directory_name;

    case locale;

    case locales;

    case attendance_api_host;

    case variables_asset_path;

    case variables_asset_path_prefix;

    case max_size_log_files;
}
