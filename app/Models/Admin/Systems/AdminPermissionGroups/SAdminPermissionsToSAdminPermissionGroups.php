<?php

namespace App\Models\Admin\Systems\AdminPermissionGroups;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SAdminPermissionsToSAdminPermissionGroups extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable =
        [
            'id_admin_permission',
            'id_admin_permission_group',
        ];
}
