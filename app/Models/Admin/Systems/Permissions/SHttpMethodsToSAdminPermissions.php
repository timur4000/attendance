<?php

namespace App\Models\Admin\Systems\Permissions;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SHttpMethodsToSAdminPermissions extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable =
        [
            'id_http_method',
            'id_admin_permission',
        ];
}
